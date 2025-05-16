'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FacultySection = () => {
  const sectionRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Track images loaded
  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1;
      // Only set imagesLoaded to true when all 4 faculty images have loaded
      if (newCount >= 4) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };
  
  useGSAP(() => {
    // Only run animations when images are loaded
    if (!imagesLoaded) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial state before animation (prevents flash of unstyled content)
    gsap.set('.faculty-card', { opacity: 0, y: 50 });
    gsap.set('.faculty-button', { opacity: 0, y: 30 });
    
    gsap.to('.faculty-card', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    gsap.to('.faculty-button', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.faculty-button',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
    
  }, { scope: sectionRef, dependencies: [imagesLoaded] }); // Re-run when imagesLoaded changes
  
  // Make sure faculty section starts with opacity 0 before JavaScript loads
  useEffect(() => {
    // Apply initial styles directly to prevent flash of content
    if (!imagesLoaded) {
      const cards = document.querySelectorAll('.faculty-card');
      const button = document.querySelector('.faculty-button');
      
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
      });
      
      if (button) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
      }
    }
  }, [imagesLoaded]);
  
  const faculty = [
    {
      id: 1,
      name: 'Dr. Rahul Sharma',
      position: 'Physics Expert',
      qualification: 'PhD in Theoretical Physics, IIT Delhi',
      experience: '15+ years teaching experience',
      image: 'https://images.pexels.com/photos/8617855/pexels-photo-8617855.jpeg'
    },
    {
      id: 2,
      name: 'Prof. Alisha Patel',
      position: 'Chemistry Specialist',
      qualification: 'MSc. in Chemistry, ICT Mumbai',
      experience: '12+ years of academic excellence',
      image: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg'
    },
    {
      id: 3,
      name: 'Mr. Vikram Desai',
      position: 'Mathematics Genius',
      qualification: 'M.Tech, IIT Kharagpur',
      experience: '10+ years teaching mathematics',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg'
    },
    {
      id: 4,
      name: 'Dr. Priya Gupta',
      position: 'Biology Expert',
      qualification: 'PhD in Molecular Biology, AIIMS',
      experience: '8+ years in medical entrances',
      image: 'https://images.pexels.com/photos/5212687/pexels-photo-5212687.jpeg'
    }
  ];

  return (
    <section ref={sectionRef} className = "faculty-section section">
      <div className = "container">
        <h2 className = "section-title">Our Expert Faculty</h2>
        
        <div className = "faculty-container">
          {faculty.map((member) => (
            <div key={member.id} className = "faculty-card">
              <div className = "faculty-image">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  width={300}
                  height={400}
                  style={{ objectFit: "cover" }}
                  priority={true} // Load all images with priority
                  unoptimized={true} // For external images from Pexels
                  onLoad={handleImageLoad} // Track when images are loaded
                />
                <div className = "faculty-social">
                  <a href="#" className = "social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="#" className = "social-icon">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
              <div className = "faculty-content">
                <h3 className = "faculty-name">{member.name}</h3>
                <div className = "faculty-position">{member.position}</div>
                <div className = "faculty-qualification">{member.qualification}</div>
                <div className = "faculty-experience">{member.experience}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className = "mt-12 faculty-button">
          <Link href="/courses">
            <Button type="primary">Meet All Faculty</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;