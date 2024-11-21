import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.preview}
        source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
      />
    </View>

    <View style={styles.topBar}>
      <TouchableOpacity style={styles.topButton} onPress={handleRetakePhoto}>
        <Fontisto name="close-a" size={24} color="#fff" />
      </TouchableOpacity>
    </View>

    <View style={styles.bottomBar}>
      {/* Additional buttons can be added here */}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  imageContainer: {
    width: width,
    height: width, // Square container
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: width,
    height: width,
    resizeMode: 'contain', // Adjusted to 'contain'
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
