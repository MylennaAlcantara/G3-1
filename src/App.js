import './App.css';
import React, { useContext }  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes } from 'react-router-dom';
import { Consultar } from './components/Consultar';
import {RequireAuth} from './contexts/Auth/requiredAuth';
import { AuthContext } from './contexts/Auth/authContext';

function App() {
  const auth = useContext(AuthContext);

  const hadleLogout = async () =>{
    await auth.signout();
    window.location.href = window.location.href;
  }
    
  
  return (
    <div className="App">
      <nav>
        {auth.user && <button onClick={hadleLogout}>Sair</button>}
      </nav>
          <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = "/rotina" element = {<Cadastro/>}/>
            <Route path = "/consultar" element = {<Consultar/>}/>
          </Routes>
    </div>
  );
}

export default App;
