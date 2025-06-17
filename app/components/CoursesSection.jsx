'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button';
import { FaFlask, FaMicroscope, FaCalculator, FaGraduationCap } from 'react-icons/fa';
import { useNavigation } from './NavigationWrapper'; // Import the navigation hook

const CoursesSection = () => {
  const sectionRef = useRef(null);
  const animationInitialized = useRef(false);
  const { navigateWithLoading } = useNavigation(); // Use the navigation hook
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for different course types
  const getIconForCourse = (courseTitle) => {
    const title = courseTitle.toLowerCase();
    if (title.includes('jee') || title.includes('chemistry')) return <FaFlask />;
    if (title.includes('neet') || title.includes('biology')) return <FaMicroscope />;
    if (title.includes('math') || title.includes('physics')) return <FaCalculator />;
    return <FaGraduationCap />;
  };

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/courses');
        const result = await response.json();
        
        if (result.success) {
          // Take only the first 3 courses
          const limitedCourses = result.data.slice(0, 3).map(course => ({
            ...course,
            icon: getIconForCourse(course.title || course.name),
            // Use course image if available, otherwise use a default
            image: course.image || 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }));
          setCourses(limitedCourses);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Error loading courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Handle navigation with loading
  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };
  
  useGSAP(() => {
    if (!animationInitialized.current && courses.length > 0) {
      gsap.set('.course-card', { opacity: 0, y: 50 });
      gsap.set('.view-all-button', { opacity: 0, y: 30 });

      const coursesTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      coursesTl.to('.course-card', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });
      
      gsap.to('.view-all-button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.view-all-button',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      animationInitialized.current = true;

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, { scope: sectionRef, dependencies: [courses] });

  // Loading state
  if (loading) {
    return (
      <section ref={sectionRef} className = "courses-section section">
        <div className = "container">
          <h2 className = "section-title">Our Popular Courses</h2>
          <div className = "courses-container">
            {[1, 2, 3].map((index) => (
              <div key={index} className = "course-card">
                <div className = "course-image animate-pulse bg-gray-300 h-48"></div>
                <div className = "course-content">
                  <div className = "h-6 bg-gray-300 animate-pulse mb-2"></div>
                  <div className = "h-4 bg-gray-300 animate-pulse mb-4"></div>
                  <div className = "h-4 bg-gray-300 animate-pulse w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section ref={sectionRef} className = "courses-section section">
        <div className = "container">
          <h2 className = "section-title">Our Popular Courses</h2>
          <div className = "text-center py-8">
            <p className = "text-red-600 mb-4">{error}</p>
            <Button 
              type="secondary" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className = "courses-section section">
      <div className = "container">
        <h2 className = "section-title">Our Popular Courses</h2>
        
        <div className = "courses-container">
          {courses.map((course) => (
            <div key={course._id || course.id} className = "course-card">
              <div className = "course-image">
                <Image 
                  src={course.image} 
                  alt={course.title || course.name}
                  width={400}
                  height={300}
                  className = "object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                  }}
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkRMUUaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//2Q=="
                />
                <div className = "course-icon">
                  {course.icon}
                </div>
              </div>
              <div className = "course-content">
                <h3 className = "course-title">{course.title || course.name}</h3>
                <p className = "course-description">{course.description}</p>
                <a 
                  href="/courses" 
                  className = "learn-more"
                  onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className = "mt-12 view-all-button">
          <a 
            href="/courses"
            onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
          >
            <Button type="secondary">View All Courses</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;