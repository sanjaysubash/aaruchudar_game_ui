"use client";

// Configurable floating background with adjustable intensity, density/scale, base tint, and icon sets
export default function FloatingBackground({
  intensity = "normal", // lighter | normal | darker
  tile = 64, // px size of each repeating tile; smaller = denser, larger = roomier
  baseTint = "deep", // "deep" | "warm" | any CSS color string
  icons = "classic", // "classic" | "gamer"
  opacity = 0.4, // overall layer opacity
}: {
  intensity?: "lighter" | "normal" | "darker";
  tile?: number;
  baseTint?: "deep" | "warm" | string;
  icons?: "classic" | "gamer";
  opacity?: number;
} = {}) {
  const shades = {
    lighter: { color: "#F9E89C", strokeOpacity: 0.16 },
    normal: { color: "#F5D76E", strokeOpacity: 0.18 },
    darker: { color: "#D4B846", strokeOpacity: 0.24 },
  } as const;

  const { color: strokeColor, strokeOpacity } =
    shades[intensity as keyof typeof shades] ?? shades.normal;

  // Scale stroke width with tile so visuals stay consistent across sizes
  const strokeWidth = (1.25 * tile) / 64;

  const baseColor =
    baseTint === "deep"
      ? "#000000"
      : baseTint === "warm"
      ? "#0b0a07"
      : (baseTint as string);

  // SVG icon groups
  const classicIcons = `
    <!-- Star (top-left) -->
    <path d='M12 6 L13.8 10.4 L18.6 10.8 L14.8 13.8 L16.2 18.4 L12 15.6 L7.8 18.4 L9.2 13.8 L5.4 10.8 L10.2 10.4 Z' />

    <!-- Coin (top-right) -->
    <circle cx='48' cy='12' r='7' />
    <circle cx='48' cy='12' r='4' opacity='0.7' />

    <!-- Hexagon (center) -->
    <polygon points='26,32 29,26.8 35,26.8 38,32 35,37.2 29,37.2' />

    <!-- Joystick (bottom-left) -->
    <circle cx='12' cy='42' r='2' />
    <path d='M12 44 V48' />
    <rect x='8' y='48' width='8' height='4' rx='1' />

    <!-- Lightning bolt (bottom-right) -->
    <path d='M46 40 L42 50 H48 L44 60 L54 46 H48 L52 40 Z' />
  `;

  const gamerIcons = `
    <!-- Controller (top-left) -->
    <rect x='6' y='6' width='16' height='10' rx='4' />
    <path d='M10 11 h4 M12 9 v4' />
    <circle cx='18' cy='11' r='1.3' />
    <circle cx='20.5' cy='11' r='1.3' />

    <!-- Heart (top-right) -->
    <path d='M48 8
             c-2.2 -3 -7 -1.5 -7 2
             c0 5 7 8 7 8
             s7 -3 7 -8
             c0 -3.5 -4.8 -5 -7 -2Z' />

    <!-- Trophy (center) -->
    <path d='M28 24 h8 v5
             c0 4 -3 7 -8 7
             c-5 0 -8 -3 -8 -7 v-5 h8' />
    <path d='M20 26 h-4 c0 6 5 8 7 8' />
    <path d='M36 26 h4 c0 6 -5 8 -7 8' />
    <rect x='26' y='36' width='8' height='2' rx='1' />

    <!-- Mushroom (bottom-left) -->
    <path d='M6 46
             c0 -6 8 -8 12 -8
             c4 0 12 2 12 8
             h-24 Z' />
    <rect x='16' y='46' width='4' height='6' rx='1' />
    <circle cx='14' cy='43' r='2' />
    <circle cx='22' cy='43' r='2' />

    <!-- Trophy star (bottom-right, small accent) -->
    <path d='M52 48 L53 50 L55.5 50.2 L53.4 51.6 L54.2 54 L52 52.8 L49.8 54 L50.6 51.6 L48.5 50.2 L51 50 Z' />
  `;

  const iconsMarkup = icons === "gamer" ? gamerIcons : classicIcons;

  const pattern =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
        <g fill='none' stroke='${strokeColor}' stroke-width='${strokeWidth}' stroke-opacity='${strokeOpacity}' stroke-linecap='round' stroke-linejoin='round'>
          ${iconsMarkup}
        </g>
      </svg>`
    );

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-50"
      style={{
        backgroundColor: baseColor,
        backgroundImage: `url(${pattern})`,
        backgroundSize: `${tile}px ${tile}px`,
        backgroundRepeat: "repeat",
        opacity,
      }}
      aria-hidden
    />
  );
}
