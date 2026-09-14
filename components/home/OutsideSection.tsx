import Image from "next/image";
import { Reveal, SectionHeading } from "@/components/ui";

const interests = ["Gaming", "Guitar", "Music"];

export function OutsideSection() {
  return (
    <Reveal>
      <section className="py-8">
        <SectionHeading title="Outside the IDE" />
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_210px]">
          <div>
            <p className="text-xs leading-6 text-neutral-400">When I&apos;m not working, I usually relax by playing the guitar and listening to music, or by playing games with friends.</p>
            <div className="mt-4 flex gap-2">
              {interests.map((interest) => <span key={interest} className="rounded-full border border-neutral-800 px-2.5 py-1 text-[9px] text-neutral-400">{interest}</span>)}
            </div>
          </div>
          <Image src="/outside/IMG_1394.JPG" alt="Kritsada outside the IDE" width={210} height={145} className="h-36 w-full rotate-2 rounded-xl object-cover shadow-2xl" />
        </div>
      </section>
    </Reveal>
  );
}
