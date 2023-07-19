import {Routes, Route} from "react-router-dom"
import Articles from "./Articles.jsx"
import ArticleCard from "./ArticleCard.jsx";
import Nav from "./Nav.jsx";
import CommentsList from "./CommentsList.jsx";
import { UserProvider} from "./UseContext.jsx";

import './App.css'

function App() {
 

  return (
    <main className="App">
      <UserProvider>
  <Nav />
    <Routes>
      <Route path="/" element={<Articles/>} />
      <Route path="/articles/:article_id" element={<ArticleCard />} />
      <Route path="/articles/:article_id/comments" element={<CommentsList />} />
  
    </Routes>
    </UserProvider>
  </main>
);


    
}



export default App
