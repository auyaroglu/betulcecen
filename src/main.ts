import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Lenis smooth scroll
   ============================================================ */
const lenis = new Lenis({
  duration: 0.85,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.05,
  touchMultiplier: 2.2,                                 // bumped for snappier touch
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

if (import.meta.env.DEV) {
  (window as any).lenis = lenis;
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

const ACTS: { name: string; selector: string }[] = [
  { name: "Uyanış", selector: '[data-act="1"]' },
  { name: "Atölye", selector: '[data-act="2"]' },
  { name: "İzMiras", selector: '[data-act="3"]' },
  { name: "Hikâyeler", selector: '[data-act="4"]' },
  { name: "Lezzet", selector: '[data-act="5"]' },
  { name: "Nefes", selector: '[data-act="6"]' },
  { name: "İletişim", selector: ".contact" },
];

/* ============================================================
   Loader
   ============================================================ */
function runLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = document.querySelector<HTMLElement>("[data-loader]")!;
    const count = document.querySelector<HTMLElement>("[data-loader-count]")!;
    const bar = document.querySelector<HTMLElement>("[data-loader-bar]");
    const obj = { v: 0 };
    lenis.stop();

    gsap.timeline()
      .to(obj, {
        v: 100,
        duration: 1.2,                                  // was 2.0 — quicker entry
        ease: "power2.inOut",
        onUpdate: () => {
          count.textContent = String(Math.floor(obj.v)).padStart(2, "0");
          if (bar) bar.style.width = `${obj.v}%`;
        },
      })
      .to(loader, {
        yPercent: -101,
        duration: 0.9,                                  // was 1.1 — snappier reveal
        ease: "expo.inOut",
        onComplete: () => {
          loader.style.display = "none";
          lenis.start();
          resolve();
        },
      });
  });
}

/* ============================================================
   Cursor
   ============================================================ */
function initCursor() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cursor = document.querySelector<HTMLElement>("[data-cursor]")!;
  const dot = document.querySelector<HTMLElement>("[data-cursor-dot]")!;
  const target = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos = { ...target };
  const dotPos = { ...target };
  addEventListener("pointermove", (e) => { target.x = e.clientX; target.y = e.clientY; });
  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    dotPos.x += (target.x - dotPos.x) * 0.55;
    dotPos.y += (target.y - dotPos.y) * 0.55;
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
  });
  document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });
}

/* ============================================================
   Smooth anchor scroll via Lenis
   ============================================================ */
function initNav() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    });
  });
}

/* ============================================================
   Nav progress — updates label/bar per act
   ============================================================ */
function initNavProgress() {
  const label = document.querySelector<HTMLElement>("[data-nav-label]");
  const num = document.querySelector<HTMLElement>("[data-nav-num]");
  const fill = document.querySelector<HTMLElement>("[data-progress-fill]");
  if (!label || !num || !fill) return;

  ACTS.forEach((act, i) => {
    const el = document.querySelector(act.selector);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el as HTMLElement,
      start: "top 60%",
      end: "bottom 40%",
      onToggle: ({ isActive }) => {
        if (!isActive) return;
        label.textContent = act.name;
        num.textContent = `${String(i + 1).padStart(2, "0")} / ${String(ACTS.length).padStart(2, "0")}`;
        gsap.to(fill, { scaleX: (i + 1) / ACTS.length, duration: 0.6, ease: "expo.out" });
      },
    });
  });
}

/* ============================================================
   EYE INTRO — non-scroll "welcome" animation that runs once on load.
   The eye scene itself lives inside .scenes; this only handles the
   initial title reveal so the page feels alive before user scrolls.
   ============================================================ */
