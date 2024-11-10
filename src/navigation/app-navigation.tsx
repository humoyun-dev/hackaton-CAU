import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => <AppNavigator />;

export default App;
