import {Routes, Route} from "react-router-dom"

import ArticleList from "./ArticleList.jsx"


import './App.css'

function App() {
 

  return (
    <main className="App">
  
    <Routes>
      <Route path="/articles" element={<ArticleList />} />


    </Routes>
  </main>
);


    
}



export default App
