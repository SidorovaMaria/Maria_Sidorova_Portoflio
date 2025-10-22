"use client";
import { useTheme } from "next-themes";
import React from "react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle theme</button>
    </>
  );
};

export default ThemeToggle;
