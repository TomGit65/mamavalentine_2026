// ===== Password gate =====
const PASSWORD = "244225";
const gate = document.getElementById("gate");
const page = document.getElementById("page");
const pw = document.getElementById("pw");
const unlock = document.getElementById("unlock");
const err = document.getElementById("err");
const gateCard = document.getElementById("gateCard");

// Bears sad mode elements
const mouthHappy = document.getElementById("mouthHappy");
const mouthSad = document.getElementById("mouthSad");
const tear = document.getElementById("tear");
const scene = document.getElementById("scene");

function setSad(on) {
  scene.classList.toggle("sad", on);
  if (on) {
    mouthHappy.style.display = "none";
    mouthSad.style.display = "block";
    tear.style.display = "block";
  } else {
    mouthHappy.style.display = "block";
    mouthSad.style.display = "none";
    tear.style.display = "none";
  }
}

function unlockPage() {
  gate.style.display = "none";
  page.setAttribute("aria-hidden", "false");
}

function fail() {
  err.textContent = "Wrong password 💔";
  gateCard.classList.remove("shake");
  void gateCard.offsetWidth;
  gateCard.classList.add("shake");
  pw.value = "";
  pw.focus();
}

unlock.addEventListener("click", () => {
  if ((pw.value || "").trim() === PASSWORD) unlockPage();
  else fail();
});

pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    unlock.click();
  }
});

setTimeout(() => pw.focus(), 120);

// ===== Emoji rain (hearts -> cry after 3 NO clicks) =====
const rain = document.getElementById("rain");
let rainMode = "hearts"; // "hearts" | "cry"
const HEARTS = ["💗", "💖", "💞", "💕", "💘"];
const CRY = ["😭", "😭", "😭"];

function spawnDrop() {
  const d = document.createElement("div");
  d.className = "drop";

  const emoji =
    rainMode === "cry"
      ? CRY[Math.floor(Math.random() * CRY.length)]
      : HEARTS[Math.floor(Math.random() * HEARTS.length)];

  d.textContent = emoji;
  d.style.left = Math.random() * 100 + "vw";
  d.style.fontSize = 14 + Math.random() * 22 + "px";
  const dur = 3.8 + Math.random() * 3.8;
  d.style.animationDuration = dur + "s";
  d.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);

  rain.appendChild(d);
  setTimeout(() => d.remove(), (dur + 0.5) * 1000);
}
setInterval(spawnDrop, 260);

// ===== Random popups (images + extra NO buttons) =====
const chaos = document.getElementById("chaos");
const hint = document.getElementById("hint");
const noMain = document.getElementById("noMain");

// ✅ EXACT filenames from your GitHub repo
const sadImages = [
  "sadcat.jpeg",
  "sad-guy-crying-guy.gif",
  "sorry_cat.jpg",
  "sadsad.jpeg",
  "sadman.jpeg",
  "sad-man-tik-tok-meme.gif",
  "hang.jpeg",
  "frog.jpeg",
];

const noMessages = [
  "No",
  "Are you sure? 🥺",
  "Pleaseee 😭",
  "Don’t do this 💔",
  "Last chance… 🥹",
  "Okay okay 😔",
];

let noCount = 0;

// keep within screen
function randPos(elW, elH) {
  const pad = 10;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = pad + Math.random() * Math.max(pad, w - elW - pad);
  const y = pad + Math.random() * Math.max(pad, h - elH - pad);
  return { x, y };
}

function popImage() {
  const img = document.createElement("img");
  img.className = "pop";
  img.alt = "";

  const src = sadImages[Math.floor(Math.random() * sadImages.length)];
  img.src = src;

  // place immediately (so cached loads still show correctly)
  const firstPos = randPos(170, 170);
  img.style.left = firstPos.x + "px";
  img.style.top = firstPos.y + "px";

  chaos.appendChild(img);

  // adjust after load (real size)
  img.addEventListener("load", () => {
    const rect = img.getBoundingClientRect();
    const w = rect.width || 170;
    const h = rect.height || 170;
    const { x, y } = randPos(w, h);
    img.style.left = x + "px";
    img.style.top = y + "px";
  });

  // if missing file, remove it (prevents “invisible” items)
  img.addEventListener("error", () => {
    console.log("Image not found:", src);
    img.remove();
  });

  setTimeout(() => img.remove(), 8000);
}

function popNoButton() {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "pop no-btn";
  b.textContent = "NO";
  chaos.appendChild(b);

  const { x, y } = randPos(120, 50);
  b.style.left = x + "px";
  b.style.top = y + "px";

  // make it clickable
  b.style.pointerEvents = "auto";

  // tap any spawned NO advances the chain
  b.addEventListener("click", () => advanceNo());

  setTimeout(() => b.remove(), 9000);
}

function growYes(level) {
  const yesBtn = document.querySelector(".yes");
  const l = Math.min(8, level);
  yesBtn.style.minWidth = 140 + l * 26 + "px";
  yesBtn.style.fontSize = 16 + l * 2 + "px";
  yesBtn.style.padding = 12 + l * 3 + "px " + (18 + l * 3) + "px";
}

// ===== NO ESCAPE logic (ONLY AFTER CLICK) =====
function moveNoMain(mode = "random") {
  // ensure it stays tappable on phones
  noMain.style.minWidth = "140px";
  noMain.style.minHeight = "48px";

  // make it free-floating
  noMain.style.position = "fixed";
  noMain.style.zIndex = "9999";

  const w = noMain.getBoundingClientRect().width || 140;
  const h = noMain.getBoundingClientRect().height || 48;

  let x, y;

  if (mode === "corner") {
    const corners = [
      { x: 10, y: 10 },
      { x: window.innerWidth - w - 10, y: 10 },
      { x: 10, y: window.innerHeight - h - 10 },
      { x: window.innerWidth - w - 10, y: window.innerHeight - h - 10 },
    ];
    const c = corners[Math.floor(Math.random() * corners.length)];
    x = c.x;
    y = c.y;
  } else {
    const pos = randPos(w, h);
    x = pos.x;
    y = pos.y;
  }

  noMain.style.left = x + "px";
  noMain.style.top = y + "px";
}

function maybeMultiplyNo() {
  // after each click, spawn extra NO buttons sometimes
  const chance = Math.min(0.75, 0.25 + noCount * 0.08);
  if (Math.random() < chance) popNoButton();
  if (noCount >= 4 && Math.random() < 0.35) popNoButton();
}

function advanceNo() {
  noCount++;
  setSad(true);

  hint.textContent = noMessages[noCount % noMessages.length];

  // after 3 NO clicks -> cry rain
  if (noCount >= 3) rainMode = "cry";

  // ✅ random sad images after each NO click
  popImage();
  if (noCount >= 2) popImage(); // from 2nd click onward, show 2 images

  // ✅ move the main NO away AFTER clicking only
  const mode = noCount >= 3 && Math.random() < 0.45 ? "corner" : "random";
  moveNoMain(mode);

  // multiply NO buttons
  maybeMultiplyNo();

  // grow yes
  growYes(noCount);
}

// ✅ NO button works normally until clicked
noMain.addEventListener("click", () => {
  advanceNo();
});

// keep it inside screen on resize (only matters after it starts moving)
window.addEventListener("resize", () => {
  if (noCount >= 1) moveNoMain("random");
});
