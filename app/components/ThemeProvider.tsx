"use client";
import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  isDarkMode: "light" | "dark";
  setIsDarkMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<"light" | "dark">("light");
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeToggle must be used within a ThemeProvider");
  return context;
}

export default ThemeProvider;
