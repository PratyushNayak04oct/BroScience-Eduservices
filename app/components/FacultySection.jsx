'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useNavigation } from './NavigationWrapper';

const FacultySection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { navigateWithLoading } = useNavigation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Reduced threshold for earlier trigger
        rootMargin: '50px 0px -10% 0px' // Earlier trigger with more margin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };
  
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
          {faculty.map((member, index) => (
            <div 
              key={member.id} 
              className={`faculty-card ${isVisible ? 'visible' : ''}`}
              style={{
                '--animation-delay': `${index * 0.1}s`
              }}
            >
              <div className = "faculty-image">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  width={300}
                  height={400}
                  style={{ objectFit: "cover" }}
                  priority={index < 2}
                  quality={85} // Optimized quality
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuwjA4YZ1A8eawWc0g2I4G4JgJ5lQoVdOvBf2q9Zzf//Z"
                  loading={index < 2 ? "eager" : "lazy"}
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
        
        <div className={`faculty-button ${isVisible ? 'visible' : ''}`}>
          <a 
            href="/courses"
            onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
          >
            <Button type="primary">Meet All Faculty</Button>
          </a>
        </div>
      </div>

      <style jsx>{`
        .faculty-card {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
          transition: none;
          will-change: transform, opacity;
        }

        .faculty-card.visible {
          animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--animation-delay) forwards;
        }

        .faculty-button {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          will-change: transform, opacity;
        }

        .faculty-button.visible {
          animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Remove will-change after animation completes */
        .faculty-card.visible {
          animation-fill-mode: forwards;
        }

        .faculty-button.visible {
          animation-fill-mode: forwards;
        }

        /* Optimize hover effects */
        .faculty-image {
          transform: translate3d(0, 0, 0);
          transition: transform 0.3s ease;
        }

        .faculty-card:hover .faculty-image {
          transform: translate3d(0, -2px, 0);
        }

        .social-icon {
          transition: transform 0.2s ease, color 0.2s ease;
          transform: translate3d(0, 0, 0);
        }

        .social-icon:hover {
          transform: translate3d(0, -2px, 0) scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default FacultySection;