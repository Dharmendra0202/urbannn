import { Router } from 'expo-router';
import { Alert } from 'react-native';

/**
 * Safe navigation wrapper that catches errors and prevents crashes
 */
export const safeNavigate = (router: Router, route: string) => {
  try {
    if (!route) {
      console.warn('Navigation attempted with empty route');
      return;
    }
    
    // Remove 'as any' type casting and use proper typing
    router.push(route as any);
  } catch (error) {
    console.error('Navigation error:', error);
    Alert.alert(
      'Navigation Error',
      'Unable to navigate to the requested page. Please try again.',
      [{ text: 'OK' }]
    );
  }
};

/**
 * Safe back navigation
 */
export const safeGoBack = (router: Router) => {
  try {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  } catch (error) {
    console.error('Back navigation error:', error);
    router.replace('/(tabs)');
  }
};

/**
 * Validate route exists before navigation
 */
export const isValidRoute = (route: string): boolean => {
  if (!route || typeof route !== 'string') {
    return false;
  }
  
  // Basic validation - route should start with /
  return route.startsWith('/');
};
