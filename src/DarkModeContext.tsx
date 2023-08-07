import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

export type DarkModeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || themes.light); 
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.dark ? themes.light : themes.dark
    );
  };
  localStorage.setItem('theme', theme)
  
  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};






