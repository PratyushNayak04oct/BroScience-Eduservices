'use client'; // This is required for client-side components in Next.js 13+

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className = "navbar-container">
        <Link href="/" className = "navbar-logo">
          <span className = "logo-part1">Bro Science</span>
          <span className = "logo-part2">Eduservices</span>
        </Link>
        
        <div className = "menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className = "nav-item">
            <Link href="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'}>
              Home
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/courses" className={pathname === '/courses' ? 'nav-link active' : 'nav-link'}>
              Courses
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/doubts" className={pathname === '/doubts' ? 'nav-link active' : 'nav-link'}>
              Doubts
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/library" className={pathname === '/library' ? 'nav-link active' : 'nav-link'}>
              Library
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/marketplace" className={pathname === '/marketplace' ? 'nav-link active' : 'nav-link'}>
              Marketplace
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/blogs" className={pathname === '/blogs' ? 'nav-link active' : 'nav-link'}>
              Blogs
            </Link>
          </li>
          <li className = "nav-item">
            <Link href="/contact" className={pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;