import type { Award } from "@/lib/types";
import { AwardCard } from "./AwardCard";

type AwardsListProps = Readonly<{
  awards: Award[];
}>;

export function AwardsList({ awards }: AwardsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {awards.map((award) => (
        <AwardCard key={award.title} award={award} />
      ))}
    </div>
  );
}
