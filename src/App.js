import './App.css';
import React, { useContext, useEffect, useState }  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Consultar } from './components/Consultar';
import { Visualizar } from './components/Visualizar';
import { Editar } from './components/editar';

function App() {    
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState();
  const [dataEmissao,setDataEmissao] = useState();
  const [horaEmissao,setHoraEmissao] = useState();
  console.log("este codigo está no app: "+codigo)
  
  return (
    <div className="App">
          <Routes>
            <Route path = "/" element = {<Login/>}/> 
            {token ? <Route path = "/rotina" element = {<Cadastro/>}/> : navigate('/')}
            {token ? <Route path = "/consultar" element = {<Consultar setCodigo={setCodigo} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao}/>}/> : navigate('/')}
            {token ? <Route path = "/rotina/:codigo" element={<Visualizar codigo={codigo}/>}/> : navigate('/')}
            {token ? <Route path = "/editarRotina/:codigo" element={<Editar codigo={codigo} dataEmissao={dataEmissao} horaEmissao={horaEmissao}/>}/> : navigate('/')}
          </Routes>
    </div>
  );
}

export default App;
