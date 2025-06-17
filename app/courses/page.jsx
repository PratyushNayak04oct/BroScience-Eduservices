'use client';

import { useEffect, useState } from 'react';
import { FaFlask, FaMicroscope, FaCalculator, FaGraduationCap, FaBook, FaUniversity, FaLinkedin, FaTwitter, FaEnvelope, FaSpinner } from 'react-icons/fa';
import "../index.css";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for courses
  const iconMap = {
    'FaBook': <FaBook />,
    'FaCalculator': <FaCalculator />,
    'FaFlask': <FaFlask />,
    'FaMicroscope': <FaMicroscope />,
    'FaUniversity': <FaUniversity />,
    'FaGraduationCap': <FaGraduationCap />
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Courses - Bro Science Eduservices';
    
    // Fetch data from APIs
    fetchCoursesAndFaculty();
  }, []);

  const fetchCoursesAndFaculty = async () => {
    try {
      setLoading(true);
      
      // Fetch courses and faculty data concurrently
      const [coursesResponse, facultyResponse] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/faculty')
      ]);

      const coursesData = await coursesResponse.json();
      const facultyData = await facultyResponse.json();

      if (coursesData.success) {
        setCourses(coursesData.data);
      } else {
        console.error('Failed to fetch courses:', coursesData.error);
        // Fallback to default courses if API fails
        setCourses(getDefaultCourses());
      }

      if (facultyData.success) {
        setFaculty(facultyData.data);
      } else {
        console.error('Failed to fetch faculty:', facultyData.error);
        // Fallback to default faculty if API fails
        setFaculty(getDefaultFaculty());
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Using default content.');
      // Use default data as fallback
      setCourses(getDefaultCourses());
      setFaculty(getDefaultFaculty());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className = "courses-page">
        <div className = "container">
          <div className = "loading-container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            flexDirection: 'column'
          }}>
            <FaSpinner className = "loading-spinner" style={{ 
              fontSize: '3rem', 
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }} />
            <p>Loading courses and faculty...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className = "courses-page">
      <div className = "container">
        {error && (
          <div className = "error-message" style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            color: '#856404',
            padding: '1rem',
            borderRadius: '5px',
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}
        
        <h1 className = "section-title">Our Courses</h1>
        
        <div className = "courses-grid">
          {courses.map((course) => (
            <div key={course._id || course.id} className = "course-card">
              <div className = "course-image">
                <img src={course.image} alt={course.title} />
                <div className = "course-icon">
                  {iconMap[course.icon] || <FaBook />}
                </div>
              </div>
              <div className = "course-content">
                <h3 className = "course-title">{course.title}</h3>
                <p className = "course-description">{course.description}</p>
                <ul className = "course-features">
                  {course.features?.map((feature, index) => (
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
            <div key={member._id || member.id} className = "faculty-card">
              <div className = "faculty-image">
                <img src={member.image} alt={member.name} />
                <div className = "faculty-social">
                  <a href={member.social?.linkedin || '#'} className = "social-icon">
                    <FaLinkedin />
                  </a>
                  <a href={member.social?.twitter || '#'} className = "social-icon">
                    <FaTwitter />
                  </a>
                  <a href={member.social?.email || '#'} className = "social-icon">
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