import React, { useState, useEffect } from "react";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal";
import * as V from "./vendas";
import Chart from 'react-google-charts';

export const VendasCaixa = ({ close }) => {

    const [caixa, setCaixa] = useState([]);

    const [total, setTotal] = useState();
    const [totalCaixas, setTotalCaixas] = useState([]);
    const [tipoPgto, setTipoPgto] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();

    async function consultarCaixas() {
        const resultados = [];


        if (dataInicial && dataFinal) {
            const [totalRes, tipoPgtoRes] = await Promise.all([
                fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${dataInicial}/${dataFinal}`),
                fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/totalTipoPagamento/${dataInicial}/${dataFinal}`),
            ]);

            const totalData = await totalRes.json();
            const tipoPgtoData = await tipoPgtoRes.json();

            setTotal(totalData);
            setTipoPgto(tipoPgtoData);

            for (let i = 0; i < caixa.length; i++) {
                const id = caixa[i].id;
                const nomeCaixa = caixa[i].nome;
                const response = await fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${id}/${dataInicial}/${dataFinal}`);
                const data = await response.json();
                resultados.push({ nome: nomeCaixa, total: data });
            }
            setTotalCaixas(resultados);
        } else {
            for (let i = 0; i < caixa.length; i++) {
                const id = caixa[i].id;
                const nomeCaixa = caixa[i].nome;
                const response = await fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${id}`);
                const data = await response.json();
                resultados.push({ nome: nomeCaixa, total: data });
            }
            setTotalCaixas(resultados);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const [caixasRes, totalRes, tipoPgtoRes] = await Promise.all([
                    fetch('http://8b38091fc43d.sn.mynetname.net:2006/caixas'),
                    fetch('http://8b38091fc43d.sn.mynetname.net:2006/totalVendas'),
                    fetch('http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/totalTipoPagamento') //http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/totalTipoPagamento
                ]);

                const caixasData = await caixasRes.json();
                const totalData = await totalRes.json();
                const tipoPgtoData = await tipoPgtoRes.json();

                setCaixa(caixasData);
                setTotal(totalData);
                setTipoPgto(tipoPgtoData);

            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }
        fetchData();
    }, []);

    const totais = [];

    function acharDescricaoPgto(descricao) {
        for (let i = 0; i < totais.length; i++) {
            if (totais[i].descricao === descricao) {
                return i;
            }
        }
        return -1;
    }

    tipoPgto.forEach((pgto) => {
        const index = acharDescricaoPgto(pgto.descricao);
        if (index !== -1) {
            totais[index].total += pgto.total;
        } else {
            totais.push({ descricao: pgto.descricao, total: pgto.total });
        }
    });

    const [pagamentoCaixa, setPagamentoCaixa] = useState();

    async function filtroCaixa(e) {
        setFiltro(e.target.value);
        if (e.target.value === 'todos' && dataInicial == '' && dataFinal === '') {
            async function getTotal() {
                const res = await fetch('http://8b38091fc43d.sn.mynetname.net:2006/totalVendas')
                const data = await res.json();
                setTotal(data)
            }
            getTotal();
        } else if (e.target.value === 'todos' && dataInicial && dataFinal) {
            async function getTotal() {
                const res = await fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${dataInicial}/${dataFinal}`)
                const data = await res.json();
                setTotal(data)
            }
            getTotal();
        } else if (e.target.value != "todos" && dataInicial && dataFinal) {
            async function getTotal() {
                const res = await fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${e.target.value}/${dataInicial}/${dataFinal}`);
                const data = await res.json();
                setTotal(data);
            }
            getTotal();
            const filtrado = tipoPgto.filter((pgto) => pgto.idCaixa == e.target.value);
            setPagamentoCaixa(filtrado);
        } else if (e.target.value != "todos" && dataInicial == '' && dataFinal === '') {
            async function getTotal() {
                const res = await fetch(`http://8b38091fc43d.sn.mynetname.net:2006/totalVendas/${e.target.value}`);
                const data = await res.json();
                setTotal(data);
            }
            getTotal();
            const filtrado = tipoPgto.filter((pgto) => pgto.idCaixa == e.target.value);
            setPagamentoCaixa(filtrado);
        }
    }

    const graficosCaixa = [
        ["Element", "Valor Total", { role: "style" }],
        ...totalCaixas.map(item => [item.nome, item.total, ''])
    ]

    const graficosPGTOCaixasTotal = totais && [
        ["Element", ""],
        ...totais.map(item => [item.descricao, item.total])
    ]

    const graficosTipoPagamento = pagamentoCaixa && [
        ["Tipos de pagamento", ""],
        ...pagamentoCaixa.map(item => [item.descricao, item.total])
    ]

    const optionsPizza = {
        title: "Total Tipo Pagamento",
        is3D: true,
    }

    const graficosBarra = pagamentoCaixa && [
        ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
        ...pagamentoCaixa.map(item => [item.descricao])
    ]

    console.log(pagamentoCaixa)

    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Vendas</h3>
                    <div className="buttons">
                        <button className="minimizar" ><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <V.Filtro>
                    <div>
                        <label>Caixas:</label>
                        <select onChange={filtroCaixa}>
                            <option value="todos">TODOS</option>
                            {caixa.map((cx) => {
                                return (
                                    <option value={cx.id}>{cx.nome}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        < label> Data Venda: </label>
                        <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} /> Á
                        <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
                    </div>
                    <img src="/images/LUPA.png" onClick={consultarCaixas} />
                </V.Filtro>
                <V.Content>
                    <V.Totais>
                        <div className="total">
                            <label>TOTAL:</label>
                            <label>{parseFloat(total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}</label>
                        </div>
                        {filtro === "todos" ? (
                            <div className={filtro === "todos" ? "caixa-pgto" : "pgto-caixa"}>
                                <h3>CAIXAS:</h3>
                                {totalCaixas.map((cx) => {
                                    return (
                                        <div className="pgto">
                                            <div>
                                                <label>{cx.nome}:</label>
                                            </div>
                                            <div>
                                                <label>{(cx.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null}
                        <div className={filtro === "todos" ? "caixa-pgto" : "pgto-caixa"}>
                            <h3>TOTAL POR TIPO PGTO.:</h3>
                            {filtro === "todos" ? (
                                Array.isArray(totais) && totais.map((pgto) => {
                                    return (
                                        <div className="pgto">
                                            <div>
                                                <label>{pgto.descricao}:</label>
                                            </div>
                                            <div>
                                                <label>{(pgto.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                Array.isArray(pagamentoCaixa) && pagamentoCaixa.map((pgto) => {
                                    return (
                                        <div className="pgto">
                                            <div>
                                                <label>{pgto.descricao}:</label>
                                            </div>
                                            <div>
                                                <label>{(pgto.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                        </div>
                    </V.Totais>
                    <V.Graficos>
                    {filtro === 'todos' ? (
                            <div>
                                <div className="A" >
                                    <Chart width="100%" height="95%" chartType="ColumnChart" data={graficosCaixa} />
                                </div>

                                <div>
                                    <Chart chartType="PieChart" data={graficosPGTOCaixasTotal} options={optionsPizza} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Chart chartType="PieChart" height="300px" data={graficosTipoPagamento} options={optionsPizza} />
                            </div>
                        )}
                    </V.Graficos>
                </V.Content>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}