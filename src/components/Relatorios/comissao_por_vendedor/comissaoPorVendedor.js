import React, { useState, useEffect } from "react";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal";
import * as CV from "./style"
import { Loading } from "../../loading";

export const ComissaoVendedor = () => {
    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Relatório de Vendas - Por Vendedor</h3>
                    <div className="buttons">
                        <button className="minimizar" ><div className="linha" /></button>
                        <button className="close" >X</button>
                    </div>
                </C.Header>

                <CV.Filtros>
                    <div>
                        <label>Empresa movimento:</label>
                    </div>

                    <div  >
                        <label className="eName">Nome da empresa</label><img src="/images/LUPA.png"/>
                    </div>

                </CV.Filtros>

            </C.Container>
        </M.Modal>
    )
}

export default ComissaoVendedor;