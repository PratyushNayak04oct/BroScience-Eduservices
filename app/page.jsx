'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen'; // Adjust the path based on your file structure
import HeroSection from './components/HeroSection';
import QuickHighlights from './components/QuickHighlights';
import AboutSection from './components/AboutSection';
import CoursesSection from './components/CoursesSection';
import FacultySection from './components/FacultySection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogsSection';
import VideoSection from './components/VideoSection';
import SocialSection from './components/SocialSection';
import AchievementsSection from './components/AchievementsSection';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Bro Science Eduservices - Your ATTITUDE decides your ALTITUDE.';
  }, []);

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
      <HeroSection />
      <QuickHighlights />
      <AboutSection />
      <CoursesSection /> 
      <FacultySection />
      <AchievementsSection />
      <TestimonialsSection />
      <BlogSection />
      <VideoSection />
      <SocialSection />
    </>
  );
}