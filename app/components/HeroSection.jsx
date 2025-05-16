'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './Button';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const HeroSection = () => {
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
    // Initial animation for hero content
    gsap.from('.hero-content h1', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    });
    
    gsap.from('.hero-content p', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8
    });
    
    gsap.from('.hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 1.1
    });
  }, []);

  return (
    <section ref={heroRef} className = "relative h-screen overflow-hidden">
      <div className = "absolute inset-0 bg-[#000000]">
        {sliderImages.map((img, index) => (
          <div 
            key={index} 
            className = {`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
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
      
      <div className = "relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <div className = "hero-content max-w-4xl">
          <h1 className = "text-5xl md:text-6xl font-bold mb-6">
            Your <span style={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)' }}>ATTITUDE</span> decides<br /> 
            your <span style={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)' }}>ALTITUDE</span>
          </h1>
          <p className = "text-xl md:text-2xl mb-8">Join Bro Science Eduservices and reach your full potential</p>
          <div className = "hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button type="primary">Explore Courses</Button>
            </Link>
            <Link href="/contact">
              <Button type="secondary">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className = "absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <button 
          onClick={prevSlide} 
          className = "bg-[#921212] cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
          aria-label="Previous slide"
        >
         <FaArrowLeft />
        </button>
        <div className = "flex gap-6">
          {sliderImages.map((_, index) => (
            <button 
              key={index} 
              className = {`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-[#F5C515] scale-125 cursor-pointer' : 'bg-white bg-opacity-50 cursor-pointer'}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide} 
          className = "bg-[#921212] cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;