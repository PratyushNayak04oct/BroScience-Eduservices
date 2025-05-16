'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaGraduationCap, FaFlask, FaMicroscope, FaCalculator, FaBook, FaUniversity } from 'react-icons/fa';

const QuickHighlights = () => {
  const marqueeRef = useRef(null);
  
  useGSAP(() => {
    // Create the marquee animation effect
    gsap.to('.marquee-container', {
      x: '-50%',
      repeat: -1,
      duration: 20,
      ease: 'linear',
      repeatRefresh: true
    });
  }, { scope: marqueeRef });

  const courses = [
    { icon: <FaGraduationCap className = "text-2xl" />, text: 'IIT JEE Preparation' },
    { icon: <FaMicroscope className = "text-2xl" />, text: 'NEET Coaching' },
    { icon: <FaCalculator className = "text-2xl" />, text: 'Class 11-12 Science' },
    { icon: <FaBook className = "text-2xl" />, text: 'Foundation Courses' },
    { icon: <FaUniversity className = "text-2xl" />, text: 'CUET Preparation' },
    { icon: <FaFlask className = "text-2xl" />, text: 'IISER & NISER Coaching' },
  ];

  // Duplicate courses for seamless scrolling
  const allCourses = [...courses, ...courses];

  return (
    <div className = "bg-[#921212] py-8 overflow-hidden" ref={marqueeRef}>
      <div className = "marquee-container flex whitespace-nowrap py-16">
        {allCourses.map((course, index) => (
          <div 
            key={index} 
            className = "marquee-item inline-flex items-center mx-6 px-4 py-2 bg-white rounded-full shadow-sm"
          >
            <span className = "text-[#F5C515] mr-2">{course.icon}</span>
            <span className = "text-white font-medium">{course.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickHighlights;