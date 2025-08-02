import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { gsapAnimations, animationPresets } from '@/lib/gsap-animations';

interface UseGSAPOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}

export const useGSAP = (options: UseGSAPOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize GSAP animations
  const initAnimation = useCallback((animationType: keyof typeof gsapAnimations, delay = 0) => {
    if (!elementRef.current) return;

    // Kill any existing animations
    gsap.killTweensOf(elementRef.current);

    const animation = gsapAnimations[animationType];
    if (animation) {
      animationRef.current = animation(elementRef.current, undefined, delay);
    }
  }, []);

  // Stagger animations for multiple children
  const initStaggerAnimation = useCallback((
    animationType: 'staggerFadeIn' | 'staggerScaleIn',
    stagger = 0.1,
    delay = 0
  ) => {
    if (!elementRef.current) return;

    const children = Array.from(elementRef.current.children);
    if (children.length === 0) return;

    gsap.killTweensOf(children);

    const animation = gsapAnimations[animationType];
    if (animation) {
      animationRef.current = animation(children, stagger, undefined, delay);
    }
  }, []);

  // Timeline animations
  const createTimeline = useCallback(() => {
    animationRef.current = gsap.timeline();
    return animationRef.current;
  }, []);

  // Preset animations
  const playPreset = useCallback((presetType: keyof typeof animationPresets, presetName: string) => {
    if (!elementRef.current) return;

    const preset = animationPresets[presetType]?.[presetName as keyof typeof animationPresets[typeof presetType]];
    if (preset) {
      preset(elementRef.current);
    }
  }, []);

  // Scroll-triggered animations
  const initScrollAnimation = useCallback((
    animationType: keyof typeof gsapAnimations,
    scrollOptions: UseGSAPOptions = {}
  ) => {
    if (!elementRef.current) return;

    const {
      trigger = elementRef.current,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      markers = false
    } = scrollOptions;

    const animation = gsapAnimations[animationType];
    if (animation) {
      gsap.fromTo(elementRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
            markers
          }
        }
      );
    }
  }, []);

  // Hover animations
  const initHoverAnimation = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const hoverAnimation = gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      paused: true
    });

    const unhoverAnimation = gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      paused: true
    });

    element.addEventListener('mouseenter', () => hoverAnimation.play());
    element.addEventListener('mouseleave', () => unhoverAnimation.play());

    return () => {
      hoverAnimation.kill();
      unhoverAnimation.kill();
    };
  }, []);

  // Cleanup animations
  const cleanup = useCallback(() => {
    if (elementRef.current) {
      gsap.killTweensOf(elementRef.current);
    }
    if (animationRef.current) {
      animationRef.current.kill();
    }
  }, []);

  // Auto-cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    elementRef,
    animationRef,
    initAnimation,
    initStaggerAnimation,
    createTimeline,
    playPreset,
    initScrollAnimation,
    initHoverAnimation,
    cleanup
  };
};

// Specialized hooks for common use cases
export const useHeroAnimation = () => {
  const { elementRef, initAnimation } = useGSAP();

  const animateHero = useCallback(() => {
    if (!elementRef.current) return;

    const timeline = gsap.timeline();

    // Animate title
    const title = elementRef.current.querySelector('[data-animate="title"]');
    if (title) {
      timeline.add(gsapAnimations.fadeInUp(title, 1, 0.2));
    }

    // Animate subtitle
    const subtitle = elementRef.current.querySelector('[data-animate="subtitle"]');
    if (subtitle) {
      timeline.add(gsapAnimations.fadeInUp(subtitle, 0.8, 0.4), "-=0.5");
    }

    // Animate CTA button
    const cta = elementRef.current.querySelector('[data-animate="cta"]');
    if (cta) {
      timeline.add(gsapAnimations.scaleIn(cta, 0.8, 0.6), "-=0.3");
    }

    return timeline;
  }, [elementRef]);

  return { elementRef: elementRef as React.RefObject<HTMLDivElement>, animateHero };
};

export const useCardAnimation = () => {
  const { elementRef, initHoverAnimation } = useGSAP();

  const animateCardIn = useCallback(() => {
    initAnimation('scaleIn', 0);
  }, [initAnimation]);

  const animateCardOut = useCallback(() => {
    initAnimation('scaleOut', 0);
  }, [initAnimation]);

  useEffect(() => {
    initHoverAnimation();
  }, [initHoverAnimation]);

  return { elementRef, animateCardIn, animateCardOut };
};

export const useSectionAnimation = () => {
  const { elementRef, initAnimation } = useGSAP();

  const animateSectionIn = useCallback(() => {
    initAnimation('fadeInUp', 0);
  }, [initAnimation]);

  const animateSectionOut = useCallback(() => {
    initAnimation('fadeOut', 0);
  }, [initAnimation]);

  return { elementRef, animateSectionIn, animateSectionOut };
};

export const useTextAnimation = () => {
  const { elementRef } = useGSAP();

  const animateText = useCallback(() => {
    if (!elementRef.current) return;
    gsapAnimations.textReveal(elementRef.current, 1, 0);
  }, [elementRef]);

  return { elementRef, animateText };
}; 