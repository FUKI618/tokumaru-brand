// 軽量Canvas粒子エフェクト：シャンパンゴールドの粉が舞う
// Three.js は重いため Canvas 2D API で自前実装
// モバイルでは粒子数削減、prefers-reduced-motion で完全停止

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: number;
  flicker: number;
}

function initLuxuryParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.getElementById("hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.id = "luxury-particles";
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;mix-blend-mode:screen;";
  // 装飾SVGの後・コンテンツの前に挿入
  hero.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  // モバイル判定で粒子数調整
  const isMobile = window.innerWidth < 768;
  const baseCount = isMobile ? 35 : 80;
  let particles: Particle[] = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = hero!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx!.scale(dpr, dpr);
  }

  function spawn(): Particle {
    const rect = hero!.getBoundingClientRect();
    return {
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05, // 上方向にゆっくり
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      hue: 38 + Math.random() * 12, // ゴールド系の色相
      flicker: Math.random() * 0.02 + 0.005,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: baseCount }, () => spawn());
  }

  let frame = 0;
  function loop() {
    if (!ctx || !canvas) return;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      // 動き
      p.x += p.vx;
      p.y += p.vy;
      // 微細な揺らぎ（風）
      p.vx += (Math.random() - 0.5) * 0.005;
      p.vy += (Math.random() - 0.5) * 0.003;
      p.vx = Math.max(-0.4, Math.min(0.4, p.vx));
      p.vy = Math.max(-0.6, Math.min(0.1, p.vy));

      // フリッカー（光のゆらぎ）
      p.alpha += (Math.random() - 0.5) * p.flicker;
      p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

      // 画面外なら下から再生成
      if (p.y < -10 || p.x < -10 || p.x > w + 10) {
        const reset = spawn();
        p.x = reset.x;
        p.y = h + 10;
        p.vx = reset.vx;
        p.vy = reset.vy;
        p.r = reset.r;
        p.alpha = reset.alpha;
      }

      // 描画（ぼやけたゴールドの点）
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      gradient.addColorStop(0, `hsla(${p.hue}, 80%, 78%, ${p.alpha})`);
      gradient.addColorStop(0.4, `hsla(${p.hue}, 80%, 70%, ${p.alpha * 0.4})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();

      // 中心の光点
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, 88%, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    frame++;
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    init();
  });

  init();
  loop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLuxuryParticles);
} else {
  initLuxuryParticles();
}
