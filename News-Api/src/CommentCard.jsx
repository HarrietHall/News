import "./CommentCard.css";
import { dateFormatter } from "./dateUtils";

const CommentCard = ({
  setComments,
  comment_id,
  user,
  author,
  body,
  votes,
  created_at,
}) => {
  const commentId = comment_id;

  return (
    <section className="commentCard">
      <p>
        Posted by {author} on {dateFormatter(created_at)}
      </p>
      <p>{body}</p>
      <p>votes: {votes}</p>

      {user === author ? (
        <button
          onClick={(event) => {
            event.preventDefault();
            setComments((currComments) => {
              const updatedComments = currComments.filter(
                (comment) => comment.comment_id !== commentId
              );
              return [...updatedComments];
            });
          }}
        >
          Delete comment
        </button>
      ) : null}
    </section>
  );
};

export default CommentCard;
