import React, { useState, useEffect, useContext } from 'react';
import './listAll.css'
import Modal from 'react-modal'
import { Emitente } from '../../modais/modal_emitente';
import Chart from 'react-google-charts';
import * as C from '../../cadastro/cadastro'
import { Top } from '../../modais/modal_top';
import { Loading } from '../../loading';

import { AuthContext } from "../../../contexts/Auth/authContext"
import * as RF from "../resumo_de_faturamento/resumoFaturamento"

import { useNavigate } from 'react-router-dom';

Modal.setAppElement("#root")

export const ResumoFaturamento = () => {

    const { user, empresa } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showElement, setShowElement] = useState(false)

    const show = () => setShowElement(true)

    const [filial, setFilial] = useState(true);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);

    const [aba, setOpenAba] = useState("regiao");

    //--------------------------------------------------------------Filtros Parte de Cima-------------------------------------------------------------------------

    const [query, setQuery] = useState("");
    const [query1, setQuery1] = useState("");
    const [query2, setQuery2] = useState("");
    const [query3, setQuery3] = useState("");
    const [query4, setQuery4] = useState("");
    const [query5, setQuery5] = useState("");
    const [query6, setQuery6] = useState("");
    const [query7, setQuery7] = useState("");
    const [query8, setQuery8] = useState("");

    const [filter, setFilter] = useState("");
    const [dataIni, setDataIni] = useState("");
    const [dataFin, setDataFin] = useState("");

    const [dados, setDados] = useState([]);
    const [dadosRegiao, setDadosRegiao] = useState([]);
    const [dadosCliente, setDadosCliente] = useState([]);
    const [dadosTipoPagamento, setDadosTipoPagamento] = useState([]);
    const [dadosVendedor, setDadosVendedor] = useState([]);
    const [dadosProduto, setDadosProduto] = useState([]);
    const [dadosGrupo, setDadosGrupo] = useState([]);
    const [dadosFornecedor, setDadosFornecedor] = useState([]);

    const [checkNFE, setCheckNFE] = useState(false);
    const [checkNFCE, setCheckNFCE] = useState(false);
    const [checkTOP, setCheckTOP] = useState(true);

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
        },
    };

    const handleChecked = (e) => {
        setCheckNFE(e.currentTarget.checked);
    }

    const handleChecked01 = (e) => {
        setCheckNFCE(e.currentTarget.checked);
    }

    const handleChecked02 = (e) => {
        setCheckTOP(e.currentTarget.checked);
    }

    console.log(filter)

    const objs =
    {
        "incluirNfe": checkNFE,
        "incluirNfce": checkNFCE,
        "statusVenda": filter,
        "dataInicial": dataIni,
        "dataFinal": dataFin,
        "idFilial": "1",
        "idTop": null
    }

    const [dataSelectEmitente, setDataSelectEmitente] = useState();
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState();
    const [dataSelectDataEmitente, setDataSelectDadosEmitente] = useState({
        fantasia: "",
        doc: "",
        municipio: "",
    });

    const [dataSelectTop, setDataSelectTop] = useState({
        id_top: "",
        descricao: "",
    })

    console.log(dataSelectTop);

    async function setDataFilial() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorFilial", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDados(data);
            });
        }
    }

    const [dadoNomeCli, setNomeCli] = useState(); const [dadoNomeCli1, setNomeCli1] = useState(); const [dadoNomeCli2, setNomeCli2] = useState(); const [dadoNomeCli3, setNomeCLi3] = useState(); const [dadoNomeCli4, setNomeCli4] = useState(); const [dadoNomeCli5, setNomeCli5] = useState();
    const [dadoNomeCli6, setNomeCli6] = useState(); const [dadoNomeCli7, setNomeCli7] = useState(); const [dadoNomeCli8, setNomeCli8] = useState(); const [dadoNomeCli9, setNomeCli9] = useState();

    const [dadoVenCli, setVenCli] = useState(); const [dadoVenCli1, setVenCli1] = useState(); const [dadoVenCli2, setVenCli2] = useState(); const [dadoVenCli3, setVenCli3] = useState(); const [dadoVenCli4, setVenCli4] = useState(); const [dadoVenCli5, setVenCli5] = useState();
    const [dadoVenCli6, setVenCli6] = useState(); const [dadoVenCli7, setVenCli7] = useState(); const [dadoVenCli8, setVenCli8] = useState(); const [dadoVenCli9, setVenCli9] = useState();

    const [dadoLiqCli, setLiqCli] = useState(); const [dadoLiqCli1, setLiqCli1] = useState(); const [dadoLiqCli2, setLiqCli2] = useState(); const [dadoLiqCli3, setLiqCli3] = useState(); const [dadoLiqCli4, setLiqCli4] = useState(); const [dadoLiqCli5, setLiqCli5] = useState();
    const [dadoLiqCli6, setLiqCli6] = useState(); const [dadoLiqCli7, setLiqCli7] = useState(); const [dadoLiqCli8, setLiqCli8] = useState(); const [dadoLiqCli9, setLiqCli9] = useState();

    async function setDataCliente() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorCliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {

                setDadosCliente(data);

                setNomeCli(data[0].cliente); setVenCli(data[0].vlLucroVenda); setLiqCli(data[0].vlLucroLiquido)
                setNomeCli1(data[1].cliente); setVenCli1(data[1].vlLucroVenda); setLiqCli1(data[1].vlLucroLiquido)
                setNomeCli2(data[2].cliente); setVenCli2(data[2].vlLucroVenda); setLiqCli2(data[2].vlLucroLiquido)
                setNomeCLi3(data[3].cliente); setVenCli3(data[3].vlLucroVenda); setLiqCli3(data[3].vlLucroLiquido)
                setNomeCli4(data[4].cliente); setVenCli4(data[4].vlLucroVenda); setLiqCli4(data[4].vlLucroLiquido)
                setNomeCli5(data[5].cliente); setVenCli5(data[5].vlLucroVenda); setLiqCli5(data[5].vlLucroLiquido)
                setNomeCli6(data[6].cliente); setVenCli6(data[6].vlLucroVenda); setLiqCli6(data[6].vlLucroLiquido)
                setNomeCli7(data[7].cliente); setVenCli7(data[7].vlLucroVenda); setLiqCli7(data[7].vlLucroLiquido)
                setNomeCli8(data[8].cliente); setVenCli8(data[8].vlLucroVenda); setLiqCli8(data[8].vlLucroLiquido)
                setNomeCli9(data[9].cliente); setVenCli9(data[9].vlLucroVenda); setLiqCli9(data[9].vlLucroLiquido)
            });
        }
    }

    async function setDataRegiao() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorRegiao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosRegiao(data);
            });
        }
    }

    const [keys, setDaDosKeys] = useState([])
    const [dadosLeitura, setDadosLeitura] = useState([])

    async function setDataTipoPagamento() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorTipoPagamento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosTipoPagamento(Object.values(data[0]));
                setDaDosKeys(Object.keys(data[0]));
                setDadosLeitura(data);
            });
        }
    }

    console.log(dadosLeitura)

    async function setDataVendedor() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorVendedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosVendedor(data);
            });

        }
    }

    const [dadoNomeProd, setNomeProd] = useState(); const [dadoNomeProd1, setNomeProd1] = useState(); const [dadoNomeProd2, setNomeProd2] = useState(); const [dadoNomeProd3, setNomeProd3] = useState(); const [dadoNomeProd4, setNomeProd4] = useState(); const [dadoNomeProd5, setNomeProd5] = useState();
    const [dadoNomeProd6, setNomeProd6] = useState(); const [dadoNomeProd7, setNomeProd7] = useState(); const [dadoNomeProd8, setNomeProd8] = useState(); const [dadoNomeProd9, setNomeProd9] = useState();

    const [dadoVenProd, setVenProd] = useState(); const [dadoVenProd1, setVenProd1] = useState(); const [dadoVenProd2, setVenProd2] = useState(); const [dadoVenProd3, setVenProd3] = useState(); const [dadoVenProd4, setVenProd4] = useState(); const [dadoVenProd5, setVenProd5] = useState();
    const [dadoVenProd6, setVenProd6] = useState(); const [dadoVenProd7, setVenProd7] = useState(); const [dadoVenProd8, setVenProd8] = useState(); const [dadoVenProd9, setVenProd9] = useState();

    const [dadoLuProd, setLuProd] = useState(); const [dadoLuProd1, setLuProd1] = useState(); const [dadoLuProd2, setLuProd2] = useState(); const [dadoLuProd3, setLuProd3] = useState(); const [dadoLuProd4, setLuProd4] = useState(); const [dadoLuProd5, setLuProd5] = useState();
    const [dadoLuProd6, setLuProd6] = useState(); const [dadoLuProd7, setLuProd7] = useState(); const [dadoLuProd8, setLuProd8] = useState(); const [dadoLuProd9, setLuProd9] = useState();

    async function setDataProduto() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorProduto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosProduto(data);

                setNomeProd(data[0].produto); setVenProd(data[0].vlr_venda_total); setLuProd(data[0].vlr_lucro_total)
                setNomeProd1(data[1].produto); setVenProd1(data[1].vlr_venda_total); setLuProd1(data[1].vlr_lucro_total)
                setNomeProd2(data[2].produto); setVenProd2(data[2].vlr_venda_total); setLuProd2(data[2].vlr_lucro_total)
                setNomeProd3(data[3].produto); setVenProd3(data[3].vlr_venda_total); setLuProd3(data[3].vlr_lucro_total)
                setNomeProd4(data[4].produto); setVenProd4(data[4].vlr_venda_total); setLuProd4(data[4].vlr_lucro_total)
                setNomeProd5(data[5].produto); setVenProd5(data[5].vlr_venda_total); setLuProd5(data[5].vlr_lucro_total)
                setNomeProd6(data[6].produto); setVenProd6(data[6].vlr_venda_total); setLuProd6(data[6].vlr_lucro_total)
                setNomeProd7(data[7].produto); setVenProd7(data[7].vlr_venda_total); setLuProd7(data[7].vlr_lucro_total)
                setNomeProd8(data[8].produto); setVenProd8(data[8].vlr_venda_total); setLuProd8(data[8].vlr_lucro_total)
                setNomeProd9(data[9].produto); setVenProd9(data[9].vlr_venda_total); setLuProd9(data[9].vlr_lucro_total)
            })
        }
    }

    const [dadoNomeGrupo, setNomeGrupo] = useState(); const [dadoNomeGrupo1, setNomeGrupo1] = useState(); const [dadoNomeGrupo2, setNomeGrupo2] = useState(); const [dadoNomeGrupo3, setNomeGrupo3] = useState(); const [dadoNomeGrupo4, setNomeGrupo4] = useState(); const [dadoNomeGrupo5, setNomeGrupo5] = useState();
    const [dadoNomeGrupo6, setNomeGrupo6] = useState(); const [dadoNomeGrupo7, setNomeGrupo7] = useState(); const [dadoNomeGrupo8, setNomeGrupo8] = useState(); const [dadoNomeGrupo9, setNomeGrupo9] = useState();

    const [dadoVenGrupo, setVenGrupo] = useState(); const [dadoVenGrupo1, setVenGrupo1] = useState(); const [dadoVenGrupo2, setVenGrupo2] = useState(); const [dadoVenGrupo3, setVenGrupo3] = useState(); const [dadoVenGrupo4, setVenGrupo4] = useState(); const [dadoVenGrupo5, setVenGrupo5] = useState();
    const [dadoVenGrupo6, setVenGrupo6] = useState(); const [dadoVenGrupo7, setVenGrupo7] = useState(); const [dadoVenGrupo8, setVenGrupo8] = useState(); const [dadoVenGrupo9, setVenGrupo9] = useState();

    const [dadoLuGrupo, setLuGrupo] = useState(); const [dadoLuGrupo1, setLuGrupo1] = useState(); const [dadoLuGrupo2, setLuGrupo2] = useState(); const [dadoLuGrupo3, setLuGrupo3] = useState(); const [dadoLuGrupo4, setLuGrupo4] = useState(); const [dadoLuGrupo5, setLuGrupo5] = useState();
    const [dadoLuGrupo6, setLuGrupo6] = useState(); const [dadoLuGrupo7, setLuGrupo7] = useState(); const [dadoLuGrupo8, setLuGrupo8] = useState(); const [dadoLuGrupo9, setLuGrupo9] = useState();

    async function setDataGrupo() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorGrupo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosGrupo(data);

                setNomeGrupo(data[0].grupo); setVenGrupo(data[0].vlr_venda_total); setLuGrupo(data[0].vlr_lucro_total)
                setNomeGrupo1(data[1].grupo); setVenGrupo1(data[1].vlr_venda_total); setLuGrupo1(data[1].vlr_lucro_total)
                setNomeGrupo2(data[2].grupo); setVenGrupo2(data[2].vlr_venda_total); setLuGrupo2(data[2].vlr_lucro_total)
                setNomeGrupo3(data[3].grupo); setVenGrupo3(data[3].vlr_venda_total); setLuGrupo3(data[3].vlr_lucro_total)
                setNomeGrupo4(data[4].grupo); setVenGrupo4(data[4].vlr_venda_total); setLuGrupo4(data[4].vlr_lucro_total)
                setNomeGrupo5(data[5].grupo); setVenGrupo5(data[5].vlr_venda_total); setLuGrupo5(data[5].vlr_lucro_total)
                setNomeGrupo6(data[6].grupo); setVenGrupo6(data[6].vlr_venda_total); setLuGrupo6(data[6].vlr_lucro_total)
                setNomeGrupo7(data[7].grupo); setVenGrupo7(data[7].vlr_venda_total); setLuGrupo7(data[7].vlr_lucro_total)
                setNomeGrupo8(data[8].grupo); setVenGrupo8(data[8].vlr_venda_total); setLuGrupo8(data[8].vlr_lucro_total)
                setNomeGrupo9(data[9].grupo); setVenGrupo9(data[9].vlr_venda_total); setLuGrupo9(data[9].vlr_custo_total)
            })
        }
    }

    const [dadoNomeForn, setNomeForn] = useState(); const [dadoNomeForn1, setNomeForn1] = useState(); const [dadoNomeForn2, setNomeForn2] = useState(); const [dadoNomeForn3, setNomeForn3] = useState(); const [dadoNomeForn4, setNomeForn4] = useState(); const [dadoNomeForn5, setNomeForn5] = useState();
    const [dadoNomeForn6, setNomeForn6] = useState(); const [dadoNomeForn7, setNomeForn7] = useState(); const [dadoNomeForn8, setNomeForn8] = useState(); const [dadoNomeForn9, setNomeForn9] = useState();

    const [dadoVenForn, setVenForn] = useState(); const [dadoVenForn1, setVenForn1] = useState(); const [dadoVenForn2, setVenForn2] = useState(); const [dadoVenForn3, setVenForn3] = useState(); const [dadoVenForn4, setVenForn4] = useState(); const [dadoVenForn5, setVenForn5] = useState();
    const [dadoVenForn6, setVenForn6] = useState(); const [dadoVenForn7, setVenForn7] = useState(); const [dadoVenForn8, setVenForn8] = useState(); const [dadoVenForn9, setVenForn9] = useState();

    const [dadoLuForn, setLuForn] = useState(); const [dadoLuForn1, setLuForn1] = useState(); const [dadoLuForn2, setLuForn2] = useState(); const [dadoLuForn3, setLuForn3] = useState(); const [dadoLuForn4, setLuForn4] = useState(); const [dadoLuForn5, setLuForn5] = useState();
    const [dadoLuForn6, setLuForn6] = useState(); const [dadoLuForn7, setLuForn7] = useState(); const [dadoLuForn8, setLuForn8] = useState(); const [dadoLuForn9, setLuForn9] = useState();

    async function setDataFornecedor() {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorFornecedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosFornecedor(data);

                setNomeForn(data[0].fornecedor); setVenForn(data[0].vlr_venda_total); setLuForn(data[0].vlr_lucro_total)
                setNomeForn1(data[1].fornecedor); setVenForn1(data[1].vlr_venda_total); setLuForn1(data[1].vlr_lucro_total)
                setNomeForn2(data[2].fornecedor); setVenForn2(data[2].vlr_venda_total); setLuForn2(data[2].vlr_lucro_total)
                setNomeForn3(data[3].fornecedor); setVenForn3(data[3].vlr_venda_total); setLuForn3(data[3].vlr_lucro_total)
                setNomeForn4(data[4].fornecedor); setVenForn4(data[4].vlr_venda_total); setLuForn4(data[4].vlr_lucro_total)
                setNomeForn5(data[5].fornecedor); setVenForn5(data[5].vlr_venda_total); setLuForn5(data[5].vlr_lucro_total)
                setNomeForn6(data[6].fornecedor); setVenForn6(data[6].vlr_venda_total); setLuForn6(data[6].vlr_lucro_total)
                setNomeForn7(data[7].fornecedor); setVenForn7(data[7].vlr_venda_total); setLuForn7(data[7].vlr_lucro_total)
                setNomeForn8(data[8].fornecedor); setVenForn8(data[8].vlr_venda_total); setLuForn8(data[8].vlr_lucro_total)
                setNomeForn9(data[9].fornecedor); setVenForn9(data[9].vlr_venda_total); setLuForn9(data[9].vlr_lucro_total)
            })
        }
    }

    const handleSetData = () => {
        show();
        setDataCliente();
        setDataFilial();
        setDataRegiao();
        setDataTipoPagamento();
        setDataVendedor();
        setDataProduto();
        setDataGrupo();
        setDataFornecedor();
    }

    function onChangeDataIni(e) {
        setDataIni(e.currentTarget.value)
    }

    function onChangeDataFin(e) {
        setDataFin(e.currentTarget.value)
    }

    //------------------------------------------------------------------ Dashboard Geral ----------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardGeral, setIsOpenDashboardGeral] = useState(false);

    function openDashboardGeral() {
        setIsOpenDashboardGeral(true);
    }
    function closeDashboardGeral() {
        setIsOpenDashboardGeral(false);
    }

    //------------------------------------------------------------------Dashboards Região----------------------------------------------------------------------------------------------------------------------------------------
    const [dashboardRegiao, setIsOpenDashboardRegiao] = useState(false);

    function openDashboardRegiao() {
        setIsOpenDashboardRegiao(true)
    }
    function closeDashboardRegiao() {
        setIsOpenDashboardRegiao(false)
    }

    const result = dadosRegiao.reduce((a, b) => a + b.vlCustoTotal, 0)
    const result1 = dadosRegiao.reduce((a, b) => a + b.vlVendaTotal, 0)
    const result2 = dadosRegiao.reduce((a, b) => a + b.vlLucroVenda, 0)
    const result3 = dadosRegiao.reduce((a, b) => a + b.vlTotalNfe, 0)
    const result4 = dadosRegiao.reduce((a, b) => a + b.vlTotalNfce, 0)

    const options = {
        title: "Valores Lucro e Custo",
        is3D: true,
        backgroundColor: "#ffff",
    };

    const options2 = {
        title: "Valores NF-e / NFC-e",
        is3D: true,
        backgroundColor: "#ffff",
        colors: ["#bc1b9c", "#1b7abc"]
    };

    const barData = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Valor Lucro", result2, "#F7C64F", null],
        ["Valor Custo", result, "#bc1b2b", null],
        ["Valor Total ", result1, "#39E055", null],
        ["Valor  Nf-e", result3, "#8226ED", null],
        ["Valor NFC-e", result4, "#2686ED", null],
    ];

    const barOptions = {
        title: "Valores Totais Região .",
        //backgroundColor: '#d3d3d3',
        width: 300,
        height: 200,
        bar: { groupWidth: "95%", },
        legend: { position: "none" },
    };


    const dataRegiao = [
        ["Element", "Valor Total", { role: "style" }],
        ["Valor de Lucro", result2, "#F7C64F"],
        ["Valor de Custo", result, "#bc1b2b"],
        ["Valor Total", result1, "#39E055"],
    ];

    const dataRegiao2 = [
        ["Element", "Valor Total", { role: "style" }],
        ["NF-e", result3, "#F7C64F"],
        ["NFC-e", result4, "#bc1b2b"],
    ];

    const dataRe0 = [
        ["Valores em R$", "", ""],
        ["NF-e / NFC-e  ", result3, result4],
        ["Custo / Lucro", result, result2],
    ];

    const optionsRe0 = {

        colors: ["#bc1b9c", "#1b7abc"],

        chart: {
            title: "Valores Gerais",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "vertical",

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };
    //-------------------------------------------------------------Dashboard Filial----------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardFilial, setIsOpenDashboardFilial] = useState(false);

    function openDashboardFilial() {
        setIsOpenDashboardFilial(true)
    }
    function closeDashboardFilial() {
        setIsOpenDashboardFilial(false)
    }

    const resultFi = dados.reduce((a, b) => a + b.vlCustoTotal, 0)
    const resultFi1 = dados.reduce((a, b) => a + b.vlVendaTotal, 0)
    const resultFi2 = dados.reduce((a, b) => a + b.vlLucroVenda, 0)
    const resultFi3 = dados.reduce((a, b) => a + b.vlTotalNfe, 0)
    const resultFi4 = dados.reduce((a, b) => a + b.vlTotalNfce, 0)
    const resultFi5 = dados.reduce((a, b) => a + b.vlTotalCredito, 0)
    const resultFi6 = dados.reduce((a, b) => a + b.vlTotalLiquido, 0)

    const optionsFi = {
        title: "Liquido e Bruto",
        is3D: true,
        colors: ["#ffaf56", "#b2bb1c"],
    };

    const barDataFi = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Valor Lucro", resultFi2, "#f6d001", null],
        ["Valor Custo", resultFi, "#b87333", null],
        ["Valor Total ", resultFi1, "#b2bb1c", null],
        ["Valor  Nf-e", resultFi3, "#8226ED", null],
        ["Valor NFC-e", resultFi4, "#2686ED", null],
        ["Valor Credito", resultFi5, "#ff6ad8", null],
        ["Valor Liquido", resultFi6, "#ffaf56", null]
    ];

    const barOptionsFi = {
        title: "Valores Totais Filial.",
        width: 350,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const dataFilial = [
        ["Element", "Valor Total", { role: "style" }],
        ["Lucro Venda", result2, "#F7C64F"],
        ["Valor Custo", result, "#b87333"],
    ];

    const dataFilial2 = [
        ["Element", "Valor Total", { role: "style" }],
        ["Valor Liquido", resultFi6, "#ffaf56"],
        ["Valor Total", resultFi1, "#39E055"],
    ];

    const dataFi0 = [
        ["Valores em R$", "", ""],
        ["Custo / Lucro", resultFi, resultFi2],
        ["NF-e / NFC-e  ", resultFi3, resultFi4],
        ["Liquido / Total", resultFi6, resultFi1],
    ];

    const optionsFi0 = {
        chart: {
            title: "Valores Gerais",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "vertical",

        colors: ["#bc1b2b", "#f6d001"],

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    //------------------------------------------------------------------Dashboard Vendedor----------------------------------------------------------------------------------------------------------------------------------------------------  

    const [dashboardVendedor, setIsOpenDashboardVendedor] = useState(false);

    function openDashboardVendedor() {
        setIsOpenDashboardVendedor(true)
    }
    function closeDashboardVendedor() {
        setIsOpenDashboardVendedor(false)
    }

    const resultVen = dadosVendedor.reduce((a, b) => a + b.vlCustoTotal, 0)
    const resultVen1 = dadosVendedor.reduce((a, b) => a + b.vlVendaTotal, 0)
    const resultVen2 = dadosVendedor.reduce((a, b) => a + b.vlLucroVenda, 0)
    const resultVen3 = dadosVendedor.reduce((a, b) => a + b.vlTotalNfe, 0)
    const resultVen4 = dadosVendedor.reduce((a, b) => a + b.vlTotalNfce, 0)
    const resultVen5 = dadosVendedor.reduce((a, b) => a + b.vlTotalCredito, 0)
    const resultVen6 = dadosVendedor.reduce((a, b) => a + b.vlTotalCancelamento, 0)
    const resultVen7 = dadosVendedor.reduce((a, b) => a + b.vlTotalComissao, 0)
    const resultVen8 = dadosVendedor.reduce((a, b) => a + b.vlTotalDesconto, 0)

    const datVendedor = [
        ["Element", "Valor Total", { role: "style" }],
        ["Cancelamento", resultVen6, "#ffaf56"],
        ["Comissão", resultVen7, "#57ffe8"],
        ["Desconto", resultVen8, "#727272"],
    ];

    const datVendedor0 = [
        ["Element", "Valor Total", { role: "style" }],
        ["Lucro", resultVen2, "#f6d001"],
        ["Custo", resultVen, "#bc1b2b"],
        ["Total ", resultVen1, "#b2bb1c"],
    ];

    const optionsVen = {
        title: "Valores",
        is3D: true,
        colors: ["#8226ED", "#2686ED"]
    };

    const barDataVen = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Lucro", resultVen2, "#f6d001", null],
        ["Custo", resultVen, "#bc1b2b", null],
        ["Total ", resultVen1, "#b2bb1c", null],
        ["Nf-e", resultVen3, "#8226ED", null],
        ["NFC-e", resultVen4, "#2686ED", null],
        ["Credito", resultVen5, "#ff6ad8", null],
        ["Cancelamento", resultVen6, "#ffaf56", null],
        ["Comissão", resultVen7, "#57ffe8", null],
        ["Desconto", resultVen8, "#727272", null]
    ];

    const barOptionsVen = {
        title: "Valores Totais Vendedor.",
        width: 350,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const dataVendedor = [
        ["Element", "Valor Total", { role: "style" }],
        ["Nf-e", resultVen3, "#8226ED"],
        ["NFC-e", resultVen4, "#2686ED"],
    ];

    //---------------------------------------------------------------Dashboard Cliente------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardCliente, setIsOpenDashboardCliente] = useState(false);

    function openDashboardCliente() {
        setIsOpenDashboardCliente(true)
    }
    function closeDashboardCliente() {
        setIsOpenDashboardCliente(false)
    }

    const [dashboardDezCliente, setIsOpenDashboardDezCliente] = useState(false);

    function openDashboardDezCliente() {
        setIsOpenDashboardDezCliente(true)
    }
    function closeDashboardDezCliente() {
        setIsOpenDashboardDezCliente(false)
    }

    const dadosClienteReduzido = dadosCliente.slice(0, 10)

    const resultCli = dadosCliente.reduce((a, b) => a + b.vlVendaTotal, 0)
    const resultCli1 = dadosCliente.reduce((a, b) => a + b.vlLucroVenda, 0)
    const resultCli2 = dadosCliente.reduce((a, b) => a + b.vlTotalNfe, 0)
    const resultCli3 = dadosCliente.reduce((a, b) => a + b.vlTotalNfce, 0)
    const resultCli4 = dadosCliente.reduce((a, b) => a + b.vlCustoTotal, 0)
    const resultCli5 = dadosCliente.reduce((a, b) => a + b.vlTotalDesconto, 0)
    const resultCli6 = dadosCliente.reduce((a, b) => a + b.vlLucroLiquido, 0)
    const resultCli7 = dadosCliente.reduce((a, b) => a + b.vlTotalCredito, 0)

    const optionsCli = {
        title: "NF-e / NFC-e",
        is3D: true,
        colors: ["#8226ED", "#2686ED"]
    };

    const dataCli0 = [
        ["Valores em R$", "Liquido", "Venda"],
        [dadoNomeCli, dadoLiqCli, dadoVenCli],
        [dadoNomeCli1, dadoLiqCli1, dadoVenCli1],
        [dadoNomeCli2, dadoLiqCli2, dadoVenCli2],
        [dadoNomeCli3, dadoLiqCli3, dadoVenCli3],
        [dadoNomeCli4, dadoLiqCli4, dadoVenCli4],
        [dadoNomeCli5, dadoLiqCli5, dadoVenCli5],
        [dadoNomeCli6, dadoLiqCli6, dadoVenCli6],
        [dadoNomeCli7, dadoLiqCli7, dadoVenCli7],
        [dadoNomeCli8, dadoLiqCli8, dadoVenCli8],
        [dadoNomeCli9, dadoLiqCli9, dadoVenCli9],
    ];

    const optionsCli0 = {
        chart: {
            title: "Valores Gerais",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "horizontal",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const barDataCli = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Lucro", resultCli1, "#f6d001", null],
        ["Custo", resultCli4, "#bc1b2b", null],
        ["Total ", resultCli, "#39E055", null],
        ["NF-e", resultCli2, "#8226ED", null],
        ["NFC-e", resultCli3, "#2686ED", null],
        ["Credito", resultCli7, "#ff6ad8", null],
        ["Liquido", resultCli6, "#ffaf56", null],
        ["Desconto", resultCli5, "#57ffe8", null],
    ];

    const barOptionsCli = {
        title: "Valores Totais Cliente.",
        width: 300,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const dataCliente = [
        ["Element", "Valor Total", { role: "style" }],
        ["Custo", resultCli4, "#bc1b2b"],
        ["Lucro", resultCli1, "#f6d001"],
        ["Total", resultCli, "#b2bb1c"],
    ];

    const dataCliente0 = [
        ["Element", "Valor Total", { role: "style" }],
        ["NF-e", resultCli2, "#8226ED"],
        ["NFC-e", resultCli3, "#2686ED"],
    ];

    console.log(dadosClienteReduzido)

    //------------------------------------------------------------------Dashboard Tipo de Pagamento-----------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardTipoDePagamento, setIsOpenDashboardTipoDePagamento] = useState(false)

    function openDashboardTipoDePagamento() {
        setIsOpenDashboardTipoDePagamento(true)
    }
    function closeDashboardTipoDePagamento() {
        setIsOpenDashboardTipoDePagamento(false)
    }

    const resultTpPg = dadosLeitura.reduce((a, b) => a + b.dinheiro, 0)
    const resultTpPg1 = dadosLeitura.reduce((a, b) => a + b.total, 0)
    const resultTpPg2 = dadosLeitura.reduce((a, b) => a + b.cartao_de_credito, 0)
    const resultTpPg3 = dadosLeitura.reduce((a, b) => a + b.cartao_de_debito, 0)
    const resultTpPg4 = dadosLeitura.reduce((a, b) => a + b.cheque, 0)
    const resultTpPg5 = dadosLeitura.reduce((a, b) => a + b.boleto_bancario, 0)
    const resultTpPg6 = dadosLeitura.reduce((a, b) => a + b.credito_loja, 0)
    const resultTpPg7 = dadosLeitura.reduce((a, b) => a + b.cancelamento_total, 0)
    const resultTpPg8 = dadosLeitura.reduce((a, b) => a + b.desconto_total, 0)
    const resultTpPg9 = dadosLeitura.reduce((a, b) => a + b.vale_alimentacao, 0)
    const resultTpPg10 = dadosLeitura.reduce((a, b) => a + b.vale_combustivel, 0)
    const resultTpPg11 = dadosLeitura.reduce((a, b) => a + b.vale_presente, 0)
    const resultTpPg12 = dadosLeitura.reduce((a, b) => a + b.vale_refeicao, 0)

    const optionsTpPg = {
        title: "Valores",
        is3D: true,
        colors: ["#1f80ed", "#d24159", "#9bf967", "#f98b68", "#ffe670"],
    };

    const dataTpPg0 = [
        ["Valores em R$", "", ""],
        [" (Cima)Dinheiro / (Baixo)Total", resultTpPg, resultTpPg1],
        ["Credito , Debito", resultTpPg2, resultTpPg3],
    ];

    const barOptionsTpPg = {
        title: "Pagamentos",
        width: 400,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const dataTpPg = [
        ["Element", "Valor", { role: "style" }],
        ["Credito Loja", resultTpPg6, "#ff6ad8"],
        ["Cancelamento", resultTpPg7, "#ffaf56"],
        ["Desconto", resultTpPg8, "#ffaf56"],
    ];

    const dataTpPgVale = [
        ["Element", "Valor", { role: "style" }],
        ["Alimentação", resultTpPg9, "#D44A26"],
        ["Combustivel", resultTpPg10, "#D40B0B"],
        ["Presente", resultTpPg11, "#D44A26"],
        ["Refeição", resultTpPg12, "#D40B0B"],
    ];

    const dataTipoPagamento = [
        ["Element", "Valor", { role: "style" }],
        ["Boleto", resultTpPg5, "#1f80ed"],
        ["Cheque", resultTpPg4, "#d24159"],
        ["C.Credito", resultTpPg2, "#9bf967"],
        ["C.Debito", resultTpPg3, "#f98b68"],
        ["Dinheiro", resultTpPg, "#ffe670"],
        ["Total", resultTpPg1, "#b2bb1c"],
    ];

    const dataTipoPagamentoPizza = [
        ["Element", "Valor", { role: "style" }],
        ["Boleto", resultTpPg5, "#1f80ed"],
        ["Cheque", resultTpPg4, "#d24159"],
        ["C.Credito", resultTpPg2, "#9bf967"],
        ["C.Debito", resultTpPg3, "#f98b68"],
        ["Dinheiro", resultTpPg, "#ffe670"],
    ];

    //------------------------------------------------------------------Dashboard Produtos--------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardProdutos, setIsOpenDashboardProdutos] = useState(false);
    const [dashboardProdutosDetalhado, setIsOpenDashboardProdutosDetalhados] = useState(false);

    function openDashboardProdutos() {
        setIsOpenDashboardProdutos(true)
    }
    function closeDashboardProdutos() {
        setIsOpenDashboardProdutos(false)
    }

    function openDashboardProdutosDetalhados() {
        setIsOpenDashboardProdutosDetalhados(true)
    }
    function closeDashboardProdutosDetalhados() {
        setIsOpenDashboardProdutosDetalhados(false)
    }

    const dadosProdutoReduzidos = dadosProduto.slice(0, 10);

    const resultProd = dadosProduto.reduce((a, b) => a + b.vlr_venda_total, 0)
    const resultProd1 = dadosProduto.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const resultProd2 = dadosProduto.reduce((a, b) => a + b.vlr_custo_total, 0)
    const resultProd3 = dadosProduto.reduce((a, b) => a + b.sub_total, 0)
    const resultProd4 = dadosProduto.reduce((a, b) => a + b.vlr_desconto_total, 0)


    const dataProd = [
        ["Element", "Valor", { role: "style" }],
        ["Venda:", resultProd, "#f6d001"],
        ["Lucro", resultProd1, "#1b7abc"],
    ];

    const dataProd0 = [
        ["Valores em R$", "Venda", "Lucro"],
        [dadoNomeProd, dadoVenProd, dadoLuProd],
        [dadoNomeProd1, dadoVenProd1, dadoLuProd1],
        [dadoNomeProd2, dadoVenProd2, dadoLuProd2],
        [dadoNomeProd3, dadoVenProd3, dadoLuProd3],
        [dadoNomeProd4, dadoVenProd4, dadoLuProd4],
        [dadoNomeProd5, dadoVenProd5, dadoLuProd5],
        [dadoNomeProd6, dadoVenProd6, dadoLuProd6],
        [dadoNomeProd7, dadoVenProd7, dadoLuProd7],
        [dadoNomeProd8, dadoVenProd8, dadoLuProd8],
        [dadoNomeProd9, dadoVenProd9, dadoLuProd9],
    ]

    const optionsProd0 = {
        chart: {
            title: "Primeiros 10 Produtos",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "horizontal",

        colors: ["#f6d001", "#1b7abc"],

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const optionsProd = {
        title: "Valores",
        is3D: true,
        colors: ['#f6d001', '#1b7abc']
    };

    const barDataPro = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Lucro", resultProd1, "#1b7abc", null],
        ["Custo", resultProd2, "#727272", null],
        ["Venda", resultProd, "#f6d001", null],
        ["Sub Total", resultProd3, "#ff6ad8", null],
    ];

    const barOptionsPro = {
        title: "Valores Totais Tipo de Pagamento .",
        width: 300,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    console.log(dadosProdutoReduzidos)

    //------------------------------------------------------------------------Dashboard Grupo-----------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardGrupo, setIsOpenDashboardGrupo] = useState(false);
    const [dashboardGrupoDetalhado, setIsOpenDashboardGrupoDetalhado] = useState(false);

    function openDashboardGrupoDetalhado() {
        setIsOpenDashboardGrupoDetalhado(true);
    }
    function closeDashboardGrupoDetalhado() {
        setIsOpenDashboardGrupoDetalhado(false);
    }

    function openDashboardGrupo() {
        setIsOpenDashboardGrupo(true);
    }
    function closeDashboardGrupo() {
        setIsOpenDashboardGrupo(false);
    }

    const dadosGrupoDetalhado = dadosGrupo.slice(0, 10)

    const resultGru = dadosGrupo.reduce((a, b) => a + b.vlr_venda_total, 0);
    const resultGru1 = dadosGrupo.reduce((a, b) => a + b.vlr_lucro_total, 0);
    const resultGru2 = dadosGrupo.reduce((a, b) => a + b.sub_total, 0);
    const resultGru3 = dadosGrupo.reduce((a, b) => a + b.vlr_desconto_total, 0);

    const dataGru0 = [
        ["Valores em R$", "Venda", "Lucro"],
        [dadoNomeGrupo, dadoVenGrupo, dadoLuGrupo],
        [dadoNomeGrupo1, dadoVenGrupo1, dadoLuGrupo1],
        [dadoNomeGrupo2, dadoVenGrupo2, dadoLuGrupo2],
        [dadoNomeGrupo3, dadoVenGrupo3, dadoLuGrupo3],
        [dadoNomeGrupo4, dadoVenGrupo4, dadoLuGrupo4],
        [dadoNomeGrupo5, dadoVenGrupo5, dadoLuGrupo5],
        [dadoNomeGrupo6, dadoVenGrupo6, dadoLuGrupo6],
        [dadoNomeGrupo7, dadoVenGrupo7, dadoLuGrupo7],
        [dadoNomeGrupo8, dadoVenGrupo8, dadoLuGrupo8],
        [dadoNomeGrupo9, dadoVenGrupo9, dadoLuGrupo9],
    ];

    const dataGru = [
        ["Element", "Valor", { role: "style" }],
        ["Sub.Total", resultGru2, "#bc1b2b"],
        ["Desconto", resultGru3, "#ffaf56"],
    ];

    const dataGru2 = [
        ["Element", "Valor", { role: "style" }],
        ["Venda:", resultGru, "#bc1b2b"],
        ["Lucro", resultGru1, "#ffaf56"],
    ];

    const barDataGru = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Venda", resultGru, "#bc1b2b", null],
        ["Lucro", resultGru1, "#ffaf56", null],
        ["Sub Total", resultGru2, "#f6d001", null],
        ["Desconto Total", resultGru3, "#1b7abc", null],
    ];

    const barOptionsGru = {
        title: "Valores Totais Grupos.",
        width: 300,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const optionsGru0 = {
        chart: {
            title: "Grupos",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "horizontal",

        //colors: [red, gray],

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    //------------------------------------------------------------------Dashboard Fornecedor------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardFornecedor, setIsOpenDashboardFornecedor] = useState(false)
    const [dashboardFornecedorDetalhado, setIsOpenDashboardFornecedorDetalhado] = useState(false)

    function openDashboardFornecedor() {
        setIsOpenDashboardFornecedor(true);
    }
    function closeDashboardFornecedor() {
        setIsOpenDashboardFornecedor(false);
    }

    function openDashboardFornecedorDetalhado() {
        setIsOpenDashboardFornecedorDetalhado(true)
    }
    function closeDashboardFornecedorDetalhado() {
        setIsOpenDashboardFornecedorDetalhado(false)
    }

    const dadosFornecedorDetalhado = dadosFornecedor.slice(0, 10);
    console.log(dadosFornecedorDetalhado)

    const resultFor = dadosFornecedor.reduce((a, b) => a + b.vlr_venda_total, 0)
    const resultFor1 = dadosFornecedor.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const resultFor2 = dadosFornecedor.reduce((a, b) => a + b.vlr_custo_total, 0)
    const resultFor3 = dadosFornecedor.reduce((a, b) => a + b.vlr_desconto_total, 0)
    const resultFor4 = dadosFornecedor.reduce((a, b) => a + b.sub_total, 0)

    const dataFor = [
        ["Element", "Valor", { role: "style" }],
        ["Venda", resultFor, "#bc1b2b"],
        ["Lucro", resultFor1, "#57ffe8"],
    ]

    const optionsFor0 = {
        chart: {
            title: "Primeiros 10 Fornecedores",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        vAxis: {
            title: "Valores",
        },
        bars: "horizontal",

        colors: ["#bc1b2b", "#57ffe8"],

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const dataFor0 = [
        ["Valores em R$", "Venda", "Lucro"],
        [dadoNomeForn, dadoVenForn, dadoLuForn],
        [dadoNomeForn1, dadoVenForn1, dadoLuForn1],
        [dadoNomeForn2, dadoVenForn2, dadoLuForn2],
        [dadoNomeForn3, dadoVenForn3, dadoLuForn3],
        [dadoNomeForn4, dadoVenForn4, dadoLuForn4],
        [dadoNomeForn5, dadoVenForn5, dadoLuForn5],
        [dadoNomeForn6, dadoVenForn6, dadoLuForn6],
        [dadoNomeForn7, dadoVenForn7, dadoLuForn7],
        [dadoNomeForn8, dadoVenForn8, dadoLuForn8],
        [dadoNomeForn9, dadoVenForn9, dadoLuForn9],
    ]

    const barDataFor = [
        [
            "Element",
            "Valor",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Lucro", resultFor1, "#57ffe8", null],
        ["Custo", resultFor2, "#727272", null],
        ["Venda", resultFor, "#bc1b2b", null],
        ["Desconto", resultFor3, "#ff6ad8", null],
    ];

    const barOptionsFor = {
        title: "Valores Totais Fornecedor .",
        width: 300,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    //------------------------------------------------------------------PICOS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [modalPico, setIsOpenModalPico] = useState(false);

    function openModalPico() {
        setIsOpenModalPico(true);
    }

    function closeModalPico() {
        setIsOpenModalPico(false);
    }

    const dataPico = [
        ["Mês", "Ano Anterior", "Ano Atual"],
        ["Janeiro", 1000, 2000],
        ["Fevereiro", 1170, 460],
        ["Março", 660, 1120],
        ["Abril", 1030, 540],
    ];

    const optionsPico = {
        title: "Pico de Vendas",
        hAxis: { title: "Mês", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
    };


    //------------------------------------------------------------------VISUAL-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (

        <C.Container>

            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.cnpj)}</C.NaviBar>

            <C.Header> <h3>Resumo de Faturamento</h3> </C.Header>

            <span>Atenção: Ao selecionar NF-e, é importante destacar as T.OP.´s que serão tomadas em consideração na consulta, consultando sem nenhuma T.OP.(consulta geral), poderá vir ENTRADAS </span>

            <RF.Filtros>
                <div className='FTFilterTop' >
                    <div className='btns'>
                        <button className='topFilialBtn' onClick={() => setFilial(true)} >Filial</button>
                        <button className='topsBtn' onClick={() => setFilial(false)} >Tops</button>
                    </div>
                    <RF.FilialTop>
                        {filial ? (
                            <div className='filial-top'>
                                <div>
                                    <select>
                                        <option>Filial</option>
                                        <option>Região</option>
                                    </select>
                                    <input placeholder='Buscar...' />
                                    <img src='/images/LUPA.png' onClick={() => setIsModalFilial(true)} />
                                    <button>Limpar</button>
                                </div>
                                <div className='table-responsive'>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                <th >Código</th>
                                                <th >Fantasia</th>
                                                <th>Razão Social</th>
                                                <th >Documento</th>
                                                <th >Município</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{dataIdSelectEmitente}</td>
                                                <td>{dataSelectDataEmitente.fantasia}</td>
                                                <td>{dataSelectEmitente}</td>
                                                <td>{dataSelectDataEmitente.doc}</td>
                                                <td>{dataSelectDataEmitente.municipio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className='filial-top'>
                                <div>
                                    <input placeholder='Buscar...' />
                                    <img src='/images/LUPA.png' onClick={() => setIsModalTop(true)} />
                                </div>
                                <div className='table-responsive'>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                <th >Código</th>
                                                <th >Descrição</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{dataSelectTop.id_top}</td>
                                                <td>{dataSelectTop.descricao}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </RF.FilialTop>
                </div>
                <RF.Data>
                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input type="date" onChange={onChangeDataIni} />
                        </div>
                        <div className="data" >
                            <label>Data Final</label>
                            <input type="date" onChange={onChangeDataFin} />
                        </div>
                        <div className="select">
                            <label>Status NFC-e</label>
                            <select onChange={(e) => setFilter(e.target.value)}>
                                <option id='todo' value="%">TODOS</option>
                                <option value="v">VENDA</option>
                                <option value="o">ORÇAMENTO</option>
                            </select>
                        </div>
                    </div>
                    <div className='checks' >
                        <input type="checkbox" value="false" id='TOP' checked={checkTOP} onChange={handleChecked02} /><label>Incluir T.OP. Salvas</label>
                        <input type="checkbox" value="false" id='NFE' checked={checkNFE} onChange={handleChecked} /><label>NF-e</label>
                        <input type="checkbox" value="false" id='NFCE' checked={checkNFCE} onChange={handleChecked01} /><label>NFC-e</label>
                    </div>
                    <div className='botao-pesquisar'>
                        <button onClick={handleSetData} >Pesquisar</button>
                    </div>
                </RF.Data>
            </RF.Filtros>

            <div>

                <RF.Navigacao>
                    <button className='CE' onClick={() => setOpenAba("regiao")} >Região</button>
                    <button className='botão-filtros' onClick={() => setOpenAba("filial")}  >Filial</button>
                    <button className='botão-filtros' onClick={() => setOpenAba("vendedor")} > Vendedor </button>
                    <button className='botão-filtros' onClick={() => setOpenAba("cliente")} > Cliente </button>
                    <button className='botão-filtros' onClick={() => setOpenAba("tpPg")} > Tipo de Pagamento </button>
                    <button className='botão-filtros' onClick={() => setOpenAba("produto")} > Produto </button>
                    <button className='botão-filtros' onClick={() => setOpenAba("grupo")} > Grupo </button>
                    <button className='CD' onClick={() => setOpenAba("fornecedor")} >Fornecedor</button>
                </RF.Navigacao>

                {aba === "regiao" ? (
                    <RF.DataGeral>
                        {dadosRegiao.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label className='esc'>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardRegiao}><img className='grafico' src="/images/grafico.png" /> <p>Graficos</p></button>
                                </div>

                                <div className='table-resp'>

                                    <table className='table' >
                                        <tr>
                                            <th>Id.Região</th>

                                            <th>Região</th>

                                            <th>Id. Filial</th>

                                            <th>Qtd. Vendas</th>

                                            <th>Vlr.Médio Venda</th>

                                            <th>Vlr. Total NF-e</th>

                                            <th>Vlr. Total NFC-e</th>

                                            <th>Vlr. Venda Total</th>

                                            <th>Vlr. Custo Total</th>

                                            <th>Vlr. Lucro Venda</th>

                                            <th>Margem</th>

                                            <th>Markup</th>

                                        </tr>
                                        {dadosRegiao.map((f1) => {
                                            return (
                                                <tr key={f1.idFilial}>

                                                    <td>{f1.idRegiao}</td>

                                                    <td className='filter-name'>{f1.regiao}</td>

                                                    <td>{f1.idFilial}</td>

                                                    <td>{f1.qtdVendas}</td>

                                                    <td>{f1.vlMedioVendas}</td>

                                                    <td>{f1.vlTotalNfe}</td>

                                                    <td>{f1.vlTotalNfce}</td>

                                                    <td>{f1.vlVendaTotal}</td>

                                                    <td>{f1.vlCustoTotal}</td>

                                                    <td>{f1.vlLucroVenda}</td>

                                                    <td>{f1.margem}</td>

                                                    <td>{f1.markup}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>

                                </div>
                            </>

                        )}
                    </RF.DataGeral>
                ) : aba === "filial" ? (
                    <RF.DataGeral>
                        {dados.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardFilial}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p> </button>
                                </div>

                                <div className='table-resp' >
                                    <table className='table' >
                                        <tr>
                                            <th>Id.Filial</th>

                                            <th>Filial</th>

                                            <th>Qtd. Vendas</th>

                                            <th>Qtd. Itens</th>

                                            <th>Méd. Itens/Cup.</th>

                                            <th>Vlr. Médio Venda</th>

                                            <th>Vlr. Total NF-e</th>

                                            <th>Vlr. Total NFC-e</th>

                                            <th>Vlr. Venda Total</th>

                                            <th>Vlr. Total Credito</th>

                                            <th> Vlr. Total Líquido</th>

                                            <th>Vlr. Custo Total</th>

                                            <th>Vlr. Lucro Venda</th>

                                            <th>Vlr. Lucro Líquido</th>

                                            <th>% Margem</th>

                                            <th>Percentual</th>

                                        </tr>

                                        {dados.map((f2) => {
                                            return (
                                                <tr>
                                                    <td> {f2.idFilial} </td>

                                                    <td className='filter-name'>{f2.filial}</td>

                                                    <td>{f2.qtdVendas}</td>

                                                    <td>{f2.qtdItens}</td>

                                                    <td>{f2.qtdItensCupom}</td>

                                                    <td>{f2.vlMedioVendas.toFixed(2)}</td>

                                                    <td>{f2.vlTotalNfe}</td>

                                                    <td>{f2.vlTotalNfce}</td>

                                                    <td>{f2.vlVendaTotal}</td>

                                                    <td>{f2.vlTotalCredito}</td>

                                                    <td>{f2.vlTotalLiquido}</td>

                                                    <td>{f2.vlCustoTotal}</td>

                                                    <td>{f2.vlLucroVenda}</td>

                                                    <td>{f2.vlLucroLiquido}</td>

                                                    <td>{f2.margem}</td>

                                                    <td>{(f2.percentual).toFixed(2)}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>

                                </div>

                            </>
                        )}
                    </RF.DataGeral>
                ) : aba === "vendedor" ? (
                    <RF.DataGeral>
                        {dadosVendedor.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <input type="search" name="search-vend" id="search-vend" className="search" placeholder="Buscar por Vendedor" onChange={(e) => setQuery4(e.target.value)} />

                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardVendedor}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p> </button>
                                    <button className='dashboardBtn' onClick={window.print} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                                </div>

                                <table className='table-resp'>
                                    <tr className='table'>
                                        <th>Id. Filial</th>

                                        <th>Id. Vendedor</th>

                                        <th>Vendedor</th>

                                        <th>Qtd. Vendas</th>

                                        <th>Vlr. Total NF-e</th>

                                        <th>Vlr. Total NFC-e</th>

                                        <th> Vlr. Venda Total</th>

                                        <th>Vlr. Total Cancelamento</th>

                                        <th>Vlr. Total Desconto</th>

                                        <th>Vlr. Total Credito</th>

                                        <th>Vlr. Total Comissão</th>

                                        <th>Vlr. Custo Total</th>

                                        <th>Vlr. Lucro Venda</th>

                                        <th>Vlr. Lucro Líquido</th>

                                        <th>Per. Lucro Líquido</th>

                                        <th>Percentual</th>
                                    </tr>

                                    {dadosVendedor.filter(dat => dat.vendedor.toLowerCase().includes(query4)).map((dat) => (

                                        <tr className='labels'>
                                            <td>{dat.idFilial}</td>

                                            <td>{dat.idVendedor}</td>

                                            <td className='filter-name'>{dat.vendedor}</td>

                                            <td>{dat.qtdVendas}</td>

                                            <td>{dat.vlTotalNfe}</td>

                                            <td>{dat.vlTotalNfce}</td>

                                            <td>{dat.vlVendaTotal}</td>

                                            <td>{dat.vlTotalCancelamento}</td>

                                            <td>{dat.vlTotalDesconto}</td>

                                            <td>{dat.vlTotalCredito}</td>

                                            <td>{dat.vlTotalComissao}</td>

                                            <td>{(dat.vlCustoTotal).toFixed(2)}</td>

                                            <td>{(dat.vlLucroVenda).toFixed(2)}</td>

                                            <td>{(dat.vlLucroLiquido).toFixed(2)}</td>

                                            <td className='filter-all'>% {(dat.plucroLiquido).toFixed(2)}</td>

                                            <td>{(dat.percentual).toFixed(2)}</td>
                                        </tr>

                                    ))}
                                </table>

                            </>

                        )}
                    </RF.DataGeral>
                ) : aba === "cliente" ? (
                    <RF.DataGeral>
                        {dadosCliente.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <input type="search" name="search-cli" id="search-cli" className="search" placeholder="Buscar por Cliente" onChange={(e) => setQuery5(e.target.value)} />

                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardCliente}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p> </button>
                                </div>

                                <table className='table-resp'>
                                    <tr className='labels'>
                                        <th> Id. Filial </th>

                                        <th> Id. Cliente </th>

                                        <th> Cliente </th>

                                        <th> Qtd. Vendas </th>

                                        <th> Vlr. Total NF-e </th>

                                        <th> Vlr. Total NFC-e </th>

                                        <th> Vlr. Venda Total </th>

                                        <th> Vlr. Total Desconto </th>

                                        <th> Vlr. Total Credito </th>

                                        <th> Vlr. Custo Total </th>

                                        <th> Vlr. Lucro Venda </th>

                                        <th> Vlr. Lucro Líquido </th>

                                        <th> Per. Lucro Líquido </th>

                                        <th> Percentual </th>
                                    </tr>

                                    {dadosCliente.filter(dat => dat.cliente.toLowerCase().includes(query5)).map((dat1) => (
                                        <tr className='labels'>

                                            <td>{dat1.idFilial}</td>

                                            <td>{dat1.idCliente}</td>

                                            <td className='filter-name'>{dat1.cliente}</td>

                                            <td>{dat1.qtdVendas}</td>

                                            <td>{dat1.vlTotalNfe}</td>

                                            <td>{dat1.vlTotalNfce}</td>

                                            <td>{dat1.vlVendaTotal}</td>

                                            <td>{dat1.vlTotalDesconto}</td>

                                            <td>{dat1.vlTotalCredito}</td>

                                            <td>{dat1.vlCustoTotal}</td>

                                            <td>{dat1.vlLucroVenda}</td>

                                            <td>{dat1.vlLucroLiquido}</td>

                                            <td>{dat1.plucroLiquido} %</td>

                                            <td>{(dat1.percentual).toFixed(3)}</td>

                                        </tr>
                                    ))}
                                </table>
                            </>
                        )}
                    </RF.DataGeral>
                ) : aba === "tpPg" ? (
                    <RF.DataGeral>
                        {dadosTipoPagamento.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardTipoDePagamento}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p></button>
                                    <button className='dashboardBtn' onClick={window.print} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                                </div>

                                <table>
                                    <tr className='labels'>
                                        {keys.map((nomes) => {
                                            return (
                                                <th className='filter-all'>{(nomes).replace('_', ' ').toUpperCase()}</th>
                                            );
                                        })}
                                    </tr>

                                    <tr className='labels'>
                                        {dadosTipoPagamento.map((f5) => {
                                            return (
                                                <td className='filter-all'> {f5} </td>
                                            );
                                        })}
                                    </tr>
                                </table>
                            </>
                        )}
                    </RF.DataGeral>
                ) : aba === "produto" ? (
                    <RF.DataGeral>
                        {dadosProduto.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <input type="search" name="search-pro" id="search-pro" className="search" placeholder="Buscar por Produto" onChange={(e) => setQuery6(e.target.value)} />

                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardProdutos}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p></button>
                                    <button className='dashboardBtn' onClick={window.print} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                                </div>

                                <table className='table'>
                                    <tr>
                                        <th>Ranking</th>

                                        <th>Id.Produto</th>

                                        <th>Produto</th>

                                        <th>Qtd. Total</th>

                                        <th>Sub Total</th>

                                        <th>% Desconto</th>

                                        <th>Vlr. Desconto Total </th>

                                        <th>Vlr. Venda Total</th>

                                        <th>Vlr. Custo Total</th>

                                        <th>Vlr. Lucro Total</th>

                                        <th>% Markup</th>

                                        <th>% Margem</th>

                                        <th>Percentual</th>
                                    </tr>

                                    {dadosProduto.filter(dat => dat.produto.toLowerCase().includes(query6)).map((dat2) => {

                                        return (

                                            <tr>
                                                <td> {dat2.ranking} </td>

                                                <td> {dat2.id_produto} </td>

                                                <td onDoubleClick={openModalPico}> {dat2.produto} </td>

                                                <td className='filter-all'> {dat2.qtd_total} </td>

                                                <td> {dat2.sub_total} </td>

                                                <td> {(dat2.p_desconto).toFixed(3)} </td>

                                                <td> {dat2.vlr_desconto_total} </td>

                                                <td> {dat2.vlr_venda_total} </td>

                                                <td> {dat2.vlr_custo_total} </td>

                                                <td> {dat2.vlr_lucro_total} </td>

                                                <td> {dat2.p_markup} </td>

                                                <td> {dat2.p_margem} </td>

                                                <td> {(dat2.percentual).toFixed(2)} </td>
                                            </tr>
                                        );
                                    })}

                                </table>
                            </>
                        )}
                    </RF.DataGeral>
                ) : aba === "grupo" ? (
                    <RF.DataGeral>
                        {dadosGrupo.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Grupo" onChange={(e) => setQuery7(e.target.value)} />

                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardGrupo}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p></button>
                                    <button className='dashboardBtn' onClick={window.print} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                                </div>

                                <table>
                                    <tr className='labels'>
                                        <th className='filter-all'>Ranking</th>

                                        <th className='filter-all'>Id. Grupo</th>

                                        <th className='filter-name'>Grupo</th>

                                        <th className='filter-all'>Qtd. Total</th>

                                        <th className='filter-all'>Sub Total</th>

                                        <th className='filter-all'>% Desconto</th>

                                        <th className='filter-all'>Vlr. Desconto Total</th>

                                        <th className='filter-all'>Vlr. Venda Total</th>

                                        <th className='filter-all'>Vlr. Custo Total</th>

                                        <th className='filter-all'>Vlr. Lucro Total</th>

                                        <th className='filter-all'>% Markup</th>

                                        <th className='filter-all'>% Margem</th>

                                        <th className='filter-all'>Percentual</th>
                                    </tr>

                                    {dadosGrupo.filter(dat => dat.grupo.toLowerCase().includes(query7)).map((dat3) => {

                                        return (

                                            <tr className='labels'>

                                                <td>{dat3.ranking}</td>

                                                <td>{dat3.id_grupo}</td>

                                                <td> {dat3.grupo} </td>

                                                <td> {dat3.qtd_total} </td>

                                                <td> {dat3.sub_total} </td>

                                                <td> {dat3.p_desconto} </td>

                                                <td> {dat3.vlr_desconto_total} </td>

                                                <td> {dat3.vlr_venda_total} </td>

                                                <td> {dat3.vlr_custo_total} </td>

                                                <td> {dat3.vlr_lucro_total} </td>

                                                <td> {dat3.p_markup} </td>

                                                <td> {dat3.p_margem} </td>

                                                <td> {(dat3.percentual).toFixed(3)} </td>
                                            </tr>

                                        );

                                    })}
                                </table>

                            </>
                        )}
                    </RF.DataGeral>
                ) : aba === "fornecedor" ? (
                    <RF.DataGeral>
                        {dadosFornecedor.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Fornecedor" onChange={(e) => setQuery8(e.target.value)} />

                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardFornecedor}> <img className='grafico' src="/images/grafico.png" /> <p>Graficos</p></button>
                                    <button className='dashboardBtn' onClick={window.print} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                                </div>

                                <table>
                                    <tr className='labels'>
                                        <th className='filter-all'>Ranking</th>

                                        <th className='filter-all'>Id. Fornecedor</th>

                                        <th className='filter-name'>Fornecedor</th>

                                        <th className='filter-all'>Qtd. Total</th>

                                        <th className='filter-all'>Sub Total</th>

                                        <th className='filter-all'>% Desconto</th>

                                        <th className='filter-all'>Vlr. Desconto Total</th>

                                        <th className='filter-all'>Vlr. Venda Total</th>

                                        <th className='filter-all'>Vlr. Custo Total</th>

                                        <th className='filter-all'>Vlr. Lucro Total</th>

                                        <th className='filter-all'>% Markup</th>

                                        <th className='filter-all'>% Margem</th>

                                        <th className='filter-all'>Percentual</th>
                                    </tr>

                                    {dadosFornecedor.filter(dat => dat.fornecedor.toLowerCase().includes(query8)).map((dat) => (

                                        <tr className='labels'>
                                            <td className='filter-all'> {dat.ranking} </td>

                                            <td className='filter-all'> {dat.id_fornecedor} </td>

                                            <td className='filter-name'> {dat.fornecedor} </td>

                                            <td className='filter-all'> {dat.qtd_total} </td>

                                            <td className='filter-all'> {dat.sub_total} </td>

                                            <td className='filter-all'> {(dat.p_desconto).toFixed(3)} </td>

                                            <td className='filter-all'> {dat.vlr_desconto_total} </td>

                                            <td className='filter-all'> {dat.vlr_venda_total} </td>

                                            <td className='filter-all'> {dat.vlr_custo_total} </td>

                                            <td className='filter-all'> {dat.vlr_lucro_total} </td>

                                            <td className='filter-all'> {dat.p_markup} </td>

                                            <td className='filter-all'> {dat.p_margem} </td>

                                            <td className='filter-all'> {(dat.percentual).toFixed(2)} </td>
                                        </tr>
                                    ))}
                                </table>

                            </>

                        )}
                    </RF.DataGeral>
                ) : null}
            </div>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardRegiao} onRequestClose={closeDashboardRegiao} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles}>

                <button onClick={closeDashboardRegiao} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Região</h1>

                    <div className='dashboardTexts'>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: R$ {result2}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: R$ {result}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: R$ {result1}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {result3}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {result4}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataRegiao} options={options} className="grafico" />
                        <Chart chartType="Bar" width="300px" height="200px" data={dataRe0} options={optionsRe0} className="grafico" />
                        <Chart chartType="PieChart" data={dataRegiao2} options={options2} width="300px" height="200px" className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>

                        <label className='bestRegion'>{dadosRegiao.map((banRe) => {

                            if (banRe.regiao === 'PERNAMBUCO') {
                                return (
                                    <div className='grafico-regiao'>
                                        <img className='bandeira' src='/images/bandeiras/PE.png' />
                                        <p>Pernambuco</p>
                                        <img className='regiaoImg' src='/images/nordeste.png' />
                                        <span className='spanName'>Nordeste</span>
                                    </div>
                                );
                            } else if (banRe.regiao === 'PARAIBA') {
                                return (
                                    <div className='grafico-regiao'>
                                        <img className='bandeira' src='/images/bandeiras/PB.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'ACRE') {
                                return (
                                    <div className='grafico-regiao'>
                                        <img className='bandeira' src='/images/bandeiras/AC.png' />
                                        <p>Região Norte</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'AMAZONAS') {
                                return (
                                    <div className='grafico-regiao'>
                                        <img className='bandeira' src='/images/bandeiras/AM.png' />
                                        <p>Região Norte</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'ALAGOAS') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/AL.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'PIAUÍ') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/PI.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'AMAPÁ') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/AP.png' />
                                        <p>Região Norte</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'SÃO PAULO') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/SP.png' />
                                        <p>Região Suldeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'RIO DE JANEIRO') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/RJ.png' />
                                        <p>Região Suldeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'MINAS GERAIS') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/MG.png' />
                                        <p>Região Suldeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'ESPÍRITO SANTO') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/ES.png' />
                                        <p>Região Suldeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'BAHIA') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/BA.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'CEARA') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/CE.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'MATO GROSSO') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/MT.png' />
                                        <p>Região Centro Oeste</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'TOCANTINS') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/TO.png' />
                                        <p>Região Norte</p>
                                    </div>
                                );
                            } else if (banRe.regiao === 'PARANÁ') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/PB.png' />
                                        <p>Região Sul</p>
                                    </div>
                                );
                            } else if (banRe.regiao === '') {
                                return (
                                    <div className=''>
                                        <img className='bandeira' src='/images/bandeiras/PB.png' />
                                        <p>Região Nordeste</p>
                                    </div>
                                );
                            }

                        })}</label>

                        <Chart chartType="BarChart" data={barData} options={barOptions} className='grafico' />
                    </RF.Dashboard>

                </div>
            </Modal>

            <Modal isOpen={dashboardFilial} onRequestClose={closeDashboardFilial} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <button onClick={closeDashboardFilial} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Filial</h1>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: R$ {resultFi2}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: R$ {resultFi}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: R$ {resultFi1}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {resultFi3}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {resultFi4}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Valor Credito: R$ {resultFi5}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Valor Liquido: R$ {resultFi6}
                        </h2>
                    </div>

                    <RF.Dashboard className='dashboard' >
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataFilial} className="grafico" />
                        <Chart chartType="BarChart" data={barDataFi} options={barOptionsFi} className="grafico" />
                        <Chart chartType="PieChart" data={dataFilial2} options={optionsFi} width="300px" height="200px" className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="Bar" width="300px" height="200px" data={dataFi0} options={optionsFi0} backgroundColor="#d3d3d3" className="grafico" />
                    </RF.Dashboard>

                </div>

            </Modal>

            <Modal isOpen={dashboardVendedor} onRequestClose={closeDashboardVendedor} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <button onClick={closeDashboardVendedor} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>
                    <h1>Dados Vendedor</h1>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro: R$ {(resultVen2).toFixed(3)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Custo: R$ {(resultVen).toFixed(2)}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Total: R$ {resultVen1}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {resultVen3}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {resultVen4}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Credito: R$ {resultVen5}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Cancelamento: R$ {resultVen6}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Comissão: R$ {resultVen7}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoCinza.png' /> Desconto: R$ {resultVen8}
                        </h2>
                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={datVendedor} className="grafico" />
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={datVendedor0} className="grafico" />
                        <Chart chartType="PieChart" data={dataVendedor} options={optionsVen} width="300px" height="200px" className="grafico" />
                    </RF.Dashboard>

                </div>

                <RF.Dashboard>
                    <Chart chartType="BarChart" data={barDataVen} options={barOptionsVen} className="grafico" />
                </RF.Dashboard>

            </Modal>

            <Modal isOpen={dashboardCliente} onRequestClose={closeDashboardCliente} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                <button onClick={closeDashboardCliente} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>
                    <h1>Dados Cliente <button className='btnDetalhes' onClick={openDashboardDezCliente}><img className='grafico' src='images/itens.png' /> Por itens </button> </h1>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro Venda: R$ {resultCli1.toFixed(2)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Custo: R$ {resultCli4}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Venda Total: R$ {resultCli.toFixed(2)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {resultCli2.toFixed(2)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {resultCli3}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Credito: {resultCli7}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Lucro Liqudido: R$ {resultCli6.toFixed(2)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Desconto {resultCli5}
                        </h2>

                    </div>

                    <RF.Dashboard >
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataCliente} className="grafico" />
                        <Chart chartType="BarChart" data={barDataCli} options={barOptionsCli} className="grafico" />
                        <Chart chartType="PieChart" data={dataCliente0} options={optionsCli} width={"300px"} height={"200px"} className="grafico" />
                    </RF.Dashboard>

                    <Modal isOpen={dashboardDezCliente} onRequestClose={closeDashboardDezCliente} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                        {dadosClienteReduzido.map((dados) => {

                            const dashboard = [
                                ["Element", "", { role: "style" }],
                                ["Liquido", dados.vlLucroLiquido, "#ffaf56"],
                                ["Bruto", dados.vlLucroVenda, "#f6d001"],
                            ];

                            const dashboard1 = [
                                ["Element", "", { role: "style" }],
                                ["Custo", dados.vlCustoTotal, "#f6d001"],
                                ["Lucro", dados.vlLucroVenda, "#ffaf56"],
                            ];

                            const dashboard2 = [
                                ["Element", "", { role: "style" }],
                                ["NF-e", dados.vlTotalNfe, ""],
                                ["NFC-e", dados.vlTotalNfce, ""],
                            ];

                            return (
                                <RF.DashboardMenor>
                                    <h2>{dados.cliente}</h2>
                                    <div className='graficosReduzidos' >
                                        <Chart chartType="ColumnChart" width="20vw" height="25vh" data={dashboard} className="graficoA" />
                                        <Chart chartType="ColumnChart" width="20vw" height="25vh" data={dashboard1} className="graficoA" />
                                        <Chart chartType="PieChart" width="20vw" height="25vh" data={dashboard2} options={optionsCli} className="graficoA" />
                                    </div>
                                </RF.DashboardMenor>
                            );

                        })}
                    </Modal>

                </div>

                <RF.Dashboard>
                    <Chart chartType="Bar" width="100%" height="500px" data={dataCli0} options={optionsCli0} className='grafico' />
                </RF.Dashboard>

            </Modal>

            <Modal isOpen={dashboardTipoDePagamento} onRequestClose={closeDashboardTipoDePagamento} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <button onClick={closeDashboardTipoDePagamento} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Tipo Pagamento</h1>

                    <div className='dashboardTexts' >

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/dinheiro.png' /> Dinheiro : R$ {resultTpPg}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/credito.png' /> Cartão Credito: R$ {resultTpPg2}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/debito.png' /> Cartão Debito: R$ {resultTpPg3}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cheque.png' /> Cheque : R$ {resultTpPg4}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/boleto.png' /> Boleto Bancario: R$ {resultTpPg5}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Credito Loja: R$ {resultTpPg6}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Cancelamento Total: R$ {resultTpPg7}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Desconto Total: R$ {resultTpPg8}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Total: R$ {resultTpPg1}
                        </h2>

                    </div>

                    <h1>Vales(Caso possua)</h1>

                    <div className='dashboardTexts'>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/valeAlimentacao.png' /> Alimentação: R$ {resultTpPg9}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/valeCombustivel.png' /> Combustivel: R$ {resultTpPg10}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/valePresente.png' /> Presente: R$ {resultTpPg11}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/valeRefeicao.png' /> Refeição: R$ {resultTpPg12}
                        </h2>
                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataTpPg} className="grafico" />
                        <Chart chartType="BarChart" data={dataTipoPagamento} options={barOptionsTpPg} className="grafico" />
                        <Chart chartType="PieChart" data={dataTipoPagamentoPizza} options={optionsTpPg} width="300px" height="200px" className="grafico" />
                    </RF.Dashboard>

                </div>

                <RF.Dashboard>
                    <Chart chartType="Bar" width="500px" height="250px" data={dataTpPg0} options={optionsCli0} className="grafico" />
                    <Chart chartType="ColumnChart" width="350px" height="250px" data={dataTpPgVale} className="grafico" />
                </RF.Dashboard>

            </Modal>

            <Modal isOpen={dashboardProdutos} onRequestClose={closeDashboardProdutos} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles}>

                <button onClick={closeDashboardProdutos} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Produtos <button className='btnDetalhes' onClick={openDashboardProdutosDetalhados}><img className='grafico' src='images/itens.png' /> Por itens </button> </h1>

                    <div className='dashboardTexts'>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Valor venda: {resultProd.toFixed(3)}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Lucro: {resultProd1.toFixed(3)}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Sub Total: {resultProd3.toFixed(3)}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoCinza.png' /> Custo: {resultProd2.toFixed(3)}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Desconto: {resultProd4.toFixed(3)}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataProd} className="grafico" />
                        <Chart chartType="PieChart" data={dataProd} options={optionsProd} width="300px" height="200px" className="grafico" />
                        <Chart chartType="BarChart" data={barDataPro} options={barOptionsPro} className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="Bar" width="100%" height="35vw" data={dataProd0} options={optionsProd0} className='grafico' />
                    </RF.Dashboard>

                </div>

                <Modal isOpen={dashboardProdutosDetalhado} onRequestClose={closeDashboardProdutosDetalhados} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado'>
                    {dadosProdutoReduzidos.map((prod) => {

                        const dashboard = [
                            ["Element", "Valor", { role: "style" }],
                            ["Venda:", prod.vlr_venda_total, "#f6d001"],
                            ["Lucro", prod.vlr_lucro_total, "#1b7abc"],
                        ];

                        const dashboard1 = [
                            ["Element", "", { role: "style" }],
                            ["Custo", prod.vlr_custo_total, "#727272"],
                            ["Lucro", prod.vlr_lucro_total, "#1b7abc"],
                        ];

                        const dashboard2 = [
                            [
                                "Element",
                                "Valor",
                                { role: "style" },
                                {
                                    sourceColumn: 0,
                                    role: "annotation",
                                    type: "string",
                                    calc: "stringify",
                                },
                            ],
                            ["Desconto", prod.vlr_desconto_total, "#a9b21a", null],
                            ["Sub.Total", prod.sub_total, "#ff6ad8", null],
                            ["Venda", prod.vlr_venda_total, "#f6d001", null],
                        ];

                        return (
                            <RF.DashboardMenor>

                                <h2>{prod.produto}</h2>
                                <div className='graficosReduzidos' >
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard} className="graficoA" />
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard1} className="graficoA" />
                                    <Chart chartType="BarChart" data={dashboard2} options={barOptionsGru} className="graficoA" />
                                </div>

                            </RF.DashboardMenor>
                        );

                    })}
                </Modal>

            </Modal>

            <Modal isOpen={dashboardGrupo} onRequestClose={closeDashboardGrupo} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles} >

                <button onClick={closeDashboardGrupo} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Grupo  <button className='btnDetalhes' onClick={openDashboardGrupoDetalhado} > <img className='grafico' src='images/itens.png' /> Cada Grupo  </button> </h1>

                    <div className='dashboardTexts' >

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {resultGru}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Valor Lucro: {resultGru1}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Sub Total: {resultGru2.toFixed(2)}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Desconto Total: {resultGru3}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataGru} className="grafico" />
                        <Chart chartType="BarChart" data={barDataGru} options={barOptionsGru} className="grafico" />
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataGru2} className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="Bar" width="100%" height="35vw" data={dataGru0} options={optionsGru0} />
                    </RF.Dashboard>


                </div>

                <Modal isOpen={dashboardGrupoDetalhado} onRequestClose={closeDashboardGrupoDetalhado} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                    {dadosGrupoDetalhado.map((detalhado) => {

                        const grupoDetalhado = [
                            ["Element", "Valor", { role: "style" }],
                            ["Venda:", detalhado.vlr_venda_total, "#bc1b2b"],
                            ["Lucro", detalhado.vlr_lucro_total, "#ffaf56"],
                        ];

                        const grupoDetalhado1 = [
                            ["Element", "Valor", { role: "style" }],
                            ["Sub.Total", detalhado.sub_total, "#bc1b2b"],
                            ["Lucro", detalhado.vlr_lucro_total, "#ffaf56"],
                        ];

                        const grupoDetalhadoBar = [
                            [
                                "Element",
                                "Valor",
                                { role: "style" },
                                {
                                    sourceColumn: 0,
                                    role: "annotation",
                                    type: "string",
                                    calc: "stringify",
                                },
                            ],
                            ["Venda", detalhado.vlr_venda_total, "#bc1b2b", null],
                            ["Lucro", detalhado.vlr_lucro_total, "ffaf56", null],
                            ["Sub Total", detalhado.sub_total, "#f6d001", null],
                            ["Desconto Total", detalhado.vlr_desconto_total, "#1b7abc", null],
                        ];

                        const barGruOptions = {
                            title: "Tabela Valores Totais.",
                            width: 300,
                            height: 200,
                            bar: { groupWidth: "95%" },
                            legend: { position: "none" },
                        };

                        return (
                            <RF.DashboardMenor>
                                <h2>{detalhado.grupo}</h2>
                                <div className='graficosReduzidos'>
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={grupoDetalhado} className="graficoA" />
                                    <Chart chartType="BarChart" data={grupoDetalhadoBar} options={barGruOptions} className="graficoA" />
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={grupoDetalhado1} className="graficoA" />
                                </div>
                            </RF.DashboardMenor>
                        )
                    })}
                </Modal>

            </Modal>

            <Modal isOpen={dashboardFornecedor} onRequestClose={closeDashboardFornecedor} shouldCloseOnOverlayClick={false} style={customStyles} >

                <button onClick={closeDashboardFornecedor} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                <div>

                    <h1>Dados Fornecedor <button onClick={openDashboardFornecedorDetalhado} className='btnDetalhes'> <img className='grafico' src='images/itens.png' /> Cada Item</button> </h1>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {resultFor}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Valor Lucro: {resultFor1}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> Valor Custo: {resultFor2}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Valor Desconto: {resultFor3}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Sub.Total: {resultFor4.toFixed(2)}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataFor} className="grafico" />
                        <Chart chartType="BarChart" data={barDataFor} options={barOptionsFor} className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="Bar" width="100%" height="35vw" data={dataFor0} options={optionsFor0} />
                    </RF.Dashboard>

                </div>

                <Modal isOpen={dashboardFornecedorDetalhado} onRequestClose={closeDashboardFornecedorDetalhado} shouldCloseOnOverlayClick={false} className='dashboardDetalhado' >
                    {dadosFornecedorDetalhado.map((forn) => {

                        const dashboard = [
                            ["Element", "Valor", { role: "style" }],
                            ["Venda", forn.vlr_venda_total, "#bc1b2b"],
                            ["Lucro", forn.vlr_lucro_total, "#57ffe8"],
                        ]

                        const dashboard1 = [
                            ["Element", "Valor", { role: "style" }],
                            ["Sub.Total", forn.sub_total, "#b2bb1d"],
                            ["Lucro", forn.vlr_lucro_total, "#57ffe8"],
                        ]

                        const dashboard2 = [
                            [
                                "Element",
                                "Valor",
                                { role: "style" },
                                {
                                    sourceColumn: 0,
                                    role: "annotation",
                                    type: "string",
                                    calc: "stringify",
                                },
                            ],
                            ["Lucro", forn.vlr_lucro_total, "#57ffe8", null],
                            ["Sub.Total", forn.sub_total, "#b2bb1d", null],
                            ["Venda", forn.vlr_venda_total, "#bc1b2b", null],
                            ["Desconto", forn.vlr_venda_total, "#1b7abc", null],
                        ];

                        return (
                            <RF.DashboardMenor>
                                <h2>{forn.fornecedor}</h2>

                                <div className='graficosReduzidos'>
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard} className="graficoA" />
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard1} className="graficoA" />
                                    <Chart chartType="BarChart" data={dashboard2} options={barOptionsFor} className="graficoA" />
                                </div>
                            </RF.DashboardMenor>
                        )
                    })}
                </Modal>
            </Modal>

            <C.Footer >

                <div className='buttons'>
                    <button onClick={openDashboardGeral}> <img src='/images/grafico.png' /> Graf. Gerais</button>
                    <button onClick={() => navigate('/home')}> <img src='/images/voltar.png' /> Voltar</button>
                </div>

                <Modal isOpen={dashboardGeral} onRequestClose={closeDashboardGeral} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} style={customStyles}>

                    <button onClick={closeDashboardGeral} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                    <h1>Dashboard Geral</h1>

                    <div className='dashboardTexts'>

                        <h2 className='prices' > <p className='Gtext' > Venda Total:  R$ {resultFi1} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > Lucro V.Total:  R$ {resultFi2} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > Liquido Total: R$ {resultFi6} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > NF-e Total:  R$ {resultFi3} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > NFC-e Total: R$ {resultFi4} </p> </h2>
                    </div>

                    <RF.Dashboard>
                        <Chart chartType="BarChart" data={barData} options={barOptions} className='grafico' />
                        <Chart chartType="BarChart" data={barDataFi} options={barOptionsFi} className="grafico" />
                        <Chart chartType="BarChart" data={barDataVen} options={barOptionsVen} className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="BarChart" data={barDataCli} options={barOptionsCli} className="grafico" />
                        <Chart chartType="BarChart" data={dataTipoPagamento} options={barOptionsTpPg} className="grafico" />
                        <Chart chartType="PieChart" data={dataRegiao2} options={options2} width="300px" height="200px" className="grafico" />
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <Chart chartType="BarChart" data={barDataPro} options={barOptionsPro} className="grafico" />
                        <Chart chartType="BarChart" data={barDataGru} options={barOptionsGru} className="grafico" />
                        <Chart chartType="BarChart" data={barDataFor} options={barOptionsFor} className="grafico" />
                    </RF.Dashboard>

                </Modal>

            </C.Footer>

            {isModalTop ? <Top onClose={() => setIsModalTop(false)} setDataSelectTop={setDataSelectTop} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente} setDataSelectDadosEmitente={setDataSelectDadosEmitente} /> : null}
        </C.Container>

    );
}

export default ResumoFaturamento;