import type { Metadata } from "next";
import ProfilePage from "./ProfilePage";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "User Profile | Aaruchudar Brain Games",
  description:
    "Access and manage your user profile on Aaruchudar Brain Games, where you can track your game progress, achievements, and customize your gaming experience.",
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <ProfilePage />;
}
