import { expect, test } from "@playwright/test";

const languages = {
  ja: {
    button: /Japanese/,
    htmlLang: "ja",
    greeting: "ご挨拶",
    host: "ホスト",
    gallery: "フォトギャラリー",
    venueLabel: "会場",
    rsvpTitle: "ご出欠について",
    footerRsvp: "出欠回答",
    submit: "Googleフォームで回答する",
  },
  en: {
    button: /English/,
    htmlLang: "en",
    greeting: "Greeting",
    host: "Hosts",
    gallery: "Photo Gallery",
    venueLabel: "Venue",
    rsvpTitle: "RSVP",
    footerRsvp: "RSVP",
    submit: "Reply with Google Form",
  },
  ko: {
    button: /Korean/,
    htmlLang: "ko",
    greeting: "초대의 글",
    host: "신랑 신부",
    gallery: "사진",
    venueLabel: "장소",
    rsvpTitle: "참석 여부",
    footerRsvp: "참석 답변",
    submit: "Google Form으로 답변하기",
  },
};

async function selectLanguage(page, language) {
  await page.goto("/");
  await expect(page.locator("#languageGate")).toBeVisible();
  await page.getByRole("button", { name: languages[language].button }).click();
  await expect(page.locator("#languageGate")).toHaveClass(/is-hidden/);
  await expect(page.locator("html")).toHaveAttribute("lang", languages[language].htmlLang);
}

test.describe("wedding invitation guest experience", () => {
  for (const language of Object.keys(languages)) {
    test(`${language} guest can read invitation and open RSVP form link`, async ({ page }) => {
      const text = languages[language];

      await selectLanguage(page, language);

      await expect(page.locator("#hero")).toBeVisible();
      await expect(page.locator("#countDays")).toHaveText(/\d{3}/);

      await page.locator("#greeting").scrollIntoViewIfNeeded();
      await expect(page.getByText(text.greeting).first()).toBeVisible();

      await page.locator("#host").scrollIntoViewIfNeeded();
      await expect(page.getByText(text.host).first()).toBeVisible();

      await page.locator("#gallery").scrollIntoViewIfNeeded();
      await expect(page.getByText(text.gallery).first()).toBeVisible();

      await page.locator("#information").scrollIntoViewIfNeeded();
      await expect(page.getByText(text.venueLabel).first()).toBeVisible();

      await page.locator('.floating-footer a[href="#rsvp"]').click();
      await expect(page.locator("#rsvp [data-i18n='rsvp.title']")).toHaveText(text.rsvpTitle);
      await expect(page.locator("#rsvp [data-i18n='rsvp.title']")).toBeVisible();

      const formLink = page.getByRole("link", { name: text.submit });
      await expect(formLink).toBeVisible();
      await expect(formLink).toHaveAttribute("target", "_blank");
      await expect(formLink).toHaveAttribute("href", /^https:\/\/forms\.gle\//);
    });
  }

  test("first window is always language selection, even after a saved choice", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("invitationLanguage", "en"));
    await page.reload();
    await expect(page.locator("#languageGate")).toBeVisible();
    await expect(page.getByRole("button", { name: /Korean/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Japanese/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /English/ })).toBeVisible();
  });

  test("guest can change language without losing the invitation", async ({ page }) => {
    await selectLanguage(page, "ja");
    await page.getByRole("button", { name: "Language" }).click();
    await expect(page.locator("#languageGate")).toBeVisible();
    await page.getByRole("button", { name: /English/ }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByText("Photo Gallery")).toBeVisible();
  });

  test("layout does not create horizontal overflow", async ({ page }) => {
    await selectLanguage(page, "ko");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
