<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import * as M from "../../modal/modal";
import * as CPC from "../modal_cadastro_piscofins/cadastroPisCofins";
import * as C from "../../../cadastro/cadastro";

export const ExcecaoIpi = ({close}) => {
    const [filiais, setFiliais] = useState([]);
    const [estados, setEstados] = useState([]);
    const [perfis, setPerfis] = useState([]);
    const [tops, setTops] = useState([]);

    const dadosEntrada=[
        {
            id: '00',
            descricao: "Entrada com Recuperação de Crédito"
        },
        {
            id: '01',
            descricao: "Entrada Tributável com Alíquota Zero"
        },
        {
            id: '02',
            descricao: "Entrada Isenta"
        },
        {
            id: '03',
            descricao: "Entrada Não-Tributada"
        },
        {
            id: '04',
            descricao: "Entrada Imune"
        },
        {
            id: '05',
            descricao: "Entrada com Suspensão"
        },
        {
            id: '49',
            descricao: "Outras Entradas"
        },
    ]
    const dadosSaida=[
        {
            id: 50,
            descricao: "Saída Tributada"
        },
        {
            id: 51,
            descricao: "Saída Tributável com Alíquota Zero"
        },
        {
            id: 52,
            descricao: "Saída Isenta"
        },
        {
            id: 53,
            descricao: "Saída Não-Tributada"
        },
        {
            id: 54,
            descricao: "Saída Imune"
        },
        {
            id: 55,
            descricao: "Saída com Suspensão"
        },
        {
            id: 99,
            descricao: "Outras Saídas"
        },

    ]

    useEffect(()=>{
        async function fetchDataEstados (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        async function fetchDataPerfis (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/perfilRegra/all");
            const data = await response.json();
            setPerfis(data);
        }
        async function fetchDataTops (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/top/all");
            const data = await response.json();
            setTops(data);
        }
        fetchDataEstados();
        fetchDataPerfis();
        fetchDataTops();
    },[])

    return(
        <M.SubModal>
        <M.Container>
            <M.Header>
                <h3>Exceção a Regra de IPI</h3>
                <button className="close" onClick={close}>X</button>
            </M.Header>
            <CPC.ExcecaoRegra>
                <fieldset>
                    <legend>Exceção de Regra</legend>
                    <div>
                        <label>Origem da Operação: </label>
                        <select className="select-operacao">
                            {estados.map((estado)=>{
                                return <option value={estado.sigla}>{estado.sigla}</option>
                            })}
                        </select>
                        <label>Destino da Operação: </label>
                        <select className="select-operacao">
                            {estados.map((estado)=>{
                                return <option value={estado.sigla}>{estado.sigla}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Perfil dos Parceiros</label>
                        <select className="select-excecao">
                            {perfis.map((perfil)=> {
                                return <option value={perfil.id}>{perfil.id} - {perfil.descricao}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Finalidade das Operações: </label>
                        <select className="select-excecao">
                            {tops.map((top)=> {
                                return <option value={top.id}>{top.id} - {top.descricao}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Tributação da Exceção</legend>
                    <div>
                        <div>
                            <label className="entrada">Situação de IPI (E): </label>
                            <select>
                                {dadosEntrada.map((entrada)=>{
                                    return <option value={entrada.id}>{entrada.id} - {entrada.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="entrada">Alíquota Entrada: </label>
                            <input placeholder="0,0000"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="saida">Situação de IPI (S): </label>
                            <select>
                                {dadosSaida.map((saida)=>{
                                    return <option value={saida.id}>{saida.id} - {saida.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="saida">Alíquota Saída: </label>
                            <input placeholder="0,0000"/>
                        </div>
                    </div>
                </fieldset>
            </CPC.ExcecaoRegra>
            <C.Footer>
                <div className="buttons">
                    <button><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                </div>
            </C.Footer>
        </M.Container>
        </M.SubModal>
    )
=======
import React, { useEffect, useState } from "react";
import * as M from "../../modal/modal";
import * as CPC from "../modal_cadastro_piscofins/cadastroPisCofins";
import * as C from "../../../cadastro/cadastro";

export const ExcecaoIpi = ({close}) => {
    const [filiais, setFiliais] = useState([]);
    const [estados, setEstados] = useState([]);
    const [perfis, setPerfis] = useState([]);
    const [tops, setTops] = useState([]);

    const dadosEntrada=[
        {
            id: '00',
            descricao: "Entrada com Recuperação de Crédito"
        },
        {
            id: '01',
            descricao: "Entrada Tributável com Alíquota Zero"
        },
        {
            id: '02',
            descricao: "Entrada Isenta"
        },
        {
            id: '03',
            descricao: "Entrada Não-Tributada"
        },
        {
            id: '04',
            descricao: "Entrada Imune"
        },
        {
            id: '05',
            descricao: "Entrada com Suspensão"
        },
        {
            id: '49',
            descricao: "Outras Entradas"
        },
    ]
    const dadosSaida=[
        {
            id: 50,
            descricao: "Saída Tributada"
        },
        {
            id: 51,
            descricao: "Saída Tributável com Alíquota Zero"
        },
        {
            id: 52,
            descricao: "Saída Isenta"
        },
        {
            id: 53,
            descricao: "Saída Não-Tributada"
        },
        {
            id: 54,
            descricao: "Saída Imune"
        },
        {
            id: 55,
            descricao: "Saída com Suspensão"
        },
        {
            id: 99,
            descricao: "Outras Saídas"
        },

    ]

    useEffect(()=>{
        async function fetchDataEstados (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        async function fetchDataPerfis (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/perfilRegra/all");
            const data = await response.json();
            setPerfis(data);
        }
        async function fetchDataTops (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/top/all");
            const data = await response.json();
            setTops(data);
        }
        fetchDataEstados();
        fetchDataPerfis();
        fetchDataTops();
    },[])

    return(
        <M.SubModal>
        <M.Container>
            <M.Header>
                <h3>Exceção a Regra de IPI</h3>
                <button className="close" onClick={close}>X</button>
            </M.Header>
            <CPC.ExcecaoRegra>
                <fieldset>
                    <legend>Exceção de Regra</legend>
                    <div>
                        <label>Origem da Operação: </label>
                        <select className="select-operacao">
                            {estados.map((estado)=>{
                                return <option value={estado.sigla}>{estado.sigla}</option>
                            })}
                        </select>
                        <label>Destino da Operação: </label>
                        <select className="select-operacao">
                            {estados.map((estado)=>{
                                return <option value={estado.sigla}>{estado.sigla}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Perfil dos Parceiros</label>
                        <select className="select-excecao">
                            {perfis.map((perfil)=> {
                                return <option value={perfil.id}>{perfil.id} - {perfil.descricao}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Finalidade das Operações: </label>
                        <select className="select-excecao">
                            {tops.map((top)=> {
                                return <option value={top.id}>{top.id} - {top.descricao}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Tributação da Exceção</legend>
                    <div>
                        <div>
                            <label className="entrada">Situação de IPI (E): </label>
                            <select>
                                {dadosEntrada.map((entrada)=>{
                                    return <option value={entrada.id}>{entrada.id} - {entrada.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="entrada">Alíquota Entrada: </label>
                            <input placeholder="0,0000"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="saida">Situação de IPI (S): </label>
                            <select>
                                {dadosSaida.map((saida)=>{
                                    return <option value={saida.id}>{saida.id} - {saida.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="saida">Alíquota Saída: </label>
                            <input placeholder="0,0000"/>
                        </div>
                    </div>
                </fieldset>
            </CPC.ExcecaoRegra>
            <C.Footer>
                <div className="buttons">
                    <button><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                </div>
            </C.Footer>
        </M.Container>
        </M.SubModal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}