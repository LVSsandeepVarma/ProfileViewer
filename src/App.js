import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Search from './component/search/search'
import View from './component/view/view'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
    </div>
  );
}

export default App;
