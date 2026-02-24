import { games } from "@/data/games";
import ClientGame from "@/components/game/ClientGame";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ✅ Static params for SSG */
export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

/* ✅ SEO METADATA – AUTO FOR EACH GAME */
export async function generateMetadata(
  props: { params: Promise<{ slug?: string }> }
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const game = games.find((g) => g.slug === slug);

  if (!game) {
    return {
      title: "Human Intelligence Games | Aaruchudar Brain Games",
      description:
        "Play human intelligence games and brain games online to improve memory, logic, and thinking skills.",
    };
  }

  return {
    title: `${game.title} | Human Intelligence Game`,
    description: `Play ${game.title}, a human intelligence game designed to improve ${game.intelligenceType.toLowerCase()} skills through engaging brain challenges.`,
    keywords: [
      "human intelligence games",
      "human intelligence game",
      "intelligence games",
      "brain games",
      `${game.title} game`,
      `${game.intelligenceType.toLowerCase()} intelligence game`,
    ],
  };
}


/* ✅ PAGE COMPONENT */
export default async function GamePage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const resolved = await params;
  const slug = typeof resolved.slug === "string" ? resolved.slug : undefined;

  if (!slug) return notFound();

  const game = games.find((g) => g.slug === slug);
  if (!game) return notFound();

  return <ClientGame game={game} />;
}
