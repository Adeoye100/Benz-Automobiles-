// animations.js - GSAP and custom animations

document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if GSAP is available
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initHeroAnimations();
    initModelCardAnimations();
    initScrollAnimations();
    initPageTransitionAnimations();
  }
});

// Hero section animations
function initHeroAnimations() {
  const heroTitleLines = gsap.utils.toArray(".hero-title span");

  gsap.from(heroTitleLines, {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2,
  });

  gsap.from(".hero-subtitle", {
    duration: 1,
    opacity: 0,
    delay: 0.8,
    ease: "sine.inOut",
  });

  gsap.from(".hero-cta", {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 1.2,
    ease: "back.out(1.7)",
  });
}

// Model card hover animations
function initModelCardAnimations() {
  const modelCards = gsap.utils.toArray(".model-card");

  modelCards.forEach((card) => {
    const img = card.querySelector(".model-image img");
    const info = card.querySelector(".model-info");

    // Set initial state
    gsap.set(img, { scale: 1 });
    gsap.set(info, { y: 0 });

    // Hover animation
    card.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(info, {
        y: -10,
        duration: 0.3,
        ease: "sine.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(info, {
        y: 0,
        duration: 0.3,
        ease: "sine.out",
      });
    });
  });
}

// Scroll-triggered animations
function initScrollAnimations() {
  // Animate on scroll elements
  gsap.utils.toArray(".animate-on-scroll").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  });

  // Parallax sections
  gsap.utils.toArray(".parallax-section").forEach((section) => {
    gsap.fromTo(
      section,
      { backgroundPosition: "50% 0%" },
      {
        backgroundPosition: "50% 20%",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      }
    );
  });

  // Timeline animations
  if (document.querySelector(".timeline-item")) {
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    });
  }
}

// Page transition animations
function initPageTransitionAnimations() {
  // Before page unload
  window.addEventListener("beforeunload", () => {
    gsap.to("body", {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  });

  // On page load
  gsap.from("body", {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in",
  });

  // Content fade in
  gsap.from("main", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out",
  });
}
