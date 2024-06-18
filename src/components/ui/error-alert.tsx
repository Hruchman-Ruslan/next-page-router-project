import classes from "./error-alert.module.css";

export interface ErrorAlertProps {
  children: React.ReactNode;
}

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return <div className={classes.alert}>{children}</div>;
}
