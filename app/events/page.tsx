import Image from "next/image";
import { PageShell } from "@/components/layout";
import { PageIntro, Reveal } from "@/components/ui";
import { eventImages } from "@/lib/data";

export default function EventsPage() {
  return (
    <PageShell><Reveal><PageIntro title="Events" description="Photos from events, meetups, and moments outside the IDE." />
      <div className="mt-10 columns-2 gap-3 sm:columns-4">{eventImages.map((image, index) => <div key={image} className="mb-3 break-inside-avoid overflow-hidden rounded-lg"><Image src={`/events/${image}`} alt={`Cybersecurity event ${index + 1}`} width={220} height={index % 3 === 0 ? 300 : 200} className="h-auto w-full transition duration-500 hover:scale-105" /></div>)}</div>
    </Reveal></PageShell>
  );
}
