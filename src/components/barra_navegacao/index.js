import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Setor } from "../modais/modal_setor";
import { OpFuncionarios } from "../opcoes_funcionario";
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

    function abrirBarra (){
        setAberto(!aberto);
    }

    return(
        <C.Container>
            {aberto ? (
                <C.Barra>
                    <div onClick={() =>setCadastros(!cadastros)}><img src="/images/cadastro.png"/>Cadastros</div>
                    {cadastros ? (
                        <div className="gaveta">
                            <div className="gaveta" onClick={()=> navigate('/clientes')}>Cadastro de Cliente</div>
                            <div style={{backgroundColor: funcionario ? '#064a8b' : '#00a5dd', borderRadius: funcionario ? '10px 10px 0 0' : '', borderBottom: '1px solid #064a8b', margin: "0"}}>
                                <div className="gaveta" onClick={()=> setOpfuncionario(!opFuncionario)} style={{backgroundColor: funcionario ? '#064a8b' : '', border: "none"}}>
                                    Funcionários
                                </div>
                                <img src="/images/seta.png" className="seta" onClick={()=> setFuncionario(!funcionario)}/>
                            </div>
                            {funcionario === false ? (
                                <div className="gaveta">
                                    <div className="gaveta" onClick={()=> navigate('/fornecedores')}>Cadastro de Fornecedor</div>
                                    <div className="gaveta" onClick={()=> navigate('/produtos')}>Cadastro de Produto</div>
                                </div>
                            ) : (
                                <div className="gaveta">
                                    <div className="gaveta" onClick={()=> navigate('/funcionarios')}>Cadastro</div>
                                    <div className="gaveta" onClick={()=> {setIsModalSetor(true); setCadastroSetor(true)}}>Cadastro de Setor</div>
                                    <div className="gaveta" >Cadastro de Nivel</div>
                                </div>
                            )}
                        </div>
                    ) : null}
                    <div onClick={()=> navigate('/consultar')}><img src="/images/ponto-de-venda.png"/>Rotina</div>
                    <div onClick={() =>setRelatorio(!relatorio)}><img src="/images/relatorio.png"/>Relatorios</div>
                    {relatorio ? (<div className="gaveta" onClick={()=> navigate('/resumoDeFaturamento')} >Resumo de Faturamento</div>) : null}
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}><img src="/images/seta.png"/></button>
            {opFuncionario ? <OpFuncionarios setOpfuncionario={setOpfuncionario}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
        </C.Container>
    )
}