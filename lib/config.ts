import { Platform } from 'react-native';

// Get the correct API URL based on platform
export const getApiUrl = () => {
  // For Android emulator, use 10.0.2.2
  // For iOS simulator, use localhost
  // For physical devices, use your computer's IP
  
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // For physical Android device, use your computer's IP
      return 'http://192.168.0.100:3001/api';
    } else if (Platform.OS === 'ios') {
      // For iOS, localhost works in simulator
      return 'http://localhost:3001/api';
    }
  }
  
  // Production URL (when you deploy)
  return 'https://your-production-api.com/api';
};

export const API_URL = getApiUrl();
