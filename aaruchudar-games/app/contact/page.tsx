import type { Metadata } from "next";
import ContactPage from "./ContactPage";

/* ✅ SEO METADATA */
export const metadata: Metadata = {
  title: "Contact Us | Aaruchudar Brain Games",
  description:
    "Get in touch with Aaruchudar Brain Games for support, feedback, and queries related to our intelligence games platform.",
  keywords: [
    "contact brain games", 
    "aaruchudar brain games contact",
    "intelligence games support",
    
  ],
};

/* ✅ SERVER PAGE */
export default function Page() {
  return <ContactPage />;
}
