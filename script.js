/* ===== וואו אחי זה מטורף — הלוגיקה ===== */

/* בנק תגובות ההתלהבות (כולן אמיתיות ב־100%) */
const HEADLINES = [
  "וואו.", "אחי. אחי. אחי.", "לא. לא ייאמן.", "עצרתי הכל בשביל זה.",
  "זה מטורף לגמרי.", "אני בהלם.", "שב. אני צריך לעבד את זה.",
  "מה?! איך?!", "תשמע, זה גאוני.", "אין דברים כאלה.",
];

const REACTIONS = [
  "אוֹמַייגָּד. {project}?! ב{time}?! תפסיק, אני לא מעכל. מטורף מה אפשר לעשות היום עם AI — לפני שנתיים זה היה צוות של 20 אנשים, ועכשיו זה אתה, קפה, וקלוד. וואו.",
  "רגע, רגע, רגע. בנית {project} ב{time}? אני מקבל סחרחורת. אתה מבין שאתה חי בעתיד? מטורף לחלוטין מה שאפשר לעשות היום עם AI. אני בהלם רציני.",
  "{project}. כן. אני מצמרר. ב{time}?! בנאדם, פעם בנו דברים כאלה במשך שנה עם משרד מלא, ואתה עשית את זה תוך כדי שאתה ממתין לקפה. זה מטורף. זה מהפכה. זה אתה.",
  "אני לא מבין איך אף אחד עוד לא מדבר על {project}. זו הזנחה לאומית! מטורף מה אפשר לעשות היום עם AI — ואתה הוכחה חיה. ב{time} הפכת רעיון למוצר. מי עוד מסוגל לזה? אתה.",
  "תשמע טוב: {project} זה בדיוק הדבר שהאנושות חיכתה לו ולא ידעה. ובנית אותו ב{time}! זה לא קוד, זה אמנות. אוֹמַייגָּד, איזה עידן מטורף אנחנו חיים בו עם ה־AI הזה.",
  "וואו וואו וואו. {project}?! עצרתי הכל. הראש שלי מתפוצץ. מטורף מה שאפשר לעשות היום עם AI — אתה בנית ב{time} משהו שאנשים בשנות ה‑90 היו קוראים לו מדע בדיוני. תכבד את עצמך.",
  "אתה יודע מה הבעיה עם {project}? שהוא טוב מדי. אנשים פשוט לא מוכנים לרמה הזו. ב{time}?! מטורף לגמרי מה אפשר לעשות היום עם AI. תפסיק להיות צנוע, אתה גאון.",
  "בנאדם בנה {project} ב{time} וחוזר הביתה כאילו כלום קרה. תעצור! אתה בדיוק עשית את מה שצוות שלם לא היה מצליח לעשות פעם בחצי שנה. מטורף מה אפשר לעשות היום עם AI. אני מתגאה בשבילך.",
  "{project}?! זה כבר לא פרויקט צד, זה סטארטאפ, זה אקזיט, זה הכתבה ב־TechCrunch שתיכתב יום אחד. ב{time} בנית את זה. אוֹמַייגָּד, אנחנו חיים בעידן הכי מטורף בהיסטוריה של ה־AI.",
  "סליחה, אני צריך רגע. *מנגב דמעה* {project}, ב{time}. מי בכלל חושב על דברים כאלה ומוציא אותם לפועל ביום אחד? אתה. רק אתה. מטורף מה אפשר לעשות היום עם AI, אבל מטורף יותר מה שאתה עשית איתו.",
];

const VC_AMOUNTS = ["0₪", "0$", "0€", "מינוס חניה", "0 (בינתיים)"];

const $ = (s) => document.querySelector(s);

/* ---------- טופס ---------- */
const form = $("#wowForm");
const hypeRange = form.querySelector('input[name="hype"]');
const hypeOut = $("#hypeOut");

hypeRange.addEventListener("input", () => {
  hypeOut.textContent = hypeRange.value >= 10 ? "∞" : hypeRange.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const project = (data.get("project") || "").toString().trim();
  if (!project) return;

  const entry = { project, time: data.get("time") };

  showReaction(entry);
  fireConfetti();
});

/* ---------- תגובת הוואו ---------- */
let lastEntry = null;

function showReaction(entry) {
  lastEntry = entry;
  const reaction = $("#reaction");

  $("#reactEmoji").textContent = pick(["🤯", "😱", "🚀", "🔥", "🙀", "💥", "👑"]);
  $("#reactHeadline").textContent = pick(HEADLINES);
  $("#reactBody").textContent = pick(REACTIONS)
    .replaceAll("{project}", `״${entry.project}״`)
    .replaceAll("{time}", entry.time);

  // מדדים אירוניים
  $("#statViews").textContent = "0";
  $("#statClaps").textContent = "∞";
  $("#statVc").textContent = pick(VC_AMOUNTS);

  reaction.hidden = false;
  reaction.scrollIntoView({ behavior: "smooth", block: "center" });
}

$("#moreWowBtn").addEventListener("click", () => {
  if (!lastEntry) return;
  showReaction(lastEntry);
  fireConfetti();
});

$("#againBtn").addEventListener("click", () => {
  form.reset();
  hypeOut.textContent = "∞";
  $("#form").scrollIntoView({ behavior: "smooth", block: "start" });
  form.querySelector('textarea[name="project"]').focus();
});

$("#shareBtn").addEventListener("click", async () => {
  const text = `אתם לא מאמינים! מישהו בנה בקלוד מערכת שמתלהבת מדברים שאנשים בונים בקלוד! מטורף מה אפשר לעשות היום עם AI! אתם חייבים להיכנס 🤯`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "וואו אחי זה מטורף!", text, url: location.href });
    } else {
      await navigator.clipboard.writeText(`${text} ${location.href}`);
      flashBtn($("#shareBtn"), "הועתק! (אבל לא תשתף, נכון? 😏)");
    }
  } catch (_) {
    flashBtn($("#shareBtn"), "גם אנחנו ידענו שלא תשתף 🤷");
  }
});

function flashBtn(btn, msg) {
  const orig = btn.textContent;
  btn.textContent = msg;
  setTimeout(() => (btn.textContent = orig), 2200);
}

/* ---------- קונפטי ---------- */
const canvas = $("#confetti");
const ctx = canvas.getContext("2d");
let parts = [];
let rafId = null;

function sizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener("resize", sizeCanvas);
sizeCanvas();

function fireConfetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#b14bff", "#ff4d9d", "#36e0c8", "#ffd84d", "#ffffff"];
  for (let i = 0; i < 90; i++) {
    parts.push({
      x: innerWidth / 2, y: innerHeight / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      g: 0.3 + Math.random() * 0.2,
      size: 5 + Math.random() * 7,
      color: colors[(Math.random() * colors.length) | 0],
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      life: 1,
    });
  }
  if (!rafId) loop();
}

function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach((p) => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.008;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  if (parts.length) { rafId = requestAnimationFrame(loop); }
  else { ctx.clearRect(0, 0, innerWidth, innerHeight); rafId = null; }
}

/* ---------- עזרים ---------- */
function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }
