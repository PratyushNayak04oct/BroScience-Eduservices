'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Close menu when clicking outside on mobile
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
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-part1">Bro Science</span>
          <span className="logo-part2">Eduservices</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-container">
            <div className="mobile-nav-header">
              <div className="mobile-logo">
                <span className="logo-part1">Bro Science</span>
                <span className="logo-part2">Eduservices</span>
              </div>
              <div className="close-icon" onClick={toggleMenu}>
                <FaTimes />
              </div>
            </div>
            
            <ul className="mobile-nav-menu">
              <li className="nav-item">
                <Link href="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'}>
                  Home
                  <span className={`nav-underline ${pathname === '/' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/courses" className={pathname === '/courses' ? 'nav-link active' : 'nav-link'}>
                  Courses
                  <span className={`nav-underline ${pathname === '/courses' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/doubts" className={pathname === '/doubts' ? 'nav-link active' : 'nav-link'}>
                  Doubts
                  <span className={`nav-underline ${pathname === '/doubts' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/library" className={pathname === '/library' ? 'nav-link active' : 'nav-link'}>
                  Library
                  <span className={`nav-underline ${pathname === '/library' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/marketplace" className={pathname === '/marketplace' ? 'nav-link active' : 'nav-link'}>
                  Marketplace
                  <span className={`nav-underline ${pathname === '/marketplace' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blogs" className={pathname === '/blogs' ? 'nav-link active' : 'nav-link'}>
                  Blogs
                  <span className={`nav-underline ${pathname === '/blogs' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
                  Contact Us
                  <span className={`nav-underline ${pathname === '/contact' ? 'active-underline' : ''}`}></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Desktop navigation menu */}
        <ul className="desktop-nav-menu">
          <li className="nav-item">
            <Link href="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'}>
              Home
              <span className={`nav-underline ${pathname === '/' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/courses" className={pathname === '/courses' ? 'nav-link active' : 'nav-link'}>
              Courses
              <span className={`nav-underline ${pathname === '/courses' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/doubts" className={pathname === '/doubts' ? 'nav-link active' : 'nav-link'}>
              Doubts
              <span className={`nav-underline ${pathname === '/doubts' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/library" className={pathname === '/library' ? 'nav-link active' : 'nav-link'}>
              Library
              <span className={`nav-underline ${pathname === '/library' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/marketplace" className={pathname === '/marketplace' ? 'nav-link active' : 'nav-link'}>
              Marketplace
              <span className={`nav-underline ${pathname === '/marketplace' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/blogs" className={pathname === '/blogs' ? 'nav-link active' : 'nav-link'}>
              Blogs
              <span className={`nav-underline ${pathname === '/blogs' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
              Contact Us
              <span className={`nav-underline ${pathname === '/contact' ? 'active-underline' : ''}`}></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;