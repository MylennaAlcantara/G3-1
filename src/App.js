import './App.css';
import React, { useContext, useState }  from 'react';
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
import { ResumoFaturamento} from './components/Relatorios/resumo_de_faturamento/listAll'
import { ConsultarFornecedor } from './components/cadastros/consultar_fornecedor/index';
import { EditarCliente } from './components/cadastros/editar_cliente';
import { CadastrarFornecedor } from './components/cadastros/cadastro_fornecedor';
import { CounsultarProduto } from './components/cadastros/consulta_produto';
import { CadastroProduto } from './components/cadastros/cadastro_produto';
import { EditarFornecedor } from './components/cadastros/editar_fornecedor';
import { CadastroFuncionario } from './components/cadastros/cadastro_funcionario';
import { ConsultarFuncionario } from './components/cadastros/consultar_funcionario';
import { EditarFuncionario } from './components/cadastros/editar_funcionario';
import { Home } from './components/home';
import { AuthContext } from './contexts/Auth/authContext';

function App() {    
  const {nivel} = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const codRotina = localStorage.getItem('rotina');
  const codCliente = localStorage.getItem('idCliente');

  const [codigo, setCodigo] = useState();
  const [cliente, setCliente] = useState();
  const [dataEmissao,setDataEmissao] = useState();
  const [horaEmissao,setHoraEmissao] = useState();
  const [matriculaFuncionario,setMatriculaFuncionario] = useState('');
  const [senhaFuncionario, setSenhaFuncionario] = useState('');

  return (      
  <AuthProvider>
    <div className="App">
          <Routes>
            <Route path = "/" element = {<Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/> 
            <Route path = "/home" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/> 
            
            {/* Rotas de Rotina */}
            {nivel.cadastro_dav_acessivel ? (
              <Route path = "/consultar" element = {token ?(<><NavBar/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/consultar" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_dav_incluir ? (
              <Route path = "/rotina" element = {token ? (<><NavBar/><Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/rotina" element = {token ?(<><NavBar/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            {nivel.cadastro_dav_editar ? (
              <Route path = "/editarRotina/:codigo" element={token ? (<><NavBar/><Editar codigo={codigo} codRotina={parseFloat(codRotina)} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/editarRotina/:codigo" element = {token ?(<><NavBar/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            <Route path = "/rotina/:codigo" element={token ? (<><NavBar/><Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            
            {/* Rotas de Cliente */}
            {nivel.cadastro_cliente_acessivel ? (
              <Route path = '/clientes' element = {token ? (<><NavBar/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>
            ) : <Route path = "/clientes" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_cliente_editar ? (
              <Route path = '/editarCliente/:cliente' element = {token ? (<><NavBar/><EditarCliente cliente={cliente} codCliente={parseFloat(codCliente)}/></>) : <Login/>}/>
            ) : <Route path = '/editarCliente/:cliente' element = {token ? (<><NavBar/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>}
            {nivel.cadastro_cliente_incluir ? (
              <Route path = '/cadastrarCliente' element = {token ? (<><NavBar/><CadastroCliente/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarCliente' element = {token ? (<><NavBar/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>}
            
            {/* Rotas de Fornecedor */}
            {nivel.cadastro_fornecedor ? (
              <Route path = '/fornecedores' element = {token ? (<><NavBar/><ConsultarFornecedor/></>) : <Login/>}/>
            ) : <Route path = "/fornecedores" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_incluir ? (
              <Route path = '/cadastrarFornecedor' element = {token ? (<><NavBar/><CadastrarFornecedor/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarFornecedor' element = {token ? (<><NavBar/><ConsultarFornecedor/></>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_editar ? (
              <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<><NavBar/><EditarFornecedor /></>) : <Login/>}/>
            ) : <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<><NavBar/><ConsultarFornecedor/></>) : <Login/>}/>}
            
            {/* Rotas de Produto */}
            {nivel.cadastro_produto_acesssivel ? (
              <Route path = '/produtos' element = {token ? (<><NavBar/><CounsultarProduto/></>) : <Login/>}/>
            ) : <Route path = "/produtos" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/>}
            <Route path = '/cadastrarProduto' element = {token ? (<><NavBar/><CadastroProduto/></>) : <Login/>}/>
            
            {/* Rotas de Funcionario */}
            {nivel.cadastro_funcionario ? (
              <Route path = '/funcionarios' element = {token ? (<><NavBar/><ConsultarFuncionario/></>) : <Login/>}/>
              ) : <Route path = "/funcionarios" element = {token ? (<><NavBar/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_funcionario_editar ? (
              <Route path = '/editarFuncionario/:funcionario' element = {token ? (<><NavBar/><EditarFuncionario/></>) : <Login/>}/>
            ) : <Route path = '/editarFuncionario/:funcionario' element = {token ? (<><NavBar/><ConsultarFuncionario/></>) : <Login/>}/>}
            {nivel.cadastro_funcionario_incluir ? (
              <Route path = '/cadastrarFuncionario' element = {token ? (<><NavBar/><CadastroFuncionario/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarFuncionario' element = {token ? (<><NavBar/><ConsultarFuncionario/></>) : <Login/>}/>}
            
            <Route path = '/resumoDeFaturamento' element = {token ? (<><NavBar/><ResumoFaturamento/></>) : <Login/>}/>
          </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
