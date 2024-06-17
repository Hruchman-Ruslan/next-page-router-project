import EventItem from "./event-item";

import { Event } from "@/types/event";

import classes from "./event.list.module.css";

export interface EventListProps {
  items: Event[];
}

export default function EventList({ items }: EventListProps) {
  return (
    <ul className={classes.list}>
      {items.map(({ id, title, image, date, location }) => (
        <EventItem
          key={id}
          id={id}
          title={title}
          image={image}
          date={date}
          location={location}
        />
      ))}
    </ul>
  );
}
