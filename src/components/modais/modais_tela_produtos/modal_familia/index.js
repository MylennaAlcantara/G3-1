import React, { useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro"
import { Fornecedor } from "../modal_fornecedor";

export const Familia = ({close}) => {

    return(
        <M.Modal>
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
                        <button><img src="/images/add.png"/>Novo</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.Modal>
    )
}