import Link from "next/link";

import classes from "./button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?(): void;
}

export default function Button({ children, href, onClick }: ButtonProps) {
  if (href) {
    return (
      <Link className={classes.btn} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}
