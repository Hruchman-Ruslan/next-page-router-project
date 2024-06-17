import classes from "./logistics-item.module.css";

export interface LogisticsItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
}

export default function LogisticsItem({
  icon: Icon,
  children,
}: LogisticsItemProps) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}
