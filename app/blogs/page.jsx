import { useEffect } from 'react';

const Blogs = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Educational Blogs - Bro Science Eduservices';
  }, []);

  return (
    <div className = "blogs-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className = "container">
        <h1 className = "section-title">Educational Blogs</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Read insightful articles on education, exam preparation, and career guidance.
        </p>
        
        <div style={{ textAlign: 'center' }}>
          <p>Full blogs page content will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;