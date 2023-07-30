import { getArticles } from "./api.js";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ArticleListCard from "./ArticleListCard.jsx";
import Header from "./Header.jsx";
import { dateFormatter } from "./dateUtils.js";
import Error from "./Error.jsx";
import './Articles.css'

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by") || "created_at";
  const orderQuery = searchParams.get("order") || "desc";
  const { topic } = useParams();

  const setSortBy = (option) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", option);

    setSearchParams(newParams);
  };

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };
  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery)
      .then((articleData) => {
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
      });
  }, [topic, sortByQuery, orderQuery]);

  if (isError) {
    return (
      <Error
        errorStatus={isError.response.status}
        errorMessage={isError.response.data.msg}
      />
    );
  }

  let pageHeader = "Articles";
  if (topic !== undefined) {
    pageHeader = `Articles: ${topic}`;
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="Articles">
      <Header title={pageHeader} />
      <div className="sortByLabel"></div>
      <label htmlFor="Sort_by_box">Sort by: </label>
        <select
        name="sort_by_option"
        id="sort_by"
        value={sortByQuery}
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
      >
        <option value="created_at">Date posted</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        {topic === undefined ? <option value="topic">Topic</option> : null}
      </select>
      { sortByQuery === "created_at" ? 
      <div>
      <button onClick={() => setSortOrder("asc")}>Ascending</button>
      <button onClick={() => setSortOrder("desc")}>Descending</button> </div>: <div> <button onClick={() => setSortOrder("asc")}>A - Z</button>
      <button onClick={() => setSortOrder("desc")}>Z - A</button></div>}
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
