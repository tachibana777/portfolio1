"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, SectionHeading } from "@/components/ui";

const interests = ["Gaming", "Guitar", "Music"];
const outsideImages = [
  "/outside/IMG_1394.JPG",
  "/outside/IMG_1841.JPG",
  "/outside/IMG_0824.JPG",
  "/outside/IMG_20260614_111212.jpg",
];

export function OutsideSection() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <Reveal>
      <section className="py-10">
        <SectionHeading title="Outside the IDE" />
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_210px]">
          <div>
            <p className="text-[13px] leading-6 text-neutral-400">When I&apos;m not working, I usually relax by playing the guitar and listening to music, or by playing games with friends.</p>
            <div className="mt-4 flex gap-2">
              {interests.map((interest) => <span key={interest} className="rounded-full border border-neutral-800 px-3 py-1 text-[11px] text-neutral-400">{interest}</span>)}
            </div>
          </div>
          <button
            type="button"
            className="relative mx-auto block h-[205px] w-[210px] cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-300"
            onClick={() => setActiveImage((current) => (current + 1) % outsideImages.length)}
            aria-label={`Show next outside the IDE photo, currently showing photo ${activeImage + 1} of ${outsideImages.length}`}
          >
            {outsideImages.map((src, index) => {
              const position = (index - activeImage + outsideImages.length) % outsideImages.length;

              return (
                <div
                  key={src}
                  className="absolute left-1 top-1 h-[180px] w-[180px] overflow-hidden rounded-md border border-neutral-300 bg-neutral-900 shadow-2xl transition-transform duration-700 ease-in-out"
                  style={{
                    zIndex: outsideImages.length - position,
                    transform: `translate(${position * 8}px, ${position * 7}px) rotate(${position === 0 ? -3 : position * 2 - 2}deg)`,
                  }}
                  aria-hidden={position !== 0}
                >
                  <Image
                    src={src}
                    alt={`Kritsada outside the IDE, photo ${index + 1}`}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </button>
        </div>
      </section>
    </Reveal>
  );
}
