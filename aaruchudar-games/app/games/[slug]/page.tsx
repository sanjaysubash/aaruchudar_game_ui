import { games } from "@/data/games";
import ClientGame from "@/components/game/ClientGame";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return notFound();
  return <ClientGame game={game} />;
}
