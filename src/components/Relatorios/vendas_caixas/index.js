import React from "react";
import * as C from "../../Consultar/consultar";
import * as M from "../../modais/modal/modal";
import './vendas.css'

export const VendasCaixa = ()=> {
    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Vendas</h3>
                </C.Header>

                    <div className="top-content" >

                        <div className="caixas-content" >
                            <p className="p-text" >Caixas: </p>
                            <select className="caixa-select" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select> 
                        </div>

                        <div className="data-content" > 
                            <p className="p-text" >Data venda:</p> 
                            <input type="date" /> <p className="p-text" >Á</p> <input type="date" />
                        </div>

                    </div>

                    <div className="total-content" >
                        <h1>TOTAL :</h1>
                    </div>

            </C.Container>
        </M.Modal>
    )
}