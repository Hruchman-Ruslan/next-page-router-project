import classes from "./event-summary.module.css";

export interface EventSummaryProps {
  title: string;
}

export default function EventSummary({ title }: EventSummaryProps) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}
