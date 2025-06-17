'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FacultySection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before section is fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);
  
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
              className = {`faculty-card ${isVisible ? 'faculty-card-animate' : ''}`}
              style={{
                animationDelay: isVisible ? `${index * 0.1}s` : '0s'
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
                  unoptimized={true}
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
        
        <div className={`mt-12 faculty-button ${isVisible ? 'faculty-button-animate' : ''}`}>
          <Link href="/courses">
            <Button type="primary">Meet All Faculty</Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .faculty-card {
          opacity: 0;
          transform: translateY(20px);
          transition: none;
        }

        .faculty-card-animate {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .faculty-button {
          opacity: 0;
          transform: translateY(15px);
        }

        .faculty-button-animate {
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Ensure smooth performance */
        .faculty-card-animate,
        .faculty-button-animate {
          will-change: transform, opacity;
        }

        .faculty-card-animate.faculty-card,
        .faculty-button-animate.faculty-button {
          will-change: auto;
        }
      `}</style>
    </section>
  );
};

export default FacultySection;