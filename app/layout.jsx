import "./index.css";
import { lazy, Suspense } from 'react';
import { NavigationProvider } from './components/NavigationWrapper';

// Critical components - load immediately
import Navbar from "./components/Navbar";

// Non-critical components - lazy load
const Footer = lazy(() => import("./components/Footer"));

// Lightweight footer skeleton
const FooterSkeleton = () => (
  <div className="w-full h-32 bg-gray-100 animate-pulse mt-8" />
);

export const metadata = {
  title: "Bro Science Eduservices - Your ATTITUDE decides your ALTITUDE.",
  description:
    "Empowering students to achieve academic excellence through quality education, personalized attention, and innovative teaching methodologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" as="style" href="/index.css" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for layout shift prevention */
            body { margin: 0; padding: 0; }
            .navbar-height { min-height: 64px; }
            .footer-height { min-height: 128px; }
            
            /* Loading optimization */
            img { 
              content-visibility: auto;
              contain-intrinsic-size: 300px 200px;
            }
          `
        }} />
      </head>
      <body>
        <NavigationProvider>
          {/* Critical above-the-fold component */}
          <div className = "navbar-height">
            <Navbar />
          </div>
          
          {/* Main content */}
          <main>
            {children}
          </main>
          
          {/* Lazy load footer since it's below the fold */}
          <div className = "footer-height">
            <Suspense fallback={<FooterSkeleton />}>
              <Footer />
            </Suspense>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}