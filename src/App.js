import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';
import SingleArticle from './components/SingleArticle';
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
        <Route path="/article/:article_id" element={<SingleArticle/>}/>
        <Route path="/topics" element={<TopicList/>}/>
      </Routes>      
    </div>
    </BrowserRouter>
  );
}

export default App;
