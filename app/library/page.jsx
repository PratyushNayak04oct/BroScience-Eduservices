"use client"

import { useEffect } from 'react';

const Library = () => {
  useEffect(() => {

    window.scrollTo(0, 0);

    document.title = 'Library Resources - Bro Science Eduservices';
  }, []);

  return (
    <div className = "library-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className = "container">
        <h1 className = "section-title">Library Resources</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Access study materials, practice papers, and reference books.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <p>Full library page content will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default Library;