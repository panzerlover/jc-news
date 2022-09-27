import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';
import HeaderBar from './components/HeaderBar';
import TopicList from './components/TopicList';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <HeaderBar/>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>
        <Route path="/articles/:topic_slug" element={<ArticleList/>}/>
        <Route path="/topics" element={<TopicList/>}/>
      </Routes>      
    </div>
    </BrowserRouter>
  );
}

export default App;
