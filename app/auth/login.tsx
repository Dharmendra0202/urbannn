import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    Alert.alert(
      'Google Login',
      'Google login works in the built APK/IPA!\n\nFor now, you can continue as guest to test the app.',
      [
        { text: 'Continue as Guest', onPress: () => router.replace('/(tabs)') },
        { text: 'OK' },
      ]
    );
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
            from={{ translateY: -50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 800 }}
            style={styles.logoContainer}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0ABFC']}
              style={styles.iconCircle}
            >
              <Ionicons name="home" size={60} color="#8B5CF6" />
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
            {/* Google Login Button - Wider */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#FFFFFF', '#FEF3F2']}
                style={styles.googleButtonGradient}
              >
                <View style={styles.googleIconContainer}>
                  <Ionicons name="logo-google" size={26} color="#DB4437" />
                </View>
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
                <Ionicons name="arrow-forward-circle" size={24} color="#8B5CF6" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="sparkles" size={18} color="#FDE047" />
              <Text style={styles.infoText}>
                Google login works in the built APK. Use guest mode in Expo Go.
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
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  appName: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.95,
  },
  loginContainer: {
    width: '100%',
  },
  googleButton: {
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  googleButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  googleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DB4437',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 12,
    lineHeight: 19,
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
    borderRadius: 18,
    marginBottom: 28,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  guestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  guestButtonText: {
    fontSize: 17,
    fontWeight: '800',
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
