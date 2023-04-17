import React from "react";
import * as M from "../../modal/modal";

export const Cest = ({close}) => {
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Consulta Código CEST</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <input type="radio" name="filtro"/>
                        <label>CEST</label>
                        <input type="radio" name="filtro"/>
                        <label>Desc.</label>
                        <input type="radio" name="filtro"/>
                        <label>NCM</label>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar..."/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>CEST</th>
                                <th>NCM</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </M.Container>
        </M.Modal>
    )
}