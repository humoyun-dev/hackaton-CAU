import React from "react";
import AppRouter from "./src/navigation/app-navigation";
import Toast from "react-native-toast-message";
import { WishProvider } from "./src/store/wish";
import { AuthProvider } from "./src/store/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <WishProvider>
          <AppRouter />
        </WishProvider>
      </AuthProvider>
      <Toast />
    </>
  );
};

export default App;
