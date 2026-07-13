/* ============================================================
   رَوْق — منطق صفحات الشروط وسياسة الدار (تبديل اللغة)
   خارجي في ملف مستقل التزامًا بسياسة أمن المحتوى (script-src 'self').
   ============================================================ */

(function () {
  const PAGE = document.body.getAttribute("data-page") || "terms";

  const TITLES = {
    terms: { ar: "الشروط والأحكام — رَوْق", en: "Terms & Conditions — RAWQ" },
    policy: { ar: "سياسة الدار — رَوْق", en: "House Policy — RAWQ" },
    refund: { ar: "سياسة الاستبدال والاسترجاع — رَوْق", en: "Exchange & Refund Policy — RAWQ" },
  };

  const T = {
    ar: {
      skip: "تجاوز إلى المحتوى",
      nav_home: "الرئيسية",
      nav_request: "اطلب النظر",
      footer_cr: "السجل التجاري",
      footer_ig: "انستقرام",
      footer_terms: "الشروط والأحكام",
      footer_refund: "سياسة الاسترجاع",
      footer_policy: "سياسة الدار",
      footer_line: "رَوْق — دار تنسيق العيش",
    },
    en: {
      skip: "Skip to content",
      nav_home: "Home",
      nav_request: "Request",
      footer_cr: "Commercial Registration",
      footer_ig: "Instagram",
      footer_terms: "Terms & Conditions",
      footer_refund: "Refund Policy",
      footer_policy: "House Policy",
      footer_line: "RAWQ — The House of Curated Living",
    },
  };

  let lang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ar") return q;
    return localStorage.getItem("rawq-lang") === "en" ? "en" : "ar";
  })();

  const toggle = document.getElementById("langToggle");

  function apply() {
    const dict = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = (TITLES[PAGE] || TITLES.terms)[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-lang-block]").forEach((el) => {
      el.hidden = el.getAttribute("data-lang-block") !== lang;
    });
    toggle.textContent = lang === "ar" ? "EN" : "عربي";
    toggle.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
    localStorage.setItem("rawq-lang", lang);
  }

  toggle.addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    apply();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  apply();
})();
