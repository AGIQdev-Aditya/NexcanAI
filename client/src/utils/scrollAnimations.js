/* ============================================================================
 * scrollAnimations.js — High-performance Spring & Scroll Physics (Nexcan AI Edition)
 * Zero external dependencies. Native requestAnimationFrame loop with Spring physics.
 * ========================================================================== */

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const smooth = (x) => x * x * (3 - 2 * x);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
export const seg = (p, a, b) => clamp((p - a) / (b - a));
export const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (r, s) => r ? r.querySelector(s) : null;
const $$ = (r, s) => r ? [...r.querySelectorAll(s)] : [];

// Damped spring: k = stiffness, d = damping
export class Spring {
  constructor(v = 0, k = 80, d = 11) {
    this.v = v;
    this.t = v;
    this.vel = 0;
    this.k = k;
    this.d = d;
  }
  step(dt) {
    this.vel += ((this.t - this.v) * this.k - this.vel * this.d) * dt;
    this.v += this.vel * dt;
    return this.v;
  }
}

// Shared frame loop
const loops = new Set();
let raf = 0, lastT = 0, scrollVel = 0, lastY = typeof window !== 'undefined' ? window.scrollY : 0;

function loop(t) {
  const dt = Math.min((t - lastT) / 1000 || 0.016, 1 / 30);
  lastT = t;
  const currY = typeof window !== 'undefined' ? window.scrollY : 0;
  scrollVel = lerp(scrollVel, (currY - lastY) / dt, 0.1);
  lastY = currY;
  loops.forEach((f) => {
    try { f(dt, t); } catch (e) { console.error('Animation frame error:', e); }
  });
  raf = loops.size ? requestAnimationFrame(loop) : 0;
}

export function onFrame(fn) {
  loops.add(fn);
  if (!raf && typeof window !== 'undefined') {
    lastT = performance.now();
    raf = requestAnimationFrame(loop);
  }
  return () => loops.delete(fn);
}

// Spring-smoothed section progress
export function track(el, cb, { mode = 'pass', k = 60, d = 11 } = {}) {
  if (!el) return () => {};
  const s = new Spring(0, k, d);
  return onFrame((dt) => {
    const r = el.getBoundingClientRect(), vh = window.innerHeight;
    if (mode === 'pass' && (r.bottom < -300 || r.top > vh + 300)) return;
    const raw = mode === 'pin' ? clamp(-r.top / Math.max(1, r.height - vh))
      : mode === 'leave' ? clamp(-r.top / r.height)
      : clamp((vh - r.top) / (vh + r.height));
    s.t = raw;
    cb(reduce ? raw : clamp(s.step(dt)), dt, raw);
  });
}

export function splitWords(el) {
  if (!el || !el.textContent) return [];
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  return words.map((w) => {
    const m = document.createElement('span'), i = document.createElement('span');
    m.className = 'w';
    i.textContent = w;
    m.appendChild(i);
    el.append(m, ' ');
    return i;
  });
}

