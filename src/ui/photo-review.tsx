import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
}: {
  photo: string;
  handleRetakePhoto?: () => void;
}) => {
  const scanAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start scanning animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 1500, // Faster scanning effect
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 1500, // Return animation
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => scanAnimation.stopAnimation();
  }, [scanAnimation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo }}
        />

        {/* Scanning animation */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [
                {
                  translateY: scanAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width/2], // Moves from top to bottom
                  }),
                },
              ],
              backgroundColor: scanAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [
                  'rgba(0, 255, 0, 0.8)', // Start green
                  'rgba(255, 255, 0, 0.8)', // Transition to yellow
                  'rgba(255, 0, 0, 0.8)', // End red
                ],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topButton} onPress={handleRetakePhoto}>
          <Fontisto name="close-a" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        {/* Add buttons if needed */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: width,
    height: width, // Square container
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Absolute positioning for scan line
  },
  preview: {
    width: width,
    height: width,
    resizeMode: 'contain',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 4, // Increased thickness for visibility
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  topButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 25,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    width: '100%',
  },
});

export default PhotoPreviewSection;
