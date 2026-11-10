"use client";

import Image from "next/image";
import { Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { useEffect } from "react";

export type EventCategory = "All" | "Nature & Travel" | "Cybersecurity Work" | "Events & Competitions" | "Everyday Moments";

export type EventItem = {
  file: string;
  title: string;
  category: Exclude<EventCategory, "All">;
};

const categories: EventCategory[] = ["All", "Nature & Travel", "Events & Competitions", "Cybersecurity Work", "Everyday Moments"];
const allViewOrder: EventItem["category"][] = ["Nature & Travel", "Cybersecurity Work", "Events & Competitions", "Everyday Moments"];

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function buildBalancedRandomOrder(items: EventItem[]) {
  const buckets = new Map(allViewOrder.map((category) => [category, shuffle(items.filter((item) => item.category === category))]));
  const mixed: EventItem[] = [];
  let index = 0;
  while (mixed.length < items.length) {
    for (const category of allViewOrder) {
      const item = buckets.get(category)?.[index];
      if (item) mixed.push(item);
    }
    index += 1;
  }
  return mixed;
}

export function EventGallery({ items }: Readonly<{ items: EventItem[] }>) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [visibleItems, setVisibleItems] = useState(items);

  function randomizeAll() {
    setVisibleItems(buildBalancedRandomOrder(items));
  }

  useEffect(() => {
    if (activeCategory === "All") {
      randomizeAll();
    } else {
      setVisibleItems(items.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory, items]);

  const filteredItems = useMemo(
    () => activeCategory === "All" ? visibleItems : visibleItems.filter((item) => item.category === activeCategory),
    [activeCategory, visibleItems],
  );
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
        {activeCategory === "All" && (
          <button type="button" onClick={randomizeAll} className="event-filter inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium">
            <Shuffle size={13} /> Shuffle
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filteredItems.map((item) => (
          <figure key={item.file} className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-panel shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800/80">
            <div className="relative aspect-[4/3] overflow-hidden">
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
