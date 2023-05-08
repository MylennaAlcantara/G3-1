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
  const navigate = useNavigate();
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

  const [minimizado, setMinimizado] = useState({
    cadastroCliente: false,
    editarCliente: false,
    cadastroFuncionario: false,
    editarFuncionario: false,
    cadastroFornecedor: false,
    editarFornecedor: false,
    setor: false,
    nivel: false,
    familia: false,
    grupo: false,
    regra: false,
    ipi: false,
    pis: false,
    perfil: false,
    ramo: false,
    pgto: false,
    top: false
  })

  return (      
  <AuthProvider>
    <div className="App">
      <div className='op-minimizadas'>
        {minimizado.cadastroCliente && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroCliente: false}); navigate("/cadastrarCliente")}}>Cadastro Cliente</div>}
        {minimizado.editarCliente && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarCliente: false}); navigate("/editarCliente/:cliente")}}>Editar Cliente</div>}
        {minimizado.cadastroFuncionario && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroFuncionario: false}); navigate("/cadastrarFuncionario")}}>Cadastro Funcionário</div>}
        {minimizado.editarFuncionario && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarFuncionario: false}); navigate("/editarFuncionario/:funcionario")}}>Editar Funcionário</div>}
        {minimizado.cadastroFornecedor && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroFornecedor: false}); navigate("/cadastrarFornecedor")}}>Cadastro Fornecedor</div>}
        {minimizado.editarFornecedor && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarFornecedor: false}); navigate("/editarFornecedor/:fornecedor")}}>Editar Fornecedor</div>}
        {minimizado.setor && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, setor: false})}>Cadastro Setor</div>}
        {minimizado.nivel && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, nivel: false})}>Cadastro Nivel</div>}
        {minimizado.familia && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, familia: false})}>Cadastro Familia</div>}
        {minimizado.grupo && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, grupo: false})}>Cadastro Grupo/Subgrupo</div>}
        {minimizado.regra && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, regra: false})}>Cadastro Regra de ICMS</div>}
        {minimizado.ipi && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, ipi: false})}>Cadastro Grupo IPI</div>}
        {minimizado.pis && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, pis: false})}>Cadastro Grupo PIS/COFINS</div>}
        {minimizado.perfil && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, perfil: false})}>Cadastro Perfil de Regra</div>}
        {minimizado.ramo && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, ramo: false})}>Cadastro Ramo de Atividade</div>}
        {minimizado.pgto && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, pgto: false})}>Cadastro Tipo de Pagamento</div>}
        {minimizado.top && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, top: false})}>Cadastro TOP</div>}
      </div>
      <NavBar minimizado={minimizado} setMinimizado={setMinimizado}/>
          <Routes>
            <Route path = "/" element = {<Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/> 
            <Route path = "/home" element = {token ? (<Home/>) : <Login/>}/> 
            
            {/* Rotas de Rotina */}
            {nivel.cadastro_dav_acessivel ? (
              <Route path = "/consultar" element = {token ?(<Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} />) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/consultar" element = {token ? (<Home/>) : <Login/>}/>}
            {nivel.cadastro_dav_incluir ? (
              <Route path = "/rotina" element = {token ? (<Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/rotina" element = {token ?(<Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} />) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            {nivel.cadastro_dav_editar ? (
              <Route path = "/editarRotina/:codigo" element={token ? (<Editar codigo={codigo} codRotina={parseFloat(codRotina)} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/editarRotina/:codigo" element = {token ?(<Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} />) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            <Route path = "/rotina/:codigo" element={token ? (<Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            
            {/* Rotas de Cliente */}
            {nivel.cadastro_cliente_acessivel ? (
              <Route path = '/clientes' element = {token ? (<ConsultarCliente setCliente={setCliente}/>) : <Login/>}/>
            ) : <Route path = "/clientes" element = {token ? (<Home/>) : <Login/>}/>}
            {nivel.cadastro_cliente_editar ? (
              <Route path = '/editarCliente/:cliente' element = {token ? (<EditarCliente cliente={cliente} codCliente={parseFloat(codCliente)} minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/editarCliente/:cliente' element = {token ? (<ConsultarCliente setCliente={setCliente}/>) : <Login/>}/>}
            {nivel.cadastro_cliente_incluir ? (
              <Route path = '/cadastrarCliente' element = {token ? (<CadastroCliente  minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/cadastrarCliente' element = {token ? (<ConsultarCliente setCliente={setCliente}/>) : <Login/>}/>}
            
            {/* Rotas de Fornecedor */}
            {nivel.cadastro_fornecedor ? (
              <Route path = '/fornecedores' element = {token ? (<ConsultarFornecedor/>) : <Login/>}/>
            ) : <Route path = "/fornecedores" element = {token ? (<Home/>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_incluir ? (
              <Route path = '/cadastrarFornecedor' element = {token ? (<CadastrarFornecedor minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/cadastrarFornecedor' element = {token ? (<ConsultarFornecedor/>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_editar ? (
              <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<EditarFornecedor minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<ConsultarFornecedor/>) : <Login/>}/>}
            
            {/* Rotas de Produto */}
            {nivel.cadastro_produto_acesssivel ? (
              <Route path = '/produtos' element = {token ? (<CounsultarProduto/>) : <Login/>}/>
            ) : <Route path = "/produtos" element = {token ? (<Home/>) : <Login/>}/>}
            <Route path = '/cadastrarProduto' element = {token ? (<CadastroProduto/>) : <Login/>}/>
            
            {/* Rotas de Funcionario */}
            {nivel.cadastro_funcionario ? (
              <Route path = '/funcionarios' element = {token ? (<ConsultarFuncionario/>) : <Login/>}/>
              ) : <Route path = "/funcionarios" element = {token ? (<Home/>) : <Login/>}/>}
            {nivel.cadastro_funcionario_editar ? (
              <Route path = '/editarFuncionario/:funcionario' element = {token ? (<EditarFuncionario minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/editarFuncionario/:funcionario' element = {token ? (<ConsultarFuncionario/>) : <Login/>}/>}
            {nivel.cadastro_funcionario_incluir ? (
              <Route path = '/cadastrarFuncionario' element = {token ? (<CadastroFuncionario minimizado={minimizado} setMinimizado={setMinimizado}/>) : <Login/>}/>
            ) : <Route path = '/cadastrarFuncionario' element = {token ? (<ConsultarFuncionario/>) : <Login/>}/>}

            <Route path = '/resumoDeFaturamento' element = {token ? (<ResumoFaturamento/>) : <Login/>}/>
          </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
