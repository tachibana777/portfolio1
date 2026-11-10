import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { EventGallery, type EventItem } from "@/components/events/EventGallery";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function classifyEvent(file: string): EventItem["category"] {
  const name = file.toLowerCase();
  if (name.includes("misp") || name.includes("splunk") || name.includes("soc") || name.includes("security") || name.includes("static-code") || name.includes("psru-cyber") || name.includes("psru-greenvibe") || name.includes("tctt") || name.includes("carbon") || name.includes("screenshot 2026")) {
    return "Cybersecurity & Labs";
  }
  if (name.includes("r2m") || name.includes("ctf") || name.includes("startup") || name.includes("outside-event") || name.includes("screenshot 2024")) {
    return "Events & Community";
  }
  return "Life & Moments";
}

function readableTitle(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getEventItems(): EventItem[] {
  const eventsDirectory = join(process.cwd(), "public", "events");
  return readdirSync(eventsDirectory)
    .filter((file) => imageExtensions.has(file.slice(file.lastIndexOf(".")).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({ file, title: readableTitle(file), category: classifyEvent(file) }));
}

export default function EventsPage() {
  const eventItems = getEventItems();

  return (
    <PageShell>
      <Reveal>
        <PageIntro title="Events" description="A visual journal of cybersecurity labs, competitions, university events, and everyday moments outside the IDE." />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">{eventItems.length}</p><p className="mt-1 text-xs text-neutral-500">Photos collected</p></div>
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">3</p><p className="mt-1 text-xs text-neutral-500">Photo stories</p></div>
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">2023–2026</p><p className="mt-1 text-xs text-neutral-500">Timeline</p></div>
        </div>
        <EventGallery items={eventItems} />
      </Reveal>
    </PageShell>
  );
}