function initEyeIntro() {
  const eyeAct = document.querySelector<HTMLElement>('[data-act="1"]');
  if (!eyeAct) return;
  const titleSplits = eyeAct.querySelectorAll<HTMLElement>(".eye__name [data-split]");
  const cue = eyeAct.querySelector<HTMLElement>("[data-eye-cue]");

  gsap.set(titleSplits, { yPercent: 110 });
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from(".eye__eyebrow", { y: 30, opacity: 0, duration: 0.9 }, 0.2)
    .to(titleSplits, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.3)
    .from(".eye__sub", { y: 24, opacity: 0, duration: 0.9 }, 0.9)
    .from(cue, { opacity: 0, y: 20, duration: 0.9 }, 1.1);
  // NOTE: no idle scale pulse on the eye image — it conflicts with the master
  // timeline's scale tween on the same target, leaving the eye permanently
  // zooming in/out on mobile after a scroll-up. The accent dot + cue line
  // already provide enough ambient motion.
}

/* ============================================================
   SCENES — single sticky stage with stacked portal acts.
   ONE master timeline scrubs through all scenes, cross-fading them:
   while scene N's portal collapses, scene N+1's portal opens at the
   same time. No dead-zone of black-on-black scroll.

   Layout: .scenes (600vh) > .scenes__stage (sticky 100vh) > N × .act-portal
   Master timeline range: [0 .. scenes_count + 0.5]
     position i      → scene i fully visible
     position i + 0.5 → scenes i & i+1 mid cross-fade
     position i + 1   → scene i+1 fully visible
   ============================================================ */
/* Helper to grab a scene's animatable parts in one shot */
function getSceneParts(act: HTMLElement) {
  const bg = act.querySelector<HTMLElement>("[data-portal-bg]")!;
  const content = act.querySelector<HTMLElement>("[data-portal-content]")!;
  return {
    bg,
    bgImgs: bg.querySelectorAll<HTMLElement>("img"),
    content,
    titles: content.querySelectorAll<HTMLElement>("[data-portal-title]"),
    words: content.querySelectorAll<HTMLElement>(".atelier__words .word"),
  };
}

/* ============================================================
   Per-transition visual vocabulary.
   Each transition writes BOTH the OUT of `cur` and the IN of `next`
   into the master timeline at position `t`, using `D` units of duration.
   Initial state for `next` is baked into the IN's fromTo (immediateRender)
   so no separate gsap.set is needed for non-eye scenes.

   Five distinct languages so every scene change feels different:
     1. portalPupil  — circular pupil expands       (eye → atelier)
     2. depthDive    — fall forward, emerge deep    (atelier → heritage)
     3. curtainRise  — vertical wipe from below     (heritage → books)
     4. splitCenter  — center splits open horizontal (books → lezzet)
     5. exhaleOut    — collapse to dot + spread out (lezzet → landscape)
   ============================================================ */
type SceneParts = ReturnType<typeof getSceneParts>;
type Transition = (
  master: gsap.core.Timeline,
  cur: SceneParts,
  next: SceneParts,
  t: number,
  D: number,
  curAct: HTMLElement,
) => void;

