import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "@/helpers/api-util";

import { Event } from "@/types/event";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";

export interface AllEventsPageProps {
  events: Event[];
}

export default function AllEventsPage({ events }: AllEventsPageProps) {
  const router = useRouter();

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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
