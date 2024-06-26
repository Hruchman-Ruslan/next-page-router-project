import Head from "next/head";

import { getFeaturedEvents } from "@/helpers/api-util";

import { Event } from "@/types/event";

import EventList from "@/components/events/event-list";

export interface HomePageProps {
  events: Event[];
}

export default function HomePage({ events }: HomePageProps) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to avolve..."
        />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featureEvent = await getFeaturedEvents();

  return {
    props: {
      events: featureEvent,
    },
    revalidate: 1800,
  };
}
