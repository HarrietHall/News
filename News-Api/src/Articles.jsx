import { getArticles } from "./api.js";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleListCard from "./ArticleListCard.jsx";
import Header from "./Header.jsx";
import { dateFormatter } from "./dateUtils.js";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic)
      .then((articleData) => {
       
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
       
       
      })
       setIsLoading(true);
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

  return (
    <section className="Articles">
      <Header title="Articles" />
      <ul className="Article_list">
        {articles.map(
          ({ article_id, title, author, topic, comment_count, created_at }) => (
            <Link key={article_id} to={`/articles/${article_id}`}>
              <ArticleListCard
                key={article_id}
                title={title}
                author={author}
                topic={topic}
                comment_count={comment_count}
                created_at={dateFormatter(created_at)}
              />
            </Link>
          )
        )}
      </ul>
    </section>
  );
};

export default Home;
