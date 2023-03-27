import './App.css';
import React, { useState }  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Login } from './components/login/index.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Consultar } from './components/Consultar';
import { Visualizar } from './components/Visualizar';
import { Editar } from './components/editar';
import { AuthProvider } from './contexts/Auth/authProvider';
import { NavBar } from './components/barra_navegacao';
import { CadastroCliente } from './components/cadastros/cadastro_cliente';
import { ConsultarCliente } from './components/cadastros/consulta_cliente/index';
import { CadastroFornecedor } from './components/cadastros/cadastro_fornecedor';

function App() {    
  const token = localStorage.getItem('token');
  const codRotina = localStorage.getItem('rotina');
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
            <Route path = "/rotina" element = {token ? <Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            <Route path = "/consultar" element = {token ?<Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>  
            <Route path = "/rotina/:codigo" element={token ? <Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            <Route path = "/editarRotina/:codigo" element={token ? <Editar codigo={codigo} codRotina={parseFloat(codRotina)} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/> : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            <Route path = '/cadastrarCliente' element = {token ? <CadastroCliente/> : <Login/>}/>
            <Route path = '/clientes' element = {token ? <ConsultarCliente/> : <Login/>}/>
            <Route path = '/cadastrarFornecedor' element = {token ? <CadastroFornecedor/> : <Login/>}/>
            <Route path = '/clientes' element = {token ? <ConsultarCliente/> : <Login/>}/>
          </Routes>
      
    </div>
    </AuthProvider>
  );
}

export default App;
