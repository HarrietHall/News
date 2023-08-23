import { Routes, Route } from "react-router-dom";
import Articles from "./Articles.jsx";
import ArticleCard from "./ArticleCard.jsx";
import Nav from "./Nav.jsx";
import CommentsList from "./CommentsList.jsx";
import CommentListCard from "./CommentListCard.jsx";
import ToggleTheme from "./ThemeToggle.jsx";
import Error from "./Error.jsx";
import "./App.css";


function App() {
  return (
    <main className="App">
      <ToggleTheme />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/:topic" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentsList />}
        />
        <Route
          path="/comments/:comment_id"
          element={<CommentListCard />}
        />
        <Route path="/*" element={<Error
         errorStatus={404}
         errorMessage={"Not found: Page does not exist"} />} />
              </Routes>
    </main>
  );
}

export default App;
