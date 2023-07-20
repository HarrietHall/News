import { useState, useEffect } from "react";
import { getArticleComments, getArticleById } from "./api.js";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard.jsx";
import { dateFormatter } from "./dateUtils.js";
import "./CommentsList.css";

const CommentsList = () => {
  const [articleData, setArticleData] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticleData(articleData);
    });
    getArticleComments(article_id).then((commentData) => {
      setComments(commentData);
      setIsLoading(false);
    });
  }, []);
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
      {comments.comments !== "" ? (comments.map(({comment_id, author, body, votes, created_at }) => (
        <CommentCard
          key={comment_id}
          author={author}
          body={body}
          votes={votes}
          created_at={dateFormatter(created_at)}
        /> 
      ))) : ( "No comments yet")}
    </section>
  );
};

export default CommentsList;
