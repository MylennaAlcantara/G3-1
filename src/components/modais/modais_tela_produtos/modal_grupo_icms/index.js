import React, { useContext, useEffect, useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import * as GI from "./grupoIcms";
import { AuthContext } from "../../../../contexts/Auth/authContext";

export const GrupoIcms = ({close}) => {
    const {filiais} = useContext(AuthContext);
    const [estados, setEstados] = useState([]);

    useEffect(()=>{
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        fetchData();
    },[])

    return(
        <M.SubModal>
            <C.Container>
                <GI.Header>
                    <h3>Grupos de ICMS</h3>
                    <button className="close" onClick={close}>X</button>
                </GI.Header>
                <GI.Content>
                    <GI.GrupoRegra>
                        <fieldset>
                            <legend>Grupos ()</legend>
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
                                        <tr>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <img src="/images/add.png"/>
                            <img src="/images/salvar.png"/>
                            <img src="/images/lixeira.png"/>
                        </fieldset>
                        <fieldset>
                            <legend>Regras ()</legend>
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
                                        <tr>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
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
                                <input className="descricao"/>
                            </div>
                            <div>
                                <input type="checkbox"/>
                                <label>Tipo Operação</label>
                                <input className="codigo"/>
                                <input className="descricao"/>
                            </div>
                        </div>
                        <div className="regra">
                            <div>
                                <label style={{color: "red"}}>RN RN</label>
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
                                    <select>
                                        <option>0 - TODOS</option>
                                        {filiais.map((filial)=> {
                                            return <option value={filial.id}>{filial.razao_social}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label>Perfil de Parceiro: </label>
                                    <div className="descricao">
                                        <input className="codigo"/>
                                        <input />
                                    </div>
                                </div>
                                <div>
                                    <label>Perfil de Movimentação: </label>
                                    <div className="descricao">
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                </div>
                                <div>
                                    <label>CFOP:</label>
                                    <div className="descricao">
                                        <input className="codigo"/>
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>CST(Situação Tributária)</label>
                                <input className="codigo"/>
                            </div>
                            <div>Tributação</div>
                            <div className="icms">
                                <fieldset>
                                    <legend>ICMS Normal</legend>
                                    <div>
                                        <label>Modalidade BC:</label>
                                        <select>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <label style={{margin: "auto"}}>VALOR DA OPERAÇÃO</label>
                                    <div>
                                        <label>Alíquota própria/InterUF:</label>
                                        <input/>
                                    </div>
                                    <div>
                                        <label>Redução BC Normal %:</label>
                                        <input/>
                                    </div>
                                    <div>
                                        <label>Fundo de Comb. Pobreza %:</label>
                                        <input/>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>ICMS Substit. Tributária (ICMS ST)</legend>
                                    <div>
                                        <label>Modalidade BC de ST:</label>
                                        <select>
                                            <option>0</option>
                                        </select>
                                    </div>
                                    <label style={{margin: "auto"}}>PREÇO TABELADO OU MÁXIMO SUGERIDO</label>
                                    <div>
                                        <label>Alíquota ST/UF-Parceiro:</label>
                                        <input/>
                                    </div>
                                    <div>
                                        <label>Redução BC de ST %:</label>
                                        <input/>
                                    </div>
                                    <div>
                                        <label>Fundo de Comb. Pobreza ST %:</label>
                                        <input/>
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