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
    weekday: string;
    sideTime: string;
    replyBy: string;
    ceremonyTitle: string;
    ceremony: string;
    reception: string;
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
    gatheringLabel: string;
    gathering: string;
    scheduleLabel: string;
    schedule: string;
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
      title: "SANGHYUK & MIYUKI の招待状",
      description: "SANGHYUK & MIYUKI の結婚式招待状",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "ご出欠のご返信をお願いいたします",
    },
    event: {
      weekday: "日曜日",
      sideTime: "挙式 10:30 / 披露宴 11:30",
      replyBy: "09月17日まで",
      ceremonyTitle: "Wedding Ceremony",
      ceremony: "挙式 10:30",
      reception: "披露宴 11:30",
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
      groomName: "イ サンヒョック",
      groomMessage: "皆さまにお会いできますことを心より楽しみにしております。",
      partnerRole: "Bride",
      partnerName: "緒方 美友紀",
      partnerMessage: "温かな一日を一緒に過ごしていただけましたら幸いです。",
    },
    info: {
      gatheringLabel: "集合時間",
      gathering:
        "・ご親族様　9:50まで\n" +
        "・ゲストの皆様　10:10まで\n" +
        "・受付担当の4名様　10:00まで",
      scheduleLabel: "スケジュール",
      schedule:
        "・挙式開始　10:30\n" + "・披露宴受付　11:00\n" + "・披露宴開始　11:30",
      venueLabel: "会場",
      venue: "フランス料理レストラン　ル・ジャルダン",
      addressLabel: "住所",
      address: "157-0075 東京都世田谷区砧公園1-2",
      accessLabel: "アクセス",
      access:
        "・東急田園都市線　「用賀駅」下車　徒歩17分\n" +
        "・[用21][用22]　東急バス「用賀駅～美術館」で「美術館」下車　徒歩3分\n" +
        "・[園01]　東急バス「千歳船橋駅～田園調布駅」で「美術館入口」下車　徒歩5分\n" +
        "・[渋24]　東急バス／小田急バス「成城学園前駅～渋谷駅」で「砧町」下車　徒歩10分\n" +
        "※ 駅からタクシーでお越しの方は会場にて領収書を頂けますと現金一千円をお渡しいたします\n" +
        "※ お車でお越しの方は、レストラン専用無料駐車場をご利用いただけます。",
    },
    message: {
      title: "Message",
      body: "遠方よりお越しの皆さま、心より感謝申し上げます。当日のスケジュールと会場へのアクセスは、上記 Information をご確認ください。",
    },
    request: {
      title: "Request",
      body: "お手数ではございますが、出欠のご回答は下記フォームより期限までにお知らせください。",
    },
    rsvp: {
      title: "ご出欠について",
      intro: "2026年9月17日までにご回答をお願いいたします。",
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
      title: "SANGHYUK & MIYUKI's Wedding Invitation",
      description: "Wedding invitation for SANGHYUK & MIYUKI",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "Please let us know whether you can attend.",
    },
    event: {
      weekday: "Sunday",
      sideTime: "Ceremony 10:30 / Reception 11:30",
      replyBy: "Reply by September 17",
      ceremonyTitle: "Wedding Ceremony",
      ceremony: "Ceremony 10:30",
      reception: "Reception 11:30",
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
      partnerName: "Miyuki Ogata",
      partnerMessage:
        "It would mean so much to spend a warm and joyful day together.",
    },
    info: {
      gatheringLabel: "Arrival times",
      gathering:
        "・Family　by 9:50\n" +
        "・Guests　by 10:10\n" +
        "・Reception staff (4 people)　by 10:00",
      scheduleLabel: "Schedule",
      schedule:
        "・Ceremony begins　10:30\n" +
        "・Reception check-in　11:00\n" +
        "・Reception begins　11:30",
      venueLabel: "Venue",
      venue: "French Restaurant Le Jardin",
      addressLabel: "Address",
      address: "1-2 Kinuta Park, Setagaya-ku, Tokyo 157-0075",
      accessLabel: "Access",
      access:
        "・Tokyu Den-en-toshi Line: 17-minute walk from Yoga Station\n" +
        "・Tokyu Bus [用21][用22] (Yoga Sta. – Museum): get off at Museum, 3-minute walk\n" +
        "・Tokyu Bus [園01] (Chitose-Funabashi Sta. – Den-en-chofu Sta.): get off at Museum Entrance, 5-minute walk\n" +
        "・Tokyu/Odakyu Bus [渋24] (Seijogakuen-mae Sta. – Shibuya Sta.): get off at Kinuta-cho, 10-minute walk\n" +
        "※ Guests arriving by taxi from the station will receive ¥1,000 cash upon presenting the receipt at the venue\n" +
        "※ Free restaurant parking is available for guests arriving by car.",
    },
    message: {
      title: "Message",
      body: "Thank you for joining us, including those traveling from afar. Please check the schedule and venue access details above for the day of the wedding.",
    },
    request: {
      title: "Request",
      body: "Please submit your RSVP through the form below by the reply deadline.",
    },
    rsvp: {
      title: "RSVP",
      intro: "Please reply by September 17, 2026.",
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
      title: "SANGHYUK & MIYUKI 청첩장",
      description: "SANGHYUK & MIYUKI의 결혼식 초대장",
    },
    side: {
      dateLabel: "Date",
      replyPrompt: "참석 여부를 알려 주시면 감사하겠습니다.",
    },
    event: {
      weekday: "일요일",
      sideTime: "예식 10:30 / 피로연 11:30",
      replyBy: "9월 17일까지",
      ceremonyTitle: "Wedding Ceremony",
      ceremony: "예식 10:30",
      reception: "피로연 11:30",
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
      groomName: "이 상혁",
      groomMessage:
        "소중한 분들과 이 날을 함께할 수 있기를 진심으로 기다리고 있습니다.",
      partnerRole: "Bride",
      partnerName: "오가타 미유키",
      partnerMessage:
        "따뜻하고 기쁜 하루를 함께 나눌 수 있다면 감사하겠습니다.",
    },
    info: {
      gatheringLabel: "도착 시간",
      gathering:
        "・가족, 친척분　9:50까지\n" +
        "・하객 여러분　10:10까지\n" +
        "・접수 담당 4명　10:00까지",
      scheduleLabel: "일정",
      schedule:
        "・예식 시작　10:30\n" +
        "・피로연 접수　11:00\n" +
        "・피로연 시작　11:30",
      venueLabel: "장소",
      venue: "프렌치 레스토랑 르 자르댕",
      addressLabel: "주소",
      address: "157-0075 도쿄도 세타가야구 키누타공원 1-2",
      accessLabel: "오시는 길",
      access:
        "・도큐 덴엔토시선 「요가역」 하차 도보 17분\n" +
        "・[用21][用22] 도큐버스 「요가역～미술관」 「미술관」 하차 도보 3분\n" +
        "・[園01] 도큐버스 「치토세후나바시역～덴엔초후역」 「미술관입구」 하차 도보 5분\n" +
        "・[渋24] 도큐버스／오다큐버스 「세이조가쿠엔마에역～시부야역」 「키누타초」 하차 도보 10분\n" +
        "※ 역에서 택시로 오시는 분은 예식장에서 영수증을 제출해 주시면 현금 1,000엔을 드립니다\n" +
        "※ 자가용으로 오시는 분은 레스토랑 전용 무료 주차장을 이용하실 수 있습니다.",
    },
    message: {
      title: "Message",
      body: "멀리서 와 주시는 분들께 진심으로 감사드립니다. 당일 일정과 오시는 길은 위의 Information 안내를 확인해 주세요.",
    },
    request: {
      title: "Request",
      body: "번거로우시겠지만 아래 양식으로 기한 내 참석 여부를 알려 주세요.",
    },
    rsvp: {
      title: "참석 여부",
      intro: "2026년 9월 17일까지 회신 부탁드립니다.",
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
  eventDate: new Date("2026-10-18T10:30:00+09:00"),
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
