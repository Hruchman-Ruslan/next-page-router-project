import { Fragment } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

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
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to avolve..."
        />
      </Head>
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
