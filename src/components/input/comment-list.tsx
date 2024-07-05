import { IComment } from "@/types/comments";

import classes from "./comments-list.module.css";

export interface CommentListProps {
  items: IComment[];
}

export default function CommentList({ items }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {items.map(({ _id, text, name }) => (
        <li key={_id?.toString()}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
