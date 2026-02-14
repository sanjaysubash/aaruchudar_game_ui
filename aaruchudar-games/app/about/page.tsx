import type { Metadata } from "next";
import AboutPage from "./AboutPage";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "About Us | Human Intelligence Games Platform",
  description:
    "Learn about Aaruchudar Brain Games, a human intelligence games platform focused on brain training and cognitive development.",
  keywords: [
    "human intelligence games platform",
    "brain games platform",
    "intelligence training games",
  ],
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <AboutPage />;
}
