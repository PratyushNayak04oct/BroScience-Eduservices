
'use client';

import { useEffect } from 'react';

export default function DoubtsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Doubts Section - Bro Science Eduservices';
  }, []);

  return (
    <div className = "doubts-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className = "container">
        <h1 className = "section-title">Doubts Section</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Get your academic doubts cleared by our expert faculty.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <p>Full doubts page content will go here.</p>
        </div>
      </div>
    </div>
  );
}