import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "./api.js";
import { Link } from "react-router-dom";
import './ArticleCard.css'
import { dateFormatter } from "./dateUtils.js";

const ArticleCard = ({}) => {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticleData(articleData);
    });
  }, []);
  return (
    <section className="ArticleCard">
      <h1>{articleData.title}</h1>
      <h2>Posted by {articleData.author} on {dateFormatter(articleData.created_at)}</h2>
      <p>Topic: {articleData.topic}</p>
      <p>{articleData.body}</p>
      <p>Votes: {articleData.votes}</p>
      <p>
        <Link
          className="Link_to_comments"
          key={article_id}
          to={`/articles/${article_id}/comments`}
        >
          <button aria-label="view_article_comments">
            View all {articleData.comment_count} comments
          </button>
        </Link>
      </p>
      <img
        src={articleData.article_img_url}
        alt={`relating to ${articleData.topic}`}
      />
      
    </section>
  );
};

export default ArticleCard;
