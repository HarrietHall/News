import {Routes, Route} from "react-router-dom"
import Articles from "./Articles.jsx"
import ArticleCard from "./ArticleCard.jsx";
import Nav from "./Nav.jsx";
import CommentsList from "./CommentsList.jsx";
import ToggleTheme from "./ThemeToggle.jsx";



import './App.css'

function App() {
 

  return (
    <main className="App">
  <ToggleTheme />
  <Nav />
    <Routes>
      <Route path="/" element={<Articles />} />
      <Route path="/articles/:article_id" element={<ArticleCard />} />
      <Route path="/articles/:article_id/comments" element={<CommentsList />} />
  
    </Routes>
 

  </main>
);


    
}



export default App
