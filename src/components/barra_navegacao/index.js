import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Familia } from "../modais/modais_tela_produtos/modal_familia/index";
import { Ipi } from "../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../modais/modais_tela_produtos/modal_pis_cofins";
import { Nivel } from "../modais/modal_nivel";
import { Setor } from "../modais/modal_setor";
import { OpFuncionarios } from "../opcoes_funcionario";
import { OpProdutos } from "../opcoes_produto";
import { GrupoIcms } from "../modais/modais_tela_produtos/modal_grupo_icms";
import * as C from "./navBar";
import { AuthContext } from "../../contexts/Auth/authContext";
import { OpAuxiliar } from "../opcoes_tabela_auxiliar";
import { PerfilCliente } from "../modais/modal_perfil_cliente";
import { RamoAtividade } from "../modais/modal_ramo_atividade";
import { Pgt } from "../modais/modal_pgt";
import { Grupo } from "../modais/modais_tela_produtos/modal_icms";

export const NavBar = () => {
    const navigate = useNavigate();
    const [aberto, setAberto] = useState(true);
    const {nivel} = useContext(AuthContext);

    const [relatorio, setRelatorio] = useState(false);
    const [cadastros, setCadastros] = useState(false);
    const [funcionario, setFuncionario] = useState(false);
    const [tabelaAuxiliar, setTabelaAuxiliar] = useState(false);
    const [opFuncionario, setOpfuncionario] = useState(false);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [cadastroSetor, setCadastroSetor] = useState(false)
    const [isModalNivel, setIsModalNivel] = useState(false);
    const [cadastroNivel, setCadastroNivel] = useState(false)
    
    const [opProdutos, setOpProdutos] = useState(false);
    const [produtos, setProdutos] = useState(false);
    const [isModalFamilia, setIsModalFamilia] = useState(false);
    const [isModalGrupoIpi, setIsModalGrupoIpi] = useState(false);
    const [isModalGrupoPis, setIsModalGrupoPis] = useState(false);
    const [isModalRegraIcms, setIsModalRegraIcms] = useState(false);
    const [isModalGrupo, setIsModalGrupo] = useState(false);

    const [opAuxiliar, setOpAuxiliar] = useState(false);
    const [ramo, setRamo] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [tipoPgto, setTipoPgto] = useState(false);
    const [cadastroRamo, setCadastroRamo] = useState(false);
    const [cadastroPerfil, setCadastroPerfil] = useState(false);
    const [cadastroPgto, setCadastroPgto] = useState(false);

    function abrirBarra (){
        setAberto(!aberto);
    }
    function fecharOp (){
        setOpProdutos(false);
        setOpfuncionario(false);
        setOpAuxiliar(false);
    }

    function navegarProduto (){
        fecharOp();
        if(isModalFamilia === true){
            setIsModalRegraIcms(false);
            setIsModalGrupoIpi(false);
            setIsModalGrupoPis(false);
            setIsModalGrupo(false);
        }else if(isModalRegraIcms === true){
            setIsModalGrupoIpi(false);
            setIsModalGrupoPis(false);
            setIsModalFamilia(false);
            setIsModalGrupo(false);
        }else if(isModalGrupoIpi === true){
            setIsModalRegraIcms(false);
            setIsModalGrupoPis(false);
            setIsModalFamilia(false);
            setIsModalGrupo(false);
        }else if(isModalGrupoPis === true){
            setIsModalFamilia(false);
            setIsModalRegraIcms(false);
            setIsModalGrupoIpi(false);
            setIsModalGrupo(false);
        }else if(isModalGrupo === true){
            setIsModalGrupoPis(false);
            setIsModalFamilia(false);
            setIsModalRegraIcms(false);
            setIsModalGrupoIpi(false);
        }
    }
    function navegarTabelaAuxi(){
        if(perfil){
            setRamo(false);
            setTipoPgto(false);
        }else if(ramo){
            setPerfil(false);
            setTipoPgto(false);
        }else if(tipoPgto){
            setPerfil(false);
            setRamo(false);
        }
    }
    function navegarFuncionario(){
        if(isModalSetor){
            setIsModalNivel(false);
        }else if(isModalNivel){
            setIsModalSetor(false);
        }
    }

    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(
        <C.Container>
            {aberto ? (
                <C.Barra>
                    {nivel.cadastro_acessivel ? (
                        <div onClick={() =>setCadastros(!cadastros)}><img src="/images/cadastro.png"/>Cadastros</div>
                    ) : null}
                    {cadastros && nivel.cadastro_acessivel ? (
                        <>
                            {nivel.cadastro_cliente_acessivel ? <div className="gaveta" onClick={()=> {navigate('/clientes'); fecharOp()}}>Cadastro de Cliente</div> : null}                            
                            {nivel.cadastro_funcionario || nivel.tabela_auxiliar_setor_funcionario || nivel.tabela_auxiliar_tipo_funcionario ? (
                                <div style={{backgroundColor: funcionario ? '#064a8b' : '#00a5dd', borderRadius: funcionario ? '10px 10px 0 0' : '0', margin: "0"}}>
                                    <>
                                    <div className="gaveta" onClick={()=> {setOpfuncionario(!opFuncionario); setOpProdutos(false); setOpAuxiliar(false);}} style={{backgroundColor: funcionario ? '#064a8b' : '', border: "none"}}>
                                        Funcionários
                                    </div>
                                    <img src="/images/seta.png" className="seta" onClick={()=> setFuncionario(!funcionario)}/>
                                    </>
                                </div>
                            ) : null}
                            {funcionario === false ? (
                                <>
                                    {nivel.cadastro_fornecedor ? (
                                        <div className="gaveta" onClick={()=> {navigate('/fornecedores'); fecharOp()}}>Cadastro de Fornecedor</div>
                                    ) : null}
                                    {nivel.cadastro_produto_acesssivel ? (
                                        <div style={{backgroundColor: produtos ? '#064a8b' : '#00a5dd', borderRadius: produtos ? '10px 10px 0 0' : '0', margin: "0"}}>
                                                <div className="gaveta" onClick={()=> {setOpProdutos(!opProdutos); setOpfuncionario(false); setOpAuxiliar(false);}} style={{backgroundColor: produtos ? '#064a8b' : '', border: "none"}}>
                                                    Produtos
                                                </div>
                                            <img src="/images/seta.png" className="seta" onClick={()=> setProdutos(!produtos)}/>
                                        </div>
                                    ) : null}
                                    {produtos === false ? (
                                        <>
                                            <div style={{backgroundColor: tabelaAuxiliar ? '#064a8b' : '#00a5dd', borderRadius: tabelaAuxiliar ? '10px 10px 0 0' : '0', margin: "0"}}>
                                                <div className="gaveta" onClick={()=> {setOpAuxiliar(!opAuxiliar); setOpProdutos(false); setOpfuncionario(false)}} style={{backgroundColor: tabelaAuxiliar ? '#064a8b' : '', border: "none"}}>
                                                    Tabelas Auxiliares
                                                </div>
                                                <img src="/images/seta.png" className="seta" onClick={()=> setTabelaAuxiliar(!tabelaAuxiliar)}/>
                                            </div>
                                            {tabelaAuxiliar ? (
                                                <>
                                                    <div className="gaveta" onClick={()=> {navigate('/top'); fecharOp()}}>T.O.P</div>
                                                    <div className="gaveta" onClick={()=> {setPerfil(true); setCadastroPerfil(true); navegarTabelaAuxi()}}>Perfil de Regra</div>
                                                    <div className="gaveta" onClick={()=> {setRamo(true); setCadastroRamo(true); navegarTabelaAuxi()}}>Ramo de Atividade</div>
                                                    <div className="gaveta" onClick={()=> {setTipoPgto(true); setCadastroPgto(true); navegarTabelaAuxi()}}>Tipo de Pagamento</div>
                                                </>
                                            ) : null}
                                        </>
                                    ) : (
                                        <>
                                            <div className="gaveta" onClick={()=> {navigate('/produtos'); fecharOp()}}>Cadastro</div>
                                            <div className="gaveta" onClick={()=> {setIsModalFamilia(true); navegarProduto()}}>Cadastrar Familia</div>
                                            <div className="gaveta" onClick={()=> {setIsModalGrupo(true); navegarProduto()}}>Cadastrar Grupo</div>
                                            <div className="gaveta" onClick={()=> {setIsModalRegraIcms(true); navegarProduto()}}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                                            <div className="gaveta" onClick={()=> {setIsModalGrupoIpi(true); navegarProduto()}}>Cadastrar Grupos IPI</div>
                                            <div className="gaveta" onClick={()=> {setIsModalGrupoPis(true); navegarProduto()}}>Cadastrar Grupo PIS/COFINS</div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {nivel.cadastro_funcionario ? <div className="gaveta" onClick={()=> {navigate('/funcionarios'); fecharOp()}}>Cadastro</div> : null}                                    
                                    {nivel.tabela_auxiliar_setor_funcionario ? <div className="gaveta" onClick={()=> {setIsModalSetor(true); setCadastroSetor(true); navegarFuncionario()}}>Cadastro de Setor</div> : null}
                                    {nivel.tabela_auxiliar_tipo_funcionario ? <div className="gaveta" onClick={()=> {setIsModalNivel(true); setCadastroNivel(true); navegarFuncionario()}}>Cadastro de Nivel</div> : null}
                                </>
                            )}
                        </>
                    ) : null}
                    {nivel.cadastro_dav_acessivel ? <div onClick={()=> {navigate('/consultar'); fecharOp()}}><img src="/images/ponto-de-venda.png"/>Rotina</div> : null}
                    <div onClick={() =>{setRelatorio(!relatorio)}}><img src="/images/relatorio.png"/>Relatórios</div>
                    {relatorio ? (<div className="gaveta" onClick={()=> {navigate('/resumoDeFaturamento'); fecharOp()}} >Resumo de Faturamento</div>) : null}
                    <button onClick={sair}>Sair</button>
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}><img src="/images/seta.png"/></button>
            {opFuncionario ? <OpFuncionarios close={()=> setOpfuncionario(false)} setOpfuncionario={setOpfuncionario}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} cadastroNivel={cadastroNivel} /> : null}
            
            {opProdutos ? <OpProdutos close={()=> setOpProdutos(false)} setOpProdutos={setOpProdutos}/> : null}
            {isModalFamilia ? <Familia close={()=> setIsModalFamilia(false)}/> : null}
            {isModalGrupoIpi ? <Ipi close={()=> setIsModalGrupoIpi(false)}/> : null}
            {isModalGrupoPis ? <PisCofins close={()=> setIsModalGrupoPis(false)}/> : null}
            {isModalRegraIcms ? <GrupoIcms close={()=> setIsModalRegraIcms(false)}/> : null}
            {isModalGrupo ? <Grupo close={()=> setIsModalGrupo(false)}/> : null}
            
            {opAuxiliar ? <OpAuxiliar close={()=> setOpAuxiliar(false)} setOpAuxiliar={setOpAuxiliar}/> : null}
            {perfil ? <PerfilCliente close={()=> setPerfil(false)} cadastroPerfil={cadastroPerfil}/> : null}
            {ramo ? <RamoAtividade close={()=> setRamo(false)} cadastroRamo={cadastroRamo}/> : null}
            {tipoPgto ? <Pgt onClose={()=> setTipoPgto(false)} cadastroPgto={cadastroPgto}/> : null}
        </C.Container>
    )
}