// Text scramble: characters churn then settle left-to-right
export function scrambleTo(el, text, ms = 600) {
  if (!el) return;
  const pool = '0123456789ABCDEF#%&*<>[]{}', t0 = performance.now();
  (function f(now) {
    const k = clamp((now - t0) / ms);
    el.textContent = [...text].map((c, i) => (i / text.length < k ? c : c === ' ' ? ' ' : pool[(Math.random() * pool.length) | 0])).join('');
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}

const countText = (el, v, k, dec = 0) => {
  if (el) el.textContent = (v * smooth(clamp(k))).toFixed(dec);
};

/* ---------- 1. HERO: staged intro + scroll-away parallax ----------------- */
export function animHero(el) {
  const title = $(el, '[data-hero-title]'), cue = $(el, '[data-hero-cue]');
  if (!title) return () => {};
  try {
    splitWords(title).forEach((w, i) => (w.style.transitionDelay = `${0.1 + i * 0.05}s`));
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
  } catch (e) {}
  return track(el, (p) => {
    title.style.transform = `translate3d(0,${-p * 80}px,0)`;
    title.style.opacity = clamp(1 - p * 1.6);
    if (cue) cue.style.opacity = clamp(1 - p * 4);
  }, { mode: 'leave' });
}

/* ---------- 2. FEATURE BARS: Softmax probability distribution bars ------ */
export function animFeatures(el) {
  const items = $$(el, '[data-feature]');
  const off = items.length ? track(el, (p) => items.forEach((it) => {
    if (!it.dataset.beat) return;
    const [a, b] = it.dataset.beat.split(',').map(Number), k = clamp((p - a) / (b - a));
    const inn = smooth(clamp(k / 0.2)), out = smooth(clamp((1 - k) / 0.2)), v = Math.min(inn, out);
    it.style.opacity = v;
    it.style.transform = `translate3d(0,${(1 - inn) * 40 - (1 - out) * 40}px,0)`;
    $$(it, '[data-count]').forEach((n) => countText(n, +n.dataset.count, k / 0.5, +(n.dataset.dec || 0)));
  }), { mode: 'pass' }) : () => {};

  const bars = $$(el, '[data-bars] i');
  if (!bars.length) return off;

  const sp = bars.map(() => new Spring(0.3, 110, 13));
  const logits = bars.map((_, i) => Math.sin(i * 1.3) * 2 + Math.cos(i * 0.7) * 1.5);
  const setT = (T) => {
    const e = logits.map((l) => Math.exp(l / T)), m = Math.max(...e);
    e.forEach((v, i) => (sp[i].t = clamp(v / m, 0.05, 1)));
  };
  setT(0.10);

  const btns = $$(el, '[data-temp]');
  const handlers = [];
  btns.forEach((b) => {
    const h = () => {
      btns.forEach((x) => x.classList.toggle('is-active', x === b));
      setT(+b.dataset.temp);
    };
    b.addEventListener('click', h);
    handlers.push({ b, h });
  });

  const loopOff = onFrame((dt) => bars.forEach((b, i) => (b.style.transform = `scaleY(${sp[i].step(dt)})`)));
  return [off, loopOff, () => handlers.forEach(({ b, h }) => b.removeEventListener('click', h))];
}

/* ---------- 3. FLIP-TO-ENCRYPT: 3D card flip + cipher scramble ----------- */
export function animFlip(el) {
  const card = $(el, '[data-flip-card]'), txt = $(el, '[data-cipher]');
  if (!card || !txt) return () => {};
  const rot = new Spring(0, 70, 9);
  const msg = txt.dataset.msg || 'RAW_OPTICAL_FEED', cipher = btoa(unescape(encodeURIComponent(msg)));
  txt.textContent = msg;

  const btns = $$(el, '[data-mode]');
  const handlers = [];
  btns.forEach((b) => {
    const h = () => {
      const enc = b.dataset.mode === 'encode';
      rot.t = enc ? 180 : 0;
      setTimeout(() => scrambleTo(txt, enc ? cipher : msg, 500), 200);
    };
    b.addEventListener('click', h);
    handlers.push({ b, h });
  });

  const loopOff = onFrame((dt) => (card.style.transform = `rotateY(${rot.step(dt)}deg)`));
  return [loopOff, () => handlers.forEach(({ b, h }) => b.removeEventListener('click', h))];
}

/* ---------- 4. GRIP: gauge fill + texture shimmer cursor tracking -------- */
export function animGrip(el) {
  const g = $(el, '[data-gauge]'), n = $(el, '[data-friction]'), tex = $(el, '[data-texture]');
  if (!tex) return () => {};
  const mx = new Spring(0.5, 60, 10), my = new Spring(0.5, 60, 10);
  const moveHandler = (e) => {
    const r = tex.getBoundingClientRect();
    mx.t = (e.clientX - r.left) / r.width;
    my.t = (e.clientY - r.top) / r.height;
  };
  tex.addEventListener('pointermove', moveHandler);

  const a = g && n ? track(el, (p) => {
    const k = easeOut(seg(p, 0.1, 0.6));
    g.style.transform = `scaleX(${0.85 * k})`;
    countText(n, +n.dataset.friction, k, 2);
  }, { mode: 'pass' }) : () => {};

  const b = onFrame((dt) => {
    tex.style.setProperty('--mx', `${mx.step(dt) * 100}%`);
    tex.style.setProperty('--my', `${my.step(dt) * 100}%`);
  });

  return [a, b, () => tex.removeEventListener('pointermove', moveHandler)];
}

/* ---------- 5. COMPLIANCE METRICS: SVG ring draw + count-ups -------------- */
export function animEco(el) {
  const rings = $$(el, '[data-ring]'), nums = $$(el, '[data-count]');
  if (!rings.length) return () => {};
  rings.forEach((c) => {
    const rVal = c.r?.baseVal?.value || 46;
    const L = 2 * Math.PI * rVal;
    c.style.strokeDasharray = L;
    c.style.strokeDashoffset = L;
    c._L = L;
  });

  return track(el, (p) => {
    rings.forEach((c, i) => {
      const k = easeOut(seg(p, 0.05 + i * 0.1, 0.6 + i * 0.1));
      const val = parseFloat(c.dataset.value) || 0;
      const max = parseFloat(c.dataset.max) || 100;
      c.style.strokeDashoffset = c._L * (1 - (val / max) * k);
    });
    nums.forEach((n, i) => countText(n, +n.dataset.count, seg(p, 0.05 + i * 0.1, 0.6 + i * 0.1), +(n.dataset.dec || 0)));
  }, { mode: 'pass' });
}

/* ---------- 6. TESTIMONIALS: 3D perspective rail + card tilt ------------- */
export function animTestimonials(el) {
  const rail = $(el, '[data-rail]');
  if (!rail) return () => {};
  const cards = [...rail.children], rate = $(el, '[data-rating]');
  return track(el, (p) => {
    cards.forEach((c) => {
      const r = c.getBoundingClientRect(), d = clamp(((r.left + r.width / 2) - window.innerWidth / 2) / window.innerWidth, -1, 1);
      c.style.transform = `perspective(900px) rotateY(${-d * 18}deg) scale(${1 - Math.abs(d) * 0.08})`;
      c.style.opacity = 1 - Math.abs(d) * 0.4;
    });
    if (rate) countText(rate, +rate.dataset.rating, seg(p, 0, 0.2), 1);
  }, { mode: 'pass' });
}

/* ---------- 7. CLOSING: velocity-linked industrial marquee ticker -------- */
export function animClosing(el) {
  const trk = $(el, '[data-marquee] .track');
  if (!trk) return () => {};
  let x = 0;
  return onFrame((dt) => {
    x -= (35 + Math.abs(scrollVel) * 0.2) * dt;
    const half = trk.scrollWidth / 2;
    if (-x > half) x += half;
    trk.style.transform = `translate3d(${x}px,0,0)`;
  });
}

/* ---------- INIT ALL ------------------------------------------------------ */
const MAP = {
  hero: animHero,
  features: animFeatures,
  flip: animFlip,
  grip: animGrip,
  eco: animEco,
  testimonials: animTestimonials,
  closing: animClosing,
};

export function initAll(root = document) {
  if (!root) return () => {};
  const offs = [];
  $$(root, '[data-anim]').forEach((el) => {
    const f = MAP[el.dataset.anim];
    if (f) offs.push(f(el));
  });
  return () => offs.flat(Infinity).forEach((f) => typeof f === 'function' && f());
}
