type Language = "ja" | "en" | "ko";
type Translation = {
  meta: {
    title: string;
    description: string;
  };
  side: {
    dateLabel: string;
    replyPrompt: string;
  };
  event: {
    sideTime: string;
    replyBy: string;
    ceremonyTitle: string;
    reception: string;
    ceremony: string;
  };
  sections: {
    greeting: string;
    host: string;
    gallery: string;
  };
  greeting: {
    lines: string[];
  };
  profile: {
    groomRole: string;
    groomName: string;
    groomMessage: string;
    partnerRole: string;
    partnerName: string;
    partnerMessage: string;
  };
  info: {
    venueLabel: string;
    venue: string;
    addressLabel: string;
    address: string;
    accessLabel: string;
    access: string;
  };
  message: {
    title: string;
    body: string;
  };
  request: {
    title: string;
    body: string;
  };
  rsvp: {
    title: string;
    intro: string;
    submit: string;
    note: string;
  };
  actions: {
    rsvp: string;
  };
  footer: {
    language: string;
    rsvp: string;
    access: string;
  };
};

type TranslationPath = string;

const translations: Record<Language, Translation> = {
  ja: {
    meta: {
      title: "SANGHYUK & PARTNER の招待状",
      description: "SANGHYUK & PARTNER の結婚式招待状",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "ご出欠のご返信をお願いいたします",
    },
    event: {
      sideTime: "受付 10:30 / 挙式 11:00",
      replyBy: "09月20日まで",
      ceremonyTitle: "Wedding Ceremony",
      reception: "受付 10:30",
      ceremony: "挙式 11:00",
    },
    sections: {
      greeting: "ご挨拶",
      host: "ホスト",
      gallery: "フォトギャラリー",
    },
    greeting: {
      lines: [
        "拝啓",
        "このたび 私たちふたりは",
        "結婚式を行うこととなりました",
        "日頃お世話になっております皆さまへ",
        "感謝の気持ちを込めて",
        "ささやかな祝宴を催したく存じます",
        "ご多用のところ恐縮ではございますが",
        "ぜひご出席くださいますよう",
        "ご案内申し上げます",
        "敬具",
      ],
    },
    profile: {
      groomRole: "Groom",
      groomName: "イ・サンヒョク",
      groomMessage: "皆さまにお会いできますことを心より楽しみにしております。",
      partnerRole: "Bride",
      partnerName: "お名前を入力",
      partnerMessage: "温かな一日を一緒に過ごしていただけましたら幸いです。",
    },
    info: {
      venueLabel: "会場",
      venue: "会場名を入力してください",
      addressLabel: "住所",
      address: "東京都内 / 詳細住所を入力してください",
      accessLabel: "アクセス",
      access: "最寄駅から徒歩約5分",
    },
    message: {
      title: "Message",
      body: "遠方よりお越しくださる皆さまにも安心してご参加いただけるよう、会場情報や当日の流れは順次こちらに追記いたします。",
    },
    request: {
      title: "Request",
      body: "お手数ではございますが、出欠のご回答は下記フォームより期限までにお知らせください。",
    },
    rsvp: {
      title: "ご出欠について",
      intro: "2026年9月20日までにご回答をお願いいたします。",
      submit: "Googleフォームで回答する",
      note: "フォームは別タブで開きます。",
    },
    actions: {
      rsvp: "出欠を回答する",
    },
    footer: {
      language: "Language",
      rsvp: "出欠回答",
      access: "会場情報",
    },
  },
  en: {
    meta: {
      title: "SANGHYUK & PARTNER's Wedding Invitation",
      description: "Wedding invitation for SANGHYUK & PARTNER",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "Please let us know whether you can attend.",
    },
    event: {
      sideTime: "Reception 10:30 / Ceremony 11:00",
      replyBy: "Reply by September 20",
      ceremonyTitle: "Wedding Ceremony",
      reception: "Reception 10:30",
      ceremony: "Ceremony 11:00",
    },
    sections: {
      greeting: "Greeting",
      host: "Hosts",
      gallery: "Photo Gallery",
    },
    greeting: {
      lines: [
        "With gratitude",
        "We are delighted to invite you",
        "to celebrate our wedding day.",
        "Your kindness and support",
        "have meant so much to us.",
        "We would be honored",
        "to share this warm occasion",
        "with the people we love.",
        "We look forward to seeing you.",
      ],
    },
    profile: {
      groomRole: "Groom",
      groomName: "Sanghyuk Lee",
      groomMessage:
        "I am looking forward to sharing this special day with you.",
      partnerRole: "Bride",
      partnerName: "Partner name",
      partnerMessage:
        "It would mean so much to spend a warm and joyful day together.",
    },
    info: {
      venueLabel: "Venue",
      venue: "Venue name to be added",
      addressLabel: "Address",
      address: "Tokyo area / detailed address to be added",
      accessLabel: "Access",
      access: "About 5 minutes on foot from the nearest station",
    },
    message: {
      title: "Message",
      body: "For guests joining us from afar, venue details and the day-of schedule will be added here as they are finalized.",
    },
    request: {
      title: "Request",
      body: "Please submit your RSVP through the form below by the reply deadline.",
    },
    rsvp: {
      title: "RSVP",
      intro: "Please reply by September 20, 2026.",
      submit: "Reply with Google Form",
      note: "The form opens in a new tab.",
    },
    actions: {
      rsvp: "Reply to RSVP",
    },
    footer: {
      language: "Language",
      rsvp: "RSVP",
      access: "Venue",
    },
  },
  ko: {
    meta: {
      title: "SANGHYUK & PARTNER 청첩장",
      description: "SANGHYUK & PARTNER의 결혼식 초대장",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "참석 여부를 알려 주시면 감사하겠습니다.",
    },
    event: {
      sideTime: "접수 10:30 / 예식 11:00",
      replyBy: "9월 20일까지",
      ceremonyTitle: "Wedding Ceremony",
      reception: "접수 10:30",
      ceremony: "예식 11:00",
    },
    sections: {
      greeting: "초대의 글",
      host: "신랑 신부",
      gallery: "사진",
    },
    greeting: {
      lines: [
        "소중한 분들께",
        "저희 두 사람이",
        "결혼식을 올리게 되었습니다.",
        "늘 아껴 주시고 응원해 주신 마음에",
        "깊이 감사드립니다.",
        "작지만 따뜻한 자리를 마련하였으니",
        "바쁘시더라도 함께해 주시면",
        "더없이 큰 기쁨이 되겠습니다.",
        "감사합니다.",
      ],
    },
    profile: {
      groomRole: "Groom",
      groomName: "이상혁",
      groomMessage:
        "소중한 분들과 이 날을 함께할 수 있기를 진심으로 기다리고 있습니다.",
      partnerRole: "Bride",
      partnerName: "배우자 이름",
      partnerMessage:
        "따뜻하고 기쁜 하루를 함께 나눌 수 있다면 감사하겠습니다.",
    },
    info: {
      venueLabel: "장소",
      venue: "예식장명을 입력해 주세요",
      addressLabel: "주소",
      address: "도쿄 지역 / 상세 주소를 입력해 주세요",
      accessLabel: "오시는 길",
      access: "가까운 역에서 도보 약 5분",
    },
    message: {
      title: "Message",
      body: "멀리서 와 주시는 분들도 편히 참석하실 수 있도록 장소 정보와 당일 일정은 확정되는 대로 이곳에 안내드리겠습니다.",
    },
    request: {
      title: "Request",
      body: "번거로우시겠지만 아래 양식으로 기한 내 참석 여부를 알려 주세요.",
    },
    rsvp: {
      title: "참석 여부",
      intro: "2026년 9월 20일까지 회신 부탁드립니다.",
      submit: "Google Form으로 답변하기",
      note: "폼은 새 탭에서 열립니다.",
    },
    actions: {
      rsvp: "참석 여부 답변하기",
    },
    footer: {
      language: "Language",
      rsvp: "참석 답변",
      access: "장소 안내",
    },
  },
};

