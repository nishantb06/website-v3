"use client";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";

export function GithubCal() {
  const { theme } = useTheme();

  const colorScheme = theme === "dark" ? "dark" : "light";
  const customTheme = {
    light: ['#FFFFFF', '#C0C0C0', '#808080', '#404040', '#000000'],
    dark: ['#27272a', '#3f3f46', '#52525b', '#71717a', '#a1a1aa'],
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-2">
      <div className="scale-75 transform origin-center">
        <GitHubCalendar
          colorScheme={colorScheme}
          username="nishantb06"
          showWeekdayLabels={false}
          fontSize={16}
          theme={customTheme}
        />
      </div>
    </div>
  );
}
