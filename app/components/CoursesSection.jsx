'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button';
import { FaFlask, FaMicroscope, FaCalculator, FaGraduationCap } from 'react-icons/fa';

const CoursesSection = () => {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.course-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    gsap.from('.view-all-button', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.view-all-button',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
    
  }, { scope: sectionRef });
  
  const courses = [
    {
      id: 1,
      title: 'IIT JEE Preparation',
      description: 'Comprehensive coaching for JEE Main & Advanced with conceptual understanding and problem-solving strategies.',
      icon: <FaFlask className = "text-xl" />,
      image: '/images/courses/iit-jee.jpg'
    },
    {
      id: 2,
      title: 'NEET Coaching',
      description: 'Expert guidance for NEET with focus on Biology, Chemistry and Physics through practical applications.',
      icon: <FaMicroscope className = "text-xl" />,
      image: '/images/courses/neet.jpg'
    },
    {
      id: 3,
      title: 'Class 11-12 Science',
      description: 'Strong foundation in PCM/PCB subjects with board exam preparation and competitive exam orientation.',
      icon: <FaCalculator className = "text-xl" />,
      image: '/images/courses/class-11-12.jpg'
    },
    {
      id: 4,
      title: 'Foundation Courses (Class 7-10)',
      description: 'Building strong fundamentals in Science and Mathematics to prepare for future academic challenges.',
      icon: <FaGraduationCap className = "text-xl" />,
      image: '/images/courses/foundation.jpg'
    }
  ];

  return (
    <section ref={sectionRef} className = "courses-section py-16 bg-gray-50">
      <div className = "container mx-auto px-4">
        <h2 className = "text-3xl font-bold text-center mb-12">Our Popular Courses</h2>
        
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className = "course-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className = "relative h-48 w-full">
                <Image 
                  src={course.image} 
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className = "object-cover"
                  priority={course.id <= 2}
                />
                <div className = "absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full">
                  {course.icon}
                </div>
              </div>
              <div className = "p-5">
                <h3 className = "text-xl font-semibold mb-2">{course.title}</h3>
                <p className = "text-gray-600 mb-4">{course.description}</p>
                <Link href="/courses" className = "text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  Learn More <span className = "ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className = "view-all-button mt-12 text-center">
          <Link href="/courses">
            <Button type="secondary">View All Courses</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;