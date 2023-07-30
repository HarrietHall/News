import { useState } from "react";
import { deleteComment } from "./api.js";
import Error from "./Error.jsx";

const DeleteComment = ({ comment_id, setComments }) => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    setIsLoading(true);
    deleteComment(comment_id)
      .then(() => {
        setComments((currComments) => {
          const updatedComments = currComments.filter(
            (comment) => comment.comment_id !== comment_id
          );
          return [...updatedComments];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
      });
  };
  if (isError) {
    return (
      <Error
        errorStatus={isError.response.status}
        errorMessage={isError.response.data.msg}
      />
    );
  }

  if (isLoading) return <p>Deleting comment...</p>;

  return (
    <section className="commentCard">
      <button onClick={handleDelete}>Delete comment</button>
    </section>
  );
};

export default DeleteComment;
