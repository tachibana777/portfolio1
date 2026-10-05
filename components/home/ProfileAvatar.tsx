"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ANIME_IMAGE = "/anime.jpg";
const REAL_IMAGE = "/profile.jpg";
const GRID_SIZE = 8;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

// Deterministic disorder keeps server/client rendering stable while making
// neighboring pieces disappear at noticeably different times.
const tileDelay = (index: number) => ((index * 29) % TILE_COUNT) * 0.0045;

function AnimeTile({ index, revealed }: Readonly<{ index: number; revealed: boolean }>) {
  const column = index % GRID_SIZE;
  const row = Math.floor(index / GRID_SIZE);

  return (
    <motion.span
      className="block h-full w-full bg-no-repeat"
      style={{
        backgroundImage: `url(${ANIME_IMAGE})`,
        backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
        backgroundPosition: `${(column / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
      }}
      initial={false}
      animate={revealed
        ? { opacity: 0, scale: [1, 0.72, 0], rotate: index % 2 ? 3 : -3 }
        : { opacity: 1, scale: 1, rotate: 0 }
      }
      transition={{
        duration: revealed ? 0.22 : 0.18,
        delay: tileDelay(index),
        ease: revealed ? [0.4, 0, 1, 1] : [0, 0, 0.2, 1],
      }}
    />
  );
}

export function ProfileAvatar() {
  const [isHovered, setIsHovered] = useState(false);
  const showRealPhoto = isHovered;

  return (
    <motion.div
      className="relative h-32 w-32 sm:h-40 sm:w-40 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-neutral-400 bg-white shadow-sm select-none"
      aria-label="Hover to reveal Kritsada's real profile photo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsHovered(true)}
      onTap={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: showRealPhoto ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isHovered ? 0.28 : 0 }}
      >
        <Image
          src={REAL_IMAGE}
          alt="Kritsada Hongpatsa"
          fill
          sizes="(min-width: 640px) 160px, 128px"
          className="object-cover [image-rendering:-webkit-optimize-contrast]"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white"
        initial={false}
        animate={{ opacity: isHovered ? [0, 1, 1, 0] : 0 }}
        transition={{ duration: 0.48, times: [0, 0.15, 0.68, 1] }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: TILE_COUNT }, (_, index) => (
          <AnimeTile key={index} index={index} revealed={isHovered} />
        ))}
      </div>

      <span aria-hidden className="pointer-events-none absolute inset-0 z-30 rounded-full ring-1 ring-inset ring-white/25" />
    </motion.div>
  );
}
