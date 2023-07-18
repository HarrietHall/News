import {Routes, Route} from "react-router-dom"
import Home from "./Home.jsx"
import ArticleCard from "./ArticleCard.jsx";
import Nav from "./Nav.jsx";


import './App.css'

function App() {
 

  return (
    <main className="App">
  <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:article_id" element={<ArticleCard />} />
      

    </Routes>
  </main>
);


    
}



export default App
