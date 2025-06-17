'use client';

import { createContext, useContext } from 'react';
import useNavigationLoading from '../hooks/useNavigationLoading';
import LoadingScreen from './LoadingScreen';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const navigationState = useNavigationLoading();

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
      {navigationState.isNavigationLoading && (
        <LoadingScreen onLoadingComplete={navigationState.handleLoadingComplete} />
      )}
    </NavigationContext.Provider>
  );
};