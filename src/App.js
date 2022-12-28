import './App.css';
import React, { useContext }  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Consultar } from './components/Consultar';

function App() {    
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  return (
    <div className="App">
          <Routes>
            <Route path = "/" element = {<Login/>}/>
            {token ? <Route path = "/rotina" element = {<Cadastro/>}/> : navigate('/')}
            <Route path = "/consultar" element = {<Consultar/>}/>
          </Routes>
    </div>
  );
}

export default App;
