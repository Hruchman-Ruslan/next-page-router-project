import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import useSWR from "swr";

import { Event } from "@/types/event";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

export interface FilteredEventsPageProps {}

export default function FilteredEventsPage({}: FilteredEventsPageProps) {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>();
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-af505-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading ...</p>;
  }

  const filteredYear = filteredData?.[0];
  const filteredMonth = filteredData?.[1];

  const numYear = +filteredYear!;
  const numMonth = +filteredMonth!;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2033 ||
    numYear < 2024 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for  ${numMonth}/${numYear}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
