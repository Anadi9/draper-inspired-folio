import { gsap } from 'gsap';

// GSAP Animation Presets
export const gsapAnimations = {
  // Fade animations
  fadeIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
    );
  },

  fadeInUp: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration, delay, ease: "back.out(1.7)" }
    );
  },

  fadeInDown: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration, delay, ease: "back.out(1.7)" }
    );
  },

  // Slide animations
  slideInLeft: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, x: -100, rotationY: -30 },
      { opacity: 1, x: 0, rotationY: 0, duration, delay, ease: "power2.out" }
    );
  },

  slideInRight: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, x: 100, rotationY: 30 },
      { opacity: 1, x: 0, rotationY: 0, duration, delay, ease: "power2.out" }
    );
  },

  // Scale animations
  scaleIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.3, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration, delay, ease: "back.out(1.7)" }
    );
  },

  scaleOut: (element: Element, duration = 0.6, delay = 0) => {
    return gsap.to(element, {
      opacity: 0, scale: 0.3, rotation: 10, duration, delay, ease: "power2.in"
    });
  },

  // Bounce animations
  bounceIn: (element: Element, duration = 1, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 100, scale: 0.7 },
      { 
        opacity: 1, y: 0, scale: 1, duration, delay, 
        ease: "bounce.out",
        onUpdate: function() {
          if (this.progress() > 0.8) {
            gsap.to(element, { scale: 1, duration: 0.2 });
          }
        }
      }
    );
  },

  // Rotate animations
  rotateIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, rotation: -180, scale: 0.5 },
      { opacity: 1, rotation: 0, scale: 1, duration, delay, ease: "back.out(1.7)" }
    );
  },

  // Flip animations
  flipIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, rotationY: -90, scale: 0.8 },
      { opacity: 1, rotationY: 0, scale: 1, duration, delay, ease: "back.out(1.7)" }
    );
  },

  // Elastic animations
  elasticIn: (element: Element, duration = 1.2, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.1, rotation: -30 },
      { opacity: 1, scale: 1, rotation: 0, duration, delay, ease: "elastic.out(1, 0.3)" }
    );
  },

  // Wave animations
  waveIn: (element: Element, duration = 1, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 100, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { 
        opacity: 1, y: 0, 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
        duration, delay, ease: "power2.out" 
      }
    );
  },

  // Morph animations
  morphIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.5, borderRadius: "50%", filter: "blur(10px)" },
      { 
        opacity: 1, scale: 1, borderRadius: "0.75rem", filter: "blur(0px)", 
        duration, delay, ease: "power2.out" 
      }
    );
  },

  // Pulse animations
  pulseIn: (element: Element, duration = 1, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8, boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7)" },
      { 
        opacity: 1, scale: 1, boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)", 
        duration, delay, ease: "power2.out",
        onUpdate: function() {
          if (this.progress() > 0.5) {
            gsap.to(element, { 
              boxShadow: "0 0 0 20px rgba(59, 130, 246, 0)", 
              duration: 0.3 
            });
          }
        }
      }
    );
  },

  // Swirl animations
  swirlIn: (element: Element, duration = 1, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, rotation: -360, scale: 0.1, y: 100, filter: "blur(20px)" },
      { 
        opacity: 1, rotation: 0, scale: 1, y: 0, filter: "blur(0px)", 
        duration, delay, ease: "back.out(1.7)" 
      }
    );
  },

  // Matrix animations
  matrixIn: (element: Element, duration = 1, delay = 0) => {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        transform: "matrix(0.5, 0.5, -0.5, 0.5, 50, 50)", 
        filter: "hue-rotate(180deg)" 
      },
      { 
        opacity: 1, 
        transform: "matrix(1, 0, 0, 1, 0, 0)", 
        filter: "hue-rotate(0deg)", 
        duration, delay, ease: "power2.out" 
      }
    );
  },

  // Zoom animations
  zoomIn: (element: Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.1, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration, delay, ease: "back.out(1.7)" }
    );
  },

  // Stagger animations for multiple elements
  staggerFadeIn: (elements: Element[], stagger = 0.1, duration = 0.8, delay = 0) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, delay, stagger, ease: "power2.out" }
    );
  },

  staggerScaleIn: (elements: Element[], stagger = 0.1, duration = 0.8, delay = 0) => {
    return gsap.fromTo(elements,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration, delay, stagger, ease: "back.out(1.7)" }
    );
  },

  // Timeline animations
  createTimeline: () => {
    return gsap.timeline();
  },

  // Exit animations
  fadeOut: (element: Element, duration = 0.6, delay = 0) => {
    return gsap.to(element, {
      opacity: 0, y: -30, duration, delay, ease: "power2.in"
    });
  },

  slideOutLeft: (element: Element, duration = 0.6, delay = 0) => {
    return gsap.to(element, {
      opacity: 0, x: -100, rotationY: 30, duration, delay, ease: "power2.in"
    });
  },

  slideOutRight: (element: Element, duration = 0.6, delay = 0) => {
    return gsap.to(element, {
      opacity: 0, x: 100, rotationY: -30, duration, delay, ease: "power2.in"
    });
  },

  // Special effects
  glowPulse: (element: Element, duration = 3) => {
    return gsap.to(element, {
      boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
      duration: duration / 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  },

  float: (element: Element, duration = 6) => {
    return gsap.to(element, {
      y: -10,
      duration: duration / 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  },

  // Text animations
  textReveal: (element: Element, duration = 1, delay = 0) => {
    const text = element.textContent || "";
    element.textContent = "";
    
    const chars = text.split("").map(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      element.appendChild(span);
      return span;
    });

    return gsap.to(chars, {
      opacity: 1,
      duration: duration / chars.length,
      stagger: 0.05,
      delay,
      ease: "power2.out"
    });
  },

  // Parallax effect
  parallax: (element: Element, speed = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
};

// Utility functions
export const gsapUtils = {
  // Kill all animations on element
  killAll: (element: Element) => {
    gsap.killTweensOf(element);
  },

  // Pause all animations
  pauseAll: () => {
    gsap.globalTimeline.pause();
  },

  // Resume all animations
  resumeAll: () => {
    gsap.globalTimeline.resume();
  },

  // Set default ease
  setDefaultEase: (ease: string) => {
    gsap.defaults.ease = ease;
  },

  // Create a smooth scroll effect
  smoothScroll: (target: string, duration = 1) => {
    return gsap.to(window, {
      duration,
      scrollTo: target,
      ease: "power2.inOut"
    });
  }
};

// Animation presets for common use cases
export const animationPresets = {
  // Hero section animations
  hero: {
    title: (element: Element) => gsapAnimations.fadeInUp(element, 1, 0.2),
    subtitle: (element: Element) => gsapAnimations.fadeInUp(element, 0.8, 0.4),
    cta: (element: Element) => gsapAnimations.scaleIn(element, 0.8, 0.6),
    background: (element: Element) => gsapAnimations.fadeIn(element, 1.5, 0)
  },

  // Card animations
  card: {
    in: (element: Element) => gsapAnimations.scaleIn(element, 0.6, 0),
    out: (element: Element) => gsapAnimations.scaleOut(element, 0.4, 0),
    hover: (element: Element) => gsap.to(element, { scale: 1.05, duration: 0.3, ease: "power2.out" }),
    unhover: (element: Element) => gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" })
  },

  // Navigation animations
  nav: {
    item: (element: Element, index: number) => gsapAnimations.fadeInUp(element, 0.6, index * 0.1),
    active: (element: Element) => gsap.to(element, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" }),
    inactive: (element: Element) => gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" })
  },

  // Section transitions
  section: {
    in: (element: Element) => gsapAnimations.fadeInUp(element, 1, 0),
    out: (element: Element) => gsapAnimations.fadeOut(element, 0.6, 0),
    slideIn: (element: Element) => gsapAnimations.slideInRight(element, 1, 0),
    slideOut: (element: Element) => gsapAnimations.slideOutLeft(element, 0.6, 0)
  }
}; 