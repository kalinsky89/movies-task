import { useDarkMode } from "./DarkModeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <div className="switcherWrapper">
      <span className="modes">Light Mode</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider pseudo"></span>
      </label>
      <span className="modes">Dark Mode</span>
    </div>
  );
};

export default ThemeSwitcher;
