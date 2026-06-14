import { chromium } from "@playwright/test";

const baseUrl = process.env.INVITATION_URL || "http://127.0.0.1:4173";
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const languages = {
  ja: {
    button: /Japanese/,
    requiredText: ["ご挨拶", "ホスト", "フォトギャラリー", "ご出欠について"],
  },
  en: {
    button: /English/,
    requiredText: ["Greeting", "Hosts", "Photo Gallery", "RSVP"],
  },
  ko: {
    button: /Korean/,
    requiredText: ["초대의 글", "신랑 신부", "사진", "참석 여부"],
  },
};

const failures = [];
const browser = await chromium.launch();

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({
    path: `tests/artifacts/${viewport.name}-language.png`,
    fullPage: false,
  });

  for (const [language, config] of Object.entries(languages)) {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: config.button }).click();
    await page.waitForSelector(".language-gate.is-hidden");
    await page.waitForTimeout(550);

    await page.screenshot({
      path: `tests/artifacts/${viewport.name}-${language}-hero.png`,
      fullPage: false,
    });

    await page.evaluate(() => {
      document.querySelector("#information").scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(800);
    const infoBox = await page.locator("#information .info-top").boundingBox();
    if (!infoBox || infoBox.y < -20 || infoBox.y > viewport.height - 120) {
      failures.push(`${viewport.name}/${language}: information section did not scroll into visible viewport`);
    }
    await page.screenshot({
      path: `tests/artifacts/${viewport.name}-${language}-information.png`,
      fullPage: false,
    });

    await page.evaluate(() => {
      document.querySelector("#rsvp").scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(800);
    const rsvpBox = await page.locator("#rsvp .rsvp-inner").boundingBox();
    if (!rsvpBox || rsvpBox.y < -20 || rsvpBox.y > viewport.height - 120) {
      failures.push(`${viewport.name}/${language}: RSVP section did not scroll into visible viewport`);
    }
    await page.screenshot({
      path: `tests/artifacts/${viewport.name}-${language}-rsvp.png`,
      fullPage: false,
    });

    const visibleText = await page.locator("body").innerText();
    for (const text of config.requiredText) {
      if (!visibleText.includes(text)) {
        failures.push(`${viewport.name}/${language}: missing visible text "${text}"`);
      }
    }

    const languageGateVisible = await page.locator(".language-gate").evaluate((node) => {
      const style = window.getComputedStyle(node);
      return style.visibility !== "hidden" && style.opacity !== "0";
    });
    if (languageGateVisible) {
      failures.push(`${viewport.name}/${language}: language gate still visible after selection`);
    }
  }

  if (consoleErrors.length > 0) {
    failures.push(`${viewport.name}: console errors: ${consoleErrors.join(" | ")}`);
  }

  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Visual check passed. Screenshots written to tests/artifacts/.");
