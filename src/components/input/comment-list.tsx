import classes from "./comments-list.module.css";

export interface CommentListProps {}

export default function CommentList({}: CommentListProps) {
  return (
    <ul className={classes.comments}>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}
