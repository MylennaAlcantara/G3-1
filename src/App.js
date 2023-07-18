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
import { PicoDeFaturamento} from './components/Relatorios/pico_faturamento/picoDeFaturamento'
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
import { Setor } from './components/modais/modal_setor';
import { Nivel } from './components/modais/modal_nivel';
import { Familia } from './components/modais/modais_tela_produtos/modal_familia';
import { Ipi } from './components/modais/modais_tela_produtos/modal_ipi';
import { PisCofins } from './components/modais/modais_tela_produtos/modal_pis_cofins';
import { GrupoIcms } from './components/modais/modais_tela_produtos/modal_grupo_icms';
import { Grupo } from './components/modais/modais_tela_produtos/modal_icms';
import { Top } from './components/modais/modal_top';
import { PerfilCliente } from './components/modais/modal_perfil_cliente';
import { PerfilMovimentacao } from './components/modais/modal_perfil_mov';
import { RamoAtividade } from './components/modais/modal_ramo_atividade';
import { Pgt } from './components/modais/modal_pgt';
import { EvolucaoFaturamento } from './components/Relatorios/evolucao_de_faturamento(CAGR)/evolucaoFaturamento'
import { CurvaABC } from './components/Relatorios/curva__abc/curvaABC'

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

  // Estado para os modais da barra de navegação e opção de funcionario, produtos e tabela auxiliar
  const [modal, setModal] = useState({
    setor: false,
    nivel: false,
    familia: false,
    grupoIpi: false,
    grupoPis: false,
    regraIcms: false,
    grupo: false,
    top: false,
    ramo: false,
    perfil: false,
    pgto: false,
    perfilMov: false,
  })

  // Estado para indicar se esta abrindo pela barra de navegação ou pelas janelas de opções
  const [cadastro, setCadastro] = useState({
    setor: false,
    nivel: false,
    top: false,
    ramo: false,
    perfil: false,
    pgto: false
  })

  // Estado para indicar que foi minimizado
  const [minimizado, setMinimizado] = useState({
    cadastroCliente: false,
    editarCliente: false,
    cadastroFuncionario: false,
    editarFuncionario: false,
    cadastroFornecedor: false,
    editarFornecedor: false,
    cadastroRotina: false,
    editarRotina: false,
    setor: false,
    nivel: false,
    familia: false,
    grupo: false,
    regra: false,
    ipi: false,
    pis: false,
    perfil: false,
    perfilMov: false,
    ramo: false,
    pgto: false,
    top: false
  })

  return (      
  <AuthProvider>
    <div className="App">
      {/* Botões dos elementos minimizados */}
      <div className='op-minimizadas'>
        {minimizado.cadastroCliente && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroCliente: false}); navigate("/cadastrarCliente")}}>Cadastro Cliente</div>}
        {minimizado.editarCliente && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarCliente: false}); navigate("/editarCliente/:cliente")}}>Editar Cliente</div>}
        {minimizado.cadastroFuncionario && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroFuncionario: false}); navigate("/cadastrarFuncionario")}}>Cadastro Funcionário</div>}
        {minimizado.editarFuncionario && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarFuncionario: false}); navigate("/editarFuncionario/:funcionario")}}>Editar Funcionário</div>}
        {minimizado.cadastroFornecedor && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroFornecedor: false}); navigate("/cadastrarFornecedor")}}>Cadastro Fornecedor</div>}
        {minimizado.editarFornecedor && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarFornecedor: false}); navigate("/editarFornecedor/:fornecedor")}}>Editar Fornecedor</div>}
        {minimizado.cadastroRotina && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, cadastroRotina: false}); navigate("/rotina")}}>Cadastro Rotina</div>}
        {minimizado.editarRotina && <div className='minimizado' onClick={()=> {setMinimizado({...minimizado, editarRotina: false}); navigate("/editarRotina/:codigo")}}>Editar Rotina</div>}
        {minimizado.setor && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, setor: false})}>Cadastro Setor</div>}
        {minimizado.nivel && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, nivel: false})}>Cadastro Nivel</div>}
        {minimizado.familia && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, familia: false})}>Cadastro Familia</div>}
        {minimizado.grupo && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, grupo: false})}>Cadastro Grupo/Subgrupo</div>}
        {minimizado.regra && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, regra: false})}>Cadastro Regra de ICMS</div>}
        {minimizado.ipi && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, ipi: false})}>Cadastro Grupo IPI</div>}
        {minimizado.pis && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, pis: false})}>Cadastro Grupo PIS/COFINS</div>}
        {minimizado.perfil && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, perfil: false})}>Cadastro Perfil de Regra</div>}
        {minimizado.perfilMov && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, perfilMov: false})}>Cadastro Perfil de Movimentação</div>}
        {minimizado.ramo && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, ramo: false})}>Cadastro Ramo de Atividade</div>}
        {minimizado.pgto && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, pgto: false})}>Cadastro Tipo de Pagamento</div>}
        {minimizado.top && <div className='minimizado' onClick={()=> setMinimizado({...minimizado, top: false})}>Cadastro TOP</div>}
      </div>
      {/* Rotas de navegação */}
          <Routes>
            <Route path = "/" element = {<Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/> 
            <Route path = "/home" element = {token ? (<><NavBar minimizado={minimizado} setMinimizado={setMinimizado} setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal}/><Home/></>) : <Login/>}/> 
            
            {/* Rotas de Rotina */}
            {nivel.cadastro_dav_acessivel ? (
              <Route path = "/consultar" element = {token ?(<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/consultar" element = {token ? (<Home/>) : <Login/>}/>}
            {nivel.cadastro_dav_incluir ? (
              <Route path = "/rotina" element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Cadastro matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/rotina" element = {token ?(<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            {nivel.cadastro_dav_editar ? (
              <Route path = "/editarRotina/:codigo" element={token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Editar codigo={codigo} codRotina={parseFloat(codRotina)} dataEmissao={dataEmissao} horaEmissao={horaEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            ) : <Route path = "/editarRotina/:codigo" element = {token ?(<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Consultar setCodigo={setCodigo} codRotina={parseFloat(codRotina)} setDataEmissao={setDataEmissao} setHoraEmissao={setHoraEmissao} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario} /></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>}
            <Route path = "/rotina/:codigo" element={token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Visualizar codigo={codigo} codRotina={parseFloat(codRotina)} matriculaFuncionario={matriculaFuncionario} senhaFuncionario={senhaFuncionario}/></>) : <Login setSenhaFuncionario={setSenhaFuncionario} setMatriculaFuncionario={setMatriculaFuncionario} />}/>
            
            {/* Rotas de Cliente */}
            {nivel.cadastro_cliente_acessivel ? (
              <Route path = '/clientes' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>
            ) : <Route path = "/clientes" element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_cliente_editar ? (
              <Route path = '/editarCliente/:cliente' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><EditarCliente cliente={cliente} codCliente={parseFloat(codCliente)} minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/editarCliente/:cliente' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>}
            {nivel.cadastro_cliente_incluir ? (
              <Route path = '/cadastrarCliente' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CadastroCliente  minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarCliente' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarCliente setCliente={setCliente}/></>) : <Login/>}/>}
            
            {/* Rotas de Fornecedor */}
            {nivel.cadastro_fornecedor ? (
              <Route path = '/fornecedores' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarFornecedor/></>) : <Login/>}/>
            ) : <Route path = "/fornecedores" element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_incluir ? (
              <Route path = '/cadastrarFornecedor' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CadastrarFornecedor minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarFornecedor' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarFornecedor/></>) : <Login/>}/>}
            {nivel.cadastro_fornecedor_editar ? (
              <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><EditarFornecedor minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/editarFornecedor/:fornecedor' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarFornecedor/></>) : <Login/>}/>}
            
            {/* Rotas de Produto */}
            {nivel.cadastro_produto_acesssivel ? (
              <Route path = '/produtos' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CounsultarProduto/></>) : <Login/>}/>
            ) : <Route path = "/produtos" element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Home/></>) : <Login/>}/>}
            <Route path = '/cadastrarProduto' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CadastroProduto/></>) : <Login/>}/>
            
            {/* Rotas de Funcionario */}
            {nivel.cadastro_funcionario ? (
              <Route path = '/funcionarios' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal}/><ConsultarFuncionario/></>) : <Login/>}/>
              ) : <Route path = "/funcionarios" element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><Home/></>) : <Login/>}/>}
            {nivel.cadastro_funcionario_editar ? (
              <Route path = '/editarFuncionario/:funcionario' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><EditarFuncionario minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/editarFuncionario/:funcionario' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarFuncionario/></>) : <Login/>}/>}
            {nivel.cadastro_funcionario_incluir ? (
              <Route path = '/cadastrarFuncionario' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CadastroFuncionario minimizado={minimizado} setMinimizado={setMinimizado}/></>) : <Login/>}/>
            ) : <Route path = '/cadastrarFuncionario' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ConsultarFuncionario/></>) : <Login/>}/>}

            <Route path = '/resumoDeFaturamento' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><ResumoFaturamento/></>) : <Login/>}/>
            <Route path = '/picoDeFaturamento' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><PicoDeFaturamento/></>) : <Login/>}/>
            <Route path = '/evolucaoDeFaturamento' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><EvolucaoFaturamento/></>) : <Login/>}/>
            <Route path = '/curvaABC' element = {token ? (<><NavBar setCadastro={setCadastro} cadastro={cadastro} setModal={setModal} modal={modal} minimizado={minimizado} setMinimizado={setMinimizado}/><CurvaABC/></>) : <Login/>}/>
          </Routes>
          {/* Renderização dos modais */}
            {modal.setor ? <Setor close={()=> setModal({...modal, setor: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.nivel ? <Nivel close={()=> setModal({...modal, nivel: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.familia ? <Familia close={()=> setModal({...modal, familia: false})} minimizado={minimizado} setMinimizado={setMinimizado} setModal={setModal} modal={modal}/> : null}
            {modal.grupoIpi ? <Ipi close={()=> setModal({...modal, grupoIpi: false})} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.grupoPis ? <PisCofins close={()=> setModal({...modal, grupoPis: false})} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.regraIcms ? <GrupoIcms close={()=> setModal({...modal, regraIcms: false})} minimizado={minimizado} setMinimizado={setMinimizado} setModal={setModal} modal={modal}/> : null}
            {modal.grupo ? <Grupo close={()=> setModal({...modal, grupo: false})} minimizado={minimizado} setMinimizado={setMinimizado} setModal={setModal} modal={modal}/> : null}
            {modal.top ? <Top onClose={()=> setModal({...modal, top: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.perfil ? <PerfilCliente close={()=> setModal({...modal, perfil: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.perfilMov ? <PerfilMovimentacao close={()=> setModal({...modal, perfilMov: false})} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.ramo ? <RamoAtividade close={()=> setModal({...modal, ramo: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
            {modal.pgto ? <Pgt onClose={()=> setModal({...modal, pgto: false})} cadastro={cadastro} setMinimizado={setMinimizado} minimizado={minimizado} setModal={setModal} modal={modal}/> : null}
    </div>
    </AuthProvider>
  );
}

export default App;
