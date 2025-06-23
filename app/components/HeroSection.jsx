'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './Button';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigation } from './NavigationWrapper'; // Import the navigation hook

const HeroSection = () => {
  const heroRef = useRef(null);
  const animationInitialized = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const { navigateWithLoading } = useNavigation(); // Use the navigation hook
  
  // Updated with Pexels classroom images
  const sliderImages = [
    {
      src: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg',
      alt: 'Modern classroom with students',
      photographer: 'Max Fischer',
      photographerUrl: 'https://www.pexels.com/@max-fischer/'
    },
    {
      src: 'https://images.pexels.com/photos/8471962/pexels-photo-8471962.jpeg',
      alt: 'University lecture hall',
      photographer: 'RODNAE Productions',
      photographerUrl: 'https://www.pexels.com/@rodnae-prod/'
    },
    {
      src: 'https://images.pexels.com/photos/7991665/pexels-photo-7991665.jpeg',
      alt: 'Empty modern classroom',
      photographer: 'Pavel Danilyuk',
      photographerUrl: 'https://www.pexels.com/@pavel-danilyuk/'
    }
  ];

  // Handle screen height changes
  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    updateScreenHeight();
    window.addEventListener('resize', updateScreenHeight);
    
    return () => window.removeEventListener('resize', updateScreenHeight);
  }, []);

  // Calculate dynamic height based on screen height
  const getDynamicHeight = () => {
    if (screenHeight > 0 && screenHeight < 700) {
      // Add 15% more height for screens less than 700px
      return `${screenHeight * 1.15}px`;
    }
    return '100vh';
  };

  // Handle navigation with loading
  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // AutoSlide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Only run animations if they haven't been initialized yet
    if (!animationInitialized.current) {
      // Set initial state immediately
      gsap.set('.hero-content h1', { opacity: 0, y: 50 });
      gsap.set('.hero-content p', { opacity: 0, y: 30 });
      gsap.set('.hero-buttons', { opacity: 0, y: 30 });
      
      // Create a timeline for better control of animations
      const heroTl = gsap.timeline();
      
      heroTl.to('.hero-content h1', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all' // Clear props after animation completes
      })
      .to('.hero-content p', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.7') // Start slightly before previous animation ends
      .to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.7');
      
      animationInitialized.current = true;
    }
    
    // Clean up function to prevent memory leaks
    return () => {
      gsap.killTweensOf(['.hero-content h1', '.hero-content p', '.hero-buttons']);
    };
  }, { scope: heroRef, dependencies: [] });

  return (
    <section 
      ref={heroRef} 
      className = "relative overflow-hidden"
      style={{ height: getDynamicHeight() }}
    >
      <div className = "absolute inset-0 bg-[#000000]">
        {sliderImages.map((img, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image 
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              priority={true}
              className = "object-cover"
              unoptimized={true}
            />
          </div>
        ))}
        <div className = "slider-overlay"></div>
      </div>
      
      <div className = "relative h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-8">
        <div className = "hero-content max-w-4xl w-full">
          <h1 className={`font-bold mb-4 sm:mb-6 leading-tight ${
            screenHeight < 700 
              ? 'text-xl sm:text-2xl md:text-4xl lg:text-5xl' 
              : 'text-2xl sm:text-3xl md:text-6xl'
          }`}>
            Your <span style={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)' }}>ATTITUDE</span> decides<br className = "hidden sm:block" /> 
            <span className = "sm:hidden"> </span>your <span style={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)' }}>ALTITUDE</span>
          </h1>
          <p className={`mb-6 sm:mb-8 px-2 sm:px-0 ${
            screenHeight < 700 
              ? 'text-sm sm:text-base md:text-lg' 
              : 'text-base sm:text-lg md:text-2xl'
          }`}>
            Join Bro Science Eduservices and reach your full potential
          </p>
          <div className = "flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center hero-buttons items-center">
            <a 
              href="/courses"
              onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
              className = "w-full sm:w-auto"
            >
              <Button type="primary">Explore Courses</Button>
            </a>
            <a 
              href="/contact"
              onClick={(e) => handleNavigation(e, '/contact', 'Contact Us - Bro Science Eduservices')}
              className = "w-full sm:w-auto"
            >
              <Button type="secondary">Contact Us</Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className={`absolute left-0 right-0 flex justify-center items-center gap-2 sm:gap-4 z-10 px-4 ${
        screenHeight < 700 ? 'bottom-2 sm:bottom-4' : 'bottom-4 sm:bottom-8'
      }`}>
        <button 
          onClick={prevSlide} 
          className={`bg-[#921212] cursor-pointer text-white rounded-full flex items-center justify-center transition-all hover:bg-[#F5C515] hover:text-black ${
            screenHeight < 700 
              ? 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm' 
              : 'w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base'
          }`}
          aria-label="Previous slide"
        >
         <FaArrowLeft />
        </button>
        <div className = "flex gap-3 sm:gap-6">
          {sliderImages.map((_, index) => (
            <button 
              key={index} 
              className={`rounded-full transition-all cursor-pointer ${
                screenHeight < 700 
                  ? 'w-1.5 h-1.5 sm:w-2 sm:h-2' 
                  : 'w-2 h-2 sm:w-3 sm:h-3'
              } ${
                index === currentSlide 
                  ? 'bg-[#F5C515] scale-125' 
                  : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide} 
          className={`bg-[#921212] cursor-pointer text-white rounded-full flex items-center justify-center transition-all hover:bg-[#F5C515] hover:text-black ${
            screenHeight < 700 
              ? 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm' 
              : 'w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base'
          }`}
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;