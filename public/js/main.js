/* ============================================================
   رَوْق — RAWQ
   كل ما قد يتغيّر لاحقًا يعيش هنا، في CONFIG و PROJECTS فقط.
   ============================================================ */

const CONFIG = {
  email: "dar@rawq.art",
  formEndpoint: "",                                  // اختياري: endpoint خارجي (مثل Formspree) يتقدّم على Firestore إن وُجد
  instagram: "https://www.instagram.com/rawq.art",   // ⚠️ أكّد المعرّف الصحيح
  cr: "7054427997",
  ogImage: "https://rawq.art/assets/og.png",
  // استقبال الطلبات في Firestore (مشروع rawq-website) — المفتاح علني بطبيعته، والحماية في قواعد الأمان
  firebase: {
    projectId: "rawq-website",
    apiKey: "AIzaSyAlsT1wZgjop_ed7OTCzoviED-hP9InA6s",
    collection: "requests",
  },
  // إشعار بريدي فوري إلى dar@rawq.art عند كل طلب (Apps Script بحساب الدار)
  notifyEndpoint: "https://script.google.com/macros/s/AKfycbyqlqVgzdu-UXXTu3-NsTSluNclyOiC_n3RiG7u1xKcEPL-zkJdAzmfspzbXO_Zp4q-dg/exec",
};

/* المشاريع — أضف مشروعًا جديدًا بإضافة عنصر هنا فقط.
   image: null → يُعرض لوح لوني من الهوية إلى حين توفر التصوير. */
const PROJECTS = [
  {
    id: "narjes-villa",
    image: null, // مثال عند توفر التصوير: "assets/projects/narjes-01.jpg"
    ar: {
      name: "فيلا النرجس",
      place: "الرياض",
      desc: "مساحة عائلية أُعيد ترتيب صمتها. عتبة تُبطئ الخطو، وممرّ يقود الضوء، وجدار يعرف حدوده — التفاصيل قبل اللقطات الواسعة.",
      note: "التوثيق البصري قيد الإعداد.",
      paletteLabel: "لوح المساحة — من هوية الدار",
    },
    en: {
      name: "Narjes Villa",
      place: "Riyadh",
      desc: "A family residence whose quiet was rearranged. A threshold that slows the step, a corridor that carries the light, a wall that knows its limits — details before wide shots.",
      note: "Photography in preparation.",
      paletteLabel: "The space board — from the house palette",
    },
  },
];

