import "./CommentCard.css";
import { dateFormatter } from "./dateUtils";

const CommentCard = ({ author, body, votes, created_at }) => {
  return (
    <section className="commentCard">
      <p>Posted by {author} on {dateFormatter(created_at)}</p>
      <p>{body}</p>
      <p>votes: {votes}</p>
    </section>
  );
};

export default CommentCard;
