'use client'; 

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { FaTrophy, FaCheckCircle, FaChartLine, FaUsers } from 'react-icons/fa';

const AchievementsSection = () => {
  const sectionRef = useRef(null); 
  const counterRefs = useRef([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Track when the page is fully loaded
  useEffect(() => {
    // Check if the page is already loaded
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      // Add event listener for when the page finishes loading
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      
      // Clean up event listener
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const extractNumber = (title) => {
    const match = title.match(/(\d+)\+?/);
    return match ? parseInt(match[1]) : 0;
  };
  
  useGSAP(() => {
    // Only run animations when page is loaded
    if (!pageLoaded) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states before animation
    gsap.set('.achievement-card', { opacity: 0, y: 50 });
    gsap.set('.cta-container', { opacity: 0, y: 30 });

    // Now animate to final states
    gsap.to('.achievement-card', {
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

    achievements.forEach((achievement, index) => {
      // Make sure the counter ref exists
      if (!counterRefs.current[index]) return;
      
      const targetNumber = extractNumber(achievement.title);

      // Reset counter before animation
      gsap.set(counterRefs.current[index], { innerHTML: '0' });

      let counterTween = gsap.to(counterRefs.current[index], {
        innerHTML: targetNumber,
        duration: 2,
        snap: { innerHTML: 1 }, 
        ease: "power2.out",
        paused: true, 
        onUpdate: function() {
          // Add + sign if needed
          if (achievement.title.includes('+') && !counterRefs.current[index].innerHTML.includes('+')) {
            counterRefs.current[index].innerHTML += '+';
          }
        }
      });

      ScrollTrigger.create({
        trigger: counterRefs.current[index],
        start: 'top 80%',
        onEnter: () => counterTween.restart(),
        onLeaveBack: () => {
          gsap.set(counterRefs.current[index], { innerHTML: '0' });
        }
      });
    });

    gsap.to('.cta-container', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.cta-container',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
    
  }, { scope: sectionRef, dependencies: [pageLoaded] }); // Re-run when pageLoaded changes
  
  // Apply initial styles directly to prevent flash of unstyled content
  useEffect(() => {
    if (!pageLoaded) {
      const cards = document.querySelectorAll('.achievement-card');
      const ctaContainer = document.querySelector('.cta-container');
      
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
      });
      
      if (ctaContainer) {
        ctaContainer.style.opacity = '0';
        ctaContainer.style.transform = 'translateY(30px)';
      }
      
      // Also reset counters
      counterRefs.current.forEach(ref => {
        if (ref) ref.innerHTML = '0';
      });
    }
  }, [pageLoaded]);
  
  const achievements = [
    {
      id: 1,
      title: '100+ IIT Selections',
      description: 'Our students have secured admissions in top IITs including Bombay, Delhi, and Kharagpur.',
      icon: <FaTrophy />
    },
    {
      id: 2,
      title: '200+ NEET Qualifiers',
      description: 'Successful NEET candidates with many securing seats in prestigious medical colleges.',
      icon: <FaCheckCircle />
    },
    {
      id: 3,
      title: '95% Success Rate',
      description: 'Consistent success in board examinations with students scoring 90% and above.',
      icon: <FaChartLine />
    },
    {
      id: 4,
      title: '5000+ Alumni Network',
      description: 'A strong network of successful alumni pursuing careers across the globe.',
      icon: <FaUsers />
    }
  ];

  return (
    <section ref={sectionRef} className = "achievements-section section">
      <div className = "container">
        <h2 className = "section-title">Our Achievements</h2>
        
        <div className = "achievements-container">
          {achievements.map((achievement, index) => {
            // Split the title into number and text parts
            const titleParts = achievement.title.split(/(\d+\+?)/);
            
            return (
              <div key={achievement.id} className = "achievement-card">
                <div className = "achievement-icon">
                  {achievement.icon}
                </div>
                <h3 className = "achievement-title">
                  {titleParts[0]}
                  <span 
                    ref={el => counterRefs.current[index] = el} 
                    className = "counter"
                  >
                    0
                  </span>
                  {titleParts[2] || ''}
                </h3>
                <p className = "achievement-description">{achievement.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className = "cta-container">
          <h3 className = "cta-title">Ready to Join the League of Achievers?</h3>
          <p className = "cta-text">
            At Bro Science Eduservices, we're committed to turning ambitions into achievements. 
            Our proven methodologies and expert guidance will help you reach your educational goals.
          </p>
          <Link href="/contact">
            <Button type="secondary">Get Started Today</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;