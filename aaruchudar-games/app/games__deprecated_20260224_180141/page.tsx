import type { Metadata } from "next";
import GamesPage from "./GamesPage";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "Brain Games Online | Play Intelligence Games at Aaruchudar",
  description:
    "Explore brain games and intelligence games online designed to train memory, logic, and cognitive skills.",
  keywords: [
    "brain games online",
    "intelligence games",
    "mind training games",
    "cognitive games",
  ],
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <GamesPage />;
}
