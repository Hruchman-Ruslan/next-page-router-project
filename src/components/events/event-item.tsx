import Link from "next/link";

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
    <li>
      <img src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Events</Link>
        </div>
      </div>
    </li>
  );
}
