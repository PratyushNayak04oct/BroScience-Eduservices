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
    <section ref={sectionRef} className = "py-16 bg-gray-50">
      <div className = "container mx-auto px-4">
        <h2 className = "text-3xl font-bold text-center mb-12">Connect With Us</h2>
        
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform, index) => (
            <div key={index} className = "social-card bg-white rounded-lg shadow-md p-6 flex flex-col transition-all hover:shadow-lg">
              <div className = "text-3xl text-blue-600 mb-4">
                {platform.icon}
              </div>
              <h3 className = "text-xl font-semibold mb-2">{platform.platform}</h3>
              <p className = "text-gray-600 mb-4 flex-grow">{platform.description}</p>
              <div className = "flex justify-between mb-4">
                <div className = "text-center">
                  <div className = "font-bold text-lg">{platform.followers}</div>
                  <div className = "text-sm text-gray-500">Followers</div>
                </div>
                <div className = "text-center">
                  <div className = "font-bold text-lg">{platform.engagement}</div>
                  <div className = "text-sm text-gray-500">Engagement</div>
                </div>
              </div>
              <Link 
                href={platform.link} 
                className = "inline-flex items-center justify-between mt-auto text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Follow Us <FaArrowRight className = "ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}