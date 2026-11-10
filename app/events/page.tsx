import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { EventGallery, type EventItem } from "@/components/events/EventGallery";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function classifyEvent(file: string): EventItem["category"] {
  const name = file.toLowerCase();
  if (["img_20260614_105750_243.webp", "1781420030240.jpg", "img_20260401_155412_339.webp", "img_0341.jpg", "img_1837.jpg", "img_6599.jpg"].includes(name)) {
    return "Nature & Travel";
  }
  if (name.includes("r2m") || name.includes("ctf") || name.includes("startup") || name.includes("outside-event") || name.includes("screenshot 2024")) {
    return "Events & Competitions";
  }
  if (name.includes("misp") || name.includes("splunk") || name.includes("soc") || name.includes("security") || name.includes("static-code") || name.includes("psru-cyber") || name.includes("psru-greenvibe") || name.includes("tctt") || name.includes("carbon") || name.includes("screenshot 2026") || name.includes("img_0135") || name.includes("img_0305") || name.includes("img_1469") || name.includes("img_202611")) {
    return "Cybersecurity Work";
  }
  return "Everyday Moments";
}

const photoTitles: Record<string, string> = {
  "IMG_20260614_105750_243.webp": "Waterfall escape",
  "1781420030240.jpg": "Waterfall view",
  "IMG_20260401_155412_339.webp": "Beach day",
  "IMG_0341.jpg": "Mountain lake",
  "IMG_1837.jpg": "City sunset",
  "IMG_6599.jpg": "Aquarium visit",
  "IMG_20261103_080442.jpg": "NCSA workspace",
  "IMG_20261105_102556.jpg": "MISP to Wazuh planning",
  "IMG_20261106_145246.jpg": "Wazuh detection workbench",
  "IMG_20261106_150521.jpg": "Active Response planning",
};

function readableTitle(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getEventItems(): EventItem[] {
  const eventsDirectory = join(process.cwd(), "public", "events");
  const categoryOrder: Record<EventItem["category"], number> = {
    "Nature & Travel": 0,
    "Events & Competitions": 1,
    "Cybersecurity Work": 2,
    "Everyday Moments": 3,
  };

  return readdirSync(eventsDirectory)
    .filter((file) => imageExtensions.has(file.slice(file.lastIndexOf(".")).toLowerCase()))
    .map((file) => ({ file, title: photoTitles[file] ?? readableTitle(file), category: classifyEvent(file) }))
    .sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category] || a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: "base" }));
}

export default function EventsPage() {
  const eventItems = getEventItems();

  return (
    <PageShell>
      <Reveal>
        <PageIntro title="Events" description="A visual journal of cybersecurity labs, competitions, university events, and everyday moments outside the IDE." />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">{eventItems.length}</p><p className="mt-1 text-xs text-neutral-500">Photos collected</p></div>
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">4</p><p className="mt-1 text-xs text-neutral-500">Photo stories</p></div>
          <div className="rounded-2xl border border-neutral-200 bg-panel p-4 dark:border-neutral-800"><p className="text-2xl font-semibold text-neutral-100">2023–2026</p><p className="mt-1 text-xs text-neutral-500">Timeline</p></div>
        </div>
        <EventGallery items={eventItems} />
      </Reveal>
    </PageShell>
  );
}
