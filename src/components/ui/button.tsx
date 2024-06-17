import Link from "next/link";

import classes from "./button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function Button({ children, href }: ButtonProps) {
  return (
    <Link className={classes.btn} href={href}>
      {children}
    </Link>
  );
}
