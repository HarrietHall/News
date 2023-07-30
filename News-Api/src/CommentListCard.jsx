import "./CommentListCard.css";
import { dateFormatter } from "./dateUtils";
import DeleteComment from "./DeleteComment";

const CommentListCard = ({
  setComments,
  comment_id,
  user,
  author,
  body,
  votes,
  created_at,
  
}) => {

  return (
    <section className="commentListCard">
      <p>
        Posted by {author} on {dateFormatter(created_at)}
      </p>
      <p>{body}</p>
      <p>votes: {votes}</p>
      {user === author ? (
        <>
          <DeleteComment comment_id={comment_id} setComments={setComments}  />
        </>
      ) : null}
    </section>
  );
};

export default CommentListCard;
