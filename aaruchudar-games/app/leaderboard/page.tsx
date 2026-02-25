import type { Metadata } from "next";
import LeaderBoard from "./LeaderBoard";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "Leaderboard | Aaruchudar Brain Games",
  description:
    "View the leaderboard on Aaruchudar Brain Games, where you can see top players and their scores across different time periods.",
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <LeaderBoard />;
}

