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
          <div className="flex flex-col justify-center gap-2 sm:gap-2.5">
            <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-neutral-100 sm:text-2xl md:text-3xl">
              Kritsada Hongpatsa <BadgeCheck size={22} className="fill-sky-500 text-ink" />
            </h1>
            <div className="flex items-center gap-3.5 text-neutral-400">
              <Link href="https://github.com/tachibana777" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-all hover:text-white hover:-translate-y-0.5"><Github size={19} /></Link>
              <Linkedin size={19} aria-label="LinkedIn" className="cursor-pointer transition-all hover:text-white hover:-translate-y-0.5" />
              <a href="mailto:kridsada1324@gmail.com" aria-label="Email" className="transition-all hover:text-white hover:-translate-y-0.5"><Mail size={19} /></a>
            </div>
          </div>
        </div>
        <h2 className="max-w-full text-[1.7rem] font-normal tracking-tight leading-tight text-neutral-100 sm:text-[2.05rem] md:text-[2.15rem]">PENETRATION TESTER— <span className="text-[0.95em] font-light text-neutral-400">Offensive Security</span></h2>
        <p className="mt-4 max-w-[680px] text-base font-light leading-7 text-neutral-400 sm:text-lg sm:leading-8">I&apos;m a Computer Engineering student focused on Penetration Testing, Offensive Security, and Application Security. My interests include Web Application Security, API Security, Vulnerability Assessment, Reconnaissance, Exploitation, and Security Testing. I enjoy breaking down how systems work, identifying security weaknesses, understanding their root causes, and finding practical ways to improve them.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-6 py-3 text-base font-medium text-neutral-950 transition hover:scale-[1.03] hover:bg-white">
            View Resume <ArrowRight size={16} />
          </a>
          <a href={WRITEUP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-panel px-6 py-3 text-base font-medium text-neutral-200 transition hover:scale-[1.03] hover:border-neutral-600 hover:text-white">
            View Write-ups <ArrowUpRight size={16} />
          </a>
          <Link href="/awards" className="group inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-panel px-6 py-3 text-base font-medium text-neutral-200 transition hover:scale-[1.03] hover:border-neutral-600 hover:text-white">
            Awards <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
