import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ChallengeCardProps = {
  name: string;
  description: string;
  duration: string;
  imageUrl: string;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  name,
  description,
  duration,
  imageUrl,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.duration}>{duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: 200,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  duration: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
});

export default ChallengeCard;
