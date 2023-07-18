import {Routes, Route} from "react-router-dom"
import ArticleList from "./ArticleList.jsx"
import ArticleCard from "./ArticleCard.jsx";


import './App.css'

function App() {
 

  return (
    <main className="App">
  
    <Routes>
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:article_id" element={<ArticleCard />} />

    </Routes>
  </main>
);


    
}



export default App
