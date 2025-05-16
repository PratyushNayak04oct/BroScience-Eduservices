'use client'; // This is required for client-side components in Next.js 13+

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
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
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/doubts">Doubts</Link></li>
              <li><Link href="/library">Library</Link></li>
              <li><Link href="/marketplace">Marketplace</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className = "footer-courses">
            <h3 className = "footer-title">Our Courses</h3>
            <ul>
              <li><Link href="/courses">IIT JEE Preparation</Link></li>
              <li><Link href="/courses">NEET Coaching</Link></li>
              <li><Link href="/courses">Class 11-12 Science</Link></li>
              <li><Link href="/courses">Foundation Courses</Link></li>
              <li><Link href="/courses">CUET Preparation</Link></li>
              <li><Link href="/courses">IISER & NISER Coaching</Link></li>
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