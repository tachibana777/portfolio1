import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui";

const RESUME_PATH = "/kritsada-hongpatsa-cv.png";

export function HeroSection() {
  return (
    <Reveal>
      <section className="pb-10">
        <div className="mb-7 flex items-center gap-4">
          <Image src="/profile.jpg" alt="Kritsada Hongpatsa" width={76} height={76} priority className="h-[72px] w-[72px] rounded-full border border-neutral-300 object-cover grayscale" />
          <div>
            <h1 className="flex items-center gap-1.5 text-lg font-semibold">Kritsada Hongpatsa <BadgeCheck size={16} className="fill-sky-500 text-ink" /></h1>
            <div className="mt-1.5 flex gap-2.5 text-neutral-400">
              <Link href="https://github.com/tachibana777" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={14} /></Link>
              <Linkedin size={14} aria-label="LinkedIn" />
              <Mail size={14} aria-label="Email" />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-medium tracking-[-.025em] sm:text-[22px]">PENETRATION TESTER— <span className="font-normal text-neutral-500">Offensive Security</span></h2>
        <p className="mt-4 max-w-[680px] text-[13px] leading-7 text-neutral-400">I&apos;m a Computer Engineering student focused on Penetration Testing, Offensive Security, and Application Security. My interests include Web Application Security, API Security, Vulnerability Assessment, Reconnaissance, Exploitation, and Security Testing. I enjoy breaking down how systems work, identifying security weaknesses, understanding their root causes, and finding practical ways to improve them.</p>
        <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 rounded bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-white">View Resume <ArrowRight size={13} /></a>
      </section>
    </Reveal>
  );
}
