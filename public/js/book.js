/* ============================================================
   رَوْق — حجز الاستشارات التصميمية
   الخطوة 1: الأساس. أنواع الاستشارات ورسومها في CONSULTATIONS،
   وكل ما قد يتغيّر لاحقًا في BOOK_CONFIG.
   التقويم والدفع يُوصَلان في الخطوتين 2 و3 عبر availabilityEndpoint/bookingEndpoint.
   ============================================================ */

const BOOK_CONFIG = {
  currency: "SAR",
  // نقاط اتصال الخادم (Apps Script) — تُملأ في الخطوة 2:
  availabilityEndpoint: "", // GET → يرجع المواعيد المتاحة من Google Calendar
  bookingEndpoint: "",      // POST → يُنشئ فاتورة Moyasar للموعد المختار ويرجع رابط الدفع
};

/* الاستشارة — الرسم يظهر للعميل (استثناء محدود من قاعدة «لا أسعار»).
   خدمة واحدة حاليًا؛ يمكن إضافة أنواع لاحقًا بإضافة عناصر هنا. */
const CONSULTATIONS = [
  {
    id: "consultation",
    fee: 500,
    durationMin: 60,
    ar: {
      name: "الاستشارة التصميمية",
      duration: "ساعة واحدة",
      brief: "جلسة تُقرأ فيها مساحتك وتطلّعك، وتُحسم ملامح الاتجاه — الدرجة والملمس والضوء. قرارات، لا قوائم.",
    },
    en: {
      name: "The Design Consultation",
      duration: "One hour",
      brief: "A sitting in which your space and aspiration are read, and the direction is settled — tone, texture, light. Decisions, not lists.",
    },
  },
];

const BOOK_CONTENT = {
  ar: {
    _title: "رَوْق — حجز استشارة",
    _desc: "احجز استشارة تصميمية مع رَوْق — دار تنسيق العيش.",
    title: "حجز استشارة",
    sub: "اختر الجلسة، ثم الموعد الذي يناسبك.",
    step_type: "الاستشارة",
    step_time: "الموعد",
    step_details: "بياناتك",
    fee_label: "الرسم",
    currency: "ريال سعودي",
    slots_soon: "المواعيد المتاحة ستُعرض هنا فور ربط التقويم.",
    f_name: "الاسم",
    f_contact: "وسيلة التواصل — جوال أو بريد",
    f_note: "نبذة عمّا يشغلك (اختياري)",
    cta: "المتابعة إلى الدفع",
    cta_soon: "الحجز والدفع — قيد الربط",
    assurance: "يُعالَج الدفع لدى مزوّد معتمد من البنك المركزي السعودي — لا تمرّ بيانات بطاقتك بموقع الدار.",
    footer_cr: "السجل التجاري",
  },
  en: {
    _title: "RAWQ — Book a Consultation",
    _desc: "Book a design consultation with RAWQ — The House of Curated Living.",
    title: "Book a Consultation",
    sub: "Choose the session, then a time that suits you.",
    step_type: "Session",
    step_time: "Time",
    step_details: "Your details",
    fee_label: "Fee",
    currency: "SAR",
    slots_soon: "Available times will appear here once the calendar is connected.",
    f_name: "Name",
    f_contact: "How to reach you — phone or email",
    f_note: "A word on what you have in mind (optional)",
    cta: "Continue to payment",
    cta_soon: "Booking & payment — being connected",
    assurance: "Payment is processed by a provider licensed by the Saudi Central Bank — your card details never touch the house's site.",
    footer_cr: "Commercial Registration",
  },
};

/* ============================================================
   المنطق
   ============================================================ */

let bookLang = (() => {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "ar") return q;
  return localStorage.getItem("rawq-lang") === "en" ? "en" : "ar";
})();

let selectedConsult = null;

const $b = (id) => document.getElementById(id);
const fmtNum = (n) => Number(n).toLocaleString("en-US");

function renderConsultations() {
  const grid = $b("consultList");
  const t = BOOK_CONTENT[bookLang];
  grid.innerHTML = CONSULTATIONS.map((c) => {
    const x = c[bookLang];
    const fee = c.fee > 0
      ? `<span class="num">${fmtNum(c.fee)}</span> <span class="consult__cur">${t.currency}</span>`
      : "—";
    return `
      <button type="button" class="consult" data-id="${c.id}" aria-pressed="false">
        <span class="consult__head">
          <span class="consult__name">${x.name}</span>
          <span class="consult__dur">${x.duration}</span>
        </span>
        <span class="consult__brief">${x.brief}</span>
        <span class="consult__fee"><span class="consult__fee-k">${t.fee_label}</span> ${fee}</span>
      </button>`;
  }).join("");

  grid.querySelectorAll(".consult").forEach((btn) => {
    btn.addEventListener("click", () => selectConsult(btn.dataset.id));
  });
}

function selectConsult(id, opts = {}) {
  selectedConsult = CONSULTATIONS.find((c) => c.id === id) || null;
  document.querySelectorAll(".consult").forEach((b) => {
    const on = b.dataset.id === id;
    b.classList.toggle("is-selected", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  // اكشف قسمَي الموعد والبيانات بعد الاختيار
  $b("stepTime").hidden = false;
  $b("stepDetails").hidden = false;
  if (opts.scroll !== false) $b("stepTime").scrollIntoView({ behavior: "smooth", block: "start" });
  renderSlots();
}

function renderSlots() {
  const wrap = $b("slots");
  const t = BOOK_CONTENT[bookLang];
  if (!BOOK_CONFIG.availabilityEndpoint) {
    // الخطوة 1: لا تقويم بعد — عنصر نائب أنيق
    wrap.innerHTML = `<p class="slots__soon">${t.slots_soon}</p>`;
    return;
  }
  // الخطوة 2 ستملأ هذا: جلب المواعيد من availabilityEndpoint وعرضها كأزرار.
}

function applyBookLang() {
  const t = BOOK_CONTENT[bookLang];
  document.documentElement.lang = bookLang;
  document.documentElement.dir = bookLang === "ar" ? "rtl" : "ltr";
  document.title = t._title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", t._desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (t[k] !== undefined) el.textContent = t[k];
  });

  const toggle = $b("langToggle");
  if (toggle) toggle.textContent = bookLang === "ar" ? "EN" : "عربي";
  localStorage.setItem("rawq-lang", bookLang);
  renderConsultations();
  // خدمة واحدة → اختيار تلقائي، فيظهر الموعد والبيانات مباشرة (بلا اختيار من عنصر واحد)
  if (CONSULTATIONS.length === 1) selectConsult(CONSULTATIONS[0].id, { scroll: false });
  else if (selectedConsult) selectConsult(selectedConsult.id, { scroll: false });
}

function initBookForm() {
  const form = $b("bookForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity() || !selectedConsult) return;
    // الخطوة 3: إرسال (الاستشارة + الموعد + البيانات) إلى bookingEndpoint،
    // الذي يُنشئ فاتورة Moyasar ويعيد رابط الدفع، ثم نوجّه العميل إليه.
    // مؤقتًا (الخطوة 1): لا ربط بعد.
    alert(BOOK_CONTENT[bookLang].cta_soon);
  });
}

const langBtn = $b("langToggle");
if (langBtn) langBtn.addEventListener("click", () => {
  bookLang = bookLang === "ar" ? "en" : "ar";
  applyBookLang();
});

applyBookLang();
initBookForm();
