'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaVideo, FaUsers } from 'react-icons/fa';
import Button from './Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // GSAP animations setup
    const ctx = gsap.context(() => {
      gsap.from('.video-info', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse'
        }
      });
      
      gsap.from('.video-player', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);
    
    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className = "video-section section">
      <div className = "container">
        <h2 className = "section-title">Watch & Learn</h2>
        
        <div className = "video-content">
          <div className = "video-info">
            <p>
              Subscribe to our YouTube channel for free educational content, tips,
              tricks, and exam strategies. Our educators regularly upload videos to
              help students master difficult concepts.
            </p>
            
            <div className = "video-stats">
              <div className = "stat-card">
                <FaVideo className = "stat-icon" />
                <div className = "stat-number">100+</div>
                <div className = "stat-label">Video Lessons</div>
              </div>
              <div className = "stat-card">
                <FaUsers className = "stat-icon" />
                <div className = "stat-number">25K+</div>
                <div className = "stat-label">Subscribers</div>
              </div>
            </div>
            
            <Button type="secondary">Visit Our Channel</Button>
          </div>
          
          <div className = "video-player">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className = "featured-tag">Featured Video</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;