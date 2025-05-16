'use client';

import { useEffect } from 'react';
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
  useEffect(() => {

    window.scrollTo(0, 0);
    document.title = 'Bro Science Eduservices - Your ATTITUDE decides your ALTITUDE.';
  }, []);

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