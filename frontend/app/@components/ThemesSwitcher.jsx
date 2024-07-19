"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemesSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center rounded-full text-black dark:text-white">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemesSwitcher;
