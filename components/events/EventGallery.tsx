"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type EventCategory = "All" | "Nature & Travel" | "Cybersecurity Work" | "Events & Competitions" | "Everyday Moments";

export type EventItem = {
  file: string;
  title: string;
  category: Exclude<EventCategory, "All">;
};

const categories: EventCategory[] = ["All", "Nature & Travel", "Events & Competitions", "Cybersecurity Work", "Everyday Moments"];
const natureFirst = [
  "IMG_20260614_105750_243.webp",
  "1781420030240.jpg",
  "IMG_20260401_155412_339.webp",
  "IMG_0341.jpg",
  "IMG_1837.jpg",
  "IMG_6599.jpg",
];

export function EventGallery({ items }: Readonly<{ items: EventItem[] }>) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const filteredItems = useMemo(() => {
    const selected = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);
    if (activeCategory !== "All") return selected;

    return [...selected].sort((a, b) => {
      const aRank = natureFirst.indexOf(a.file);
      const bRank = natureFirst.indexOf(b.file);
      if (aRank === -1 && bRank === -1) return 0;
      if (aRank === -1) return 1;
      if (bRank === -1) return -1;
      return aRank - bRank;
    });
  }, [activeCategory, items]);
  const featuredItems = activeCategory === "All" ? filteredItems.filter((item) => item.category === "Nature & Travel") : [];
  const galleryItems = activeCategory === "All" ? filteredItems.filter((item) => item.category !== "Nature & Travel") : filteredItems;

  return (
    <div className="mt-8">
      <div className="mb-7 flex flex-wrap items-center gap-2" role="tablist" aria-label="Event photo categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`event-filter rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${activeCategory === category ? "event-filter-active" : ""}`}
          >
            {category}
          </button>
        ))}
        <span className="ml-auto text-xs text-neutral-500">{filteredItems.length} photos</span>
      </div>

      {featuredItems.length > 0 && (
        <div className="mb-8 -mx-1 overflow-x-auto pb-3 [scrollbar-width:thin]">
          <div className="flex w-max gap-4 px-1">
            {featuredItems.map((item) => (
              <figure key={item.file} className="group relative w-[220px] shrink-0 overflow-hidden rounded-2xl border border-neutral-200/80 bg-panel shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800/80 sm:w-[260px]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={`/events/${encodeURIComponent(item.file)}`} alt={item.title} fill sizes="260px" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-3 pt-12"><figcaption className="text-sm font-medium text-white">{item.title}</figcaption></div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((item, index) => (
          <figure key={item.file} className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-neutral-200/80 bg-panel shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800/80">
            <div className={`relative overflow-hidden ${index % 5 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={`/events/${encodeURIComponent(item.file)}`}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 330px, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-12 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <figcaption className="text-sm font-medium text-white">{item.title}</figcaption>
                <p className="mt-0.5 text-[11px] text-white/70">{item.category}</p>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
