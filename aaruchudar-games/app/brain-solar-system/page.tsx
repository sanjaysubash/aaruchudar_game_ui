import type { Metadata } from "next";
import BrainSolarSystemPage from "./BrainSolarSystemPage";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "Brain Solar System | Interactive Brain Intelligence Games",
  description:
    "Experience the Brain Solar System with interactive brain intelligence games designed to enhance cognitive and visual thinking skills.",
  keywords: [
    "brain solar system",
    "interactive brain games",
    "brain intelligence games",
    "cognitive brain games",
    "human intelligence games",
    "visual intelligence games",
  ],
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <BrainSolarSystemPage />;
}
