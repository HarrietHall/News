import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, patchArticleVotes } from "./api.js";
import { Link } from "react-router-dom";
import "./ArticleCard.css";
import { dateFormatter } from "./dateUtils.js";

const ArticleCard = ({}) => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const [likeVotes, setLikeVotes] = useState(0);
  const [dislikeVotes, setDislikeVotes] = useState(0);
  const [likeError, setLikeError] = useState(false);
  const [dislikeError, setDislikeError] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((articleData) => {
   
      setArticleData(articleData);
     setIsLoading(false);
    });
  }, []);


  const handleClick = () => {

   
    setLikeVotes((currentLikeVotes) => {
      return currentLikeVotes + 1;
    })

    setDislikeVotes((currentDislikeVotes) => {
      if(currentDislikeVotes < 0) {
        return currentDislikeVotes + 1;}
        return currentDislikeVotes})

      patchArticleVotes(article_id)
      .catch((err) => {
        setLikeVotes((currentLikeVotes) => {
          return currentLikeVotes - 1;
        });
        setLikeError(true);
      });
    } 
    
    const handleDislikeClick = () => {
      setDislikeVotes((currentDislikeVotes) => {
        return currentDislikeVotes - 1;
      })

      setLikeVotes((currentLikeVotes) => {
        if(currentLikeVotes > 0) {
          return currentLikeVotes - 1;}
          return currentLikeVotes})
      
      patchArticleVotes(article_id).catch((err) => {
        setDislikeVotes((currentDislikeVotes) => {
          return currentDislikeVotes + 1;
        });
        setDislikeError(true);
      });
    }
  
  
  

  return (
    <section className="articleCard">
      <h1>{articleData.title}</h1>
      <h2>
        Posted by {articleData.author} on{" "}
        {dateFormatter(articleData.created_at)}
      </h2>
      <p>Topic: {articleData.topic}</p>
      <p>{articleData.body}</p>
      <button
        aria-label="like this comment"
        onClick={handleClick}
        disabled={likeVotes > 0}
      >
        👍{articleData.votes + likeVotes}
      </button>

      {likeError ? <p>Something went wrong! Please try again</p> : null}
      <button
        aria-label="dislike this comment"
        onClick={handleDislikeClick}
        disabled={dislikeVotes < 0}
      >
        👎{articleData.votes + dislikeVotes}
      </button>

      {dislikeError ? <p>Something went wrong! Please try again</p> : null}
      <Link
        className="link_to_comments"
        key={article_id}
        to={`/articles/${article_id}/comments`}
      >
        <button aria-label="view article comments">
          {articleData.comment_count === "0"
            ? "Be the first to comment"
            : articleData.comment_count === "1"
            ? "View comment"
            : `View all ${articleData.comment_count} comments`}
        </button>
      </Link>
      <img
        src={articleData.article_img_url}
        alt={`relating to ${articleData.topic}`}
      />
    </section>
  );
};

export default ArticleCard;
