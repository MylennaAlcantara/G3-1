import React, { useState, useEffect } from "react";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal";
import * as V from "./vendas";
import { Bar, BarChart, Brush, CartesianGrid, Cell, Legend, Pie, PieChart, ReferenceLine, Sector, Tooltip, XAxis, YAxis } from "recharts";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 1;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} textAnchor={textAnchor} fill="#333">{`${(value).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export const VendasCaixa = ({ close }) => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const [caixa, setCaixa] = useState([]);

    const [total, setTotal] = useState();
    const [totalFilial, setTotalFilial] = useState();
    const [totalCaixas, setTotalCaixas] = useState([]);
    const [totalCaixasFiltrado, setTotalCaixasFiltrado] = useState([]);
    const idFilial = [];
    totalCaixas.forEach((item) => {
        if (!idFilial.includes(item.id_empresa)) {
            idFilial.push(item.id_empresa);
        }
    });
    const [tipoPgto, setTipoPgto] = useState([]);
    const [tipoPgtoFilial, setTipoPgtoFilial] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [filtroF, setFiltroF] = useState("todos");
    const [dataInicial, setDataInicial] = useState(dataAtual);
    const [dataFinal, setDataFinal] = useState(dataAtual);

    async function consultarCaixas() {
        setShowElement(true);
        const resultados = [];
        if (dataInicial && dataFinal) {
            const [totalRes, tipoPgtoRes] = await Promise.all([
                fetch(`http://10.0.1.107:8091/totalVendas/${dataInicial}/${dataFinal}`),//http://8b38091fc43d.sn.mynetname.net:2006 
                fetch(`http://10.0.1.107:8091/totalVendas/totalTipoPagamento/${dataInicial}/${dataFinal}`),
            ]);

            const totalData = await totalRes.json();
            const tipoPgtoData = await tipoPgtoRes.json();

            setTotal(totalData);
            setTipoPgto(tipoPgtoData);

            for (let i = 0; i < caixa.length; i++) {
                const id = caixa[i].id;
                const nomeCaixa = caixa[i].nome;
                const response = await fetch(`http://10.0.1.107:8091/totalVendas/${id}/${dataInicial}/${dataFinal}`);
                const data = await response.json();
                resultados.push({ idCaixa: id, nome: nomeCaixa, total: data.total, id_empresa: data.id_ecf_empresa });
            }
            setTotalCaixas(resultados);
        } else {
            for (let i = 0; i < caixa.length; i++) {
                const id = caixa[i].id;
                const nomeCaixa = caixa[i].nome;
                const response = await fetch(`http://10.0.1.107:8091/totalVendas/${id}`);
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
                    fetch('http://10.0.1.107:8091/caixas'),
                    fetch('http://10.0.1.107:8091/totalVendas'),
                    fetch('http://10.0.1.107:8091/totalVendas/totalTipoPagamento') //http://10.0.1.107:8091/totalVendas/totalTipoPagamento
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

    const resObject = {};

    tipoPgto.forEach((elem) => {
        const valorAnterior = resObject[elem.descricao] || 0;

        resObject[elem.descricao] = valorAnterior + elem.total;
    });

    const totalTipoPgto = Object.keys(resObject).map((key) => {
        return { descricao: key, total: resObject[key] };
    });

    const [pagamentoCaixa, setPagamentoCaixa] = useState();
    const [show, setShowElement] = useState(false);

    async function filtroCaixa(e) {
        setFiltro(e.target.value);
        if (e.target.value === 'todos' && dataInicial === '' && dataFinal === '') {
            async function getTotal() {
                const res = await fetch('http://10.0.1.107:8091/totalVendas')
                const data = await res.json();
                setTotal(data)
            }
            getTotal();
        } else if (e.target.value === 'todos' && dataInicial && dataFinal) {
            async function getTotal() {
                const res = await fetch(`http://10.0.1.107:8091/totalVendas/${dataInicial}/${dataFinal}`)
                const data = await res.json();
                setTotal(data)
            }
            getTotal();
        } else if (e.target.value !== "todos" && dataInicial && dataFinal) {
            async function getTotal() {
                const res = await fetch(`http://10.0.1.107:8091/totalVendas/${e.target.value}/${dataInicial}/${dataFinal}`);
                const data = await res.json();
                setTotal(data.total);
            }
            getTotal();
            const filtrado = tipoPgto.filter((pgto) => parseInt(pgto.idCaixa) === parseInt(e.target.value));
            setPagamentoCaixa(filtrado);
        } else if (e.target.value !== "todos" && dataInicial === '' && dataFinal === '') {
            async function getTotal() {
                const res = await fetch(`http://10.0.1.107:8091/totalVendas/${e.target.value}`);
                const data = await res.json();
                setTotal(data);
            }
            getTotal();
            const filtrado = tipoPgto.filter((pgto) => parseInt(pgto.idCaixa) === parseInt(e.target.value));
            setPagamentoCaixa(filtrado);
        }
    }

    function filtroFilial(e) {
        setFiltroF(e.target.value);
        const filialEscolhida = totalCaixas.filter((filial) => parseInt(e.target.value) === parseInt(filial.id_empresa));
        setTotalCaixasFiltrado(filialEscolhida);
        let somaTotalFilial = 0;
        filialEscolhida.map((cx) => somaTotalFilial += cx.total);
        setTotalFilial(somaTotalFilial);
        let somaPgto = [];
        filialEscolhida.map((cx) => {
            tipoPgto.map((item) => {
                if (parseInt(item.idCaixa) === parseInt(cx.idCaixa)) {
                    somaPgto.push(item);
                }
            });
        })
        setTipoPgtoFilial(somaPgto);
    }

    const COLORS = ['#064A8B', '#00C49F', '#00A5DD', '#8884d8'];


    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    return (
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Vendas</h3>
                    <div className="buttons">
                        <button className="minimizar" ><div className="linha" /></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <V.Filtro>
                    <div>
                        <label>Filiais:</label>
                        <select onChange={filtroFilial}>
                            <option value="todos">TODOS</option>
                            {idFilial.map((cx) => {
                                if (cx !== null) {
                                    return (
                                        <option value={cx} key={cx}>Filial - {cx}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Caixas:</label>
                        <select onChange={filtroCaixa}>
                            <option value="todos">TODOS</option>
                            {caixa.map((cx) => {
                                return (
                                    <option value={cx.id} key={cx.id}>{cx.id} - {cx.nome}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        < label> Data Venda: </label>
                        <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} /> Á
                        <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
                        <img src="/images/LUPA.png" alt="" onClick={consultarCaixas} />
                    </div>
                </V.Filtro>
                <V.Content>
                    <V.Totais>
                        <div className="total">
                            <label>TOTAL:</label>
                            {filtroF === "todos" ? (
                                <label>{parseFloat(total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}</label>
                            ) : (
                                <label>{parseFloat(totalFilial).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", " ").replace("NaN", "0,00")}</label>
                            )}
                        </div>
                        {filtro === "todos" ? (
                            filtroF === "todos" ? (

                                <div className={filtro === "todos" ? "caixa-pgto" : "pgto-caixa"}>
                                    <h3>CAIXAS:</h3>
                                    {idFilial.map((id) => {
                                        if (id !== null) {
                                            return (
                                                <div style={{ width: "100%", display: "flex", flexDirection: "column", lignItems: "start", justifyContent: "start" }}>
                                                    <h4 style={{ marginRight: "auto" }}>Filial {id}:</h4>
                                                    {totalCaixas.map((item, index) => {
                                                        if (item.id_empresa === id) {
                                                            //if (item.id_empresa === item.id_empresa && item.total != null) {
                                                            return (
                                                                <div className="pgto">
                                                                    <div style={{ width: "60%", display: "flex", alignItems: "start", justifyContent: "start" }}>
                                                                        <label style={{ marginLeft: "10px" }}>{item.nome}:</label>
                                                                    </div>
                                                                    <div style={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                                        <label style={{ marginRight: "10px" }}>{parseFloat(item.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                                                    </div>
                                                                </div>
                                                            )
                                                            //}
                                                        }
                                                    })}
                                                </div>
                                            )
                                        }
                                    })}

                                </div>
                            ) : (
                                <div className={filtro === "todos" ? "caixa-pgto" : "pgto-caixa"}>
                                    <h3>CAIXAS:</h3>
                                    {totalCaixasFiltrado.map((cx) => {
                                        if (cx.total != null) {
                                            return (
                                                <div className="pgto">
                                                    <div style={{ width: "60%", display: "flex", alignItems: "start", justifyContent: "start" }}>
                                                        <label style={{ marginLeft: "10px" }}>{cx.nome}:</label>
                                                    </div>
                                                    <div style={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                        <label style={{ marginRight: "10px" }}>{(cx.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        ) : null}
                        <div className={filtro === "todos" ? "caixa-pgto" : "pgto-caixa"}>

                            <h3>TOTAL POR TIPO PGTO.:</h3>
                            {filtro === "todos" && filtroF === "todos" ? (
                                Array.isArray(totalTipoPgto) && totalTipoPgto.map((pgto) => {

                                    return (
                                        <div className="pgto">
                                            <div style={{ width: "60%", display: "flex", alignItems: "start", justifyContent: "start" }}>
                                                <label style={{ marginLeft: "10px" }}>{pgto.descricao}:</label>
                                            </div>
                                            <div style={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                <label style={{ marginRight: "10px" }}>{parseFloat(pgto.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : filtro === "todos" && filtroF !== "todos" ? (
                                Array.isArray(tipoPgtoFilial) && tipoPgtoFilial.map((pgto) => {

                                    return (
                                        <div className="pgto">
                                            <div style={{ width: "60%", display: "flex", alignItems: "start", justifyContent: "start" }}>
                                                <label style={{ marginLeft: "10px" }}>{pgto.descricao}:</label>
                                            </div>
                                            <div style={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                <label style={{ marginRight: "10px" }}>{parseFloat(pgto.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                Array.isArray(pagamentoCaixa) && pagamentoCaixa.map((pgto) => {

                                    return (
                                        <div className="pgto">
                                            <div style={{ width: "60%", display: "flex", alignItems: "start", justifyContent: "start" }}>
                                                <label style={{ marginLeft: "10px" }}>{pgto.descricao}:</label>
                                            </div>
                                            <div style={{ width: "40%", display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                <label style={{ marginRight: "10px" }}>{(pgto.total).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }).replace("undefined", "0,00")}</label>
                                            </div>
                                        </div>
                                    )

                                })
                            )}

                        </div>
                    </V.Totais>
                    <V.Graficos>
                        {total == null || total == 0 ? (
                            <div style={{ color: "red", fontWeight: "bold" }}>Não foram encontradas vendas!</div>
                        ) : (
                            <>
                                {filtro === "todos" ? (
                                    <BarChart
                                        data={filtroF === "todos" ? totalCaixas : totalCaixasFiltrado}
                                        margin={{ top: 20 }}
                                        height={250}
                                        width={300}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="nome" />
                                        <YAxis />
                                        <Tooltip />
                                        <ReferenceLine y={0} stroke="#000" />
                                        <Brush dataKey="nome" height={30} stroke="#8884d8" />
                                        <Bar dataKey="total" fill="#8884d8" >
                                            {totalCaixas.map((data, i) => (
                                                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                ) : null}
                                <PieChart width={400} height={350}>
                                    <Tooltip />
                                    <Legend
                                        verticalAlign="top"
                                        layout="horizontal"
                                        align="top"
                                        wrapperStyle={{
                                            paddingTop: "20px",
                                        }}
                                    />
                                    {filtro === "todos" && filtroF === "todos" ? (
                                        <Pie data={totalTipoPgto} dataKey="total" nameKey="descricao" cx="50%" cy="50%"
                                            outerRadius={80} fill="#8884d8" activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            onMouseEnter={onPieEnter}
                                        >
                                            {totalTipoPgto && totalTipoPgto.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    ) : filtro === "todos" && filtroF !== "todos" ? (
                                        <Pie data={tipoPgtoFilial} dataKey="total" nameKey="descricao" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d"
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            onMouseEnter={onPieEnter} >
                                            {tipoPgtoFilial && tipoPgtoFilial.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    ) : (
                                        <Pie data={pagamentoCaixa} dataKey="total" nameKey="descricao" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d"
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            onMouseEnter={onPieEnter} >
                                            {pagamentoCaixa && pagamentoCaixa.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    )}
                                </PieChart>
                            </>
                        )}
                    </V.Graficos>
                </V.Content>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img alt="voltar" src="/images/voltar.png" />Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}