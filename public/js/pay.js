/* ============================================================
   رَوْق — منطق صفحة التسوية
   يُفعَّل الدفع بوضع publishableKey بعد فتح حساب التاجر في Moyasar.
   الرابط الذي تُرسله الدار للعميل:
   https://rawq.art/pay?type=deposit|project&ref=NRJ-01&amount=3000
   ============================================================ */

const PAY_CONFIG = {
  publishableKey: "pk_live_tgJRMBK3YQPNGa9YvNRwT5fKsuPRw5ELLrfUvwYd", // مفتاح Moyasar العلني (آمن في الواجهة)
  currency: "SAR",
  minAmount: 100,                  // أدنى مبلغ مقبول بالريال
  maxAmount: 500000,               // أعلى مبلغ مقبول بالريال
  moyasarVersion: "1.14.0",
  types: {
    deposit: "عربون استشارة — جلسة لوحة الانتقاء",
    project: "دفعة مشروع",
  },
};

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);

function showNotice(text, paid = false) {
  $("payNotice").hidden = false;
  $("noticeText").textContent = text;
  if (paid) $("payNotice").classList.add("is-paid");
}

function sanitizeRef(v) {
  return String(v || "").replace(/[^\w\-.]/g, "").slice(0, 40);
}

function init() {
  // عودة من البوابة بعد محاولة دفع
  if (params.has("status")) {
    const ok = params.get("status") === "paid";
    const ref = sanitizeRef(params.get("ref"));
    showNotice(
      ok
        ? "تمت التسوية. وصلنا إشعارها، وستصلك رسالة تأكيد من الدار." + (ref ? " — المرجع: " + ref : "")
        : "لم تكتمل العملية. يمكنك إعادة المحاولة من الرابط نفسه، أو مراسلتنا.",
      ok
    );
    return;
  }

  const type = params.get("type");
  const ref = sanitizeRef(params.get("ref"));
  const amount = Number(params.get("amount"));

  const valid =
    PAY_CONFIG.types[type] &&
    Number.isFinite(amount) &&
    amount >= PAY_CONFIG.minAmount &&
    amount <= PAY_CONFIG.maxAmount;

  if (!valid) {
    showNotice("التسوية تتم برابط خاص تُرسله الدار. إن وصلك هذا الرابط ناقصًا، راسلنا.");
    return;
  }

  // ملخص الدفعة
  $("paySummary").hidden = false;
  $("sType").textContent = PAY_CONFIG.types[type];
  $("sRef").textContent = ref || "—";
  $("sAmount").textContent = amount.toLocaleString("en-US");

  if (!PAY_CONFIG.publishableKey) {
    showNotice("بوابة الدفع قيد التفعيل. للتسوية المباشرة راسلنا وسنوافيك بالتفاصيل.");
    return;
  }

  // تحميل نموذج Moyasar المستضاف
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `https://cdn.moyasar.com/mpf/${PAY_CONFIG.moyasarVersion}/moyasar.css`;
  document.head.appendChild(css);

  const js = document.createElement("script");
  js.src = `https://cdn.moyasar.com/mpf/${PAY_CONFIG.moyasarVersion}/moyasar.js`;
  js.onload = () => {
    $("payForm").hidden = false;
    const cb = new URL(location.origin + "/pay");
    cb.searchParams.set("ref", ref);
    Moyasar.init({
      element: ".mysr-form",
      amount: Math.round(amount * 100), // بالهللات
      currency: PAY_CONFIG.currency,
      description: `RAWQ ${type === "deposit" ? "deposit" : "project"}${ref ? " | " + ref : ""}`,
      publishable_api_key: PAY_CONFIG.publishableKey,
      callback_url: cb.toString(),
      // creditcard يشمل مدى وVisa/MasterCard؛ applepay يظهر على Safari/iPhone تلقائيًا.
      // ملاحظة: Apple Pay على الصفحة المخصّصة يتطلب تسجيل نطاق rawq.art في Moyasar → Apple Pay Domains.
      methods: ["creditcard", "applepay"],
      metadata: { ref: ref, type: type },
    });
  };
  js.onerror = () => showNotice("تعذّر تحميل بوابة الدفع. أعد المحاولة، أو راسلنا.");
  document.head.appendChild(js);
}

init();
