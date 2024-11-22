import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Определяем интерфейсы для категорий фитнеса и челленджей
interface FitnessCategory {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  duration: string;
  imageUrl: string;
}

const FitnesDetailScreen = () => {
  const fitnessCategories: FitnessCategory[] = [
    {
      id: 1,
      name: "Yoga",
      description: "Improve flexibility and relax your mind.",
      imageUrl:
        "https://res.cloudinary.com/peloton-cycle/image/fetch/c_fill,dpr_1.0,w_1280,h_720,x_905,y_1337/f_auto/q_auto/https://images.ctfassets.net/6ilvqec50fal/4etuYztO7f1eMUnRn8e4Ia/62281f46a148c25651f09b8f8287ad0c/GettyImages-1223389038.jpg",
    },
    {
      id: 2,
      name: "HIIT",
      description: "Burn calories quickly with high intensity.",
      imageUrl:
        "https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blta585249cb277b1c3/5fdcfa83a703d10ab87e827b/HIIT.jpg?format=pjpg&auto=webp&quality=76&width=1232",
    },
    {
      id: 3,
      name: "Pilates",
      description: "Enhance core strength and posture.",
      imageUrl:
        "https://www.vital-balance.com/wp-content/uploads/2020/04/pilates-1080x675.jpg",
    },
    {
      id: 4,
      name: "Strength Training",
      description: "Build muscle and increase strength.",
      imageUrl:
        "https://www.verywellfit.com/thmb/wfnguhCstO5GjNzsRHizh4RJ4HY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-455244937-598090e8b2144344af56ba5f836e9072.jpg",
    },
    {
      id: 5,
      name: "Cardio",
      description: "Boost your heart health and endurance.",
      imageUrl:
        "https://www.shape.com/thmb/DjCIHGX6cWaIniuqHeBAAreNE08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600.jpg",
    },
    {
      id: 6,
      name: "Dance",
      description: "Have fun while burning calories.",
      imageUrl:
        "https://www.rockstaracademy.com/lib/images/news/Contemporary%20dance.jpeg",
    },
    {
      id: 7,
      name: "Cycling",
      description: "Improve leg strength and stamina.",
      imageUrl:
        "https://www.trainerroad.com/blog/wp-content/uploads/2021/11/benefits-of-cycling.jpg",
    },
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      name: "All Beef Diet",
      description:
        "Explore a strict carnivore diet focusing only on beef products.",
      duration: "30 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYS2-5RAqqVFUtC_3YitqJmnnsoOVm75qX7w&s",
    },
    {
      id: 2,
      name: "Keto Diet",
      description:
        "Embrace a low-carb, high-fat diet to improve energy levels and fat loss.",
      duration: "14 days",
      imageUrl:
        "https://www.julienutrition.com/wp-content/uploads/2021/03/Pros-and-cons-of-keto-diet-according-to-nutritionists-dietitians.jpg",
    },
    {
      id: 3,
      name: "Meditation Challenge",
      description: "Commit to 10 minutes of daily mindfulness meditation.",
      duration: "21 days",
      imageUrl:
        "https://www.verywellmind.com/thmb/4ezMvupLUSSF9NzD5wqeJjtLekA=/2119x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-938890492-becc3fc4757849bea672f148454943f9.jpg",
    },
    {
      id: 4,
      name: "Cold Shower Challenge",
      description: "Boost your energy and resilience with daily cold showers.",
      duration: "7 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlaJqGzuY9bNsNNIPqbzOeXae1uQtoGa7cQ&s",
    },
    {
      id: 5,
      name: "100 Pushups a Day",
      description: "Improve your strength with 100 pushups every day.",
      duration: "30 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNeSzZOi9CHQmvHkPRVY9pTwdz9MLBXlN5Jg&s",
    },
    {
      id: 6,
      name: "Sugar-Free Challenge",
      description: "Eliminate added sugars from your diet.",
      duration: "14 days",
      imageUrl:
        "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2147669353/images/fed764-a186-36ca-8dd7-3da83c04f1eb_No_Sugar_Kajabi_Thumbnail.png",
    },
    {
      id: 7,
      name: "Step Count Challenge",
      description: "Reach 10,000 steps every day.",
      duration: "30 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp5GJY3nK9MtdVMQxO44BdANDB3uZccj2YQ&s",
    },
    {
      id: 8,
      name: "Plant-Based Diet",
      description: "Focus on whole foods and plant-based nutrition.",
      duration: "21 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9s5OHpXDfV1h2jfu9HF39sMfi3Ckuq-yw_g&s",
    },
    {
      id: 9,
      name: "Sleep Improvement",
      description: "Aim for 8 hours of quality sleep each night.",
      duration: "30 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrY3rIzLY5Oo7pzavF5l3ltrPi0yTH5cUa_A&s",
    },
    {
      id: 10,
      name: "Daily Journaling",
      description: "Reflect on your day with nightly journaling.",
      duration: "30 days",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupFuY10yb2I5A3ljWRe-TV4euN8ve9qHlWg&s",
    },
  ];

  const handleCategoryPress = (category: FitnessCategory) => {
    console.log("Selected Category:", category);
  };

  const handleChallengePress = (challenge: Challenge) => {
    console.log("Selected Challenge:", challenge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fitness Categories</Text>
      <FlatList
        data={fitnessCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => handleCategoryPress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoryDescription: {
    fontSize: 14,
    color: "#555",
  },
  challengeContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  challengeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  challengeText: {
    flex: 1,
  },
  challengeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#555",
  },
  challengeDuration: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});

export default FitnesDetailScreen;
