// 軽量Reveal animation（CSS + IntersectionObserver のみ）
// GSAP / カスタムカーソル / Magnetic / Tilt 3D / Canvas粒子 はすべて撤去
// モダンミニマル方針（Aesop/Lemaire 系）に整合する控えめな fade-in だけ

const setup = () => {
  // smooth scroll for anchor links (handle both `#id` and `/base/#id` on same page)
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href*="#"]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;

    let hash = "";
    try {
      const url = new URL(href, window.location.href);
      // Different page → let browser handle normally
      if (url.pathname !== window.location.pathname) return;
      hash = url.hash;
    } catch {
      return;
    }

    if (!hash || hash === "#") return;
    const dest = document.querySelector(hash);
    if (!dest) return;

    e.preventDefault();
    const headerOffset = 64;
    const top = (dest as HTMLElement).getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
    // URL に #hash を残さない（同一ページ内ナビ用途）→ リロード時に途中表示しない
  });

  // reveal on scroll
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
} else {
  setup();
}
