'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigation } from './NavigationWrapper'; // Import the hook

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { navigateWithLoading } = useNavigation(); // Use the navigation hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigation with loading
  const handleNavigation = (e, href, pageTitle) => {
    e.preventDefault();
    navigateWithLoading(href, pageTitle);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className = "navbar-container">
        <a 
          href="/" 
          className = "navbar-logo"
          onClick={(e) => handleNavigation(e, '/', 'Home - Bro Science Eduservices')}
        >
          <span className = "logo-part1">Bro Science</span>
          <span className = "logo-part2">Eduservices</span>
        </a>
        
        <div className = "menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className = "mobile-nav-container">
            <div className = "mobile-nav-header">
              <div className = "mobile-logo">
                <span className = "logo-part1">Bro Science</span>
                <span className = "logo-part2">Eduservices</span>
              </div>
              <div className = "close-icon" onClick={toggleMenu}>
                <FaTimes />
              </div>
            </div>
            
            <ul className = "mobile-nav-menu">
              <li className = "nav-item">
                <a 
                  href="/" 
                  className={pathname === '/' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/', 'Home - Bro Science Eduservices')}
                >
                  Home
                  <span className={`nav-underline ${pathname === '/' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/courses" 
                  className={pathname === '/courses' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
                >
                  Courses
                  <span className={`nav-underline ${pathname === '/courses' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/doubts" 
                  className={pathname === '/doubts' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/doubts', 'Doubts - Bro Science Eduservices')}
                >
                  Doubts
                  <span className={`nav-underline ${pathname === '/doubts' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/library" 
                  className={pathname === '/library' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/library', 'Library - Bro Science Eduservices')}
                >
                  Library
                  <span className={`nav-underline ${pathname === '/library' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/marketplace" 
                  className={pathname === '/marketplace' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/marketplace', 'Marketplace - Bro Science Eduservices')}
                >
                  Marketplace
                  <span className={`nav-underline ${pathname === '/marketplace' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/blogs" 
                  className={pathname === '/blogs' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/blogs', 'Blogs - Bro Science Eduservices')}
                >
                  Blogs
                  <span className={`nav-underline ${pathname === '/blogs' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
              <li className = "nav-item">
                <a 
                  href="/contact" 
                  className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavigation(e, '/contact', 'Contact Us - Bro Science Eduservices')}
                >
                  Contact Us
                  <span className={`nav-underline ${pathname === '/contact' ? 'active-underline' : ''}`}></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Desktop navigation menu */}
        <ul className = "desktop-nav-menu">
          <li className = "nav-item">
            <a 
              href="/" 
              className={pathname === '/' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/', 'Home - Bro Science Eduservices')}
            >
              Home
              <span className={`nav-underline ${pathname === '/' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/courses" 
              className={pathname === '/courses' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/courses', 'Courses - Bro Science Eduservices')}
            >
              Courses
              <span className={`nav-underline ${pathname === '/courses' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/doubts" 
              className={pathname === '/doubts' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/doubts', 'Doubts - Bro Science Eduservices')}
            >
              Doubts
              <span className={`nav-underline ${pathname === '/doubts' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/library" 
              className={pathname === '/library' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/library', 'Library - Bro Science Eduservices')}
            >
              Library
              <span className={`nav-underline ${pathname === '/library' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/marketplace" 
              className={pathname === '/marketplace' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/marketplace', 'Marketplace - Bro Science Eduservices')}
            >
              Marketplace
              <span className={`nav-underline ${pathname === '/marketplace' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/blogs" 
              className={pathname === '/blogs' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/blogs', 'Blogs - Bro Science Eduservices')}
            >
              Blogs
              <span className={`nav-underline ${pathname === '/blogs' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
          <li className = "nav-item">
            <a 
              href="/contact" 
              className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavigation(e, '/contact', 'Contact Us - Bro Science Eduservices')}
            >
              Contact Us
              <span className={`nav-underline ${pathname === '/contact' ? 'active-underline' : ''}`}></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;