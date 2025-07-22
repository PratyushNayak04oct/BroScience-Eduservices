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
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navigateWithLoading } = useNavigation();

  // Fetch faculty from API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/faculty');
        const result = await response.json();
        
        if (result.success) {
          // Take only the first 4 faculty members
          const limitedFaculty = result.data.slice(0, 4).map(member => ({
            ...member,
            // Provide fallback image if not available
            image: member.image || member.photo || 'https://images.pexels.com/photos/8617855/pexels-photo-8617855.jpeg'
          }));
          setFaculty(limitedFaculty);
        } else {
          setError('Failed to fetch faculty data');
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError('Error loading faculty data');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible && !loading) {
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

    if (sectionRef.current && !loading) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, loading]);

  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };

  // Loading state
  if (loading) {
    return (
      <section ref={sectionRef} className = "faculty-section section">
        <div className = "container">
          <h2 className = "section-title">Our Expert Faculty</h2>
          <div className = "faculty-container">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className = "faculty-card">
                <div className = "faculty-image">
                  <div className = "animate-pulse bg-gray-300 w-full h-80 rounded-lg"></div>
                </div>
                <div className = "faculty-content">
                  <div className = "h-6 bg-gray-300 animate-pulse mb-2 rounded"></div>
                  <div className = "h-4 bg-gray-300 animate-pulse mb-2 rounded w-3/4"></div>
                  <div className = "h-4 bg-gray-300 animate-pulse mb-2 rounded w-5/6"></div>
                  <div className = "h-4 bg-gray-300 animate-pulse rounded w-2/3"></div>
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
      <section ref={sectionRef} className = "faculty-section section">
        <div className = "container">
          <h2 className = "section-title">Our Expert Faculty</h2>
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
    <section ref={sectionRef} className = "faculty-section section">
      <div className = "container">
        <h2 className = "section-title">Our Expert Faculty</h2>
        
        <div className = "faculty-container">
          {faculty.map((member, index) => (
            <div 
              key={member._id || member.id} 
              className = {`faculty-card ${isVisible ? 'visible' : ''}`}
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
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuwjA4YZ1A8eawWc0g2I4G4JgJ5lQoVdOvBf2q9Zzf//Z"
                  loading={index < 2 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/8617855/pexels-photo-8617855.jpeg';
                  }}
                />
                <div className = "faculty-social">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      className = "social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className = "social-icon"
                    >
                      <FaEnvelope />
                    </a>
                  )}
                  {/* Show default icons if no social links provided */}
                  {!member.linkedin && !member.email && (
                    <>
                      <a href="#" className = "social-icon">
                        <FaLinkedin />
                      </a>
                      <a href="#" className = "social-icon">
                        <FaEnvelope />
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className = "faculty-content">
                <h3 className = "faculty-name">{member.name}</h3>
                <div className = "faculty-position">
                  {member.position || member.subject || member.specialization}
                </div>
                <div className = "faculty-qualification">
                  {member.qualification || member.education}
                </div>
                <div className = "faculty-experience">
                  {member.experience || `${member.experienceYears || '5+'}+ years teaching experience`}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className = {`faculty-button ${isVisible ? 'visible' : ''}`}>
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