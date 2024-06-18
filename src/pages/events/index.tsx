import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../../dummy-data";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";

export interface AllEventsPageProps {}

export default function AllEventsPage({}: AllEventsPageProps) {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