/* قاموس النصوص — العربية أصل، والإنجليزية صوت ثانٍ لا ترجمة. */
const CONTENT = {
  ar: {
    _title: "رَوْق — دار تنسيق العيش",
    _desc: "رَوْق — دار تنسيق العيش. دارٌ تُعيش الذوق… لا تُصمّمه فقط. عدد محدود من المشاريع سنويًا.",
    skip: "تجاوز إلى المحتوى",
    nav_what: "الماهية",
    nav_approach: "النهج",
    nav_selections: "المختارات",
    nav_house: "الدار",
    nav_request: "اطلب النظر",
    hero_kicker: "دار تنسيق العيش",
    hero_line: "دارٌ تُعيش الذوق… لا تُصمّمه فقط.",
    hero_cta: "اطلب النظر في مشروعك",
    hero_sub: "عددٌ محدود من المشاريع سنويًا — يُقبل بالعناية نفسها التي يُتمّ بها.",
    what_title: "الماهية",
    what_p1: "رَوْق ليست شركة تصميم داخلي، ولا دار ديكور، ولا جهة تشطيب. رَوْق فئة قائمة بذاتها: دار تنسيق العيش — تُعنى بالمساحة كما تُعاش، لا كما تُعرض.",
    what_p2: "حيث يعلو الضجيج، نُصغي. وحيث تتكاثر الخيارات، نحذف. فالاختزال — في قاموس الدار — هو أرقى أشكال الذوق.",
    quote: "ليس كل ما يمكن بناؤه… يستحق أن يُبنى.",
    approach_title: "النهج",
    approach_intro: "لا نسلّم قوائم بنود، ولا مراحل تتناثر بين أطراف. كل مساحة تخرج من الدار نتيجةً واحدةً متكاملة.",
    a1_title: "نتيجة واحدة",
    a1_body: "تُدرس المساحة كلًّا واحدًا: ضوؤها، صمتها، إيقاع الحركة فيها — ثم تُسلَّم كما دُرست. كاملة.",
    a2_title: "جلسة لوحة الانتقاء",
    a2_body: "جلسة واحدة تُحسم فيها لوحة المساحة: الدرجة، والملمس، والضوء. قرارات، لا قوائم.",
    a3_title: "الخامة بأثرها",
    a3_body: "لا نسمّي الخامات ولا مصادرها. نصفها بدرجتها وأثرها: دفء تحت القدم، هدوء خلف الجدار، ضوء يعرف متى ينسحب.",
    selections_title: "المختارات",
    selections_intro: "نعرض قليلًا لأننا نعمل قليلًا — عن قصد. والتفاصيل عندنا تسبق اللقطات الواسعة.",
    house_title: "الدار",
    house_line: "رَوْق ليست شركةً نمت بسرعة، بل دارٌ بُنيت بعناية — لأن المعيار، إذا انكسر، لا يمكن ترميمه.",
    request_title: "اطلب أن يُنظر في مشروعك",
    request_intro: "أخبرنا بما يكفي لنفهم. وسنعود إليك إن رأينا التوافق.",
    f_name: "الاسم",
    f_contact: "وسيلة التواصل — جوال أو بريد",
    f_space: "موقع المساحة ونوعها",
    f_vision: "نبذة عن التطلّع",
    f_submit: "أرسل الطلب",
    thanks: "وصلنا طلبك. سنعود إليك إن رأينا التوافق.",
    footer_cr: "السجل التجاري",
    footer_ig: "انستقرام",
    footer_terms: "الشروط والأحكام",
    footer_policy: "سياسة الدار",
    footer_line: "رَوْق — دار تنسيق العيش",
    _mailSubject: "طلب النظر في مشروع — رَوْق",
    _mailLabels: { name: "الاسم", contact: "وسيلة التواصل", space: "موقع المساحة ونوعها", vision: "نبذة عن التطلّع" },
  },

  en: {
    _title: "RAWQ — The House of Curated Living",
    _desc: "RAWQ — The House of Curated Living. Taste is lived here, not merely designed. A limited number of projects each year.",
    skip: "Skip to content",
    nav_what: "What",
    nav_approach: "Approach",
    nav_selections: "Selections",
    nav_house: "The House",
    nav_request: "Request",
    hero_kicker: "The House of Curated Living",
    hero_line: "Taste is lived here — not merely designed.",
    hero_cta: "Request Consideration",
    hero_sub: "A limited number of projects each year — accepted with the same care they are completed with.",
    what_title: "What RAWQ Is",
    what_p1: "RAWQ is not an interior design firm, nor a décor studio, nor a fit-out contractor. It is a category of its own: a house of curated living — concerned with space as it is lived, not as it is displayed.",
    what_p2: "Where noise multiplies, we listen. Where options crowd, we remove. Restraint, in this house, is the finest form of taste.",
    quote: "Not everything that can be built deserves to be built.",
    approach_title: "The Approach",
    approach_intro: "We do not hand over itemised lists, or phases scattered among parties. Each space leaves the house as one complete, resolved outcome.",
    a1_title: "One Outcome",
    a1_body: "A space is studied as a whole — its light, its quiet, the rhythm of movement through it — and delivered as it was studied. Whole.",
    a2_title: "The Selection Board Session",
    a2_body: "One sitting in which the board of the space is settled: tone, texture, light. Decisions, not lists.",
    a3_title: "Material, by Its Effect",
    a3_body: "We name neither materials nor their sources. We speak of grade and effect: warmth underfoot, quiet behind a wall, light that knows when to withdraw.",
    selections_title: "Selections",
    selections_intro: "We show little because we take on little — by intent. With us, details come before wide shots.",
    house_title: "The House",
    house_line: "RAWQ was not a company grown in haste, but a house built with care — because a standard, once broken, cannot be restored.",
    request_title: "Request Consideration of Your Project",
    request_intro: "Tell us enough to understand. If we see the fit, we will return to you.",
    f_name: "Name",
    f_contact: "How to reach you — phone or email",
    f_space: "Location and type of the space",
    f_vision: "A word on what you aspire to",
    f_submit: "Submit",
    thanks: "Your request has reached us. If we see the fit, we will return to you.",
    footer_cr: "Commercial Registration",
    footer_ig: "Instagram",
    footer_terms: "Terms & Conditions",
    footer_policy: "House Policy",
    footer_line: "RAWQ — The House of Curated Living",
    _mailSubject: "Request for consideration — RAWQ",
    _mailLabels: { name: "Name", contact: "Contact", space: "Location & type of space", vision: "Aspiration" },
  },
};

