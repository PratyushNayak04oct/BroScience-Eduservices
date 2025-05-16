'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const socialPlatforms = [
  {
    platform: 'Facebook',
    icon: <FaFacebook />,
    description: 'Join our community for daily educational tips and success stories.',
    followers: '50K+',
    engagement: '90%',
    link: '#'
  },
  {
    platform: 'Instagram',
    icon: <FaInstagram />,
    description: 'Follow us for motivational content and exam preparation guidance.',
    followers: '75K+',
    engagement: '85%',
    link: '#'
  },
  {
    platform: 'YouTube',
    icon: <FaYoutube />,
    description: 'Subscribe for free video lectures and exam strategy sessions.',
    followers: '25K+',
    engagement: '95%',
    link: '#'
  },
  {
    platform: 'LinkedIn',
    icon: <FaLinkedin />,
    description: 'Connect with our alumni network and stay updated with opportunities.',
    followers: '30K+',
    engagement: '88%',
    link: '#'
  }
];

export default function SocialSection() {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.from('.social-card', {
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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className = "social-section section">
      <div className = "container">
        <h2 className = "section-title">Connect With Us</h2>
        
        <div className = "social-grid">
          {socialPlatforms.map((platform, index) => (
            <div key={index} className = "social-card">
              <div className = "social-icon">
                {platform.icon}
              </div>
              <h3 className = "social-platform">{platform.platform}</h3>
              <p className = "social-description">{platform.description}</p>
              <div className = "social-stats">
                <div className = "stat-item">
                  <div className = "stat-value">{platform.followers}</div>
                  <div className = "stat-label">Followers</div>
                </div>
                <div className = "stat-item">
                  <div className = "stat-value">{platform.engagement}</div>
                  <div className = "stat-label">Engagement</div>
                </div>
              </div>
              <a href={platform.link} className = "hover:text-[#F5C515] social-link">
                Follow Us <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};