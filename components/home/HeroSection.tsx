import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui";
import { ProfileAvatar } from "./ProfileAvatar";

const RESUME_PATH = "/kritsada-hongpatsa-cv.png";
const WRITEUP_URL = "https://write-up-chi-ashy.vercel.app/";

export function HeroSection() {
  return (
    <Reveal>
      <section className="pb-10">
        <div className="mb-7 flex items-center gap-5 sm:gap-6">
          <ProfileAvatar />
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl text-neutral-100">
              Kritsada Hongpatsa <BadgeCheck size={19} className="fill-sky-500 text-ink" />
            </h1>
            <div className="mt-2 flex items-center gap-3.5 text-neutral-400">
              <Link href="https://github.com/tachibana777" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-white"><Github size={16} /></Link>
              <Linkedin size={16} aria-label="LinkedIn" />
              <a href="mailto:kridsada1324@gmail.com" aria-label="Email" className="transition hover:text-white"><Mail size={16} /></a>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-[-.025em] sm:text-3xl text-neutral-100">PENETRATION TESTER— <span className="font-normal text-neutral-400">Offensive Security</span></h2>
        <p className="mt-4 max-w-[680px] text-sm sm:text-base leading-relaxed text-neutral-300">I&apos;m a Computer Engineering student focused on Penetration Testing, Offensive Security, and Application Security. My interests include Web Application Security, API Security, Vulnerability Assessment, Reconnaissance, Exploitation, and Security Testing. I enjoy breaking down how systems work, identifying security weaknesses, understanding their root causes, and finding practical ways to improve them.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded bg-neutral-100 px-4.5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-white">
            View Resume <ArrowRight size={14} />
          </a>
          <a href={WRITEUP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-panel px-4.5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white">
            View Write-ups <ArrowUpRight size={14} />
          </a>
          <Link href="/awards" className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-panel px-4.5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white">
            Awards <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
