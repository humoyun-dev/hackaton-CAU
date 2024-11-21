import "./global.css";
import MainTabNavigation from "./src/navigations/main.navigation";
import { ThemeProvider } from "./src/providers/theme.provider";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <MainTabNavigation />
      </ThemeProvider>
    </>
  );
}
