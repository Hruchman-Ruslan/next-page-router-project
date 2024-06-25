import { Fragment } from "react";
import type { GetStaticPropsContext } from "next";

import { getEventById, getFeaturedEvents } from "@/helpers/api-util";

import { Event } from "@/types/event";

import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";

export interface EventDetailPageProps {
  selectedEvent: Event;
}

export default function EventDetailPage({
  selectedEvent,
}: EventDetailPageProps) {
  const event = selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId;

  if (typeof eventId !== "string") {
    return {
      notFound: true,
    };
  }

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
}
