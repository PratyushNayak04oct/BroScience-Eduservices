'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Critical components - load immediately
import HeroSection from './components/HeroSection';
import QuickHighlights from './components/QuickHighlights';

// Non-critical components - lazy load
const AboutSection = lazy(() => import('./components/AboutSection'));
const CoursesSection = lazy(() => import('./components/CoursesSection'));
const FacultySection = lazy(() => import('./components/FacultySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const BlogSection = lazy(() => import('./components/BlogsSection'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const SocialSection = lazy(() => import('./components/SocialSection'));
const AchievementsSection = lazy(() => import('./components/AchievementsSection'));

// Lightweight fallback component for lazy loading
const SectionSkeleton = () => (
  <div className="w-full h-32 bg-gray-100 animate-pulse rounded-lg mb-4" />
);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    courses: false,
    faculty: false,
    achievements: false,
    testimonials: false,
    blog: false,
    video: false,
    social: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Bro Science Eduservices - Your ATTITUDE decides your ALTITUDE.';
    
    // Preload critical sections after initial render
    const timer = setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, about: true, courses: true }));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Progressive loading of remaining sections
      const loadSections = async () => {
        // Load faculty and achievements after a short delay
        setTimeout(() => {
          setVisibleSections(prev => ({ 
            ...prev, 
            faculty: true, 
            achievements: true 
          }));
        }, 500);

        // Load remaining sections
        setTimeout(() => {
          setVisibleSections(prev => ({ 
            ...prev, 
            testimonials: true,
            blog: true,
            video: true,
            social: true
          }));
        }, 1000);
      };

      loadSections();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen while isLoading is true
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show main content after loading is complete
  return (
    <>
      {/* Critical above-the-fold content */}
      <HeroSection />
      <QuickHighlights />

      {/* Progressive lazy-loaded sections */}
      {visibleSections.about && (
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
      )}

      {visibleSections.courses && (
        <Suspense fallback={<SectionSkeleton />}>
          <CoursesSection />
        </Suspense>
      )}

      {visibleSections.faculty && (
        <Suspense fallback={<SectionSkeleton />}>
          <FacultySection />
        </Suspense>
      )}

      {visibleSections.achievements && (
        <Suspense fallback={<SectionSkeleton />}>
          <AchievementsSection />
        </Suspense>
      )}

      {visibleSections.testimonials && (
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
      )}

      {visibleSections.blog && (
        <Suspense fallback={<SectionSkeleton />}>
          <BlogSection />
        </Suspense>
      )}

      {visibleSections.video && (
        <Suspense fallback={<SectionSkeleton />}>
          <VideoSection />
        </Suspense>
      )}

      {visibleSections.social && (
        <Suspense fallback={<SectionSkeleton />}>
          <SocialSection />
        </Suspense>
      )}
    </>
  );
}