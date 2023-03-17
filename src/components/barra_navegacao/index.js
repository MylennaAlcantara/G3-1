import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./navBar";

export const NavBar = () => {
    const navigate = useNavigate();
    const [aberto, setAberto] = useState(false);
    const [relatorio, setRelatorio] = useState(false);

    function abrirBarra (){
        setAberto(!aberto);
    }

    return(
        <C.Container>
            {aberto ? (
                <C.Barra>
                <div onClick={()=> navigate('/consultar')}><img src="/images/ponto-de-venda.png"/>Rotina</div>
                <div onClick={() =>setRelatorio(!relatorio)}><img src="/images/relatorio.png"/>Relatorios</div>
                {relatorio? (<div className="gaveta">Resumo de Faturamento</div>) : null}
                </C.Barra>
            ) : null}
            <button className="menu" onClick={abrirBarra} style={{left: aberto === false ? '0' : null}}/>
        </C.Container>
    )
}