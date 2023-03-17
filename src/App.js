import './App.css';
import React, { useContext, useEffect, useState }  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Consultar } from './components/Consultar';
import { Visualizar } from './components/Visualizar';
import { Editar } from './components/editar';
import { AuthProvider } from './contexts/Auth/authProvider';
import { AuthContext } from './contexts/Auth/authContext';
import { NavBar } from './components/barra_navegacao';

function App() {    
  const token = localStorage.getItem('token');
  const codRotina = localStorage.getItem('rotina');
  const informacaoEmpresa = localStorage.getItem('filial');
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState();
  const [dataEmissao,setDataEmissao] = useState();
  const [horaEmissao,setHoraEmissao] = useState();
  const [matriculaFuncionario,setMatriculaFuncionario] = useState('');
  const [senhaFuncionario, setSenhaFuncionario] = useState('');

  
  return (      
  <AuthProvider>
    <div className="App">
          {token ? <NavBar/> : null}
          <Routes>
            <Route path = "/" element = {<Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/> 
            <Route path = "/rotina" element = {token ? <Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} informacaoEmpresa={informacaoEmpresa}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            <Route path = "/consultar" element = {token ?<Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} informacaoEmpresa={informacaoEmpresa} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>  
            <Route path = "/rotina/:codigo" element={token ? <Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} informacaoEmpresa={informacaoEmpresa} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            <Route path = "/editarRotina/:codigo" element={token ? <Editar codigo={codigo} codRotina={parseFloat(codRotina)} informacaoEmpresa={informacaoEmpresa} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
          </Routes>
      
    </div>
    </AuthProvider>
  );
}

export default App;
