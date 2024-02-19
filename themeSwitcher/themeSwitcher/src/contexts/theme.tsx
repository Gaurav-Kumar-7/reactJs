import { useContext, createContext } from "react";


export const ThemeContext  = createContext({
    themeMode: "light",
    lightThemeMode: () => {},
    darkThemeMode: () => {}
});

export const ThemeProvider = ThemeContext.Provider

// hooks

export default function useTheme() {
    return useContext(ThemeContext);
}