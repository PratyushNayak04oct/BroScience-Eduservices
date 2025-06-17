import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useNavigationLoading = () => {
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const router = useRouter();

  const navigateWithLoading = (href, pageTitle = '') => {
    // Set page title if provided
    if (pageTitle) {
      document.title = pageTitle;
    }
    
    // Show loading screen
    setIsNavigationLoading(true);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Navigate after a short delay to show loading
    setTimeout(() => {
      router.push(href);
      // Loading will be hidden by the handleLoadingComplete function
    }, 100);
  };

  const handleLoadingComplete = () => {
    setIsNavigationLoading(false);
  };

  return { 
    isNavigationLoading, 
    navigateWithLoading, 
    handleLoadingComplete 
  };
};

export default useNavigationLoading;