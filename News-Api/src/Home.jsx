import { getArticles } from "./api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleListCard from './ArticleListCard.jsx';
import Header from "./Header.jsx";
import { dateFormatter } from "./dateUtils.js";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getArticles().then((articleData) => {
     
          setArticles(articleData);

      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="Articles">
      <Header title='Article List'/>
          <ul className="Article_list">            
        {articles.map(({ article_id, title, author, topic, comment_count, votes, created_at }) => (
           <Link key={article_id} to={`/articles/${article_id}`}>
            <ArticleListCard key={article_id} 
            title={title} 
            author={author}
            topic={topic}
            comment_count={comment_count}
            votes={votes}
            created_at={dateFormatter(created_at) 

          }
            
           />
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Home;
