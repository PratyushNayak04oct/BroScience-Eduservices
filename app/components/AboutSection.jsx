'use client'; // This directive is needed for client-side components in Next.js

import { useRef, useState } from 'react';
import Link from 'next/link'; // Using Next.js Link instead of react-router-dom
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { FaBookOpen, FaUserGraduate, FaTrophy, FaClock } from 'react-icons/fa';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [countersAnimated, setCountersAnimated] = useState(false);

  // Define the target values for each counter
  const counterValues = {
    courses: 10,
    students: 1000,
    success: 200,
    years: 15
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);


    gsap.from('.about-text', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.stats-card', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.about-button', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.about-button',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    const counterElements = document.querySelectorAll('.stats-number');
    
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (!countersAnimated) { 
          counterElements.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-value'));
            
            gsap.fromTo(
              counter,
              { innerText: 0 },
              {
                innerText: targetValue,
                duration: 2,
                ease: 'power2.inOut',
                snap: { innerText: 1 }, 
                onUpdate: function() {
                  counter.innerText = Math.ceil(this.targets()[0].innerText) + (targetValue >= 100 || targetValue === 15 ? '+' : '');
                }
              }
            );
          });
          setCountersAnimated(true);
        }
      },
      onLeaveBack: () => {

        counterElements.forEach(counter => {
          counter.innerText = '0';
        });
        setCountersAnimated(false);
      }
    });
    
  }, { scope: sectionRef });


  return (
    <section ref={sectionRef} className = "about-section section">
      <div className = "container">
        <h2 className = "section-title">About Us</h2>
        
        <div className = "about-content">
          <div className = "about-text">
            <p>
              Bro Science Eduservices is a premier educational institution dedicated
              to nurturing young minds and preparing them for academic excellence
              and competitive success.
            </p>
            <p>
              We provide comprehensive education for classes 7-12 following
              various boards, along with specialized coaching for competitive exams
              like IIT JEE, NEET, CUET, OUAT, IISER, and NISER.
            </p>
            <p>
              Our unique teaching methodology, expert faculty, and personalized
              attention ensure that every student reaches their full potential. We
              believe that the right attitude and guidance can help students soar to
              new heights.
            </p>
            
            <div className = "about-button">
              <Link href ="/courses">
                <Button type="primary">Discover Our Programs</Button>
              </Link>
            </div>
          </div>
          
          <div ref={statsRef} className = "stats-container">
            <div className = "stats-card">
              <div className = "stats-icon">
                <FaBookOpen />
              </div>
              <div className = "stats-number" data-value={counterValues.courses}>0</div>
              <div className = "stats-label">Courses Offered</div>
            </div>
            
            <div className = "stats-card">
              <div className = "stats-icon">
                <FaUserGraduate />
              </div>
              <div className = "stats-number" data-value={counterValues.students}>0</div>
              <div className = "stats-label">Students Enrolled</div>
            </div>
            
            <div className = "stats-card">
              <div className = "stats-icon">
                <FaTrophy />
              </div>
              <div className = "stats-number" data-value={counterValues.success}>0</div>
              <div className = "stats-label">Success Stories</div>
            </div>
            
            <div className = "stats-card">
              <div className = "stats-icon">
                <FaClock />
              </div>
              <div className = "stats-number" data-value={counterValues.years}>0</div>
              <div className = "stats-label">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;