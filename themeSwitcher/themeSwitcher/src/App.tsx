import { useEffect, useState } from "react";
import "./App.css";
import ThemeBtn from "./components/ThemeBtn.tsx";
import Card from "./components/card.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightThemeMode = () => {
    setThemeMode("light");
  };

  const darkThemeMode = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("light", "dark");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightThemeMode, darkThemeMode }}>
      <div>
        <ThemeBtn />
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
            <div className="w-full max-w-sm mx-auto">
              <Card />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
