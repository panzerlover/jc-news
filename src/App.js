import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <h1>JC News</h1>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>  
      </Routes>      
    </div>
    </BrowserRouter>
  );
}

export default App;
