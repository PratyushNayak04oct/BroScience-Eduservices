"use client" ; 

import { useEffect } from 'react';

const Marketplace = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Marketplace - Bro Science Eduservices';
  }, []);

  return (
    <div className = "marketplace-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className = "container">
        <h1 className = "section-title">Marketplace</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Shop for study materials, guides, and educational resources.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <p>Full marketplace page content will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;