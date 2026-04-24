import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';

interface SafeImageProps extends ImageProps {
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  source, 
  style, 
  fallbackIcon = 'image-outline',
  ...props 
}) => {
  const [error, setError] = useState(false);

  if (error || !source || (typeof source === 'object' && 'uri' in source && !source.uri)) {
    return (
      <View style={[styles.fallback, style]}>
        <Ionicons name={fallbackIcon} size={32} color="#94A3B8" />
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
