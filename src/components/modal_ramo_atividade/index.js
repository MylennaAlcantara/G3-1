import React from "react";
import * as M from "../modal/modal";
import * as C from "../cadastro/cadastro";

export const RamoAtividade = ({close}) => {

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Ramo de Atividade</label>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input name="checkbox" type="radio"/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input name="checkbox" type="radio" checked/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar"/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/add.png"/> Novo</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.Modal>
    )
}