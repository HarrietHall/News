import { getArticles } from "./api.js";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ArticleListCard from "./ArticleListCard.jsx";
import Header from "./Header.jsx";
import { dateFormatter } from "./dateUtils.js";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by") || "created_at"
  const orderQuery = searchParams.get("order") || "desc"
 
  const setSortBy = (option) => {
    const currentSortBy = searchParams.get("sort_by");
    const order = currentSortBy === option && searchParams.get("order") === "asc" ? "desc" : "asc";
  
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", option);
    newParams.set("order", order);
  
    setSearchParams(newParams);
  };

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction)
       setSearchParams(newParams);
  };
  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery)
      .then((articleData) => {
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
      });
    setIsLoading(true);
  }, [topic, sortByQuery, orderQuery]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

  return (
    <section className="Articles">
      <Header title="Articles" />
      <button onClick={() => setSortOrder("asc")}>Ascending</button>
      <button onClick={() => setSortOrder("desc")}>Descending</button>
      <button onClick={() => setSortBy("comment_count")}>Comment count</button>
      {/* <button onClick={() => setSortBy("desc")}>Descending</button> */}
     {/* <label htmlFor="Sort_by_box">Sortby:</label>
      <select
        name="sort_by_option"
        id="sort_by"
        value={sortByQuery}
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
      >
      
        <option value="created_at">Date</option>

        <option value="comment_count">Comment count</option>
      </select>
     */}
      {/* <option value="votes">Votes</option> */}

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

export default Articles;
