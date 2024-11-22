import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OpenAIChatRequest, OpenAIChatResponse } from "../../providers/dtos";
import OpenAIService from "../../providers/openai.service";
import PhotoPreviewSection from "../../ui/photo-review";

const { width } = Dimensions.get("window");

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation();

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Requesting camera permission...
        </Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <Button
          onPress={requestPermission}
          title="Grant Permission"
          color="#841584"
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    setLoading(true);

    try {
      // Capture the photo without Base64 encoding (to allow compression)
      const options = { quality: 1, base64: false };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);

      if (!takenPhoto?.uri) {
        throw new Error("Failed to capture the photo.");
      }

      setCapturedPhoto(takenPhoto);

      const optimizeImage = async (uri: string): Promise<string> => {
        try {
          const optimizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 470 } }],
            { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
          );

          const base64Image = await ImageManipulator.manipulateAsync(
            optimizedImage.uri,
            [],
            { base64: true }
          );

          if (!base64Image.base64) {
            throw new Error("Failed to encode the image as Base64.");
          }

          return base64Image.base64;
        } catch (error) {
          console.error("Error optimizing image:", error);
          throw error;
        }
      };

      const base64Image = await optimizeImage(takenPhoto.uri);

      console.log("Optimized Image:", base64Image);

      const chatRequest: OpenAIChatRequest = {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Analyze the provided image and determine whether it depicts a dish (food item) or not.
                    Follow these guidelines for generating the response:
                    - If the image does not depict a dish:
                      Respond with:
                      {
                        "success": false,
                        "message": "The image does not depict a dish."
                      }
                    - If the image depicts a dish:
                      Respond with:
                      {
                        "success": true,
                        "meal_name": "<meal_name>",
                        "ingredients": [
                          {
                            "name": "<ingredient_name>",
                            "calories": <calories_per_ingredient>,
                            "protein": "<protein_content>",
                            "fat": "<fat_content>",
                            "carbohydrates": "<carbohydrates_content>"
                          }
                        ],
                        "total_nutrition": {
                          "calories": <total_calories>,
                          "protein": "<total_protein>",
                          "fat": "<total_fat>",
                          "carbohydrates": "<total_carbohydrates>"
                        }
                      }
                    Always respond in JSON format. Clearly identify whether the image is a dish or not. For dishes, include detailed nutritional information for each ingredient and totals for the dish. If any data is missing or unavailable, include a note in the response.`,
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` },
              },
            ],
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };

      const response: OpenAIChatResponse = await OpenAIService.completions(
        chatRequest
      );

      if (!response?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from OpenAI.");
      }

      const aiResponse = response.choices[0].message.content;

      console.log("AI Response:", aiResponse);

      if (aiResponse.success) {
        // navigation.navigate("ResultsPage", {
        //   photo: takenPhoto,
        //   foods: aiResponse,
        // });
      } else {
        Alert.alert("The image does not depict a dish");
      }
    } catch (error) {
      console.error("Error during photo processing:", error.message || error);
      Alert.alert("Error during photo processing:");
    } finally {
      setLoading(false);
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null); // Clear the photo and return to the camera view
  };

  if (capturedPhoto) {
    return (
      <PhotoPreviewSection
        photo={capturedPhoto}
        handleRetakePhoto={handleRetakePhoto}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      <View style={styles.bottomBar}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePhoto}
          >
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: width,
    height: width,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  topBar: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  topButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
  },
  bottomBar: {
    marginTop: 20,
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
});
