import React, { useState } from "react";
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

export const NavBar = () => {
    const navigate = useNavigate();
    const [aberto, setAberto] = useState(false);
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

    return(
        <C.Container>
            {aberto ? (
                <C.Barra>
                    <div onClick={() =>setCadastros(!cadastros)}><img src="/images/cadastro.png"/>Cadastros</div>
                    {cadastros ? (
                        <div className="gaveta">
                            <div className="gaveta" onClick={()=> {navigate('/clientes'); fecharOp()}}>Cadastro de Cliente</div>
                            <div style={{backgroundColor: funcionario ? '#064a8b' : '#00a5dd', borderRadius: funcionario ? '10px 10px 0 0' : '', borderBottom: '1px solid #064a8b', margin: "0"}}>
                                <div className="gaveta" onClick={()=> setOpfuncionario(!opFuncionario)} style={{backgroundColor: funcionario ? '#064a8b' : '', border: "none"}}>
                                    Funcionários
                                </div>
                                <img src="/images/seta.png" className="seta" onClick={()=> setFuncionario(!funcionario)}/>
                            </div>
                            {funcionario === false ? (
                                <div className="gaveta">
                                    <div className="gaveta" onClick={()=> {navigate('/fornecedores'); fecharOp()}}>Cadastro de Fornecedor</div>
                                    <div style={{backgroundColor: produtos ? '#064a8b' : '#00a5dd', borderRadius: produtos ? '10px 10px 0 0' : '', borderBottom: '1px solid #064a8b', margin: "0"}}>
                                            <div className="gaveta" onClick={()=> setOpProdutos(!opProdutos)} style={{backgroundColor: produtos ? '#064a8b' : '', border: "none"}}>
                                                Produtos
                                            </div>
                                        <img src="/images/seta.png" className="seta" onClick={()=> setProdutos(!produtos)}/>
                                    </div>
                                    {produtos ? (
                                        <div className="gaveta">
                                            <div className="gaveta" onClick={()=> navigate('/produtos')}>Cadastro</div>
                                            <div className="gaveta" onClick={()=> setIsModalFamilia(true)}>Cadastrar Familia</div>
                                            <div className="gaveta" >Cadastrar Grupo</div>
                                            <div className="gaveta" onClick={()=> setIsModalRegraIcms(true)}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                                            <div className="gaveta" onClick={()=> setIsModalGrupoIpi(true)}>Cadastrar Grupos IPI</div>
                                            <div className="gaveta" onClick={()=> setIsModalGrupoPis(true)}>Cadastrar Grupo PIS/COFINS</div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="gaveta">
                                    <div className="gaveta" onClick={()=> navigate('/funcionarios')}>Cadastro</div>
                                    <div className="gaveta" onClick={()=> {setIsModalSetor(true); setCadastroSetor(true)}}>Cadastro de Setor</div>
                                    <div className="gaveta" onClick={()=> {setIsModalNivel(true); setCadastroNivel(true)}}>Cadastro de Nivel</div>
                                </div>
                            )}
                        </div>
                    ) : null}
                    <div onClick={()=> {navigate('/consultar'); fecharOp()}}><img src="/images/ponto-de-venda.png"/>Rotina</div>
                    <div onClick={() =>{setRelatorio(!relatorio)}}><img src="/images/relatorio.png"/>Relatorios</div>
                    {relatorio ? (<div className="gaveta" onClick={()=> {navigate('/resumoDeFaturamento'); fecharOp()}} >Resumo de Faturamento</div>) : null}
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}><img src="/images/seta.png"/></button>
            {opFuncionario ? <OpFuncionarios setOpfuncionario={setOpfuncionario}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} cadastroNivel={cadastroNivel} /> : null}
            {opProdutos ? <OpProdutos setOpProdutos={setOpProdutos}/> : null}
            {isModalFamilia ? <CadastrarFamilia close={()=> setIsModalFamilia(false)}/> : null}
            {isModalGrupoIpi ? <Ipi close={()=> setIsModalGrupoIpi(false)}/> : null}
            {isModalGrupoPis ? <PisCofins close={()=> setIsModalGrupoPis(false)}/> : null}
            {isModalRegraIcms ? <GrupoIcms close={()=> setIsModalRegraIcms(false)}/> : null}
        </C.Container>
    )
}