const languages = new Set<Language>(["ja", "en", "ko"]);

function isLanguage(value: string | null | undefined): value is Language {
  return Boolean(value && languages.has(value as Language));
}

const savedLanguage = localStorage.getItem("invitationLanguage");
const state = {
  selectedLanguage: isLanguage(savedLanguage) ? savedLanguage : "ja",
  eventDate: new Date("2026-10-31T11:00:00+09:00"),
} satisfies {
  selectedLanguage: Language;
  eventDate: Date;
};

function requiredElement<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }
  return element;
}

const gate = requiredElement<HTMLElement>("#languageGate");
const invitation = requiredElement<HTMLElement>("#invitation");
const changeLanguage = requiredElement<HTMLButtonElement>("#changeLanguage");
const languageButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-lang]");
const metaDescription = requiredElement<HTMLMetaElement>(
  'meta[name="description"]',
);
const rsvpLink = requiredElement<HTMLAnchorElement>("#rsvpLink");
const googleFormUrl = "https://forms.gle/aVozsCosGEx8gh6XA";

function resolvePath(source: Translation, path: TranslationPath): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object" && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function applyTranslations(language: Language): void {
  const dictionary = translations[language];
  state.selectedLanguage = language;
  document.documentElement.lang = language;
  document.title = dictionary.meta.title;
  metaDescription.setAttribute("content", dictionary.meta.description);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    const value = resolvePath(dictionary, element.dataset.i18n ?? "");
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-list]")
    .forEach((element) => {
      const value = resolvePath(dictionary, element.dataset.i18nList ?? "");
      if (Array.isArray(value)) {
        element.replaceChildren(
          ...value.map((line) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = line;
            return paragraph;
          }),
        );
      }
    });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-attr]")
    .forEach((element) => {
      element.dataset.i18nAttr?.split(",").forEach((binding: string) => {
        const [attribute, key] = binding.split(":");
        if (!attribute || !key) {
          return;
        }
        const value = resolvePath(dictionary, key);
        if (attribute && typeof value === "string") {
          element.setAttribute(attribute, value);
        }
      });
    });

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.lang === language),
    );
  });
}

function openInvitation(language: Language): void {
  applyTranslations(language);
  localStorage.setItem("invitationLanguage", language);
  gate.classList.add("is-hidden");
  invitation.removeAttribute("aria-hidden");
  window.scrollTo(0, 0);
}

function showLanguageGate(): void {
  gate.classList.remove("is-hidden");
  invitation.setAttribute("aria-hidden", "true");
  const selectedButton = document.querySelector<HTMLButtonElement>(
    `[data-lang="${state.selectedLanguage}"]`,
  );
  selectedButton?.focus();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isLanguage(button.dataset.lang)) {
      openInvitation(button.dataset.lang);
    }
  });
});

changeLanguage.addEventListener("click", showLanguageGate);

applyTranslations(state.selectedLanguage);
rsvpLink.href = googleFormUrl;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function updateCountdown(): void {
  const now = new Date();
  const diff = Math.max(0, state.eventDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  requiredElement<HTMLElement>("#countDays").textContent = String(
    days,
  ).padStart(3, "0");
  requiredElement<HTMLElement>("#countHours").textContent = pad(hours);
  requiredElement<HTMLElement>("#countMinutes").textContent = pad(minutes);
  requiredElement<HTMLElement>("#countSeconds").textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
