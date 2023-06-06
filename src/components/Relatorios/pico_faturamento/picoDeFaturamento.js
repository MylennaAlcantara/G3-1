import React, { useState, useContext, useEffect } from "react";
import { Emitente } from "../../modais/modal_emitente";
import { Top } from "../../modais/modal_top";
import * as C from "../../cadastro/cadastro"
import { Loading } from "../../loading";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/Auth/authContext"
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import './picoDeFaturamento.css'
import { data } from "jquery";

export const PicoDeFaturamento = () => {

    const [hora, setHora] = useState([]);
    const [semana, setSemana] = useState([]);
    const [mes, setMes] = useState([]);
    const [ano, setAno] = useState([]);

    async function setDataHora() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2006/picoHora", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setHora(data);
            })
        }
    }

    async function setDataSemana() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2006/picoSemana", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setSemana(data);
            })
        }
    }

    async function setDataMes() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2006/picoMes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setMes(data);
            })
        }
    }

    async function setDataAno() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2006/picoAno", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setAno(data);
            })
        }
    }

    const [busca, setBusca] = useState();

    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();

    function GetDataIni(e) {
        setDataInicial(e.currentTarget.value);
    }

    function GetDataFin(e) {
        setDataFinal(e.currentTarget.value);
    }

    const { user, empresa, cnpjMask } = useContext(AuthContext);
    const navigate = useNavigate();

    const [NFE, setDataNFE] = useState(true);
    const [NFCE, setDataNFCE] = useState(true);

    const nfeCheck = (e) => {
        setDataNFE(e.currentTarget.checked)
    }

    const nfceCheck = (e) => {
        setDataNFCE(e.currentTarget.checked)
    }

    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);

    const [abaFilial, setAbaFilial] = useState(true);

    const [valor, setValor] = useState([])
    const [valorTop, setValorTop] = useState([])

    const [aba, setAba] = useState('Hora');

    const [showElement, setShowElement] = useState(false)

    const show = () => setShowElement(true)

    const valorIdTop = valorTop.map((test) => (
        (test.id)
    ))

    const valorFilial = valor.map((test) => (
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

    const start = () => {
        show();
        setDataHora();
        setDataSemana();
        setDataMes();
        setDataAno();
    }

    return (
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header><h3>Pico de Faturamento</h3></C.Header>

            <LB.Filtros>
                <div className="filial-top-content" >
                    <div className="buttons-filial-top">
                        <button className="button-filial" onClick={() => setAbaFilial(true)} >Filial</button>
                        <button className="button-top" onClick={() => setAbaFilial(false)} >Tops</button>
                    </div>
                    <LB.FilialTop>
                        {abaFilial ? (
                            <div className='filial-top'>

                                <div>
                                    <select>
                                        <option>Filial</option>
                                        <option>Região</option>
                                    </select>
                                    <input placeholder="Buscar..." onChange={(e) => setBusca(e.target.value)} />
                                    <img src="./images/LUPA.png" onClick={() => setIsModalFilial(true)} />
                                </div>

                                <div className='table-responsive'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Fantasia</th>
                                                <th>Razão Social</th>
                                                <th>Documento</th>
                                                <th>Município</th>
                                            </tr>
                                        </thead>
                                        {valor.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>

                                                    <td>{item.nome_fantasia}</td>

                                                    <td>{item.razao_social}</td>

                                                    <td>{item.cnpj.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')}</td>

                                                    <td>{item.municipio}</td>
                                                </tr>
                                            )
                                        })}

                                    </table>
                                </div>

                            </div>
                        ) : (
                            <div className='filial-top'>
                                <div>
                                    <input placeholder="Buscar..." />
                                    <img src="./images/LUPA.png" onClick={() => setIsModalTop(true)} />
                                </div>

                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Descrição</th>
                                            </tr>
                                        </thead>
                                        {valorTop.map((item) => {
                                            return (
                                                <tr>
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
                </div>

                <LB.Data>
                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input type="date" onChange={GetDataIni} />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input type="date" onChange={GetDataFin} />
                        </div>
                    </div>

                    <div className="checkbox-content" >
                        <input type="checkbox" checked={NFE} onChange={nfeCheck} /><label>NF-e</label>
                        <input type="checkbox" checked={NFCE} onChange={nfceCheck} /><label>NFC-e</label>
                    </div>

                    <div className="search-button-content" >
                        <button className="buttons-config" onClick={start} > <img src="/images/check.png" /> Pesquisar</button>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <LB.Navegacao>
                <div>
                    <button className="CE" onClick={() => setAba('Hora')} >Hora/Dia</button>
                    <button className="botão-filtros" onClick={() => setAba('Semana')} >Dia/Semana</button>
                    <button className="botão-filtros" onClick={() => setAba('Mes')} >Dia/Mês</button>
                    <button className="CD" onClick={() => setAba('Ano')} >Mês/Ano</button>
                </div>
            </LB.Navegacao>
            {aba === 'Hora' ? (
                <>
                    <LB.DataGeral>
                        {hora.length === 0 && showElement === true ? (

                            <div className='c' >
                                <Loading />
                            </div>

                        ) : (
                            <>
                                <div className='dashboardLine'>

                                    <label>Dashboards</label>

                                    <button className='dashboardBtn' > <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                </div>

                                <div className='table-responsive' >
                                    <table>
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
                                    </table>
                                </div>
                            </>
                        )}
                    </LB.DataGeral>
                </>
            ) : aba === 'Semana' ? (
                <>
                    <LB.DataGeral>
                        {semana.length === 0 && showElement === true ? (
                            <div className="c" >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>

                                    <label>Dashboards</label>

                                    <button className='dashboardBtn' > <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                </div>

                                <div className="table-responsive" >
                                    <table>
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

                                        {semana.map((item) => {
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
                                    </table>
                                </div>
                            </>
                        )}
                    </LB.DataGeral>
                </>
            ) : aba === 'Mes' ? (
                <>
                    <LB.DataGeral>
                        {mes.length === 0 && showElement === true ? (
                            <div className="c" >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>

                                    <label>Dashboards</label>

                                    <button className='dashboardBtn' > <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                </div>

                                <div className="table-responsive" >
                                    <table>
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
                                    </table>
                                </div>
                            </>
                        )}
                    </LB.DataGeral>
                </>
            ) : aba === 'Ano' ? (
                <>
                    <LB.DataGeral>
                        {ano.length === 0 && showElement === true ? (
                            <div className="c" >
                                <Loading />
                            </div>

                        ) : (
                            <>
                                <div className='dashboardLine'>

                                    <label>Dashboards</label>

                                    <button className='dashboardBtn' > <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                </div>

                                <div className="table-responsive" >
                                    <table>
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
                                        {ano.map((item) => {
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

                                    </table>
                                </div>
                            </>
                        )}
                    </LB.DataGeral>
                </>
            ) : null}

            <C.Footer>
                <div className="buttons" >
                    <button onClick={() => navigate('/home')}> <img src='/images/voltar.png' />Voltar</button>
                </div>
            </C.Footer>

            {isModalTop ? <Top onClose={() => setIsModalTop(false)} setValorTop={setValorTop} valorTop={valorTop} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setValor={setValor} valor={valor} /> : null}
        </C.Container>
    );

}

export default PicoDeFaturamento;