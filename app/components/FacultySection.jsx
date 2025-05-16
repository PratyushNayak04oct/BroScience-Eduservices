'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FacultySection = () => {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.faculty-card', {
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
    
    gsap.from('.faculty-button', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.faculty-button',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
    
  }, { scope: sectionRef });
  
  const faculty = [
    {
      id: 1,
      name: 'Dr. Rahul Sharma',
      position: 'Physics Expert',
      qualification: 'PhD in Theoretical Physics, IIT Delhi',
      experience: '15+ years teaching experience',
      image: '/images/faculty/rahul-sharma.jpg'
    },
    {
      id: 2,
      name: 'Prof. Alisha Patel',
      position: 'Chemistry Specialist',
      qualification: 'MSc. in Chemistry, ICT Mumbai',
      experience: '12+ years of academic excellence',
      image: '/images/faculty/alisha-patel.jpg'
    },
    {
      id: 3,
      name: 'Mr. Vikram Desai',
      position: 'Mathematics Genius',
      qualification: 'M.Tech, IIT Kharagpur',
      experience: '10+ years teaching mathematics',
      image: '/images/faculty/vikram-desai.jpg'
    },
    {
      id: 4,
      name: 'Dr. Priya Gupta',
      position: 'Biology Expert',
      qualification: 'PhD in Molecular Biology, AIIMS',
      experience: '8+ years in medical entrances',
      image: '/images/faculty/priya-gupta.jpg'
    }
  ];

  return (
    <section ref={sectionRef} className = "py-16 bg-white">
      <div className = "container mx-auto px-4">
        <h2 className = "text-3xl font-bold text-center mb-12">Our Expert Faculty</h2>
        
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member) => (
            <div key={member.id} className = "faculty-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className = "relative h-64 w-full group">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className = "object-cover"
                  priority={member.id <= 2}
                />
                <div className = "faculty-social absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-4">
                  <a href="#" className = "bg-white text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <FaLinkedin className = "text-lg" />
                  </a>
                  <a href="#" className = "bg-white text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <FaEnvelope className = "text-lg" />
                  </a>
                </div>
              </div>
              <div className = "p-5">
                <h3 className = "text-xl font-semibold mb-1">{member.name}</h3>
                <div className = "text-blue-600 font-medium mb-2">{member.position}</div>
                <div className = "text-gray-600 text-sm mb-1">{member.qualification}</div>
                <div className = "text-gray-600 text-sm">{member.experience}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className = "faculty-button mt-12 text-center">
          <Link href="/faculty">
            <Button type="primary">Meet All Faculty</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;