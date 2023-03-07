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

function App() {    
  const token = localStorage.getItem('token');
  const codRotina = localStorage.getItem('rotina')
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [codigo, setCodigo] = useState();
  const [dataEmissao,setDataEmissao] = useState();
  const [horaEmissao,setHoraEmissao] = useState();
  const [matriculaFuncionario,setMatriculaFuncionario] = useState('');
  const [senhaFuncionario, setSenhaFuncionario] = useState('');
  
  return (      
  <AuthProvider>
    <div className="App">

          <Routes>
            <Route path = "/" element = {<Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/> 
            {token ? <Route path = "/rotina" element = {<Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>}/> : navigate('/')}
            {token ? <Route path = "/consultar" element = {<Consultar setCodigo={setCodigo} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>}/> : navigate('/')}
            {token ? <Route path = "/rotina/:codigo" element={<Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>}/> : navigate('/')}
            {token ? <Route path = "/editarRotina/:codigo" element={<Editar codigo={codigo} codRotina={parseFloat(codRotina)} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>}/> : navigate('/')}
          </Routes>
      
    </div>
    </AuthProvider>
  );
}

export default App;
