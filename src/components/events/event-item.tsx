import Link from "next/link";

import classes from "./event-item.module.css";

export interface EventItemProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
}

export default function EventItem({
  id,
  title,
  image,
  date,
  location,
}: EventItemProps) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Events</Link>
        </div>
      </div>
    </li>
  );
}
