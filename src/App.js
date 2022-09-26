import './App.css';
import React  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/nav';

function App() {
  

  return (
    <div className="App">
        
          <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = "/rotina" element = {<Cadastro/>}/>
          </Routes>
    </div>
  );
}

export default App;
