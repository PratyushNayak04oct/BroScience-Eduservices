import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeFormulas, setActiveFormulas] = useState([]);
  const [currentFormulaIndex, setCurrentFormulaIndex] = useState(0);

  const formulas = [
    "E = mc²",
    "s = ut + ½at²",
    "v = u + at",
    "v² = u² + 2as",
    "P = W / t",
    "P = VI",
    "λ = h / p",
    "E = hf",
    "n = c / v",
    "Q = mcΔT",
    "Q = mL",
    "I = Q / t",
    "a = Δv / t",
    "S = R lnΩ",
    "F = qE",
    "V = W / Q",
    "ΔU = Q - W",
    "c² = a² + b² - 2ab cos(C)",
    "sin²θ + cos²θ = 1",
    "tanθ = sinθ / cosθ",
    "log(ab) = log(a) + log(b)",
    "log(a/b) = log(a) - log(b)",
    "log(aⁿ) = n log(a)",
    "e^x = 1 + x + x²/2! + x³/3! + ...",
    "aⁿ × aᵐ = aⁿ⁺ᵐ",
    "aⁿ / aᵐ = aⁿ⁻ᵐ",
    "(aⁿ)ᵐ = aⁿᵐ",
    "ΔG = ΔH - TΔS",
    "Kp = Kc(RT)^Δn",
    "Ecell = E°cell - (0.0591/n) logQ",
    "pOH = -log[OH⁻]",
    "[H⁺][OH⁻] = 1 × 10⁻¹⁴",
    "Rate = k[A]^m[B]^n",
    "Ka = [H⁺][A⁻] / [HA]",
    "Kb = [OH⁻][BH⁺] / [B]"
  ];

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('loading-screen-active');
      const style = document.createElement('style');
      style.id = 'loading-screen-styles';
      style.textContent = `
        .loading-screen-active nav,
        .loading-screen-active footer,
        .loading-screen-active header {
          display: none !important;
        }
        .loading-screen-active {
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('loading-screen-active');
      const existingStyle = document.getElementById('loading-screen-styles');
      if (existingStyle) existingStyle.remove();
    }

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2.5;
      });
    }, 100);

    const spawnNextFormula = () => {
      if (currentFormulaIndex >= formulas.length) return;

      const formula = formulas[currentFormulaIndex];
      const id = Math.random().toString(36).substr(2, 9);

      let x, y, isTooClose;
      const maxAttempts = 100;
      let attempt = 0;

      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
        isTooClose = activeFormulas.some(f => {
          const dx = (x - f.x) * window.innerWidth / 100;
          const dy = (y - f.y) * window.innerHeight / 100;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 50;
        });
        attempt++;
      } while (isTooClose && attempt < maxAttempts);

      if (attempt >= maxAttempts) return;

      const newFormula = {
        id,
        text: formula,
        x,
        y,
        phase: 'fadeIn'
      };

      setActiveFormulas(prev => [...prev, newFormula]);
      setCurrentFormulaIndex(prev => prev + 1);
    };

    const formulaInterval = setInterval(() => {
      if (currentFormulaIndex < formulas.length) {
        spawnNextFormula();
      } else {
        clearInterval(formulaInterval);
      }
    }, 150); // faster spawn rate

    setTimeout(() => spawnNextFormula(), 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(formulaInterval);
      document.body.classList.remove('loading-screen-active');
      const existingStyle = document.getElementById('loading-screen-styles');
      if (existingStyle) existingStyle.remove();
    };
  }, [onLoadingComplete, currentFormulaIndex, isVisible, activeFormulas]);

  if (!isVisible) return null;

  return (
    <div className = "fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center font-sans overflow-hidden z-50">
      {/* Background Glow Pattern */}
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

      {/* Floating Formulas */}
      {activeFormulas.map(formula => (
        <div
          key={formula.id}
          className = "absolute text-yellow-400 text-2xl font-semibold italic select-none pointer-events-none transform -translate-x-1/2 -translate-y-1/2 max-w-xs text-center tracking-wide"
          style={{
            left: `${formula.x}%`,
            top: `${formula.y}%`,
            fontFamily: 'Times New Roman, serif',
            animation: 'formulaFadeIn 0.8s ease-out forwards',
            textShadow: '0 0 20px rgba(245, 197, 21, 0.7), 0 0 30px rgba(245, 197, 21, 0.3)',
            opacity: 0.7
          }}
        >
          {formula.text}
        </div>
      ))}

      {/* Central Content */}
      <div className = "text-center text-white z-10 max-w-2xl px-8 flex flex-col items-center gap-8">
        <h1
          className = "text-5xl md:text-7xl font-extrabold text-[#F5C515] tracking-widest"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'titleGlow 3s ease-in-out infinite alternate'
          }}
        >
          Bro Science
        </h1>

        <h2
          className = "text-xl md:text-3xl font-bold tracking-widest opacity-90"
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          Eduservices
        </h2>

        <div className = "text-lg italic opacity-80 font-serif font-bold">
          "Your ATTITUDE decides your ALTITUDE."
        </div>

        <div className = "w-full max-w-md mx-auto bg-white bg-opacity-20 rounded-full overflow-hidden shadow-inner">
          <div
            className = "h-2 bg-gradient-to-r from-yellow-400 to-red-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div
              className = "absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white via-opacity-60 to-transparent"
              style={{ animation: 'shimmer 2s infinite' }}
            />
          </div>
        </div>

        <div className = "text-base opacity-90 font-light">
          {Math.round(progress)}%
        </div>

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
          0% { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
          100% { text-shadow: 0 4px 30px rgba(245, 197, 21, 0.3), 0 0 40px rgba(245, 197, 21, 0.1); }
        }
        @keyframes formulaFadeIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
          }
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
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