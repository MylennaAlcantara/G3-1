import React from "react";
import * as D from "./desconto";

export const DescontoAcrescimo = ({atalho, setAtalho}) => {
    function fechar(e){
        e.preventDefault();
        if(e.keyCode == 27){
            setAtalho();
        }
    }
    document.onkeydown = fechar;
    return (
        <D.Container style={{backgroundColor: atalho == 5 ? "#006633" : "#D12019"}}>
            <span style={{backgroundColor: atalho == 5 ? "#7AAE69" : "#E35c55"}}>{atalho == 5 ? "Desconto" : "Acréscimo"}</span>
            <D.Tipo>
                <fieldset>
                    <legend>Tipo</legend>
                    <input type="radio" name="tipo"/>
                    <label>Porcentagem [P]</label>
                    <input type="radio" name="tipo"/>
                    <label>Valor [V]</label>
                </fieldset>
            </D.Tipo>
            <D.Valor>
                <div>
                    <label>VALOR R$:</label>
                    <input/>
                </div>
                <div>
                    <label>MOTIVO:</label>
                    <textarea />
                </div>
            </D.Valor>
            <D.Buttons>
                <button style={{backgroundColor: atalho == 5 ? "#7AAE69" : "#E35c55"}}>OK</button>
                <button style={{backgroundColor: atalho == 5 ? "#7AAE69" : "#E35c55"}} onClick={()=> setAtalho()}>Cancelar</button>
            </D.Buttons>
        </D.Container>
    )
}