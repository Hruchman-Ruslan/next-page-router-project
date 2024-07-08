import classes from "./notification.module.css";

export interface NotificationProps {
  title: string;
  message: string;
  status: "pending" | "success" | "error";
}

export default function Notification({
  title,
  message,
  status,
}: NotificationProps) {
  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
