import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './contexts/UserContext';
import ArticleList from './components/ArticleList';
import HomePage from './components/HomePage';
import SingleArticle from './components/SingleArticle';
import HeaderBar from './components/HeaderBar';
import TopicList from './components/TopicList';
import { useState } from 'react';

function App() {

  return (
    <UserContext.Provider value={{username: "grumpy19"}}>
      <BrowserRouter>
      <div className="App">
        <HeaderBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/articles" element={<ArticleList/>}/>
          <Route path="/articles/:topic_slug" element={<ArticleList />}/>
          <Route path="/article/:article_id" element={<SingleArticle/>}/>
          <Route path="/topics" element={<TopicList/>}/>
        </Routes>      
      </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