const transitionPortalPupil: Transition = (master, cur, next, t, D, curAct) => {
  const cue = curAct.querySelector<HTMLElement>("[data-eye-cue]");
  // OUT: eye flies forward + fades (no clip-path mutation on cur)
  master.to(cur.bgImgs, { scale: 4.5, ease: "none",         duration: D }, t)
        .to(cur.bg,     { opacity: 0, ease: "power1.inOut", duration: D * 0.85 }, t + D * 0.15)
        .to(cur.content,{ opacity: 0, y: -24, scale: 0.95,  ease: "power1.in", duration: D * 0.55 }, t);
  if (cue) master.to(cue, { opacity: 0, ease: "power1.in", duration: D * 0.4 }, t);
  // IN: atelier expands as a circle from center
  master.fromTo(next.bg,
    { opacity: 1, clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(160% at 50% 50%)", ease: "power2.out", duration: D }, t);
  master.fromTo(next.bgImgs,
    { scale: 1.22 },
    { scale: 1.0, ease: "power2.out", duration: D }, t);
};

const transitionDepthDive: Transition = (master, cur, next, t, D) => {
  // OUT: atelier pushes forward (we fall into it), fades to nothing.
  master.to(cur.bgImgs, { scale: 1.6, ease: "power1.in", duration: D }, t)
        .to(cur.bg,     { opacity: 0, ease: "power1.in", duration: D }, t)
        .to(cur.content,{ opacity: 0, scale: 1.3, ease: "power1.in", duration: D * 0.55 }, t);
  // IN: heritage emerges from depth via opacity + scale + filter (no clip-path).
  // bg starts at opacity 0 with a benign visible clip shape so later transitions
  // can animate its clip-path freely.
  master.fromTo(next.bg,
    { opacity: 0, clipPath: "inset(0% 0% 0% 0%)" },
    { opacity: 1, ease: "power2.out", duration: D * 0.55 }, t);
  master.fromTo(next.bgImgs,
    { scale: 0.55, filter: "blur(22px) brightness(0.4)" },
    { scale: 1.0, filter: "blur(0px) brightness(1)", ease: "power2.out", duration: D }, t);
};

const transitionCurtainRise: Transition = (master, cur, next, t, D) => {
  // OUT: heritage drifts up, then opacity-fades late. The rising books image
  // (next, with higher z-index) does most of the visual covering.
  master.to(cur.bgImgs,  { yPercent: -10, ease: "expo.inOut", duration: D }, t)
        .to(cur.bg,      { opacity: 0,    ease: "power1.in",  duration: D * 0.4 }, t + D * 0.6)
        .to(cur.content, { opacity: 0, y: -50, ease: "power2.in", duration: D * 0.5 }, t);
  // IN: books revealed from below (top inset shrinks 100% → 0%).
  master.fromTo(next.bg,
    { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", ease: "expo.inOut", duration: D }, t);
  master.fromTo(next.bgImgs,
    { yPercent: 10, scale: 1.12 },
    { yPercent: 0, scale: 1.0, ease: "expo.out", duration: D }, t);
};

const transitionSplitCenter: Transition = (master, cur, next, t, D) => {
  // OUT: books pushes outward in scale + late fade — covered by expanding lezzet.
  master.to(cur.bgImgs,  { scale: 1.18, ease: "power2.in", duration: D }, t)
        .to(cur.bg,      { opacity: 0, ease: "power1.in", duration: D * 0.4 }, t + D * 0.6)
        .to(cur.content, { opacity: 0, scale: 0.92, ease: "power2.in", duration: D * 0.55 }, t);
  // IN: lezzet reveals from a thin vertical line at center, expands outward.
  master.fromTo(next.bg,
    { opacity: 1, clipPath: "inset(0% 50% 0% 50%)" },
    { clipPath: "inset(0% 0% 0% 0%)", ease: "expo.inOut", duration: D }, t);
  master.fromTo(next.bgImgs,
    { scaleX: 0.6, scaleY: 1.0 },
    { scaleX: 1.0, scaleY: 1.0, ease: "expo.out", duration: D }, t);
};

const transitionExhaleOut: Transition = (master, cur, next, t, D) => {
  // OUT: lezzet collapses to a tiny dot via scale + late opacity fade
  // (no clip-path mutation on cur — keep it clean for any future use).
  master.to(cur.bgImgs,  { scale: 0.4, ease: "power3.in", duration: D }, t)
        .to(cur.bg,      { opacity: 0, ease: "power1.in", duration: D * 0.4 }, t + D * 0.6)
        .to(cur.content, { opacity: 0, scale: 0.55, ease: "power3.in", duration: D * 0.55 }, t);
  // IN: landscape spreads outward from same point — we exhale into the meadow.
  master.fromTo(next.bg,
    { opacity: 1, clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(160% at 50% 50%)", ease: "power2.out", duration: D }, t);
  master.fromTo(next.bgImgs,
    { scale: 1.3 },
    { scale: 1.0, ease: "power2.out", duration: D }, t);
};

const TRANSITIONS: Transition[] = [
  transitionPortalPupil,
  transitionDepthDive,
  transitionCurtainRise,
  transitionSplitCenter,
  transitionExhaleOut,
];

// Shared content reveal — used after every transition's IN.
function revealContent(master: gsap.core.Timeline, next: SceneParts, t: number, D: number) {
  master.fromTo(next.content,
    { opacity: 0, y: 40, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: D * 0.7 }, t + D * 0.18);
  if (next.titles.length) {
    master.fromTo(next.titles,
      { yPercent: 110 },
      { yPercent: 0, ease: "expo.out", stagger: 0.07, duration: D * 0.65 }, t + D * 0.24);
  }
  if (next.words.length) {
    master.fromTo(next.words,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: "expo.out", stagger: 0.05, duration: D * 0.7 }, t + D * 0.28);
  }
}

/* ============================================================
   SCENE ACTORS — per-scene foreground elements that animate
   INDEPENDENTLY of the bg, content text, and other transitions.
   Each actor has its own entrance choreography so adjacent scenes
   never feel like "the same animation with a different image."
   ============================================================ */
function actorIn(master: gsap.core.Timeline, nextAct: HTMLElement, t: number, D: number) {
  // PAPER CARD (Atelier) — slides in diagonally from right
  const paper = nextAct.querySelector<HTMLElement>("[data-paper]");
  if (paper) {
    master.fromTo(paper,
      { opacity: 0, x: 200, y: -50, rotation: -18 },
      { opacity: 1, x: 0, y: 0, rotation: -4, ease: "expo.out", duration: D * 0.95 }, t + D * 0.22);
  }
  // ORNAMENT LINE (Heritage) — vertical line that draws itself
  const ornament = nextAct.querySelector<HTMLElement>("[data-ornament]");
  if (ornament) {
    master.fromTo(ornament,
      { opacity: 0, scaleY: 0 },
      { opacity: 1, scaleY: 1, ease: "expo.out", duration: D * 0.7 }, t + D * 0.30);
  }
  // RIBBON (Books) — drops from the top with a bounce
  const ribbon = nextAct.querySelector<HTMLElement>("[data-ribbon]");
  if (ribbon) {
    master.fromTo(ribbon,
      { opacity: 0, y: -260, rotation: 2 },
      { opacity: 0.9, y: 0, rotation: 0, ease: "back.out(1.4)", duration: D * 1.0 }, t + D * 0.15);
  }

  // IMAGE ACTORS — each scene's hero illustration with its own motion
  const actorImgs = nextAct.querySelectorAll<HTMLElement>("[data-actor]");
  actorImgs.forEach((img) => {
    const c = img.classList;
    if (c.contains("actor-page")) {
      // page sketch hovers + rotates in from right
      master.fromTo(img,
        { opacity: 0, x: 180, y: -40, rotation: -10, scale: 0.85 },
        { opacity: 1, x: 0, y: 0, rotation: -3, scale: 1, ease: "expo.out", duration: D * 1.0 }, t + D * 0.08);
    } else if (c.contains("actor-stone")) {
      // stone fragment drops in with rotation
      master.fromTo(img,
        { opacity: 0, y: -180, rotation: -40, scale: 0.7 },
        { opacity: 1, y: 0, rotation: 0, scale: 1, ease: "expo.out", duration: D * 1.05 }, t + D * 0.12);
    } else if (c.contains("actor-book")) {
      // book slides in from left
      master.fromTo(img,
        { opacity: 0, x: -240, rotation: -15, scale: 0.85 },
        { opacity: 1, x: 0, rotation: 0, scale: 1, ease: "expo.out", duration: D * 1.0 }, t + D * 0.18);
    }
  });

  // SVG ACTOR — calligraphic brushstroke that DRAWS ITSELF
  const brush = nextAct.querySelector<SVGPathElement>("[data-brush] path");
  if (brush) {
    master.fromTo(brush,
      { opacity: 0, strokeDashoffset: 100 },
      { opacity: 1, strokeDashoffset: 0, ease: "power2.out", duration: D * 1.2 }, t + D * 0.10);
  }

  // SVG ACTOR — bird flies across the sky (wings flap via SMIL inside the SVG)
  const bird = nextAct.querySelector<HTMLElement>("[data-bird]");
  if (bird) {
    master.fromTo(bird,
      { opacity: 0 },
      { opacity: 1, ease: "none", duration: D * 0.2 }, t + D * 0.1);
    master.fromTo(bird,
      { x: 0, y: 0 },
      { x: "115vw", y: 80, ease: "none", duration: D * 1.5 }, t + D * 0.1);
  }
}

/* Quickly fade out every actor of the OUTgoing scene so they don't
   bleed visually into the next one. */
function actorOut(master: gsap.core.Timeline, curAct: HTMLElement, t: number, D: number) {
  const actors = curAct.querySelectorAll<HTMLElement>(
    "[data-actor], [data-paper], [data-ornament], [data-ribbon], [data-brush], [data-bird]"
  );
  if (actors.length) {
    master.to(actors, { opacity: 0, ease: "power1.in", duration: D * 0.45 }, t + D * 0.55);
  }
}

function initScenes() {
  const wrap = document.querySelector<HTMLElement>("[data-scenes]");
  if (!wrap) return;
  const acts = gsap.utils.toArray<HTMLElement>(".act-portal", wrap);
  if (!acts.length) return;

  // Stack order: later scenes sit on top
  acts.forEach((act, i) => { act.style.zIndex = String(10 + i); });

  // Only the EYE (first scene) needs an explicit initial state — it's visible
  // from page-load. Every later scene has its initial state baked into its
  // transition's fromTo (immediateRender). Less ceremony, less duplication.
  const firstAct = acts[0];
  if (firstAct?.classList.contains("act-eye")) {
    const p = getSceneParts(firstAct);
    gsap.set(p.bg, { clipPath: "circle(150% at 50% 50%)", opacity: 1 });
    gsap.set(p.bgImgs, { scale: 1.0 });
  }

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,                                       // softer, more languid follow
    },
  });

  // Pacing knobs:
  //   D = transition duration (timeline units)
  //   H = hold-to-read after each transition
  //   First transition starts at t=0 — first scroll = instant reaction.
  //   Smaller H means less "scrolling but nothing happens" dead time.
  const D = 1.2;     // longer, slower transitions
  const H = 0.2;     // shorter hold — every scroll moves something

  // Set all actors to hidden initially so they don't flash on page load
  acts.forEach((act) => {
    const actors = act.querySelectorAll<HTMLElement>(
      "[data-actor], [data-paper], [data-ornament], [data-ribbon], [data-brush], [data-bird]"
    );
    if (actors.length) gsap.set(actors, { opacity: 0 });
  });

  for (let i = 0; i < acts.length - 1; i++) {
    const curAct = acts[i];
    const nextAct = acts[i + 1];
    const cur = getSceneParts(curAct);
    const next = getSceneParts(nextAct);
    const t = i * (D + H);
    const fn = TRANSITIONS[i] ?? transitionPortalPupil;
    fn(master, cur, next, t, D, curAct);
    revealContent(master, next, t, D);
    actorIn(master, nextAct, t, D);
    actorOut(master, curAct, t, D);
  }
}

/* ============================================================
   Contact — big char reveal
   ============================================================ */
function initContactBig() {
  const splits = gsap.utils.toArray<HTMLElement>(".contact__big [data-split]");
  splits.forEach((el) => {
    if (el.dataset.splitReady === "1") return;
    el.dataset.splitReady = "1";
    const sp = new SplitType(el, { types: "chars" });
    if (!sp.chars) return;
    gsap.set(sp.chars, { yPercent: 110 });
    gsap.to(sp.chars, {
      yPercent: 0,
      stagger: 0.035,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".contact__big", start: "top 85%" },
    });
  });
}

/* ============================================================
   Boot
   ============================================================ */
async function boot() {
  initCursor();
  initNav();

  await (document as any).fonts?.ready?.catch?.(() => {});

  initContactBig();
  initNavProgress();

  initEyeIntro();
  initScenes();

  await runLoader();

  ScrollTrigger.refresh();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

boot();

addEventListener("load", () => ScrollTrigger.refresh());
