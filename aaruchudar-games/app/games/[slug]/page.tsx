import { games } from "@/data/games";
import ClientGame from "@/components/game/ClientGame";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

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
