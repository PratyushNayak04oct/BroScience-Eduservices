
'use client';

import { useEffect } from 'react';
import { FaFlask, FaMicroscope, FaCalculator, FaGraduationCap, FaBook, FaUniversity, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import "../index.css" ; 

export default function CoursesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Courses - Bro Science Eduservices';
  }, []);

  const courses = [
    {
      id: 1,
      title: 'UDAAN Batch (Class 7-10)',
      icon: <FaBook />,
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
      description: 'Our foundation course is designed to build strong fundamentals in Science and Mathematics. The program focuses on NCERT curriculum while introducing advanced concepts gradually. Features include:',
      features: [
        'Comprehensive coverage of NCERT syllabus',
        'Weekly tests and assessments',
        'Doubt clearing sessions',
        'Regular parent-teacher meetings',
        'Preparation for Olympiads and competitive exams'
      ]
    },
    {
      id: 2,
      title: 'Class 11 Science',
      icon: <FaCalculator />,
      image: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg',
      description: 'Class 11 is crucial for building strong fundamentals for competitive exams. Our program covers:',
      features: [
        'PCM and PCB streams',
        'Focus on board exam preparation',
        'Integration with JEE/NEET concepts',
        'Regular practical sessions',
        'Monthly tests and performance analysis'
      ]
    },
    {
      id: 3,
      title: 'Class 12 Science',
      icon: <FaCalculator />,
      image: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg',
      description: 'Our Class 12 program ensures excellent board results while preparing for competitive exams:',
      features: [
        'Board exam-oriented teaching',
        'Previous year question practice',
        'Regular mock tests',
        'Special doubt clearing sessions',
        'Pre-board examinations'
      ]
    },
    {
      id: 4,
      title: 'IIT JEE Preparation',
      icon: <FaFlask />,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
      description: 'Comprehensive coaching for JEE Main & Advanced with proven results:',
      features: [
        'Concept-based learning approach',
        'Advanced problem-solving techniques',
        'Regular mock tests',
        'Personal mentoring',
        'Performance tracking system'
      ]
    },
    {
      id: 5,
      title: 'NEET Preparation',
      icon: <FaMicroscope />,
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
      description: 'Expert guidance for NEET preparation with focus on Biology, Chemistry and Physics:',
      features: [
        'NCERT-based teaching',
        'Regular practical sessions',
        'Topic-wise tests',
        'Previous year question analysis',
        'Medical entrance specific guidance'
      ]
    },
    {
      id: 6,
      title: 'IISER Preparation',
      icon: <FaUniversity />,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      description: 'Specialized coaching for Indian Institutes of Science Education and Research:',
      features: [
        'Aptitude development',
        'Research-oriented approach',
        'Scientific thinking skills',
        'Interview preparation',
        'Practical training'
      ]
    },
    {
      id: 7,
      title: 'NISER Preparation',
      icon: <FaUniversity />,
      image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg',
      description: 'Dedicated program for National Institute of Science Education and Research:',
      features: [
        'NEST exam preparation',
        'Scientific aptitude development',
        'Regular mock tests',
        'Interview guidance',
        'Research paper analysis'
      ]
    },
    {
      id: 8,
      title: 'CUET Preparation',
      icon: <FaGraduationCap />,
      image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg',
      description: 'Comprehensive preparation for Common University Entrance Test:',
      features: [
        'Domain subject preparation',
        'General test practice',
        'Language proficiency',
        'Mock tests',
        'University-specific guidance'
      ]
    },
    {
      id: 9,
      title: 'OUAT Preparation',
      icon: <FaBook />,
      image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg',
      description: 'Specialized coaching for Odisha University of Agriculture and Technology:',
      features: [
        'Agriculture science focus',
        'Biology and Chemistry emphasis',
        'Previous year analysis',
        'Regular mock tests',
        'Career counseling'
      ]
    }
  ];

  const faculty = [
    {
      id: 1,
      name: 'Dr. Rahul Sharma',
      position: 'Physics Expert',
      image: 'https://images.pexels.com/photos/8197509/pexels-photo-8197509.jpeg',
      education: 'PhD in Theoretical Physics, IIT Delhi',
      experience: '15+ years teaching experience',
      description: 'Specializes in Classical Mechanics and Quantum Physics. Has helped numerous students crack IIT JEE with top ranks.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:rahul@example.com'
      }
    },
    {
      id: 2,
      name: 'Prof. Alisha Patel',
      position: 'Chemistry Specialist',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
      education: 'MSc. in Chemistry, ICT Mumbai',
      experience: '12+ years of academic excellence',
      description: 'Expert in Organic Chemistry and Chemical Kinetics. Known for making complex concepts easy to understand.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:alisha@example.com'
      }
    },
    {
      id: 3,
      name: 'Mr. Vikram Desai',
      position: 'Mathematics Genius',
      image: 'https://images.pexels.com/photos/8363742/pexels-photo-8363742.jpeg',
      education: 'M.Tech, IIT Kharagpur',
      experience: '10+ years teaching mathematics',
      description: 'Specializes in Calculus and Coordinate Geometry. Has authored several books on JEE Mathematics.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:vikram@example.com'
      }
    },
    {
      id: 4,
      name: 'Dr. Priya Gupta',
      position: 'Biology Expert',
      image: 'https://images.pexels.com/photos/5905921/pexels-photo-5905921.jpeg',
      education: 'PhD in Molecular Biology, AIIMS',
      experience: '8+ years in medical entrances',
      description: 'Expert in Human Physiology and Molecular Biology. Provides specialized guidance for NEET aspirants.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:priya@example.com'
      }
    },
    {
      id: 5,
      name: 'Prof. Amit Kumar',
      position: 'Physical Chemistry Expert',
      image: 'https://images.pexels.com/photos/8197521/pexels-photo-8197521.jpeg',
      education: 'PhD in Physical Chemistry, IISc Bangalore',
      experience: '14+ years teaching experience',
      description: 'Specializes in Thermodynamics and Chemical Equilibrium. Research experience in computational chemistry.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:amit@example.com'
      }
    }
  ];

  return (
    <div className = "courses-page">
      <div className = "container">
        <h1 className = "section-title">Our Courses</h1>
        
        <div className = "courses-grid">
          {courses.map((course) => (
            <div key={course.id} className = "course-card">
              <div className = "course-image">
                <img src={course.image} alt={course.title} />
                <div className = "course-icon">{course.icon}</div>
              </div>
              <div className = "course-content">
                <h3 className = "course-title">{course.title}</h3>
                <p className = "course-description">{course.description}</p>
                <ul className = "course-features">
                  {course.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <h2 className = "section-title">Our Expert Faculty</h2>
        
        <div className = "faculty-grid">
          {faculty.map((member) => (
            <div key={member.id} className = "faculty-card">
              <div className = "faculty-image">
                <img src={member.image} alt={member.name} />
                <div className = "faculty-social">
                  <a href={member.social.linkedin} className = "social-icon">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.twitter} className = "social-icon">
                    <FaTwitter />
                  </a>
                  <a href={member.social.email} className = "social-icon">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
              <div className = "faculty-content">
                <h3 className = "faculty-name">{member.name}</h3>
                <div className = "faculty-position">{member.position}</div>
                <div className = "faculty-education">{member.education}</div>
                <div className = "faculty-experience">{member.experience}</div>
                <p className = "faculty-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}