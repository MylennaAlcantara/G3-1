import React, { useContext, useEffect, useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as GI from "./grupoIcms";
import { AuthContext } from "../../../../contexts/Auth/authContext";

export const GrupoIcms = ({close, minimizado, setMinimizado}) => {
    const {filiais} = useContext(AuthContext);
    const [estados, setEstados] = useState([]);
    const [grupoIcms, setGrupoIcms] = useState([]);
    const [regraIcms, setRegraIcms] = useState([]);
    const [tops, setTops] = useState([]);
    const [perfil, setPerfil] = useState([]);

    useEffect(()=>{
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        async function fetchGrupoIcms (){
            const response = await fetch("http://10.0.1.107:8080/grupoIcms/all");
            const data = await response.json();
            setGrupoIcms(data);
        }
        async function fetchRegraIcms(){
            const response = await fetch("http://10.0.1.107:8080/regraIcms/all");
            const data = await response.json();
            setRegraIcms(data);
        }
        async function fetchTop(){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/top/all");
            const data = await response.json();
            setTops(data);
        }
        async function fetchPerfil(){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/perfilRegra/all");
            const data = await response.json();
            setPerfil(data);
        }
        fetchData();
        fetchGrupoIcms();
        fetchRegraIcms();
        fetchTop();
        fetchPerfil();
    },[])

    const [listaRegra, setListaRegra] = useState([]);
    const [grupoSelecionado, setgrupoSelecionado] = useState({
        descricao: "",
        top: ""
    });
    const [regraSelecionada, setRegraSelecionada] = useState({
            id_filial:"",
            id_regra_icms_cabecalho:"",
            p_icms: "",
            p_fcp:"",
            cfop: "",
            csosn: "",
            cst_icms:"",
            p_mva_st: "",
            mod_bc: "",
            mod_bc_st:"",
            chave: "",
            p_red_bc: "",
            valor_pauta: "",
            p_red_bc_st: "",
            valor_pauta_st: "",
            valorBCICMSST_retida: "",
            vicmsstret: "",
            p_icms_st: "",
            p_fcp_st: "",
            id_perfil_regra: "",
            id_perfil_movimentacao: ""
    })
    const [selectIndex, setSelectIndex] = useState();
    const [selectIndexRegra, setSelectIndexRegra] = useState();

    const selectFilial = document.getElementById("select-filial");
    const [filial, setFilial] = useState();

    function abrirRegra (regra, index){
        setSelectIndexRegra(index);
        setRegraSelecionada({
            id_filial: regra.id_filial,
            id_regra_icms_cabecalho:regra.id_regra_icms_cabecalho,
            p_icms: regra.p_icms,
            p_fcp:regra.p_fcp,
            cfop: regra.cfop,
            csosn: regra.csosn,
            cst_icms:regra.cst_icms,
            p_mva_st: regra.p_mva_st,
            mod_bc: regra.mod_bc,
            mod_bc_st:regra.mod_bc_st,
            chave: regra.chave,
            p_red_bc: regra.p_red_bc,
            valor_pauta: regra.valor_pauta,
            p_red_bc_st: regra.p_red_bc_st,
            valor_pauta_st: regra.valor_pauta_st,
            valorBCICMSST_retida: regra.valorBCICMSST_retida,
            vicmsstret: regra.vicmsstret,
            p_icms_st: regra.p_icms_st,
            p_fcp_st: regra.p_fcp_st,
            id_perfil_regra: regra.id_perfil_regra,
            id_perfil_movimentacao: regra.id_perfil_movimentacao
        })
        setFilial(regra.id_filial);
    }
    function abrirGrupo (grupo, index){
        const regra = regraIcms.filter((regra)=> regra.id_regra_icms_cabecalho === grupo.id);
        setListaRegra(regra);
        setgrupoSelecionado({
            descricao: grupo.descricao_regra,
            top: grupo.codigo_regra
        });
        setSelectIndex(index);
    }
    const top = tops.filter((top)=> {
        if(top.id === grupoSelecionado.top){
            return top.descricao;
        }
    });
    const filialSelecionada = filiais.filter((filial)=> {
        if(filial.id === regraSelecionada.id_filial){
            return filial.descricao
        }
    });
    const perfilParceiro = perfil.filter((perfil)=> {
        if(perfil.id === regraSelecionada.id_perfil_regra){
            return perfil.descricao;
        }
    })

    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.SubModal style={{zIndex: minimizado.regra ? minimizar : "1"}}>
            <C.Container style={{width: "70%"}}>
                <GI.Header>
                    <h3>Grupos de ICMS</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, regra: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </GI.Header>
                <GI.Content>
                    <GI.GrupoRegra>
                        <fieldset className="fieldset">
                            <legend>Grupos ({grupoIcms.length})</legend>
                            <div className="table-responsive">
                                <table id="table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>Top</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {grupoIcms.map((grupo, index)=> {
                                            return(
                                                <tr key={grupo.id}
                                                    onClick={abrirGrupo.bind(this, grupo, index)}
                                                    style={{background: index === selectIndex ? '#87CEFA' : ''}}>
                                                    <td>{grupo.id}</td>
                                                    <td>{grupo.tipo_regra}</td>
                                                    <td>{grupo.codigo_regra}</td>
                                                    <td>{grupo.descricao_regra}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <img src="/images/add.png"/>
                            <img src="/images/salvar.png"/>
                            <img src="/images/lixeira.png"/>
                        </fieldset>
                        <fieldset className="fieldset">
                        <legend>Regras ({regraIcms.length})</legend>
                            <div>
                                <select>
                                    <option>%</option>
                                </select>
                                <select>
                                    <option>%</option>
                                </select>
                                <select>
                                    <option>%</option>
                                </select>
                            </div>
                            <div className="table-responsive">
                                <table id="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Filial</th>
                                            <th>Chave</th>
                                            <th>Perfil Parceiro</th>
                                            <th>Perfil Movimentação</th>
                                            <th>CFOP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(listaRegra) && listaRegra.map((regra, index)=> {
                                            return(
                                                <tr key={regra.id} 
                                                    onClick={abrirRegra.bind(this, regra, index)}
                                                    style={{background: index === selectIndexRegra ? '#87CEFA' : ''}}>
                                                    <td>{regra.id}</td>
                                                    <td>{regra.id_filial}</td>
                                                    <td>{regra.chave}</td>
                                                    <td>{regra.id_perfil_regra}</td>
                                                    <td>{regra.id_perfil_movimentacao}</td>
                                                    <td>{regra.cfop}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <img src="/images/add.png"/>
                        </fieldset>
                    </GI.GrupoRegra>
                    <GI.DadosRegra>
                        <div className="grupo">
                            <div>
                                <label>Descrição do Grupo</label>
                                <input className="descricao" value={grupoSelecionado.descricao}/>
                            </div>
                            <div>
                                <input type="checkbox" checked={grupoSelecionado.top != 0}/>
                                <label>Tipo Operação</label>
                                <input className="codigo" value={grupoSelecionado.top}/>
                                {top.length != 0 ? (
                                    top.map(top=> {
                                        return <input className="descricao" value={top.descricao}/>
                                    })
                                ) : <input className="descricao"/>}
                            </div>
                        </div>
                        <div className="regra">
                            <div>
                                <label style={{color: "red"}}>{regraSelecionada.chave}</label>
                            </div>
                            <div>
                                <label>Chave da regra: UF-Empresa:</label>
                                <select>
                                    {estados.map((estado)=> {
                                        return <option value={estado.sigla}>{estado.sigla}</option>
                                    })}
                                </select>
                                <select>
                                    <option>Saída</option>
                                    <option>Entrada</option>
                                </select>
                                <label>UF-Parceiro:</label>
                                <select>
                                    {estados.map((estado)=> {
                                        return <option value={estado.sigla}>{estado.sigla}</option>
                                    })}
                                </select>
                            </div>
                            <div className="info">
                                <div>
                                    <label>Filial</label>
                                    <select id="select-filial">
                                    {filialSelecionada.length ? (
                                        filialSelecionada.map((fi)=> {
                                            return <option>{regraSelecionada.id_filial} - {fi.descricao}</option>
                                        })
                                    ) : (
                                        <>
                                            <option value="0">0 - TODAS</option>
                                            {filiais.map((filial)=> {
                                                return <option value={filial.id}>{filial.id} - {filial.razao_social}</option>
                                            })}
                                        </>
                                    )}
                                    </select>
                                </div>
                                <div>
                                    <label>Perfil de Parceiro: </label>
                                    <div className="descricao">
                                        <input className="codigo" value={regraSelecionada.id_perfil_regra}/>
                                        {perfilParceiro.length ? (
                                            perfilParceiro.map((perfil)=>{
                                                return <input value={perfil.descricao}/>
                                            })
                                        ) : (
                                            <input />
                                        )}
                                        
                                        
                                    </div>
                                </div>
                                <div>
                                    <label>Perfil de Movimentação: </label>
                                    <div className="descricao">
                                        <input className="codigo" value={regraSelecionada.id_perfil_movimentacao}/>
                                        <input/>
                                    </div>
                                </div>
                                <div>
                                    <label>CFOP:</label>
                                    <div className="descricao">
                                        <input className="codigo" value={regraSelecionada.cfop}/>
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>CST(Situação Tributária)</label>
                                <input className="codigo" value={regraSelecionada.cst_icms}/>
                            </div>
                            <div>Tributação</div>
                            <div className="icms">
                                <fieldset>
                                    <legend>ICMS Normal</legend>
                                    <div>
                                        <label>Modalidade BC:</label>
                                        <select>
                                            <option>{regraSelecionada.mod_bc}</option>
                                        </select>
                                    </div>
                                    <label style={{margin: "auto"}}>VALOR DA OPERAÇÃO</label>
                                    <div>
                                        <label>Alíquota própria/InterUF:</label>
                                        <input value={regraSelecionada.valor_pauta}/>
                                    </div>
                                    <div>
                                        <label>Redução BC Normal %:</label>
                                        <input value={regraSelecionada.p_red_bc}/>
                                    </div>
                                    <div>
                                        <label>Fundo de Comb. Pobreza %:</label>
                                        <input value={regraSelecionada.p_fcp}/>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>ICMS Substit. Tributária (ICMS ST)</legend>
                                    <div>
                                        <label>Modalidade BC de ST:</label>
                                        <select>
                                            <option>{regraSelecionada.mod_bc_st}</option>
                                        </select>
                                    </div>
                                    <label style={{margin: "auto"}}>PREÇO TABELADO OU MÁXIMO SUGERIDO</label>
                                    <div>
                                        <label>Alíquota ST/UF-Parceiro:</label>
                                        <input value={regraSelecionada.valor_pauta_st}/>
                                    </div>
                                    <div>
                                        <label>Redução BC de ST %:</label>
                                        <input value={regraSelecionada.p_red_bc_st}/>
                                    </div>
                                    <div>
                                        <label>Fundo de Comb. Pobreza ST %:</label>
                                        <input value={regraSelecionada.p_fcp_st}/>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    <C.Footer>
                        <div className="buttons">
                            <button><img src="/images/salvar.png"/>Salvar</button>
                            <button><img src="/images/lixeira.png"/>Excluir</button>
                            <button><img src="/images/voltar.png"/>Fechar</button>
                        </div>
                    </C.Footer>
                    </GI.DadosRegra>
                </GI.Content>
            </C.Container>
        </M.SubModal>
    )
}