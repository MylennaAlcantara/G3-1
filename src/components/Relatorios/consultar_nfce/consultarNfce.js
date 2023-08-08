import React, { useState } from "react";
import * as C from "../../cadastro/cadastro"
import * as LB from "../resumo_de_faturamento/resumoFaturamento"

export const ConsultarNFCE = () => {

    const [aba, setAba] = useState('')

    return (
        <C.Container>
            <C.Header>
                <h3>Consultar NFC-e</h3>
            </C.Header>

            <LB.Filtros>
                <div className="FTFilterTop" >
                    <div className="btns" >
                        <button className="topFilialBtn"  >Filial</button>

                        <button className='midBTN'  >Fornecedor</button>

                        <button className='midBTN'  >Familia</button>

                        <button className='midBTN'  >Grupo</button>

                        <button className='fornecedorBTN'  >Produto</button>
                    </div>

                    <LB.FilialTop>

                    </LB.FilialTop>

                </div>

            </LB.Filtros>
        </C.Container>
    )
}

export default ConsultarNFCE;