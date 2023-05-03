import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CPC from "../modal_cadastro_piscofins/cadastroPisCofins";
import * as CI from "./cadastroIpi";
import { ExcecaoIpi } from "./excecao";

export const CadastroIpi = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [excecao, setExcecao] = useState(false);
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

    return(
        <M.SubModal style={{zIndex: minimizado.ipi ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <h3>Cadastro de Grupo de IPI</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, ipi: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <CPC.DadosGrupo>
                    <div id="codigo">
                        <label>Código: </label>
                        <input className="codigo"/>
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input className="descricao"/>
                    </div>
                </CPC.DadosGrupo>
                <CI.RegraGeral>
                    <fieldset>
                        <legend>Regra Geral</legend>
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
                </CI.RegraGeral>
                <CI.Excecoes>
                    <div>
                    <fieldset>
                        <legend>Exceções</legend>
                        <div className="table-response">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Parceiro</th>
                                        <th>Perfil Mov.</th>
                                        <th>Situação Entrada</th>
                                        <th>Situação Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                        <img src="/images/add.png" onClick={()=> setExcecao(true)}/>    
                    </div>
                </CI.Excecoes>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                    </div>
                </C.Footer>
                {excecao ? <ExcecaoIpi close={()=> setExcecao(false)} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar}/> : null}
            </M.Container>
        </M.SubModal>
    )
}