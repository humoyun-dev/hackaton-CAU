// Define the User interface
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string; // Optional field for profile picture
  preferences: {
    darkMode: boolean;
    favoriteCategories: number[]; // Array of category IDs
  };
  mealPlan: {
    date: string;
    meals: { foodId: number; quantity: number }[]; // Array of food items with quantities
  }[];
}

// Sample user data
export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
  preferences: {
    darkMode: false,
    favoriteCategories: [1, 3], 
  },
  mealPlan: [
    {
      date: "2024-11-21",
      meals: [
        { foodId: 101, quantity: 2 },
        { foodId: 102, quantity: 1 },
      ],
    },
    {
      date: "2024-11-22",
      meals: [
        { foodId: 103, quantity: 3 },
        { foodId: 104, quantity: 1 },
      ],
    },
  ],
};

// Function to get the user data
export const getUser = (): User => {
  return mockUser;
};

// Function to update user preferences
export const updateUserPreferences = (
  newPreferences: Partial<User["preferences"]>
): User => {
  mockUser.preferences = { ...mockUser.preferences, ...newPreferences };
  return mockUser;
};

// Function to add a meal to the meal plan
export const addMealToPlan = (
  date: string,
  foodId: number,
  quantity: number
): User => {
  const mealPlanForDate = mockUser.mealPlan.find((plan) => plan.date === date);
  if (mealPlanForDate) {
    mealPlanForDate.meals.push({ foodId, quantity });
  } else {
    mockUser.mealPlan.push({ date, meals: [{ foodId, quantity }] });
  }
  return mockUser;
};
