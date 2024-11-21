import React from "react";
import { Text, StyleSheet } from "react-native";

const TruncatedText = ({ description, colors }: any) => {
  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const maxLength = 250;
  const truncatedDescription = truncateText(description, maxLength);

  return (
    <Text
      style={[styles.foodDescription, { color: colors.secondaryText }]}
      numberOfLines={2}
    >
      {truncatedDescription}
    </Text>
  );
};

const styles = StyleSheet.create({
  foodDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default TruncatedText;
