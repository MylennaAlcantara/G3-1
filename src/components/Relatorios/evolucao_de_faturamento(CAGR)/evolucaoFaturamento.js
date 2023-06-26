import React, { useContext, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import './evoFatu.css'

export const EvolucaoFaturamento = () => {

    const [filial, setFilial] = useState([]);
    const [produto, setProduto] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [fornecedor, setFornecedor] = useState([]);

    const [dataFinal, setDataFinal] = useState([]);
    const [dataInicial, setDataInicial] = useState([]);

    return (
        <C.Container>
            <C.Header><h3>Evolução de Faturamento (CAGR) </h3></C.Header>

            <LB.Filtros>
                <div className='FTFilterTop' >

                    <div className="btns">
                    <button className='fornecedorBTN' >Fornecedor</button>

                        <button className='fornecedorBTN' >Fornecedor</button>

                    </div>

                </div>
            </LB.Filtros>

        </C.Container>
    )

}

export default EvolucaoFaturamento;