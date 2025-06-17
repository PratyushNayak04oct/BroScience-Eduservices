import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeFormulas, setActiveFormulas] = useState([]);
  const [currentFormulaIndex, setCurrentFormulaIndex] = useState(0);

  const formulas = [
    'a² + b² = c²',
    'A = πr²',
    'F = ma',
    'E = mc²',
    'V = IR',
    'PV = nRT',
    'pH = -log[H⁺]',
    'KE = ½mv²'
  ];

  const positions = [
    { x: 15, y: 20 },
    { x: 85, y: 25 },
    { x: 10, y: 75 },
    { x: 90, y: 80 },
    { x: 8, y: 45 },
    { x: 92, y: 55 },
    { x: 20, y: 10 },
    { x: 80, y: 90 }
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }, 500);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    // Formula animation system - show one formula at a time (faster)
    const spawnNextFormula = () => {
      if (currentFormulaIndex >= formulas.length) {
        return; // All formulas have been shown
      }

      const formula = formulas[currentFormulaIndex];
      const position = positions[currentFormulaIndex];
      const id = Math.random().toString(36).substr(2, 9);
      
      const newFormula = {
        id,
        text: formula,
        x: position.x,
        y: position.y,
        phase: 'fadeIn'
      };

      setActiveFormulas(prev => [...prev, newFormula]);
      setCurrentFormulaIndex(prev => prev + 1);
    };

    // Spawn formulas at faster intervals - one at a time
    const formulaInterval = setInterval(() => {
      if (currentFormulaIndex < formulas.length) {
        spawnNextFormula();
      } else {
        clearInterval(formulaInterval);
      }
    }, 800); // Show a new formula every 0.8 seconds (much faster)

    // Start first formula after a shorter delay
    setTimeout(() => spawnNextFormula(), 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(formulaInterval);
    };
  }, [onLoadingComplete, currentFormulaIndex]);

  if (!isVisible) return null;

  return (
    <div className = "fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center font-sans overflow-hidden z-50">
      {/* Animated Background Pattern */}
      <div 
        className = "absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(245, 197, 21, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 197, 21, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(245, 197, 21, 0.1) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }} 
      />

      {/* Floating Formulas - Enhanced Visibility */}
      {activeFormulas.map(formula => (
        <div
          key={formula.id}
          className = "absolute text-yellow-400 text-2xl font-semibold italic select-none pointer-events-none transform -translate-x-1/2 -translate-y-1/2 max-w-xs text-center tracking-wide"
          style={{
            left: `${formula.x}%`,
            top: `${formula.y}%`,
            fontFamily: 'Times New Roman, serif',
            animation: 'formulaFadeIn 0.8s ease-out forwards',
            textShadow: '0 0 20px rgba(245, 197, 21, 0.8), 0 0 30px rgba(245, 197, 21, 0.4)',
            opacity: 0.9
          }}
        >
          {formula.text}
        </div>
      ))}

      {/* Main Content */}
      <div className = "text-center text-white z-10 max-w-2xl px-8">
        {/* Main Title */}
        <h1 
          className = "text-5xl md:text-7xl font-light mb-2 tracking-widest"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'titleGlow 3s ease-in-out infinite alternate'
          }}
        >
          Bro Science
        </h1>
        
        {/* Subtitle */}
        <h2 
          className = "text-xl md:text-3xl font-extralight mb-12 tracking-widest opacity-90"
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          Eduservices
        </h2>
        
        {/* Academic Quote */}
        <div className = "text-lg italic mb-8 opacity-80 font-serif">
          "Knowledge is the foundation of all great achievements"
        </div>
        
        {/* Progress Bar */}
        <div className = "w-full max-w-md mx-auto mb-6 bg-white bg-opacity-20 rounded-full overflow-hidden shadow-inner">
          <div 
            className = "h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div 
              className = "absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white via-opacity-60 to-transparent"
              style={{ animation: 'shimmer 2s infinite' }}
            />
          </div>
        </div>
        
        {/* Progress Text */}
        <div className = "text-base mb-8 opacity-90 font-light">
          {Math.round(progress)}%
        </div>
        
        {/* Loading Text */}
        <div className = "text-base flex items-center justify-center gap-2 opacity-80">
          <span>Unlocking Knowledge</span>
          <div className = "flex gap-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  animation: `dot 1.5s infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                .
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes titleGlow {
          0% { 
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
          }
          100% { 
            text-shadow: 0 4px 30px rgba(245, 197, 21, 0.3), 0 0 40px rgba(245, 197, 21, 0.1); 
          }
        }

        @keyframes formulaFadeIn {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8) rotate(-5deg); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
          }
        }

        @keyframes formulaFadeOut {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.8) rotate(5deg); 
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes dot {
          0%, 60%, 100% { opacity: 0.4; }
          30% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;