import React from 'react';
import './styles/App.scss';
import {Route, Routes} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Landing from './components/Landing';
import CreateDog from './components/CreateDog';
import NotFound from './components/NotFound';
import DogDetail from './components/DogDetail';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
      <div className="App">
         <Router>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/' element={<Nav />}>
            <Route path='home' element={<Home />}/>
            <Route path='dog/:id' element={<DogDetail />}/>
          </Route>
          <Route path='create' element={<CreateDog />}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
      </div>
  );
}

export default App;
