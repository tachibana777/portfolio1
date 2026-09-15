import { GitHubActivity } from "./GitHubActivity";
import { Reveal, SectionHeading } from "@/components/ui";

export function ActivitySection() {
  return <Reveal><section className="py-10"><SectionHeading title="GitHub Activity" /><GitHubActivity /></section></Reveal>;
}
