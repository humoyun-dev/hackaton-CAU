import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meal } from '../screens/type';

interface WishContextType {
  wishList: Meal[];
  addToWish: (meal: Meal) => void;
  removeFromWish: (mealId: number) => void;
  isItWish: (mealId: number) => boolean;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWish = () => {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error('useWish must be used within a WishProvider');
  }
  return context;
};

interface WishProviderProps {
  children: ReactNode;
}

export const WishProvider: React.FC<WishProviderProps> = ({ children }) => {
  const [wishList, setWishList] = useState<Meal[]>([]);

  const addToWish = (meal: Meal) => {
    setWishList((prevWishList) => [...prevWishList, meal]);
  };

  const removeFromWish = (mealId: number) => {
    setWishList((prevWishList) =>
      prevWishList.filter((meal) => meal.id !== mealId)
    );
  };

  const isItWish = (mealId: number) => {
    return wishList.some((meal) => meal.id === mealId);
  };

  return (
    <WishContext.Provider
      value={{ wishList, addToWish, removeFromWish, isItWish }}
    >
      {children}
    </WishContext.Provider>
  );
};
