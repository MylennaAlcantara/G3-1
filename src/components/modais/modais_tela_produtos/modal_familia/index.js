<<<<<<< HEAD
import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro"
import { CadastrarFamilia } from "../modal_cadastro_familia";

export const Familia = ({close}) => {
    const [cadastrarFamilia, setCadastrarFamilia] = useState(false);

    return(
        <M.SubModal>
            <M.Container>
                <M.Header>
                    <h3>Familia</h3><button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <select>
                        <option>Código</option>
                        <option>Familia</option>
                        <option>Produto</option>
                    </select>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar..."/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Data Cad.</th>
                                <th>Ativo</th>
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
                        <button onClick={()=> setCadastrarFamilia(true)}><img src="/images/add.png"/>Novo</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
                {cadastrarFamilia ? <CadastrarFamilia close={()=> setCadastrarFamilia(false)}/> : null}
            </M.Container>
        </M.SubModal>
    )
=======
import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro"
import { CadastrarFamilia } from "../modal_cadastro_familia";

export const Familia = ({close}) => {
    const [cadastrarFamilia, setCadastrarFamilia] = useState(false);

    return(
        <M.SubModal>
            <M.Container>
                <M.Header>
                    <h3>Familia</h3><button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <select>
                        <option>Código</option>
                        <option>Familia</option>
                        <option>Produto</option>
                    </select>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar..."/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Data Cad.</th>
                                <th>Ativo</th>
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
                        <button onClick={()=> setCadastrarFamilia(true)}><img src="/images/add.png"/>Novo</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
                {cadastrarFamilia ? <CadastrarFamilia close={()=> setCadastrarFamilia(false)}/> : null}
            </M.Container>
        </M.SubModal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}