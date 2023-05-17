import React from "react";
import * as C from "../../Consultar/consultar";
import * as M from "../../modais/modal/modal";

export const VendasCaixa = ()=> {
    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>vendas</h3>
                </C.Header>
                <C.Filtro>
                    <div>
                        <input type="radio" name="caixa"/>
                        <label>Caixa 01</label>
                    </div>
                    <div>
                        <input type="radio" name="caixa"/>
                        <label>Caixa 02</label>
                    </div>
                    <div>
                        <input type="radio" name="caixa"/>
                        <label>Caixa 04</label>
                    </div>
                </C.Filtro>
            </C.Container>
        </M.Modal>
    )
}