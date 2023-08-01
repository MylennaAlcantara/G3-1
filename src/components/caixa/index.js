import React from "react";
import * as CX from "./caixa";

export const Caixa = () => {
    return (
        <CX.Container>
            <CX.AreaInserir>
                <div className="espaco1">
                    <div className="campo">
                        <label>CÓDIGO:</label>
                        <input/>
                    </div>
                    <div className="campo">
                        <label>QUANTIDADE:</label>
                        <input/>
                    </div>
                    <div className="campo">
                        <label>VALOR UNITÁRIO:</label>
                        <input/>
                    </div>
                    <div className="campo">
                        <label>TOTAL DO ITEM:</label>
                        <input/>
                    </div>
                </div>
                <div className="espaco2">

                </div>
            </CX.AreaInserir>
            <CX.ListaItens>

            </CX.ListaItens>
            <CX.InformacaoFinal>
                <div className="cliente"></div>
                <div className="total"></div>
                <div className="desc-acresc">
                    <div className="desc"></div>
                    <div className="acresc"></div>
                </div>
                <div className="total"></div>
            </CX.InformacaoFinal>
        </CX.Container>
    )
}