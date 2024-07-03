import { useState } from "react";

import { IComment } from "@/types/comments";

import classes from "./comments.module.css";

import NewComment from "./new-comments";
import CommentList from "./comment-list";

export interface CommentsProps {
  eventId: string;
}

export default function Comments({ eventId }: CommentsProps) {
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: IComment) {
    //   send data to api
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}
