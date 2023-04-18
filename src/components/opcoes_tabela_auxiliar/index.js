import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpAuxiliar = ({close, setOpAuxiliar}) => {
    const navigate = useNavigate();

    return(
        <M.Modal>
            <C.Container style={{width: "40%"}}>
                <C.Header>
                    <h3>Tabelas Auxiliares</h3>
                </C.Header>
               <CO.Opcoes>
                    <div onClick={()=> {navigate('/top'); setOpAuxiliar(false)}}>T.O.P</div>
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}