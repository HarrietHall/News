import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getArticleById, patchArticleVotes } from "./api.js";
import { Link } from "react-router-dom";
import "./ArticleCard.css";
import { dateFormatter } from "./dateUtils.js";
import { UserContext } from "./UserContext.jsx";
import Error from "./Error.jsx"

const ArticleCard = () => {
  const { article_id } = useParams();
  const [isError, setIsError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const [likeVotes, setLikeVotes] = useState(0);
  const [dislikeVotes, setDislikeVotes] = useState(0);
  const [likeError, setLikeError] = useState(null);
  const [dislikeError, setDislikeError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticleData(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error, 'error');
        setIsError(error);
      });
  }, []);

  if (isError) {
    return (
      <Error
        errorStatus={isError.response.status}
        errorMessage={isError.response.data.msg}
      />
    );
  }

  const handleLikeClick = () => {
    setLikeVotes((currentLikeVotes) => {
      return currentLikeVotes + 1;
    });

    setDislikeVotes((currentDislikeVotes) => {
      if (currentDislikeVotes < 0) {
        return currentDislikeVotes + 1;
      }
      return currentDislikeVotes;
    });

    patchArticleVotes(article_id, 1)
      .then(() => {
        setArticleData((previousData) => ({
          ...previousData,
          votes: previousData.votes + 1,
        }));
      })
      .catch((error) => {
        setLikeVotes((currentLikeVotes) => {
          return currentLikeVotes - 1;
        });
        setLikeError(error);
      });
  };


  const handleDislikeClick = () => {
    setDislikeVotes((currentDislikeVotes) => {
      return currentDislikeVotes - 1;
    });

    setLikeVotes((currentLikeVotes) => {
      if (currentLikeVotes > 0) {
        return currentLikeVotes - 1;
      }
      return currentLikeVotes;
    });

    patchArticleVotes(article_id, -1)
      .then(() => {
        setArticleData((previousData) => ({
          ...previousData,
          votes: previousData.votes - 1,
        }));
      })
      .catch((error) => {
          setDislikeVotes((currentDislikeVotes) => {
          return currentDislikeVotes + 1;
        });
        setDislikeError(true);
      });
  };



  if (isLoading) return <p>Loading...</p>;



  return (
    <section className="articleCard">
      <h1>{articleData.title}</h1>
      <h2>
        Posted by {articleData.author} on{" "}
        {dateFormatter(articleData.created_at)}
      </h2>
      <p>Topic: {articleData.topic}</p>
      <p>{articleData.body}</p>
      <p>{articleData.votes}</p>
      <div id="buttonContainer">
        {user ? (
          <button
            aria-label="like this comment"
            onClick={handleLikeClick}
            disabled={likeVotes > 0}
          >
            👍
          </button>
        ) : (
          <div>
            <button
              aria-label="like this comment"
              onClick={handleLikeClick}
              disabled={!user}
            >
              👍
            </button>
          </div>
        )}
        {likeError ? <p>Something went wrong...</p> : null}

        {user ? (
          <button
            aria-label="dislike this comment"
            onClick={handleDislikeClick}
            disabled={dislikeVotes < 0}
          >
            👎
          </button>
        ) : (
          <div>
            <button
              aria-label="dislike this comment"
              onClick={handleDislikeClick}
              disabled={!user}
            >
              👎
            </button>
          </div>
        )}
      </div>
      {dislikeError ? <p>Something went wrong...</p> : null}
      <br />
      <Link
        className="link_to_comments"
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
      {!user && <p id="loginWarning">Must login to like article</p>}
      <br />
      <img
        src={articleData.article_img_url}
        alt={`relating to ${articleData.topic}`}
      />
    </section>
  );
};

export default ArticleCard;
