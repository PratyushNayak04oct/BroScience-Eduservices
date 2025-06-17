import React, { useState, useEffect } from 'react';
import "../index.css" ; 

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress animation for 2-second total duration
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }, 200); // Short delay for final animation
          return 100;
        }
        return prev + 5; // Increment by 5 every 100ms = 2 seconds total
      });
    }, 100); // 100ms interval

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className = "enhanced-loading-screen">
      <div className = "loading-background-pattern"></div>
      
      <div className = "loading-content">
        {/* Main Title with enhanced animations */}
        <h1 className = "enhanced-main-title">
          <span className = "title-part1">Bro Science</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className = "enhanced-subtitle">Eduservices</h2>
        
        {/* Enhanced Book Animation - Bottom Perspective */}
        <div className = "enhanced-book-container">
          <div className = "enhanced-book">
            <div className = "book-base"></div>
            <div className = "book-spine-left"></div>
            <div className = "book-spine-right"></div>
            
            {/* Multiple pages that turn based on progress */}
            <div className = "enhanced-book-pages">
              {[...Array(8)].map((_, index) => (
                <div 
                  key={index}
                  className={`enhanced-page page-${index + 1}`}
                  style={{
                    transform: progress > (index * 12.5) ? 
                      `rotateX(${Math.min(180, (progress - index * 12.5) * 2)}deg)` : 
                      'rotateX(0deg)'
                  }}
                >
                  <div className = "page-front"></div>
                  <div className = "page-back"></div>
                </div>
              ))}
            </div>
            
            {/* Magical particles */}
            <div className = "book-particles">
              {[...Array(12)].map((_, index) => (
                <div key={index} className={`particle particle-${index + 1}`}></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className = "enhanced-progress-container">
          <div className = "enhanced-progress-bar">
            <div 
              className = "enhanced-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className = "progress-shine"></div>
            </div>
          </div>
          <div className = "enhanced-progress-text">{Math.round(progress)}%</div>
        </div>
        
        {/* Enhanced Loading Text */}
        <div className = "enhanced-loading-text">
          <span>Unlocking Knowledge...</span>
          <div className = "loading-dots">
            <span className = "dot-1">.</span>
            <span className = "dot-2">.</span>
            <span className = "dot-3">.</span>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className = "floating-elements">
          <div className = "floating-icon icon-1">📚</div>
          <div className = "floating-icon icon-2">🎓</div>
          <div className = "floating-icon icon-3">💡</div>
          <div className = "floating-icon icon-4">⭐</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;