import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type BannerProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const Banner: React.FC<BannerProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: imageUrl }} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginRight: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  bannerImage: {
    width: 300,
    height: 150,
    resizeMode: "cover",
  },
  bannerTextContainer: {
    padding: 10,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});

export default Banner;
