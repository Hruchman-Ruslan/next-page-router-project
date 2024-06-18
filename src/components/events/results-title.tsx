import Button from "../ui/button";

import classes from "./results-title.module.css";

export interface ResultsTitleProps {
  date: Date;
}

export default function ResultsTitle({ date }: ResultsTitleProps) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button href="/events">Show all events</Button>
    </section>
  );
}
