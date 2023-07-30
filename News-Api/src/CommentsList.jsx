import { useState, useEffect, useContext } from "react";
import { getArticleComments, getArticleById } from "./api.js";
import { useParams } from "react-router-dom";
import CommentListCard from "./CommentListCard.jsx";
import { dateFormatter } from "./dateUtils.js";
import CommentAdder from "./CommentAdder.jsx";
import { UserContext } from "./UserContext.jsx";
import Error from "./Error.jsx";

import "./CommentListCard.css";

const CommentsList = () => {
  const { user, setUser } = useContext(UserContext);
  const [isError, setIsError ]= useState(null);
  const [articleData, setArticleData] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id, comment_id } = useParams();

  useEffect(() => {
    Promise.all([
      getArticleById(article_id),
      getArticleComments(article_id, comment_id),
    ])
      .then(([articleData, commentData]) => {
        setArticleData(articleData);
        setComments(commentData);
      })
      .catch((error) => {
        setIsError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isError)
    return (
      <Error
        errorStatus={isError.response.status}
        errorMessage={isError.response.data.msg}
      />
    );

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="comments_container">
      <section className="articleCard">
        <h2>{articleData.title}</h2>
        <h3>
          Posted by {articleData.author} on{" "}
          {dateFormatter(articleData.created_at)}
        </h3>
        <p>Topic: {articleData.topic}</p>
        <p>{articleData.body}</p>
        <p>Votes: {articleData.votes}</p>
      </section>
      <br />
      <CommentAdder
        setComments={setComments}
        article_id={article_id}
        user={user}
      />

      {comments.comments !== ""
        ? comments.map(({ comment_id, author, body, votes, created_at }) => (
            <CommentListCard
              setComments={setComments}
              key={comment_id}
              comment_id={comment_id}
              user={user}
              author={author}
              body={body}
              votes={votes}
              created_at={dateFormatter(created_at)}
            />
          ))
        : "No comments yet"}
    </section>
  );
};

export default CommentsList;
