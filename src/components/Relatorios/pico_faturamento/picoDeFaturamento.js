import React, { useState, useContext, useEffect, PureComponent } from "react";
import { Emitente } from "../../modais/modal_emitente";
import { Top } from "../../modais/modal_top";
import * as C from "../../cadastro/cadastro"
import { Loading } from "../../loading";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as LB from "../resumo_de_faturamento/resumoFaturamento";
import './picoDeFaturamento.css'
import Modal from 'react-modal';
import { picoFaturamentoHoraPDF } from "./PDFS/picoFaturamentoHoraPDF";
import { picoFaturamentoSemanaPDF } from "./PDFS/picoFaturamentoSemanaPDF";
import { picoDeFaturamentoMesPDF } from "./PDFS/picoFaturamentoMesPDF";
import { picoDeFaturamentoAnoPDF } from "./PDFS/picoFaturamentoAnoPDF";
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

Modal.setAppElement("#root")

export const PicoDeFaturamento = () => {
    const { user, empresa, cnpjMask } = useContext(AuthContext);
    const navigate = useNavigate();

    const [hora, setHora] = useState([]);
    const [semana, setSemana] = useState([]);
    const [mes, setMes] = useState([]);
    const [ano, setAno] = useState([]);
    const [busca, setBusca] = useState([]);

    const [abrirHora, setOpenAbrirHora] = useState(false);
    const [abrirSemana, setOpenAbrirSemana] = useState(false);
    const [abrirMes, setOpenAbrirMes] = useState(false);
    const [abrirAno, setOpenAbrirAno] = useState(false);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mesAtu = String(data.getMonth() + 1).padStart(2, '0');
    const anoAtu = data.getFullYear();
    const dataAtual = anoAtu + '-' + mesAtu + '-' + dia;

    const [dataInicial, setDataInicial] = useState(dataAtual);
    const [dataFinal, setDataFinal] = useState(dataAtual);

    const dataDiv = dataInicial && dataInicial.split("-");

    const [NFE, setDataNFE] = useState(true);
    const [NFCE, setDataNFCE] = useState(true);

    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);

    const [abaFilial, setAbaFilial] = useState(true);

    const [valor, setValor] = useState([]);
    const valoresA = valor.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null));

    const [valorTop, setValorTop] = useState([]);
    const valoresB = valorTop.filter(function (b) {
        return !this[JSON.stringify(b)] && (this[JSON.stringify(b)] = true);
    }, Object.create(null));

    const [aba, setAba] = useState('Hora');

    const [showElement, setShowElement] = useState(false);
    const [pesquisou, setPesquisou] = useState(false);

    const valorIdTop = valoresB.map((test) => (
        (test.id)
    ))

    const valorFilial = valoresA.map((test) => (
        (test.id)
    ))

    const objs = {
        "dataInicial": dataInicial,
        "dataFinal": dataFinal,
        "incluir_nfce": NFCE,
        "incluir_nfe": NFE,
        "id_filial": valorIdTop.toString(),
        "id_top": valorFilial.toString(),
    }

    const [query, setQuery] = useState([]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '75%',
            height: '80%',
            backgroundColor: '#6EC2FA',
            overlay: {
                backgroundColor: 'rgba(0, 0 ,0, 0.8)'
            },
        },
    };

    const imprimirHora = () => {
        picoFaturamentoHoraPDF(dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, hora, empresa, user)
    }

    const imprimirSemana = () => {
        picoFaturamentoSemanaPDF(dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, semana, empresa, user)
    }

    const imprimirMes = () => {
        picoDeFaturamentoMesPDF(dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, mes, empresa, user)
    }

    const imprimirAno = () => {
        picoDeFaturamentoAnoPDF(dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, ano, empresa, user)
    }

    async function setDataHora() {
        fetch(process.env.REACT_APP_LINK_PICO + "/picoHora", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        })
            .then((res) => {
                setShowElement(false);
                res.json().then(data => {
                    setHora(data);
                })
            })
            .catch((err) => {
                setShowElement(false);
            })
    }

    async function setDataSemana() {
        fetch(process.env.REACT_APP_LINK_PICO + "/picoSemana", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        })
            .then((res) => {
                setShowElement(false);
                res.json().then(data => {
                    setSemana(data);
                })
            })
            .catch((err) => {
                setShowElement(false);
            })
    }

    async function setDataMes() {
        fetch(process.env.REACT_APP_LINK_PICO + "/picoMes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        })
            .then((res) => {
                setShowElement(false);
                res.json().then(data => {
                    setMes(data);
                })
            })
            .catch((err) => {
                setShowElement(false);
            })
    }

    async function setDataAno() {
        fetch(process.env.REACT_APP_LINK_PICO + "/picoAno", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        })
            .then((res) => {
                res.json().then(data => {
                    setShowElement(false);
                    setAno(data);
                })
            })
            .catch((err) => {
                setShowElement(false);
            })
    }

    function voltar15Dias() {
        if (dataDiv[2] >= 15 && dataDiv[1] === '01') {
            setDataInicial(dataDiv[0] + "-01-01")
            setDataFinal(dataDiv[0] + "-01-15")
        } else if (dataDiv[2] < 15 && dataDiv[1] === '01') {
            setDataInicial((parseFloat(dataDiv[0]) - 1).toString() + "-12-15");
            setDataFinal((parseFloat(dataDiv[0]) - 1).toString() + "-12-31");
        } else if (dataDiv[2] >= 14 && dataDiv[1] === '02') {
            setDataInicial(dataDiv[0] + "-02-01");
            setDataFinal(dataDiv[0] + "-02-14");
        } else if (dataDiv[2] < 14 && dataDiv[1] === '02') {
            setDataInicial(dataDiv[0] + "-01-15");
            setDataFinal(dataDiv[0] + "-01-31");
        } else if (dataDiv[2] >= 15 && dataDiv[1] === '03') {
            setDataInicial(dataDiv[0] + "-03-01");
            setDataFinal(dataDiv[0] + "-03-15");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '03') {
            setDataInicial(dataDiv[0] + "-02-14");
            setDataFinal(dataDiv[0] + "-02-28");
        } else if (dataDiv[2] >= 15 && dataDiv[1] === '04') {
            setDataInicial(dataDiv[0] + "-04-01");
            setDataFinal(dataDiv[0] + "-04-15");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '04') {
            setDataInicial(dataDiv[0] + "-03-15");
            setDataFinal(dataDiv[0] + "-03-31");
        } else if (dataDiv[2] >= 16 && dataDiv[1] === '05') {
            setDataInicial(dataDiv[0] + "-05-01");
            setDataFinal(dataDiv[0] + "-05-16");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '05') {
            setDataInicial(dataDiv[0] + "-04-15");
            setDataFinal(dataDiv[0] + "-04-30");
        } else if (dataDiv[2] >= 15 && dataDiv[1] === '06') {
            setDataInicial(dataDiv[0] + "-06-01");
            setDataFinal(dataDiv[0] + "-06-15");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '06') {
            setDataInicial(dataDiv[0] + "-05-16");
            setDataFinal(dataDiv[0] + "-05-31");
        } else if (dataDiv[2] >= 16 && dataDiv[1] === '07') {
            setDataInicial(dataDiv[0] + "-07-01");
            setDataFinal(dataDiv[0] + "-07-16");
        } else if (dataDiv[2] < 16 && dataDiv[1] === '07') {
            setDataInicial(dataDiv[0] + "-06-15");
            setDataFinal(dataDiv[0] + "-06-30");
        } else if (dataDiv[2] >= 16 && dataDiv[1] === '08') {
            setDataInicial(dataDiv[0] + "-08-01");
            setDataFinal(dataDiv[0] + "-08-16");
        } else if (dataDiv[2] < 16 && dataDiv[1] === '08') {
            setDataInicial(dataDiv[0] + "-07-16");
            setDataFinal(dataDiv[0] + "-07-31");
        } else if (dataDiv[2] >= 15 && dataDiv[1] === '09') {
            setDataInicial(dataDiv[0] + "-09-01");
            setDataFinal(dataDiv[0] + "-09-15");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '09') {
            setDataInicial(dataDiv[0] + "-08-16");
            setDataFinal(dataDiv[0] + "-08-31");
        } else if (dataDiv[2] >= 16 && dataDiv[1] === '10') {
            setDataInicial(dataDiv[0] + "-10-01");
            setDataFinal(dataDiv[0] + "-10-16");
        } else if (dataDiv[2] < 16 && dataDiv[1] === '10') {
            setDataInicial(dataDiv[0] + "-09-15");
            setDataFinal(dataDiv[0] + "-09-30");
        } else if (dataDiv[2] >= 15 && dataDiv[1] === '11') {
            setDataInicial(dataDiv[0] + "-11-01");
            setDataFinal(dataDiv[0] + "-11-15");
        } else if (dataDiv[2] < 15 && dataDiv[1] === '11') {
            setDataInicial(dataDiv[0] + "-10-16");
            setDataFinal(dataDiv[0] + "-10-31");
        } else if (dataDiv[2] >= 16 && dataDiv[1] === '12') {
            setDataInicial(dataDiv[0] + "-12-01");
            setDataFinal(dataDiv[0] + "-12-16");
        } else if (dataDiv[2] < 16 && dataDiv[1] === '12') {
            setDataInicial(dataDiv[0] + "-11-15");
            setDataFinal(dataDiv[0] + "-11-30");
        }
    }

    function voltarMes() {
        if (dataDiv[1] === '01') {
            setDataInicial((parseFloat(dataDiv[0]) - 1).toString() + "-12-01");
            setDataFinal((parseFloat(dataDiv[0]) - 1).toString() + "-12-31");
        } else if (dataDiv[1] === '02') {
            setDataInicial(dataDiv[0] + "-01-01");
            setDataFinal(dataDiv[0] + "-01-31");
        } else if (dataDiv[1] === '03') {
            setDataInicial(dataDiv[0] + "-02-01");
            setDataFinal(dataDiv[0] + "-02-28");
        } else if (dataDiv[1] === '04') {
            setDataInicial(dataDiv[0] + "-03-01");
            setDataFinal(dataDiv[0] + "-03-31");
        } else if (dataDiv[1] === '05') {
            setDataInicial(dataDiv[0] + "-04-01");
            setDataFinal(dataDiv[0] + "-04-30");
        } else if (dataDiv[1] === '06') {
            setDataInicial(dataDiv[0] + "-05-01");
            setDataFinal(dataDiv[0] + "-05-31");
        } else if (dataDiv[1] === '07') {
            setDataInicial(dataDiv[0] + "-06-01");
            setDataFinal(dataDiv[0] + "-06-30");
        } else if (dataDiv[1] === '08') {
            setDataInicial(dataDiv[0] + "-07-01");
            setDataFinal(dataDiv[0] + "-07-31");
        } else if (dataDiv[1] === '09') {
            setDataInicial(dataDiv[0] + "-08-01");
            setDataFinal(dataDiv[0] + "-08-31");
        } else if (dataDiv[1] === '10') {
            setDataInicial(dataDiv[0] + "-09-01");
            setDataFinal(dataDiv[0] + "09-30");
        } else if (dataDiv[1] === '11') {
            setDataInicial(dataDiv[0] + "-10-01");
            setDataFinal(dataDiv[0] + "-10-31");
        } else if (dataDiv[1] === '12') {
            setDataInicial(dataDiv[0] + "-11-01");
            setDataFinal(dataDiv[0] + "-11-30");
        }
    }

    function passarMes() {
        if (dataDiv[1] === '01') {
            setDataInicial(dataDiv[0] + "-02-01");
            setDataFinal(dataDiv[0] + "-02-28");
        } else if (dataDiv[1] === '02') {
            setDataInicial(dataDiv[0] + "-03-01");
            setDataFinal(dataDiv[0] + "-03-31")
        } else if (dataDiv[1] === '03') {
            setDataInicial(dataDiv[0] + "-04-01");
            setDataFinal(dataDiv[0] + "-04-30");
        } else if (dataDiv[1] === '04') {
            setDataInicial(dataDiv[0] + "-05-01");
            setDataFinal(dataDiv[0] + "-05-31");
        } else if (dataDiv[1] === '05') {
            setDataInicial(dataDiv[0] + "-06-01");
            setDataFinal(dataDiv[0] + "-06-30");
        } else if (dataDiv[1] === '06') {
            setDataInicial(dataDiv[0] + "-07-01");
            setDataFinal(dataDiv[0] + "-07-31");
        } else if (dataDiv[1] === '07') {
            setDataInicial(dataDiv[0] + "-08-01");
            setDataFinal(dataDiv[0] + "-08-31");
        } else if (dataDiv[1] === '08') {
            setDataInicial(dataDiv[0] + "-09-01");
            setDataFinal(dataDiv[0] + "-09-30");
        } else if (dataDiv[1] === '09') {
            setDataInicial(dataDiv[0] + "-10-01");
            setDataFinal(dataDiv[0] + "-10-31");
        } else if (dataDiv[1] === '10') {
            setDataInicial(dataDiv[0] + "-11-01");
            setDataFinal(dataDiv[0] + "-11-30");
        } else if (dataDiv[1] === '11') {
            setDataInicial(dataDiv[0] + "-12-01");
            setDataFinal(dataDiv[0] + "-12-31");
        } else if (dataDiv[1] === '12') {
            setDataInicial((parseFloat(dataDiv[0]) + 1).toString() + "-01-01");
            setDataFinal((parseFloat(dataDiv[0]) + 1).toString() + "-01-31");
        }
    }

    function GetDataIni(e) {
        setDataInicial(e.currentTarget.value);
    }

    function GetDataFin(e) {
        setDataFinal(e.currentTarget.value);
    }

    const nfeCheck = (e) => {
        setDataNFE(e.currentTarget.checked)
    }

    const nfceCheck = (e) => {
        setDataNFCE(e.currentTarget.checked)
    }

    const start = () => {
        setHora([]);
        setSemana([]);
        setMes([]);
        setAno([]);
        setShowElement(true);
        setPesquisou(true);
        setDataHora();
        setDataSemana();
        setDataMes();
        setDataAno();
    }

    const deleteById = id => {
        setValor(oldValues => {
            return oldValues.filter(valor => valor.id !== id)
        })
    }

    const deleteByIdTop = id => {
        setValorTop(oldValues => {
            return oldValues.filter(valorTop => valorTop.id !== id)
        })
    }

    class CustomizedLabel extends PureComponent {
        render() {
            const { x, y, stroke, value } = this.props;

            return (
                <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
                    {value}
                </text>
            );
        }
    }

    class CustomizedAxisTick extends PureComponent {
        render() {
            const { x, y, stroke, payload } = this.props;

            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                        {payload.value}
                    </text>
                </g>
            );
        }
    }

    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header><h3>Pico de Faturamento</h3></C.Header>

            <span>Atenção: Digite ou selecione uma data antes apertar nos Botões</span>

            <LB.NavBarFiltro>
                <button className='topFilialBtn' style={{ backgroundColor: abaFilial === true ? "#8CB9DF" : "", borderBottom: abaFilial === true ? "none" : "" }} onClick={() => setAbaFilial(true)} >Filial</button>
                <button className='topsBtn' style={{ backgroundColor: abaFilial === false ? "#8CB9DF" : "", borderBottom: abaFilial === false ? "none" : "" }} onClick={() => setAbaFilial(false)} >Tops</button>
            </LB.NavBarFiltro>
            <LB.Filtros>
                <LB.FilialTop>
                    {abaFilial ? (
                        <div className='filial-top'>
                            <div>
                                <select>
                                    <option>Filial</option>
                                    <option>Região</option>
                                </select>
                                <input placeholder='Buscar...' onChange={(e) => setQuery(e.target.value)} />
                                <img alt="" src='/images/LUPA.png' onClick={() => setIsModalFilial(true)} />
                                <button onClick={() => setValor([])} >Limpar</button>
                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th >Código</th>
                                            <th >Fantasia</th>
                                            <th>Razão Social</th>
                                            <th >Documento</th>
                                            <th >Município</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {valoresA.filter(dat => dat.nome_fantasia.toLowerCase().includes(query)).map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <img alt="" className="del" src="/images/lixeira.png" onClick={() => deleteById(item.id)} />
                                                    <td>{item.id}</td>
                                                    <td>{item.nome_fantasia}</td>
                                                    <td>{item.razao_social}</td>
                                                    <td>{item.cnpj.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')}</td>
                                                    <td>{item.municipio}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className='filial-top'>
                            <div>
                                <input placeholder='Buscar pela Descrição...' onChange={(e) => setBusca(e.target.value)} />
                                <img alt="" src='/images/LUPA.png' onClick={() => setIsModalTop(true)} />
                                <button onClick={() => setValorTop([])} >Limpar</button>
                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th >Código</th>
                                            <th >Descrição</th>
                                        </tr>
                                    </thead>
                                    {valoresB.filter(dat => dat.descricao.toLowerCase().includes(busca)).map((item) => {

                                        return (
                                            <tr>
                                                <img alt="" className='del' src='/images/lixeira.png' onClick={() => deleteByIdTop(item.id)} />
                                                <td>{item.id}</td>
                                                <td>{item.descricao}</td>
                                            </tr>
                                        )

                                    })}
                                </table>
                            </div>
                        </div>
                    )}
                </LB.FilialTop>
                <LB.Data>
                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input value={dataInicial} id="DataInicial" type="date" onChange={GetDataIni} />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input value={dataFinal} id="DataFinal" type="date" onChange={GetDataFin} />
                        </div>

                        <div className="data" >
                            <label><img alt="" src="/images/calendario.png" /></label>
                            <button onClick={voltar15Dias} >Voltar 15 dias.</button>
                        </div>

                    </div>

                    <div style={{display: "flex", alignItems: "center"}}>
                        <button onClick={voltarMes} className="seta" ><img alt="" src="/images/setaEsquerda.png" /></button>
                        <button onClick={passarMes} className="seta" ><img alt="" src="/images/setaDireita.png" /></button>
                        <input type="checkbox" checked={NFE} onChange={nfeCheck} /><label>NF-e</label>
                        <input type="checkbox" checked={NFCE} onChange={nfceCheck} /><label>NFC-e</label>
                    </div>

                    <div className="search-button-content" >
                        <button className="buttons-config" onClick={start} > <img alt="" src="/images/check.png" /> Pesquisar</button>
                    </div>
                </LB.Data>
            </LB.Filtros>
            <LB.Navegacao>
                <div>
                    <button className="CE" style={{ backgroundColor: aba === "Hora" ? "#8CB9DF" : "", borderBottom: aba === 'Hora' ? "none" : "" }} onClick={() => setAba('Hora')} >Hora/Dia</button>
                    <button className="botão-filtros" style={{ backgroundColor: aba === "Semana" ? "#8CB9DF" : "", borderBottom: aba === 'Semana' ? "none" : "" }} onClick={() => setAba('Semana')} >Dia/Semana</button>
                    <button className="botão-filtros" style={{ backgroundColor: aba === "Mes" ? "#8CB9DF" : "", borderBottom: aba === 'Mes' ? "none" : "" }} onClick={() => setAba('Mes')} >Dia/Mês</button>
                    <button className="CD" style={{ backgroundColor: aba === "Ano" ? "#8CB9DF" : "", borderBottom: aba === 'Ano' ? "none" : "" }} onClick={() => setAba('Ano')} >Mês/Ano</button>
                </div>
            </LB.Navegacao>
            {aba === 'Hora' ? (
                <LB.DataGeral>
                    {hora.length === 0 && showElement === true ? (
                        <div className='c' >
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className='dashboardLine'>
                                <label>Dashboards</label>
                                <button className='dashboardBtn' onClick={() => setOpenAbrirHora(true)} > <img alt="" className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>
                                <button className='dashboardBtn' onClick={imprimirHora} > <img alt="" className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className='table-responsive' >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hora</th>
                                            <th>Qtd. NF-e</th>
                                            <th>Vlr. Total NF-e</th>
                                            <th>Qtd. NFC-e</th>
                                            <th>Vlr. Total NFC-e</th>
                                            <th>Qtd. Vendas</th>
                                            <th>Vlr. Total</th>
                                            <th>Tiket Médio</th>
                                        </tr>
                                    </thead>
                                    {hora.length !== 0 && showElement === false &&
                                        <tbody>
                                            {hora.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.hora}</td>
                                                        <td>{item.qtd_nfe.toLocaleString("pt-BR")}</td>
                                                        <td>{item.vlr_total_nfe.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                        <td>{item.qtd_nfce.toLocaleString("pt-BR")}</td>
                                                        <td>{item.vlr_total_nfce.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                        <td>{item.qtd_vendas.toLocaleString("pt-BR")}</td>
                                                        <td>{item.vlr_total.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                        <td>{item.tiket_medio.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    }
                                </table>
                                {hora.length === 0 && showElement === false && pesquisou === true &&
                                    <h1 style={{ color: "red", marginTop: "auto" }}>Não foram encontrado dados!</h1>
                                }
                            </div>
                        </>
                    )}
                </LB.DataGeral>
            ) : aba === 'Semana' ? (
                <LB.DataGeral>
                    {semana.length === 0 && showElement === true ? (
                        <div className="c" >
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className='dashboardLine'>
                                <label>Dashboards</label>
                                <button className='dashboardBtn' onClick={() => setOpenAbrirSemana(true)} > <img alt="" className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>
                                <button className='dashboardBtn' onClick={imprimirSemana} > <img alt="" className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className="table-responsive" >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Dia</th>
                                            <th>Qtd. NF-e</th>
                                            <th>Vlr. Total NF-e</th>
                                            <th>Qtd. NFC-e</th>
                                            <th>Vlr. Total NFC-e</th>
                                            <th>Qtd. Vendas</th>
                                            <th>Vlr. Total</th>
                                            <th>Tiket Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semana.map((item) => {
                                            if (item.dia === 'SUNDAY') {
                                                item.dia = 'DOMINGO'
                                            } else if (item.dia === 'MONDAY') {
                                                item.dia = 'SEGUNDA'
                                            } else if (item.dia === 'TUESDAY') {
                                                item.dia = 'TERÇA'
                                            } else if (item.dia === 'WEDNESDAY') {
                                                item.dia = 'QUARTA'
                                            } else if (item.dia === 'THURSDAY') {
                                                item.dia = 'QUINTA'
                                            } else if (item.dia === 'FRIDAY') {
                                                item.dia = 'SEXTA'
                                            } else if (item.dia === 'SATURDAY') {
                                                item.dia = 'SABADO'
                                            }

                                            return (
                                                <tr>
                                                    <td>{item.dia}</td>
                                                    <td>{item.qtd_nfe.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total_nfe.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_nfce.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total_nfce.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_vendas.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.tiket_medio.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {hora.length === 0 && showElement === false &&
                                    <h1 style={{ color: "red", marginTop: "auto" }}>Não foram encontrado dados!</h1>
                                }
                            </div>
                        </>
                    )}
                </LB.DataGeral>
            ) : aba === 'Mes' ? (
                <LB.DataGeral>
                    {mes.length === 0 && showElement === true ? (
                        <div className="c" >
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className='dashboardLine'>
                                <label>Dashboards</label>
                                <button className='dashboardBtn' onClick={() => setOpenAbrirMes(true)} > <img alt="" className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>
                                <button className='dashboardBtn' onClick={imprimirMes} > <img alt="" className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className="table-responsive" >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Dia</th>
                                            <th>Qtd. NF-e</th>
                                            <th>Vlr. Total NF-e</th>
                                            <th>Qtd. NFC-e</th>
                                            <th>Vlr. Total NFC-e</th>
                                            <th>Qtd. Vendas</th>
                                            <th>Vlr. Total</th>
                                            <th>Tiket Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mes.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.dia}</td>
                                                    <td>{item.qtd_nfe.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total_nfe.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_nfce.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total_nfce.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_vendas.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.tiket_medio.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {hora.length === 0 && showElement === false &&
                                    <h1 style={{ color: "red", marginTop: "auto" }}>Não foram encontrado dados!</h1>
                                }
                            </div>
                        </>
                    )}
                </LB.DataGeral>
            ) : aba === 'Ano' ? (
                <LB.DataGeral>
                    {ano.length === 0 && showElement === true ? (
                        <div className="c" >
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <div className='dashboardLine'>
                                <label>Dashboards</label>
                                <button className='dashboardBtn' onClick={() => setOpenAbrirAno(true)} > <img alt="" className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>
                                <button className='dashboardBtn' onClick={imprimirAno} > <img alt="" className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>

                            <div className="table-responsive" >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mês</th>
                                            <th>Qtd. NF-e</th>
                                            <th>Vlr. Total NF-e</th>
                                            <th>Qtd. NFC-e</th>
                                            <th>Vlr. Total NFC-e</th>
                                            <th>Qtd. Vendas</th>
                                            <th>Vlr. Total</th>
                                            <th>Tiket Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ano.map((item) => {
                                            if (item.mes === 'JANUARY') {
                                                item.mes = 'JANEIRO'
                                            } else if (item.mes === 'FEBRUARY') {
                                                item.mes = 'FEVEREIRO'
                                            } else if (item.mes === 'MARCH') {
                                                item.mes = 'MARÇO'
                                            } else if (item.mes === 'APRIL') {
                                                item.mes = 'ABRIL'
                                            } else if (item.mes === 'MAY') {
                                                item.mes = 'MAIO'
                                            } else if (item.mes === 'JUNE') {
                                                item.mes = 'JUNHO'
                                            } else if (item.mes === 'JULY') {
                                                item.mes = 'JULHO'
                                            } else if (item.mes === 'AUGUST') {
                                                item.mes = 'AGOSTO'
                                            } else if (item.mes === 'SEPTEMBER') {
                                                item.mes = 'SETEMBRO'
                                            } else if (item.mes === 'OCTOBER') {
                                                item.mes = 'OUTUBRO'
                                            } else if (item.mes === 'NOVEMBER') {
                                                item.mes = 'NOVEMBRO'
                                            } else if (item.mes === 'DECEMBER') {
                                                item.mes = 'DEZEMBRO'
                                            }

                                            return (
                                                <tr>
                                                    <td>{item.mes}</td>
                                                    <td>{item.qtd_nfe.toLocaleString("pt-Br")}</td>
                                                    <td>{item.vlr_total_nfe.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_nfce.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total_nfce.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.qtd_vendas.toLocaleString("pt-BR")}</td>
                                                    <td>{item.vlr_total.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{item.tiket_medio.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {hora.length === 0 && showElement === false &&
                                    <h1 style={{ color: "red", marginTop: "auto" }}>Não foram encontrado dados!</h1>
                                }
                            </div>
                        </>
                    )}
                </LB.DataGeral>
            ) : null}

            <Modal isOpen={abrirHora} onRequestClose={() => setOpenAbrirHora(false)} style={customStyles} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" >
                <button onClick={() => setOpenAbrirHora(false)} className="closeBtn" >Fechar<img alt="" className="close" src="/images/voltar.png" /></button>
                <h1>Pico por Hora</h1>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={hora}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hora" height={60} tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="vlr_total_nfe" stroke="#8884d8" label={<CustomizedLabel />} />
                            <Line type="monotone" dataKey="vlr_total_nfce" stroke="#82ca9d" label={<CustomizedLabel />} />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Modal>

            <Modal isOpen={abrirSemana} onRequestClose={() => setOpenAbrirSemana(false)} style={customStyles} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" >
                <button onClick={() => setOpenAbrirSemana(false)} className="closeBtn" >Fechar<img alt="" className="close" src="/images/voltar.png" /></button>
                <h1>Pico por dia da Semana</h1>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={semana}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dia" height={60} tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="vlr_total_nfe" stroke="#8884d8" label={<CustomizedLabel />} />
                            <Line type="monotone" dataKey="vlr_total_nfce" stroke="#82ca9d" label={<CustomizedLabel />} />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Modal>

            <Modal isOpen={abrirMes} onRequestClose={() => setOpenAbrirMes(false)} style={customStyles} contentLabel="dashboard" shouldCloseOnEsc={false} overlayClassName="dashboard-overlay" >
                <button onClick={() => setOpenAbrirMes(false)} className="closeBtn" >Fechar<img alt="" className="close" src="/images/voltar.png" /></button>
                <h1>Pico por dias do Mês</h1>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={mes}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dia" height={60} tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="vlr_total_nfe" stroke="#8884d8" label={<CustomizedLabel />} />
                            <Line type="monotone" dataKey="vlr_total_nfce" stroke="#82ca9d" label={<CustomizedLabel />} />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Modal>

            <Modal isOpen={abrirAno} onRequestClose={() => setOpenAbrirAno(false)} style={customStyles} contentLabel="dashboard" shouldCloseOnEsc={false} overlayClassName="dashboard-overlay" >
                <button onClick={() => setOpenAbrirAno(false)} className="closeBtn" >Fechar<img alt="" className="close" src="/images/voltar.png" /></button>
                <h1>Pico por meses do ano</h1>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={ano}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" height={60} tick={<CustomizedAxisTick />} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="vlr_total_nfe" stroke="#8884d8" label={<CustomizedLabel />} />
                            <Line type="monotone" dataKey="vlr_total_nfce" stroke="#82ca9d" label={<CustomizedLabel />} />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Modal>

            <C.Footer>
                <div className="buttons" >
                    <button onClick={() => navigate('/home')}> <img alt="" src='/images/voltar.png' />Voltar</button>
                </div>
            </C.Footer>

            {isModalTop ? <Top onClose={() => setIsModalTop(false)} setValorTop={setValorTop} valorTop={valorTop} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setValor={setValor} valor={valor} /> : null}
        </C.Container>
    );

}

export default PicoDeFaturamento;