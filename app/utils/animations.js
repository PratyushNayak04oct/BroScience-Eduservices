import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation for section entrance
export const animateSectionEntry = (elementRef) => {
  gsap.from(elementRef.current, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: elementRef.current,
      start: 'top 80%', 
      end: 'bottom 70%',
      toggleActions: 'play none none reverse'
    }
  });
};

// Animation for staggered items
export const animateStaggerItems = (container, items, delay = 0) => {
  gsap.from(items, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    delay,
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      end: 'bottom 70%',
      toggleActions: 'play none none reverse'
    }
  });
};

// Animation for fade in
export const fadeIn = (element, delay = 0, duration = 1) => {
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration,
    delay
  });
};

// Animation for hero text
export const animateHeroText = (textElement) => {
  gsap.from(textElement, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5
  });
};