import { getFeaturedEvents } from "../../dummy-data";

import EventList from "@/components/events/event-list";

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  const featureEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featureEvents} />
    </div>
  );
}