/* ============================================================
   المنطق — لا شيء تحت هذا السطر يحتاج تعديلًا عند تغيير المحتوى.
   ============================================================ */

const IDENTITY_PALETTE = ["#2E2D29", "#A15932", "#716856", "#8B8174", "#D5CBBF"];

let lang = (() => {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "ar") return q;
  return localStorage.getItem("rawq-lang") === "en" ? "en" : "ar";
})();

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  const t = (p) => p[lang];
  grid.innerHTML = PROJECTS.map((p) => {
    const visual = p.image
      ? `<img src="${p.image}" alt="${t(p).name}" loading="lazy">`
      : `<div class="palette-board" role="img" aria-label="${t(p).paletteLabel}">
           ${IDENTITY_PALETTE.map((c) => `<span style="background:${c}"></span>`).join("")}
         </div>`;
    return `
      <article class="project reveal">
        <div class="project__visual">${visual}</div>
        <div class="project__text">
          <h3 class="project__name">${t(p).name}</h3>
          <p class="project__place">${t(p).place}</p>
          <p class="project__desc">${t(p).desc}</p>
          <p class="project__note">${t(p).note}</p>
        </div>
      </article>`;
  }).join("");
  observeReveals(grid);
}

function applyLang() {
  const dict = CONTENT[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = dict._title;
  document.querySelector('meta[name="description"]').setAttribute("content", dict._desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  const toggle = document.getElementById("langToggle");
  toggle.textContent = lang === "ar" ? "EN" : "عربي";
  toggle.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");

  localStorage.setItem("rawq-lang", lang);
  renderProjects();
}

/* ---------- الروابط من CONFIG ---------- */
function applyConfig() {
  const emailLink = document.getElementById("footerEmail");
  emailLink.href = `mailto:${CONFIG.email}`;
  emailLink.textContent = CONFIG.email;

  const ig = document.getElementById("footerInstagram");
  if (CONFIG.instagram) ig.href = CONFIG.instagram;
  else ig.closest("a") && (ig.hidden = true);

  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---------- النموذج ---------- */
function initForm() {
  const form = document.getElementById("requestForm");
  const thanks = document.getElementById("formThanks");

  const showThanks = () => {
    form.hidden = true;
    thanks.hidden = false;
    thanks.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const mailtoFallback = (data) => {
    const dict = CONTENT[lang];
    const body = Object.entries(dict._mailLabels)
      .map(([k, label]) => `${label}: ${data[k] || ""}`)
      .join("\n");
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(dict._mailSubject)}&body=${encodeURIComponent(body)}`;
    showThanks();
  };

  const sendToFirestore = async (data) => {
    const { projectId, apiKey, collection } = CONFIG.firebase;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}?key=${apiKey}`;
    const fields = {
      name:    { stringValue: data.name },
      contact: { stringValue: data.contact },
      space:   { stringValue: data.space || "" },
      vision:  { stringValue: data.vision || "" },
      lang:    { stringValue: lang },
      at:      { stringValue: new Date().toISOString() },
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // honeypot
    delete data._gotcha;

    const notify = (payload) => {
      if (!CONFIG.notifyEndpoint) return;
      // نوع المحتوى text/plain يتجنب فحص CORS المسبق — والسكربت يقرأ النص كما هو
      fetch(CONFIG.notifyEndpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...payload, lang }),
      }).catch(() => {});
    };

    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else if (CONFIG.firebase && CONFIG.firebase.apiKey) {
        await sendToFirestore(data);
      } else {
        throw new Error("no endpoint");
      }
      notify(data);
      showThanks();
    } catch {
      mailtoFallback(data);
    }
  });
}

/* ---------- الظهور عند التمرير ---------- */
let revealObserver = null;

function observeReveals(root = document) {
  if (!revealObserver) return;
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

function initReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return; // يبقى المحتوى ظاهرًا بلا حركة
  document.documentElement.classList.add("reveal-ready");
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  observeReveals();
}

/* ---------- تشغيل ---------- */
document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  applyLang();
});

applyConfig();
applyLang();
initForm();
initReveal();
