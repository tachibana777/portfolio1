"use client";

import GitHubCalendar from "react-github-calendar";

const activityTheme = {
  dark: ["#14201c", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function GitHubActivity() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line p-4 text-xs text-neutral-400">
      <GitHubCalendar username="tachibana777" blockSize={9} blockMargin={3} fontSize={11} colorScheme="dark" theme={activityTheme} />
    </div>
  );
}
