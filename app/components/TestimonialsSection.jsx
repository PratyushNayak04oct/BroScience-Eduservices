'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "The teaching methodology at Bro Science Eduservices is exceptional. The faculty helped me build a strong conceptual foundation which was crucial for my JEE success.",
    name: "Aditya Kumar",
    achievement: "AIR 45 in JEE Advanced",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    text: "The personalized attention and doubt clearing sessions helped me understand complex topics easily. I'm grateful to the entire team for their support.",
    name: "Priya Singh",
    achievement: "NEET AIR 156",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    text: "The study material and mock tests provided were excellent. They helped me identify my weaknesses and improve systematically.",
    name: "Rahul Verma",
    achievement: "Selected in IISER Pune",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
  }
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const sectionRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {

    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {

      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!pageLoaded && slideRef.current) {
      slideRef.current.style.opacity = '0';
      slideRef.current.style.transform = 'translateY(50px)';
    }
  }, [pageLoaded]);
  
  useGSAP(() => {

    if (!pageLoaded) return;

    gsap.set('.testimonial-slide', { opacity: 0, y: 50 });

    gsap.to('.testimonial-slide', {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef, dependencies: [pageLoaded] });

  const animateSlideChange = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.25,
      onComplete: () => {

        setCurrentSlide(nextIndex);

        gsap.fromTo(
          slideRef.current,
          { opacity: 0, scale: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.25,
            onComplete: () => {
              setIsAnimating(false);
            }
          }
        );
      }
    });
  };

  const nextSlide = () => {
    const nextIndex = currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1;
    animateSlideChange(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1;
    animateSlideChange(prevIndex);
  };

  return (
    <section ref={sectionRef} className = "testimonials-section">
      <div className = "container">
        <h2 className = "section-title">Voices of Trust</h2>
        
        <div className = "testimonial-container">
          <button className = "mr-12 testimonial-nav prev-button" onClick={prevSlide} disabled={isAnimating}>
            <FaArrowLeft />
          </button>
          
          <div className = "testimonial-slide" ref={slideRef}>
            <FaQuoteLeft className = "quote-icon" />
            <p className = "testimonial-text">{testimonials[currentSlide].text}</p>
            
            <div className = "testimonial-author">
              <div className = "author-image">
                <Image height={100} width={100} src={testimonials[currentSlide].image} alt={testimonials[currentSlide].name} />
              </div>
              <div className = "author-info">
                <div className = "author-name">{testimonials[currentSlide].name}</div>
                <div className = "author-achievement">{testimonials[currentSlide].achievement}</div>
              </div>
            </div>
          </div>

          <button className = "ml-12 testimonial-nav next-button" onClick={nextSlide} disabled={isAnimating}>
            <FaArrowRight/>
          </button>
          
          <div className = "testimonial-controls">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className = {`control-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  if (index !== currentSlide && !isAnimating) {
                    animateSlideChange(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};