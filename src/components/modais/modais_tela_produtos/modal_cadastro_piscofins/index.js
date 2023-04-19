<<<<<<< HEAD
import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CPC from "./cadastroPisCofins";
import { Excecao } from "./excecao";

export const CadastroPisCofins = ({close}) => {
    const [excecao, setExcecao] = useState(false);
    const dadosEntrada=[
        {
            id: 50,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno"
        },
        {
            id: 51,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno"
        },
        {
            id: 52,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação"
        },
        {
            id: 53,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno"
        },
        {
            id: 54,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 55,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 56,
            descricao: "Operação com Direito a Crédito - Vinculada a receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 60,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno"
        },
        {
            id: 61,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno"
        },
        {
            id: 62,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação"
        },
        {
            id: 63,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno"
        },
        {
            id: 64,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada  a Receitas Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 65,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 66,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 67,
            descricao: "Crédito Presumido - Outras Operações"
        },
        {
            id: 70,
            descricao: "Operação de Aquisição sem Direito a Crédito"
        },
        {
            id: 71,
            descricao: "Operação de Aquisição com Isenção"
        },
        {
            id: 72,
            descricao: "Operação de Aquisição com Suspensão"
        },
        {
            id: 73,
            descricao: "Operação de Aquisição a Alíquota Zero"
        },
        {
            id: 74,
            descricao: "Operação de Aquisição sem Incidência da Contribuição"
        },
        {
            id: 75,
            descricao: "Operação de Aquisição sem Direito a Crédito"
        },
        {
            id: 98,
            descricao: "Outras operações de Entrada"
        },
        {
            id: 99,
            descricao: "Outras Operações"
        }
    ]
    const dadosSaida=[
        {
            id: "01",
            descricao: "Operação Tributável com Alíquota Básica"
        },
        {
            id: "02",
            descricao: "Operação Tributável com Alíquota Diferenciada"
        },
        {
            id: "03",
            descricao: "Operação Tributável com Alíquota por Unidade de Medida de Produto"
        },
        {
            id: "04",
            descricao: "Operação Tributável Monofásica - Revenda a Alíquota Zero"
        },
        {
            id: "05",
            descricao: "Operação Tributável por Substituição Tributária"
        },
        {
            id: "06",
            descricao: "Operação Tributável a Alíquota Zero"
        },
        {
            id: "07",
            descricao: "Operação Isenta da Contribuição"
        },
        {
            id: "08",
            descricao: "Operação sem Incidência da Contribuição"
        },
        {
            id: "09",
            descricao: "Operação com Suspensão da Contribuição"
        },
        {
            id: 49,
            descricao: "Outras Operações de Saída"
        },
    ]

    return (
        <M.SubModal>
            <C.Container>
                <C.Header>
                    <h3>Cadastro Grupo PIS/COFINS</h3>
                </C.Header>
                <CPC.DadosGrupo>
                    <div id="codigo">
                        <label>Código:</label>
                        <input className="codigo"/>
                    </div>
                    <div>
                        <label>Descrição: </label>
                        <input className="descricao"/>
                    </div>
                </CPC.DadosGrupo>
                <CPC.EntradaSaida>
                    <fieldset>
                        <legend className="entrada">ENTRADA</legend>
                        <div>
                            <label className="entrada">CST: </label>
                            <select>
                                {dadosEntrada.map((entrada)=> {
                                    return <option value={entrada.id}>{entrada.id} - {entrada.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="entrada">Alíquota PIS: </label>
                            <input placeholder="0,0000"/>
                        </div>
                        <div>
                            <label className="entrada">Alíquota COFINS:</label>
                            <input placeholder="0,0000"/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="saida">SAÍDA</legend>
                        <div>
                            <label className="saida">CST: </label>
                            <select>
                                {dadosSaida.map((saida)=>{
                                    return <option value={saida.id}>{saida.id} - {saida.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="saida">Alíquota PIS: </label>
                            <input placeholder="0,0000"/>
                        </div>
                        <div>
                            <label className="saida">Alíquota COFINS:</label>
                            <input placeholder="0,0000"/>
                        </div>
                    </fieldset>
                </CPC.EntradaSaida>
                <CPC.Excecoes>
                    <fieldset>
                        <legend>Exceções</legend>
                        <div className="table-responsive">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Filial</th>
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Parceiro</th>
                                        <th>Perfil Mov.</th>
                                        <th>Entrada Pis</th>
                                        <th>Saída Pis</th>
                                        <th>Entrada Cofins</th>
                                        <th>Saída Cofins</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <img src="/images/add.png" onClick={()=> setExcecao(true)}/>
                </CPC.Excecoes>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                    </div>
                </C.Footer>
                {excecao ? <Excecao close={()=> setExcecao(false)}/> : null}
            </C.Container>
        </M.SubModal>
    )
=======
import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as CPC from "./cadastroPisCofins";
import { Excecao } from "./excecao";

export const CadastroPisCofins = ({close}) => {
    const [excecao, setExcecao] = useState(false);
    const dadosEntrada=[
        {
            id: 50,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno"
        },
        {
            id: 51,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno"
        },
        {
            id: 52,
            descricao: "Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação"
        },
        {
            id: 53,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno"
        },
        {
            id: 54,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 55,
            descricao: "Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 56,
            descricao: "Operação com Direito a Crédito - Vinculada a receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 60,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno"
        },
        {
            id: 61,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno"
        },
        {
            id: 62,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação"
        },
        {
            id: 63,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno"
        },
        {
            id: 64,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada  a Receitas Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 65,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 66,
            descricao: "Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação"
        },
        {
            id: 67,
            descricao: "Crédito Presumido - Outras Operações"
        },
        {
            id: 70,
            descricao: "Operação de Aquisição sem Direito a Crédito"
        },
        {
            id: 71,
            descricao: "Operação de Aquisição com Isenção"
        },
        {
            id: 72,
            descricao: "Operação de Aquisição com Suspensão"
        },
        {
            id: 73,
            descricao: "Operação de Aquisição a Alíquota Zero"
        },
        {
            id: 74,
            descricao: "Operação de Aquisição sem Incidência da Contribuição"
        },
        {
            id: 75,
            descricao: "Operação de Aquisição sem Direito a Crédito"
        },
        {
            id: 98,
            descricao: "Outras operações de Entrada"
        },
        {
            id: 99,
            descricao: "Outras Operações"
        }
    ]
    const dadosSaida=[
        {
            id: "01",
            descricao: "Operação Tributável com Alíquota Básica"
        },
        {
            id: "02",
            descricao: "Operação Tributável com Alíquota Diferenciada"
        },
        {
            id: "03",
            descricao: "Operação Tributável com Alíquota por Unidade de Medida de Produto"
        },
        {
            id: "04",
            descricao: "Operação Tributável Monofásica - Revenda a Alíquota Zero"
        },
        {
            id: "05",
            descricao: "Operação Tributável por Substituição Tributária"
        },
        {
            id: "06",
            descricao: "Operação Tributável a Alíquota Zero"
        },
        {
            id: "07",
            descricao: "Operação Isenta da Contribuição"
        },
        {
            id: "08",
            descricao: "Operação sem Incidência da Contribuição"
        },
        {
            id: "09",
            descricao: "Operação com Suspensão da Contribuição"
        },
        {
            id: 49,
            descricao: "Outras Operações de Saída"
        },
    ]

    return (
        <M.SubModal>
            <C.Container>
                <C.Header>
                    <h3>Cadastro Grupo PIS/COFINS</h3>
                </C.Header>
                <CPC.DadosGrupo>
                    <div id="codigo">
                        <label>Código:</label>
                        <input className="codigo"/>
                    </div>
                    <div>
                        <label>Descrição: </label>
                        <input className="descricao"/>
                    </div>
                </CPC.DadosGrupo>
                <CPC.EntradaSaida>
                    <fieldset>
                        <legend className="entrada">ENTRADA</legend>
                        <div>
                            <label className="entrada">CST: </label>
                            <select>
                                {dadosEntrada.map((entrada)=> {
                                    return <option value={entrada.id}>{entrada.id} - {entrada.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="entrada">Alíquota PIS: </label>
                            <input placeholder="0,0000"/>
                        </div>
                        <div>
                            <label className="entrada">Alíquota COFINS:</label>
                            <input placeholder="0,0000"/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="saida">SAÍDA</legend>
                        <div>
                            <label className="saida">CST: </label>
                            <select>
                                {dadosSaida.map((saida)=>{
                                    return <option value={saida.id}>{saida.id} - {saida.descricao}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="saida">Alíquota PIS: </label>
                            <input placeholder="0,0000"/>
                        </div>
                        <div>
                            <label className="saida">Alíquota COFINS:</label>
                            <input placeholder="0,0000"/>
                        </div>
                    </fieldset>
                </CPC.EntradaSaida>
                <CPC.Excecoes>
                    <fieldset>
                        <legend>Exceções</legend>
                        <div className="table-responsive">
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Filial</th>
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Parceiro</th>
                                        <th>Perfil Mov.</th>
                                        <th>Entrada Pis</th>
                                        <th>Saída Pis</th>
                                        <th>Entrada Cofins</th>
                                        <th>Saída Cofins</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <img src="/images/add.png" onClick={()=> setExcecao(true)}/>
                </CPC.Excecoes>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                    </div>
                </C.Footer>
                {excecao ? <Excecao close={()=> setExcecao(false)}/> : null}
            </C.Container>
        </M.SubModal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}