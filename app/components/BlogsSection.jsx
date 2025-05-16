'use client'; // Essential directive for client components in Next.js

import { useRef, useState } from 'react';
import Link from 'next/link'; // Next.js Link instead of react-router-dom
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { FaUser, FaCalendar, FaArrowRight } from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Observer);

const BlogSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const blogs = [
    {
      id: 1,
      title: "My Journey to IIT Bombay",
      excerpt: "How consistent preparation and the right guidance helped me secure a seat in Computer Science at IIT Bombay.",
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
      tag: "JEE Success",
      author: "Arjun Mehta",
      date: "June 12, 2024"
    },
    {
      id: 2,
      title: "NEET Preparation: My Success Strategy",
      excerpt: "The study plan and techniques I followed to score 695 in NEET and secure admission in AIIMS, New Delhi.",
      image: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg",
      tag: "NEET Success",
      author: "Riya Desai",
      date: "May 28, 2024"
    },
    {
      id: 3,
      title: "How I Balanced Board Exams and JEE",
      excerpt: "Managing time effectively to excel in both board examinations and competitive exams like JEE Main and Advanced.",
      image: "https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg",
      tag: "Exam Strategy",
      author: "Karan Khanna",
      date: "April 15, 2024"
    },
    {
      id: 4,
      title: "My Experience at NISER Bhubaneswar",
      excerpt: "From preparation to admission: How I secured a spot at the National Institute of Science Education and Research.",
      image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
      tag: "NISER Journey",
      author: "Ananya Patel",
      date: "March 3, 2024"
    }
  ];

  // Pre-load images using useGSAP - Fixed approach
  useGSAP(() => {
    // We don't need to manually preload images since Next.js Image handles this
    // Creating new Image objects in the old way was causing the error
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Set state when section becomes visible
          setIsVisible(true);
          // Disconnect once triggered to improve performance
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% visible
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array since we only want this to run once on mount

  // Animation effect using useGSAP
  useGSAP(() => {
    if (!isVisible) return;
    
    const cards = document.querySelectorAll('.blog-card');
    
    // Set initial state
    gsap.set(cards, { opacity: 0, y: 30 });
    
    // Animate with requestAnimationFrame to run off main thread
    requestAnimationFrame(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "transform",
        force3D: true,
      });
    });
  }, { dependencies: [isVisible], scope: sectionRef }); // Re-run when isVisible changes, scoped to sectionRef

  return (
    <section 
      ref={sectionRef} 
      className = "blog-section section"
      style={{ 
        willChange: 'contents',
        contain: 'content'  // CSS containment for better performance
      }}
    >
      <div className = "container">
        <h2 className = "section-title">Success Stories</h2>
        
        <div className = "blog-container">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className = "blog-card"
              style={{ 
                opacity: 0,
                willChange: 'opacity, transform',
                contain: 'content' 
              }}
            >
              <div className = "blog-image">
                <div className = "relative w-full h-64">
                  <Image 
                    src={blog.image} 
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={blog.id <= 2} // Only prioritize loading the first two images
                  />
                </div>
                <span className = "blog-tag">{blog.tag}</span>
              </div>
              <div className = "blog-content">
                <h3 className = "blog-title">{blog.title}</h3>
                <p className = "blog-excerpt">{blog.excerpt}</p>
                <div className = "blog-meta">
                  <div className = "blog-author">
                    <FaUser />
                    {blog.author}
                  </div>
                  <div className = "blog-date">
                    <FaCalendar />
                    {blog.date}
                  </div>
                </div>
                <Link href="/blogs" className = "read-more">
                  Read Full Story <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;