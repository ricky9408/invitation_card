const allowedAttendances = new Set(["yes", "no", "maybe"]);

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function base64Url(input) {
  const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem) {
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

async function signJwt(serviceAccount) {
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

async function getAccessToken(serviceAccount) {
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

  const token = await response.json();
  return token.access_token;
}

function sanitizePayload(payload) {
  const attendance = String(payload.attendance || "").trim();
  const name = String(payload.name || "").trim().slice(0, 80);
  const message = String(payload.message || "").trim().slice(0, 500);
  const language = String(payload.language || "").trim().slice(0, 8);

  if (!allowedAttendances.has(attendance)) {
    return { error: "Invalid attendance value." };
  }

  if (!name) {
    return { error: "Name is required." };
  }

  return {
    value: {
      attendance,
      name,
      message,
      language,
    },
  };
}

export async function onRequestPost(context) {
  try {
    const { env, request } = context;
    const serviceAccountJson = env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const spreadsheetId = env.GOOGLE_SHEET_ID;
    const sheetRange = env.GOOGLE_SHEET_RANGE || "RSVP!A1";

    if (!serviceAccountJson || !spreadsheetId) {
      return jsonResponse({ ok: false, error: "RSVP endpoint is not configured." }, 500);
    }

    const payload = await request.json();
    const result = sanitizePayload(payload);
    if (result.error) {
      return jsonResponse({ ok: false, error: result.error }, 400);
    }

    const serviceAccount = JSON.parse(serviceAccountJson);
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
    appendUrl.searchParams.set("valueInputOption", "USER_ENTERED");
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
    return jsonResponse({ ok: false, error: error.message }, 500);
  }
}
