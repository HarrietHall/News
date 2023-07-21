import { postComment } from "./api.js";
import { useState, useContext } from "react";
import "./CommentAdder.css";

const CommentAdder = ({ setComments, article_id, user }) => {
  const [newComment, setNewComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const [postError, setPostError] = useState(false);


  const handleChange = (event) => {
    setNewComment(event.target.value);
    setIsError(event.target.value.length > 100);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.length <= 100) {
        setIsLoading(true);
      postComment(article_id, newComment, user).then((postedComment) => {
        setComments((currentComments) => {
          return [postedComment, ...currentComments];
        });
        setNewComment("");
        setIsLoading(false);
      }).catch((error) => {
        setPostError(true);

      
      })
    }
  };
  if(postError) return <p>Something went wrong...</p>
  if (isLoading) return <p>Posting comment...</p>;

  return (
    <form className="CommentAdder" onSubmit={handleSubmit}>
      <label htmlFor="new-comment">Add a comment:</label>
      <textarea id="new-comment" value={newComment} onChange={handleChange} />
      {user ? (
        <button
          disabled={newComment.length > 100 
            || newComment.length < 1}
          className="comment-adder"
          type="submit"
        >
          Add comment
        </button>
      ) : (
        <div>
          <button disabled={!user} className="comment-adder" type="submit">
            Add comment
          </button>
          <p id="loginWarning">Must login to add a comment</p>
        </div>
      )}
      {isError ? (    
        <p>Too many characters {100 - newComment.length}</p>
      ) : (
        <p>{100 - newComment.length} characters left</p>
      )}
    </form>
  );
};

export default CommentAdder;
