import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";
import { VendasCaixa } from "../Relatorios/vendas_caixas";
import { Caixa } from "../caixa";
import { Coletor } from "../coletor";
import { ContagemEntrada } from "../coletor/contagem_entrada";
import { OpFuncionarios } from "../opcoes_funcionario";
import { OpProdutos } from "../opcoes_produto";
import { OpAuxiliar } from "../opcoes_tabela_auxiliar";
import * as C from "./navBar";

export const NavBar = ({minimizado, setMinimizado, setCadastro, cadastro, setModal, modal}) => {
    const navigate = useNavigate();
    const [aberto, setAberto] = useState(true);
    const {nivel} = useContext(AuthContext);

    const [relatorio, setRelatorio] = useState(false);
    const [cadastros, setCadastros] = useState(false);
    const [funcionario, setFuncionario] = useState(false);
    const [tabelaAuxiliar, setTabelaAuxiliar] = useState(false);
    const [produtos, setProdutos] = useState(false);
    const [opFuncionario, setOpfuncionario] = useState(false);
    
    const [opProdutos, setOpProdutos] = useState(false);

    const [opAuxiliar, setOpAuxiliar] = useState(false);

    const [vendas, setVendas] = useState(false);

    const [caixa, setCaixa] = useState(false);
    const [coletor, setColetor] = useState(false);
    const [contagemEntrada, setContagemEntrada] = useState(false);

    function abrirBarra (){
        setAberto(!aberto);
    }
    function fecharOp (){
        setOpProdutos(false);
        setOpfuncionario(false);
        setOpAuxiliar(false);
    }

    const [sincronizando, setSincronizando] = useState(null);

    const sincronizar = async () => {
        setSincronizando(true);
        const response = await fetch(process.env.REACT_APP_LINK_PICO_COLETOR_SINCRONIZADOR_VENDAS_FLASH+"/sincronizar",{
            method: "POST"
        });
        if(response.ok){
            setSincronizando(false);
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
                        <div onClick={() =>setCadastros(!cadastros)}><img alt="" src="/images/cadastro.png"/>Cadastros</div>
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
                                    <img alt="" src="/images/seta.png" className="seta" onClick={()=> setFuncionario(!funcionario)}/>
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
                                            <img alt="" src="/images/seta.png" className="seta" onClick={()=> setProdutos(!produtos)}/>
                                        </div>
                                    ) : null}
                                    {produtos === false ? (
                                        <>
                                            <div style={{backgroundColor: tabelaAuxiliar ? '#064a8b' : '#00a5dd', borderRadius: tabelaAuxiliar ? '10px 10px 0 0' : '0', margin: "0"}}>
                                                <div className="gaveta" onClick={()=> {setOpAuxiliar(!opAuxiliar); setOpProdutos(false); setOpfuncionario(false)}} style={{backgroundColor: tabelaAuxiliar ? '#064a8b' : '', border: "none"}}>
                                                    Tabelas Auxiliares
                                                </div>
                                                <img alt="" src="/images/seta.png" className="seta" onClick={()=> setTabelaAuxiliar(!tabelaAuxiliar)}/>
                                            </div>
                                            {tabelaAuxiliar ? (
                                                <>
                                                    <div className="gaveta" onClick={()=> {setModal({...modal, top: true}); setCadastro({...setCadastro, top: true})}}>T.O.P</div>
                                                    <div className="gaveta" onClick={()=> {setModal({...modal, perfilMov: true})}}>Perfil de Movimentação</div>
                                                    <div className="gaveta" onClick={()=> {setModal({...modal, perfil: true}); setCadastro({...cadastros, perfil: true})}}>Perfil de Regra</div>
                                                    <div className="gaveta" onClick={()=> {setModal({...modal, ramo: true}); setCadastro({...cadastros, ramo: true})}}>Ramo de Atividade</div>
                                                    <div className="gaveta" onClick={()=> {setModal({...modal, pgto: true}); setCadastro({...cadastros, pgto: true})}}>Tipo de Pagamento</div>
                                                </>
                                            ) : null}
                                        </>
                                    ) : (
                                        <>
                                            <div className="gaveta" onClick={()=> {navigate('/produtos'); fecharOp()}}>Cadastro</div>
                                            <div className="gaveta" onClick={()=> {setModal({...modal, familia: true});}}>Cadastrar Familia</div>
                                            <div className="gaveta" onClick={()=> {setModal({...modal, grupo: true})}}>Cadastrar Grupo</div>
                                            <div className="gaveta" onClick={()=> {setModal({...modal, regraIcms: true})}}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                                            <div className="gaveta" onClick={()=> {setModal({...modal, grupoIpi: true})}}>Cadastrar Grupos IPI</div>
                                            <div className="gaveta" onClick={()=> {setModal({...modal, grupoPis: true})}}>Cadastrar Grupo PIS/COFINS</div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {nivel.cadastro_funcionario ? <div className="gaveta" onClick={()=> {navigate('/funcionarios'); fecharOp()}}>Cadastro</div> : null}                                    
                                    {nivel.tabela_auxiliar_setor_funcionario ? <div className="gaveta" onClick={()=> {setModal({...modal, setor: true}); setCadastro({...cadastros, setor: true})}}>Cadastro de Setor</div> : null}
                                    {nivel.tabela_auxiliar_tipo_funcionario ? <div className="gaveta" onClick={()=> {setModal({...modal, nivel: true}); setCadastro({...cadastros, nivel: true})}}>Cadastro de Nivel</div> : null}
                                </>
                            )}
                        </>
                    ) : null}
                    {nivel.cadastro_dav_acessivel ? <div onClick={()=> {navigate('/consultar'); fecharOp()}}><img alt="" src="/images/ponto-de-venda.png"/>Rotina</div> : null}
                    <div onClick={() =>{setRelatorio(!relatorio)}}><img alt="" src="/images/relatorio.png"/>Relatórios</div>
                    {relatorio ? (
                        <>
                            <div className="gaveta" onClick={()=> {navigate('/resumoDeFaturamento'); fecharOp()}} >Resumo de Faturamento</div>
                            <div className="gaveta" onClick={()=> {setVendas(true); fecharOp()}} >Vendas Caixas</div>
                            <div className="gaveta" onClick={() => {navigate('/picoDeFaturamento'); fecharOp()} }>Pico de Faturamento</div>
                        </>
                    ) : null}
                    <div onClick={()=> setColetor(true)}>Coletor</div>
                    <div onClick={()=> setContagemEntrada(true)}>Recepção Nota de Entrada</div>
                    <div onClick={()=> setCaixa(true)}><img alt="" src="/images/ponto-de-venda.png"/>Caixa</div>
                    {sincronizando === true ? (
                        <div className="sincronizando">
                            Sincronizando<div className="loader"/>
                        </div>
                    ) : sincronizando === false ? (
                        <div className="sincronizado">
                            Sincronizado!
                        </div>
                    ) : null}
                    <button className={sincronizando ? "sincronizar" : "sincronizar-sinc"} onClick={sincronizando ? null : sincronizar}>Sincronizar</button>
                    <button onClick={sair}>Sair</button>
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}><img alt="" src="/images/seta.png"/></button>
            {opFuncionario ? <OpFuncionarios close={()=> setOpfuncionario(false)} setOpfuncionario={setOpfuncionario} setMinimizado={setMinimizado} minimizado={minimizado} modal={modal} setModal={setModal} cadastro={cadastro} setCadastro={setCadastro}/> : null}
            {opProdutos ? <OpProdutos close={()=> setOpProdutos(false)} setOpProdutos={setOpProdutos} setMinimizado={setMinimizado} minimizado={minimizado} modal={modal} setModal={setModal} cadastro={cadastro} setCadastro={setCadastro}/> : null}
            {opAuxiliar ? <OpAuxiliar close={()=> setOpAuxiliar(false)} setOpAuxiliar={setOpAuxiliar} setMinimizado={setMinimizado} minimizado={minimizado} modal={modal} setModal={setModal} cadastro={cadastro} setCadastro={setCadastro}/> : null}
            {vendas ? <VendasCaixa close={()=> setVendas(false)}/> : null}
            {caixa ? <Caixa /> : null}
            {coletor ? <Coletor close={()=> setColetor(false)}/> : null}
            {contagemEntrada ? <ContagemEntrada close={()=> setContagemEntrada(false)}/> : null}
        </C.Container>
    )
}