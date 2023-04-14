import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CadastrarFamilia } from "../modais/modais_tela_produtos/modal_cadastro_familia";
import { Ipi } from "../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../modais/modais_tela_produtos/modal_pis_cofins";
import { Nivel } from "../modais/modal_nivel";
import { Setor } from "../modais/modal_setor";
import { OpFuncionarios } from "../opcoes_funcionario";
import { OpProdutos } from "../opcoes_produto";
import { GrupoIcms } from "../modais/modais_tela_produtos/modal_grupo_icms";
import * as C from "./navBar";
import { AuthContext } from "../../contexts/Auth/authContext";

export const NavBar = () => {
    const navigate = useNavigate();
    const [aberto, setAberto] = useState(true);
    const {nivel} = useContext(AuthContext);

    const [relatorio, setRelatorio] = useState(false);
    const [cadastros, setCadastros] = useState(false);
    const [funcionario, setFuncionario] = useState(false);
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

    function abrirBarra (){
        setAberto(!aberto);
    }
    function fecharOp (){
        setOpProdutos(false);
        setOpfuncionario(false);
    }

    function navegarProduto (){
        fecharOp();
        if(isModalFamilia === true){
            setIsModalRegraIcms(false);
            setIsModalGrupoIpi(false);
            setIsModalGrupoPis(false);
        }else if(isModalRegraIcms === true){
            setIsModalGrupoIpi(false);
            setIsModalGrupoPis(false);
            setIsModalFamilia(false);
        }else if(isModalGrupoIpi === true){
            setIsModalRegraIcms(false);
            setIsModalGrupoPis(false);
            setIsModalFamilia(false);
        }else if(isModalGrupoPis === true){
            setIsModalFamilia(false);
            setIsModalRegraIcms(false);
            setIsModalGrupoIpi(false);
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
                        <div className="gaveta">
                            {nivel.cadastro_cliente_acessivel ? <div className="gaveta" onClick={()=> {navigate('/clientes'); fecharOp()}}>Cadastro de Cliente</div> : null}                            
                            {nivel.cadastro_funcionario || nivel.tabela_auxiliar_setor_funcionario || nivel.tabela_auxiliar_tipo_funcionario ? (
                                <div style={{backgroundColor: funcionario ? '#064a8b' : '#00a5dd', borderRadius: funcionario ? '10px 10px 0 0' : '', borderBottom: '1px solid #064a8b', margin: "0"}}>
                                    <>
                                    <div className="gaveta" onClick={()=> {setOpfuncionario(!opFuncionario); setOpProdutos(false);}} style={{backgroundColor: funcionario ? '#064a8b' : '', border: "none"}}>
                                        Funcionários
                                    </div>
                                    <img src="/images/seta.png" className="seta" onClick={()=> setFuncionario(!funcionario)}/>
                                    </>
                                </div>
                            ) : null}
                            {funcionario === false ? (
                                <div className="gaveta">
                                    {nivel.cadastro_fornecedor ? (
                                        <div className="gaveta" onClick={()=> {navigate('/fornecedores'); fecharOp()}}>Cadastro de Fornecedor</div>
                                    ) : null}
                                    {nivel.cadastro_produto_acesssivel ? (
                                        <div style={{backgroundColor: produtos ? '#064a8b' : '#00a5dd', borderRadius: produtos ? '10px 10px 0 0' : '', borderBottom: '1px solid #064a8b', margin: "0"}}>
                                                <div className="gaveta" onClick={()=> {setOpProdutos(!opProdutos); setOpfuncionario(false)}} style={{backgroundColor: produtos ? '#064a8b' : '', border: "none"}}>
                                                    Produtos
                                                </div>
                                            <img src="/images/seta.png" className="seta" onClick={()=> setProdutos(!produtos)}/>
                                        </div>
                                    ) : null}
                                    {produtos ? (
                                        <div className="gaveta">
                                            <div className="gaveta" onClick={()=> {navigate('/produtos'); fecharOp()}}>Cadastro</div>
                                            <div className="gaveta" onClick={()=> {setIsModalFamilia(true); navegarProduto()}}>Cadastrar Familia</div>
                                            <div className="gaveta" >Cadastrar Grupo</div>
                                            <div className="gaveta" onClick={()=> {setIsModalRegraIcms(true); navegarProduto()}}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                                            <div className="gaveta" onClick={()=> {setIsModalGrupoIpi(true); navegarProduto()}}>Cadastrar Grupos IPI</div>
                                            <div className="gaveta" onClick={()=> {setIsModalGrupoPis(true); navegarProduto()}}>Cadastrar Grupo PIS/COFINS</div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="gaveta">
                                    {nivel.cadastro_funcionario ? <div className="gaveta" onClick={()=> navigate('/funcionarios')}>Cadastro</div> : null}                                    
                                    {nivel.tabela_auxiliar_setor_funcionario ? <div className="gaveta" onClick={()=> {setIsModalSetor(true); setCadastroSetor(true)}}>Cadastro de Setor</div> : null}
                                    {nivel.tabela_auxiliar_tipo_funcionario ? <div className="gaveta" onClick={()=> {setIsModalNivel(true); setCadastroNivel(true)}}>Cadastro de Nivel</div> : null}
                                </div>
                            )}
                        </div>
                    ) : null}
                    {nivel.cadastro_dav_acessivel ? <div onClick={()=> {navigate('/consultar'); fecharOp()}}><img src="/images/ponto-de-venda.png"/>Rotina</div> : null}
                    <div onClick={() =>{setRelatorio(!relatorio)}}><img src="/images/relatorio.png"/>Relatorios</div>
                    {relatorio ? (<div className="gaveta" onClick={()=> {navigate('/resumoDeFaturamento'); fecharOp()}} >Resumo de Faturamento</div>) : null}
                    <button onClick={sair}>Sair</button>
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}><img src="/images/seta.png"/></button>
            {opFuncionario ? <OpFuncionarios close={()=> setOpfuncionario(false)} setOpfuncionario={setOpfuncionario}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} cadastroNivel={cadastroNivel} /> : null}
            {opProdutos ? <OpProdutos close={()=> setOpProdutos(false)} setOpProdutos={setOpProdutos}/> : null}
            {isModalFamilia ? <CadastrarFamilia close={()=> setIsModalFamilia(false)}/> : null}
            {isModalGrupoIpi ? <Ipi close={()=> setIsModalGrupoIpi(false)}/> : null}
            {isModalGrupoPis ? <PisCofins close={()=> setIsModalGrupoPis(false)}/> : null}
            {isModalRegraIcms ? <GrupoIcms close={()=> setIsModalRegraIcms(false)}/> : null}
        </C.Container>
    )
}