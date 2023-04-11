import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro"
import * as CF from "./cadastroFamilia";

export const CadastrarFamilia = ({close}) => {

    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Cadastrar Familia</h3>
                </C.Header>
                <CF.DadosFamilia>
                    <div className="dados-familia">
                        <div>
                            <label>Código</label>
                            <input/>
                        </div>
                        <div>
                            <label>Data de Cadastro</label>
                            <input/>
                        </div>
                        <input type="checkbox"/>
                        <label>Ativo</label>
                    </div>
                    <div className="dados-familia">
                        <div id="descricao">
                            <label>Descrição</label>
                            <input className="descricao"/>
                        </div>
                    </div>
                </CF.DadosFamilia>
                <CF.DadosProduto>
                    <div className="dados-produto" style={{borderTop: "1px solid grey"}}>
                        <div>
                            <label>Código</label>
                            <input/>
                        </div>
                        <div id="descricao">
                            <label>Descrição</label>
                            <input className="descricao"/>
                        </div>
                        <div >
                            <label>Referência</label>
                            <input/>
                        </div>
                    </div>
                    <div className="dados-produto">
                        <div className="grupo">
                            <div>
                                <label>Grupo</label>
                                <input/>
                            </div>
                            <button>Buscar</button>
                            <select/>
                        </div>
                    </div>
                    <div className="dados-produto">
                        <div className="grupo">
                            <div id="descricao">
                                <label>Produtos</label>
                                <input className="descricao"/>
                            </div>
                            <img src="/images/add.png"/>
                        </div>
                    </div>
                </CF.DadosProduto>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>GTIN</th>
                                <th>Referência</th>
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
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}