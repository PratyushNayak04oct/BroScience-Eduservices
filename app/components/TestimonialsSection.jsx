'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

// Register the ScrollTrigger plugin
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
  const sectionRef = useRef(null);
  const slideRef = useRef(null);
  
  useGSAP(() => {
    gsap.from('.testimonial-slide', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef });

  const animateSlideChange = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // First animate out the current slide
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.25,
      onComplete: () => {
        // Update state
        setCurrentSlide(nextIndex);
        
        // Then animate in the new slide
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
    <section ref={sectionRef} className = "py-16 bg-gray-50">
      <div className = "container mx-auto px-4">
        <h2 className = "text-3xl font-bold text-center mb-12">Voices of Trust</h2>
        
        <div className = "flex items-center justify-center">
          <button 
            className = "w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-700 hover:bg-blue-50 mr-8 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onClick={prevSlide} 
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            &lt;
          </button>
          
          <div 
            className = "testimonial-slide bg-white rounded-lg shadow-lg p-8 max-w-2xl" 
            ref={slideRef}
          >
            <FaQuoteLeft className = "text-4xl text-blue-500 mb-4" />
            <p className = "text-lg text-gray-700 mb-6 italic">{testimonials[currentSlide].text}</p>
            
            <div className = "flex items-center">
              <div className = "w-14 h-14 rounded-full overflow-hidden relative mr-4">
                <Image 
                  src={testimonials[currentSlide].image} 
                  alt={testimonials[currentSlide].name}
                  fill
                  sizes="56px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <div className = "font-semibold text-gray-900">{testimonials[currentSlide].name}</div>
                <div className = "text-sm text-blue-600">{testimonials[currentSlide].achievement}</div>
              </div>
            </div>
          </div>
          
          <button 
            className = "w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-700 hover:bg-blue-50 ml-8 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onClick={nextSlide} 
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            &gt;
          </button>
        </div>
        
        <div className = "flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className = {`w-3 h-3 rounded-full focus:outline-none ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                if (index !== currentSlide && !isAnimating) {
                  animateSlideChange(index);
                }
              }}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
}