// 数千万LPレベルのマイクロインタラクション集
// GSAP + Lenis + カスタムカーソル + マグネティックボタン + テキストSplit + 数値カウンター
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// ───────────────────────────────────────────────
// 1. Lenis Smooth Scroll
// ───────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ───────────────────────────────────────────────
// 2. Custom Cursor（カスタムカーソル）
// ───────────────────────────────────────────────
function initCustomCursor() {
  // モバイルは無効
  if (window.matchMedia("(hover: none)").matches) return;

  const cursor = document.createElement("div");
  cursor.id = "luxury-cursor";
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
  `;
  document.body.appendChild(cursor);

  const dot = cursor.querySelector(".cursor-dot") as HTMLElement;
  const ring = cursor.querySelector(".cursor-ring") as HTMLElement;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  const speed = 0.18;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05, overwrite: true });
  });

  // ring を遅延追従
  function animateRing() {
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // インタラクティブ要素にホバー時の拡大
  const interactiveSelectors = "a, button, [data-cursor='hover'], summary, input, textarea, select, label";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });

  // テキスト入力時は無効化
  document.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("focus", () => cursor.classList.add("is-text"));
    el.addEventListener("blur", () => cursor.classList.remove("is-text"));
  });
}

// ───────────────────────────────────────────────
// 3. Magnetic Buttons（カーソル吸着）
// ───────────────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
    const strength = Number(btn.dataset.magnetic) || 0.3;

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}

// ───────────────────────────────────────────────
// 4. Text Split Reveal（h1 / h2 を文字単位で出す）
// ───────────────────────────────────────────────
function splitText(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const chars: HTMLSpanElement[] = [];
  text.split("").forEach((c) => {
    const span = document.createElement("span");
    span.className = "split-char";
    span.textContent = c === " " ? " " : c;
    span.setAttribute("aria-hidden", "true");
    el.appendChild(span);
    chars.push(span);
  });
  return chars;
}

function initTextReveal() {
  document.querySelectorAll<HTMLElement>("[data-text-reveal]").forEach((el) => {
    const chars = splitText(el);
    gsap.from(chars, {
      yPercent: 110,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.025,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });
  });
}

// ───────────────────────────────────────────────
// 5. Number Counter（数値カウントアップ）
// ───────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
    const target = Number(el.dataset.counter) || 0;
    const decimals = Number(el.dataset.counterDecimals) || 0;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = obj.value.toFixed(decimals);
      },
    });
  });
}

// ───────────────────────────────────────────────
// 6. Image Reveal Mask（画像が左→右に解禁）
// ───────────────────────────────────────────────
function initImageReveal() {
  document.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (!img) return;
    gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(img, { scale: 1.15 });

    gsap.to(wrapper, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: wrapper, start: "top 75%", once: true },
    });
    gsap.to(img, {
      scale: 1,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: { trigger: wrapper, start: "top 75%", once: true },
    });
  });
}

// ───────────────────────────────────────────────
// 7. Hero Parallax（背景画像が遅く動く）
// ───────────────────────────────────────────────
function initHeroParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;
  const bg = hero.querySelector("picture img") as HTMLElement;
  if (!bg) return;

  gsap.to(bg, {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

// ───────────────────────────────────────────────
// 8. Section Reveal（既存 .reveal を GSAP化）
// ───────────────────────────────────────────────
function initSectionReveal() {
  document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });
}

// ───────────────────────────────────────────────
// 9. Card Tilt 3D（カードがマウス位置に応じて傾く）
// ───────────────────────────────────────────────
function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.5,
        ease: "power3.out",
        transformPerspective: 1000,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    });
  });
}

// ───────────────────────────────────────────────
// 10. Marquee Pause on Hover
// ───────────────────────────────────────────────
function initMarqueePause() {
  document.querySelectorAll<HTMLElement>(".marquee-track").forEach((track) => {
    track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
    track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
  });
}

// ───────────────────────────────────────────────
// Init all on DOM ready
// ───────────────────────────────────────────────
function init() {
  initCustomCursor();
  initMagneticButtons();
  initSectionReveal();
  initTextReveal();
  initCounters();
  initImageReveal();
  initHeroParallax();
  initCardTilt();
  initMarqueePause();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// 既存 .reveal を即可視化（IntersectionObserver の代わりに GSAP で制御）
document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
