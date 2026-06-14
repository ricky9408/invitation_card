type Attendance = "yes" | "no" | "maybe";
type Language = "ja" | "en" | "ko";

type Env = {
  GOOGLE_SERVICE_ACCOUNT_JSON?: string;
  GOOGLE_SHEET_ID?: string;
  GOOGLE_SHEET_RANGE?: string;
};

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

type GoogleTokenResponse = {
  access_token?: unknown;
};

type RsvpPayload = {
  attendance: Attendance;
  name: string;
  message: string;
  language: Language;
};

type ErrorPayload = {
  ok: false;
  error: string;
};

type SuccessPayload = {
  ok: true;
};

const allowedAttendances = new Set<Attendance>(["yes", "no", "maybe"]);
const allowedLanguages = new Set<Language>(["ja", "en", "ko"]);
const maxBodyBytes = 4096;

function jsonResponse(body: ErrorPayload | SuccessPayload, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function base64Url(input: string | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}

async function signJwt(serviceAccount: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claim = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(serviceAccount.private_key),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken),
  );
  return `${unsignedToken}.${base64Url(new Uint8Array(signature))}`;
}

async function getAccessToken(serviceAccount: ServiceAccount): Promise<string> {
  const assertion = await signJwt(serviceAccount);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token request failed: ${response.status}`);
  }

  const token = (await response.json()) as GoogleTokenResponse;
  if (!token || typeof token.access_token !== "string") {
    throw new Error("Google token response did not include an access token.");
  }
  return token.access_token;
}

function readStringField(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function parseServiceAccount(rawJson: string): ServiceAccount {
  const parsed = JSON.parse(rawJson) as Partial<ServiceAccount>;
  if (typeof parsed.client_email !== "string" || typeof parsed.private_key !== "string") {
    throw new Error("Google service account secret is invalid.");
  }
  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key,
  };
}

function sanitizePayload(payload: unknown): { error: string } | { value: RsvpPayload } {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { error: "Invalid RSVP payload." };
  }

  const fields = payload as Record<string, unknown>;
  const attendance = readStringField(fields, "attendance");
  const name = readStringField(fields, "name").slice(0, 80);
  const message = readStringField(fields, "message").slice(0, 500);
  const language = readStringField(fields, "language");

  if (!allowedAttendances.has(attendance as Attendance)) {
    return { error: "Invalid attendance value." };
  }

  if (!allowedLanguages.has(language as Language)) {
    return { error: "Invalid language value." };
  }

  if (!name) {
    return { error: "Name is required." };
  }

  return {
    value: {
      attendance: attendance as Attendance,
      name,
      message,
      language: language as Language,
    },
  };
}

async function readJsonPayload(request: Request): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > maxBodyBytes) {
    throw new Error("RSVP payload is too large.");
  }
  return request.json();
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { env, request } = context;
    const serviceAccountJson = env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const spreadsheetId = env.GOOGLE_SHEET_ID;
    const sheetRange = env.GOOGLE_SHEET_RANGE || "RSVP!A1";

    if (!serviceAccountJson || !spreadsheetId) {
      return jsonResponse({ ok: false, error: "RSVP endpoint is not configured." }, 500);
    }

    const payload = await readJsonPayload(request);
    const result = sanitizePayload(payload);
    if ("error" in result) {
      return jsonResponse({ ok: false, error: result.error }, 400);
    }

    const serviceAccount = parseServiceAccount(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount);
    const row = [
      new Date().toISOString(),
      result.value.language,
      result.value.attendance,
      result.value.name,
      result.value.message,
    ];
    const appendUrl = new URL(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetRange)}:append`,
    );
    appendUrl.searchParams.set("valueInputOption", "RAW");
    appendUrl.searchParams.set("insertDataOption", "INSERT_ROWS");

    const appendResponse = await fetch(appendUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        values: [row],
      }),
    });

    if (!appendResponse.ok) {
      throw new Error(`Google Sheets append failed: ${appendResponse.status}`);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return jsonResponse({ ok: false, error: "RSVP submission failed." }, 500);
  }
};
