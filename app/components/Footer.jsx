'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigation } from './NavigationWrapper'; // Import the hook

const Footer = () => {
  const { navigateWithLoading } = useNavigation(); // Use the navigation hook

  // Handle navigation with loading
  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };

  return (
    <footer className = "footer">
      <div className = "container">
        <div className = "footer-content">
          <div className = "footer-about">
            <h3 className = "footer-title">Bro Science Eduservices</h3>
            <p>
              Empowering students to achieve academic excellence through quality education, 
              personalized attention, and innovative teaching methodologies.
            </p>
            <div className = "footer-social-foot">
              <a href="#" className = "social-link-footer"><FaFacebook /></a>
              <a href="#" className = "social-link-footer"><FaTwitter /></a>
              <a href="#" className = "social-link-footer"><FaInstagram /></a>
              <a href="#" className = "social-link-footer"><FaYoutube /></a>
              <a href="#" className = "social-link-footer"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className = "footer-links">
            <h3 className = "footer-title">Quick Links</h3>
            <ul>
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleNavigation(e, '/', 'Home - Bro Science Eduservices')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
                >
                  Courses
                </a>
              </li>
              <li>
                <a 
                  href="/doubts" 
                  onClick={(e) => handleNavigation(e, '/doubts', 'Doubts - Bro Science Eduservices')}
                >
                  Doubts
                </a>
              </li>
              <li>
                <a 
                  href="/library" 
                  onClick={(e) => handleNavigation(e, '/library', 'Library - Bro Science Eduservices')}
                >
                  Library
                </a>
              </li>
              <li>
                <a 
                  href="/marketplace" 
                  onClick={(e) => handleNavigation(e, '/marketplace', 'Marketplace - Bro Science Eduservices')}
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  onClick={(e) => handleNavigation(e, '/blogs', 'Blogs - Bro Science Eduservices')}
                >
                  Blogs
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => handleNavigation(e, '/contact', 'Contact Us - Bro Science Eduservices')}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className = "footer-courses">
            <h3 className = "footer-title">Our Courses</h3>
            <ul>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'IIT JEE Preparation - Bro Science Eduservices')}
                >
                  IIT JEE Preparation
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'NEET Coaching - Bro Science Eduservices')}
                >
                  NEET Coaching
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'Class 11-12 Science - Bro Science Eduservices')}
                >
                  Class 11-12 Science
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'Foundation Courses - Bro Science Eduservices')}
                >
                  Foundation Courses
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'CUET Preparation - Bro Science Eduservices')}
                >
                  CUET Preparation
                </a>
              </li>
              <li>
                <a 
                  href="/courses" 
                  onClick={(e) => handleNavigation(e, '/courses', 'IISER & NISER Coaching - Bro Science Eduservices')}
                >
                  IISER & NISER Coaching
                </a>
              </li>
            </ul>
          </div>
           
          <div className = "footer-contact">
            <h3 className = "footer-title">Contact Us</h3>
            <ul>
              <li>
                <FaMapMarkerAlt className = "contact-icon" />
                123 Education Street, Knowledge Park, Bhubaneswar, Odisha - 751002
              </li>
              <li>
                <FaPhone className = "contact-icon" />
                +91 98765 43210
              </li>
              <li>
                <FaEnvelope className = "contact-icon" />
                info@broscience.edu
              </li>
            </ul>
          </div>
        </div>
        
        <div className = "footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bro Science Eduservices. All Rights Reserved.</p>
          <div className = "footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;