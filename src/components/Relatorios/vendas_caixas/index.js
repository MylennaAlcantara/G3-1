import React, { useState, useEffect } from "react";
import * as C from "../../Consultar/consultar";
import * as M from "../../modais/modal/modal";
import './vendas.css'

export const VendasCaixa = ()=> {

    const [caixa,setCaixa] = useState([])
    const [total, setTotal] = useState()

    useEffect(() => {
        async function getCaixas (){
            const res = await fetch('http://8b38091fc43d.sn.mynetname.net:2006/caixas')
            const data = await res.json();
            setCaixa(data)
        }
        getCaixas();
    }, []);

    useEffect(() => {
        async function getTotal (){
            const res = await fetch('http://8b38091fc43d.sn.mynetname.net:2006/totalVendas')
            const data = await res.json();
            setTotal(data)
        }
        getTotal();
    });

    useEffect(() => {
        async function getTotal (){
            const res = await fetch('http://8b38091fc43d.sn.mynetname.net:2006/totalVendas')
            const data = await res.json();
            setTotal(data)
        }
        getTotal();
    });

    console.log(total)

    console.log(caixa)

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
                                <option></option>
                                {caixa.map((data) => {
                                    return(
                                        <option>{data.nome}</option>
                                    )
                                } )}
                            </select> 
                        </div>

                        <div className="data-content" > 
                            <p className="p-text" >Data venda:</p> 
                            <input type="date" /> <p className="p-text" >Á</p> <input type="date" />
                        </div>

                    </div>

                    <div className="total-content" >
                        <h1 className="total-text" >TOTAL : {parseFloat(total).toLocaleString('pt-BR')} </h1>
                    </div>

                    <div className="total-caixa-content" >
                        <p>TOTAL POR CAIXA:</p>
                        {caixa.map((data) => {
                            return(
                                <p>{data.nome}:</p>
                            )
                        } )}
                    </div>

                    <div className="total-caixa-content" >
                        <p>TOTAL POR TIPO PGTO:</p>
                        <p>Dinheiro: </p>
                        <p>Crédito: </p>
                        <p>Débito: </p>
                        <p>Alimentação: </p>
                        <p>Pix: </p>
                    </div>

            </C.Container>
        </M.Modal>
    )
}