import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { makeRedirectUri } from 'expo-auth-session';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      
      const redirectUrl = makeRedirectUri({
        scheme: 'urbannn',
        path: 'auth/callback',
      });

      console.log('=== GOOGLE LOGIN DEBUG ===');
      console.log('Redirect URL:', redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: false,
        },
      });

      console.log('OAuth Response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        Alert.alert('Error', `${error.message}\n\nCheck console for details`);
        setLoading(false);
        return;
      }

      if (data?.url) {
        console.log('Opening OAuth URL:', data.url);
        
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        console.log('Browser result:', result);

        if (result.type === 'success') {
          console.log('Login successful!');
          console.log('Result URL:', result.url);
          
          // Extract tokens from URL hash
          const url = result.url;
          const hashIndex = url.indexOf('#');
          
          if (hashIndex !== -1) {
            const hash = url.substring(hashIndex + 1);
            const params = new URLSearchParams(hash);
            
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            
            console.log('Access token found:', !!accessToken);
            console.log('Refresh token found:', !!refreshToken);
            
            if (accessToken && refreshToken) {
              // Set the session manually
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              
              if (error) {
                console.error('Error setting session:', error);
                Alert.alert('Session Error', error.message);
                setLoading(false);
                return;
              }
              
              console.log('Session set successfully!');
              console.log('User:', data.session?.user?.email);
              
              // Small delay to ensure session is saved
              await new Promise(resolve => setTimeout(resolve, 300));
              
              // Navigate to home
              router.replace('/(tabs)');
            } else {
              Alert.alert('Error', 'Could not extract tokens from login response');
              setLoading(false);
            }
          } else {
            Alert.alert('Error', 'Invalid login response format');
            setLoading(false);
          }
        } else if (result.type === 'cancel') {
          Alert.alert('Cancelled', 'Login was cancelled');
          setLoading(false);
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Animated Background Circles with Color Changes */}
        <MotiView
          from={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.3, opacity: 0.15 }}
          transition={{
            type: 'timing',
            duration: 4000,
            loop: true,
          }}
          style={[styles.circle1, { backgroundColor: '#F472B6' }]}
        />
        <MotiView
          from={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.6, opacity: 0.1 }}
          transition={{
            type: 'timing',
            duration: 5000,
            loop: true,
          }}
          style={[styles.circle2, { backgroundColor: '#A78BFA' }]}
        />
        <MotiView
          from={{ scale: 0.9, opacity: 0.35 }}
          animate={{ scale: 1.4, opacity: 0.12 }}
          transition={{
            type: 'timing',
            duration: 4500,
            loop: true,
          }}
          style={[styles.circle3, { backgroundColor: '#60A5FA' }]}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Logo/Icon Area */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ 
              type: 'timing',
              duration: 600,
            }}
            style={styles.logoContainer}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0ABFC']}
              style={styles.iconCircle}
            >
              <Ionicons name="home" size={48} color="#8B5CF6" />
            </LinearGradient>
            <Text style={styles.appName}>Urbannn</Text>
            <Text style={styles.tagline}>Home Services at Your Doorstep</Text>
          </MotiView>

          {/* Login Options */}
          <MotiView
            from={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 200 }}
            style={styles.loginContainer}
          >
            {/* Google Login Button - Slim & Professional */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              <View style={styles.googleButtonContent}>
                <Ionicons name="logo-google" size={20} color="#FFFFFF" />
                <Text style={styles.googleButtonText}>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={16} color="rgba(255, 255, 255, 0.9)" />
              <Text style={styles.infoText}>
                Secure authentication powered by Google
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Guest Button */}
            <TouchableOpacity
              style={styles.guestButton}
              onPress={continueAsGuest}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.guestButtonGradient}
              >
                <Ionicons name="person-outline" size={22} color="#FFFFFF" />
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Benefits */}
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color="#A7F3D0" />
                <Text style={styles.benefitText}>Save your addresses</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color="#FDE68A" />
                <Text style={styles.benefitText}>Track your bookings</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color="#FBCFE8" />
                <Text style={styles.benefitText}>Get exclusive offers</Text>
              </View>
            </View>
          </MotiView>

          {/* Footer */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink}>Terms</Text> and{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
          </MotiView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366F1',
  },
  gradient: {
    flex: 1,
  },
  circle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    top: -width * 0.6,
    left: -width * 0.3,
  },
  circle2: {
    position: 'absolute',
    width: width * 1.3,
    height: width * 1.3,
    borderRadius: width * 0.65,
    bottom: -width * 0.5,
    right: -width * 0.4,
  },
  circle3: {
    position: 'absolute',
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: width * 0.55,
    top: height * 0.3,
    left: -width * 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: height * 0.08,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  tagline: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.9,
  },
  loginContainer: {
    width: '100%',
  },
  googleButton: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 10,
    lineHeight: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dividerText: {
    marginHorizontal: 18,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  guestButton: {
    borderRadius: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  guestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  benefitText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  footerLink: {
    fontWeight: '800',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
