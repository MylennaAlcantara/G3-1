import React, { useState, useEffect, useContext, useReducer } from 'react';
import './listAll.css'
import Modal from 'react-modal'
import { Emitente } from '../../modais/modal_emitente';
import Chart from 'react-google-charts';
import * as C from '../../cadastro/cadastro'
import { Top } from '../../modais/modal_top';
import { Loading } from '../../loading';
import { resumoFaturamentoVendedorPDF } from './PDFS/resumoFaturamentoPDF'
import { resumoFaturamentoTpPgPDF } from './PDFS/resumoFaturamentoTpPgPDF';
import { resumoFaturamentoProdutoPDF } from './PDFS/resumoFaturamentoProdutoPDF';
import { resumoFaturamentoGrupoPDF } from './PDFS/resumoFaturamentoGrupoPDF';
import { resumoFaturamentoFornecedorPDF } from './PDFS/resumoFaturamentoFornecedorPDF';

import { AuthContext } from "../../../contexts/Auth/authContext"
import * as RF from "../resumo_de_faturamento/resumoFaturamento"

import { useNavigate } from 'react-router-dom';

Modal.setAppElement("#root")

export const ResumoFaturamento = () => {

    const imprimirVendedor = () => {
        resumoFaturamentoVendedorPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosVendedor, empresa, user)
    }

    const imprimirTpPg = () => {
        resumoFaturamentoTpPgPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosLeitura, keys, empresa, user)
    }

    const imprimirProduto = () => {
        resumoFaturamentoProdutoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosProduto, empresa, user)
    }

    const imprimirGrupo = () => {
        resumoFaturamentoGrupoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosGrupo, empresa, user)
    }

    const imprimirFornecedor = () => {
        resumoFaturamentoFornecedorPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosFornecedor, empresa, user)
    }

    const { user, empresa, cnpjMask } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showElement, setShowElement] = useState(false)

    const show = () => setShowElement(true)

    const [filial, setFilial] = useState(true);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);

    const [aba, setOpenAba] = useState("regiao");

    //--------------------------------------------------------------Filtros Parte de Cima-------------------------------------------------------------------------

    const [query, setQuery] = useState(""); //Busca de Filial (Topo Esquerda)
    const [query1, setQuery1] = useState(""); //Busca de TOP
    const [query2, setQuery2] = useState("");
    const [queryC, setQueryC] = useState("");
    const [queryP, setQueryP] = useState("");
    const [queryG, setQueryG] = useState("");
    const [queryF, setQueryF] = useState("");
    const [query4, setQuery4] = useState(""); //Busca Vendedor
    const [query5, setQuery5] = useState(""); //Busca Cliente
    const [query6, setQuery6] = useState(""); //Busca Produto
    const [query7, setQuery7] = useState(""); //Busca Grupo
    const [query8, setQuery8] = useState(""); //Busca Fornecedor 

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = ano + '-' + mes + '-' + dia;

    const [filter, setFilter] = useState(""); //Pega Valor da opção selecionada ("VENDA", "TODOS", "ORÇAMENTO")
    const [dataIni, setDataIni] = useState(dataAtual); //Pega Data inicial 
    const [dataFin, setDataFin] = useState(dataAtual); //Pega Data Final


    const [dados, setDados] = useState([]); //Pega Dados de Filial
    const [dadosRegiao, setDadosRegiao] = useState([]); //Pega dados de Região
    const [dadosCliente, setDadosCliente] = useState([]); //Pega dados de Cliente 
    const [dadosTipoPagamento, setDadosTipoPagamento] = useState([]);
    const [dadosTipoPagamento1, setDadosTipoPagamento1] = useState([]);
    const [dadosTipoPagamento2, setDadosTipoPagamento2] = useState([]);
    const [dadosTipoPagamento3, setDadosTipoPagamento3] = useState([]);
    const [dadosTipoPagamento4, setDadosTipoPagamento4] = useState([]);
    const [dadosTipoPagamento5, setDadosTipoPagamento5] = useState([]);
    const [dadosTipoPagamento6, setDadosTipoPagamento6] = useState([]);
    const [dadosTipoPagamento7, setDadosTipoPagamento7] = useState([]);
    const [dadosTipoPagamento8, setDadosTipoPagamento8] = useState([]);
    const [dadosTipoPagamento9, setDadosTipoPagamento9] = useState([]);
    const [dadosVendedor, setDadosVendedor] = useState([]); //Pega dados de Vendedor 
    const [dadosProduto, setDadosProduto] = useState([]); //Pega dados de Produtos
    const [dadosGrupo, setDadosGrupo] = useState([]); //Pega dados de Grupo
    const [dadosFornecedor, setDadosFornecedor] = useState([]); //Pega dados de Fornecedor 

    const [checkNFE, setCheckNFE] = useState(true); //Ve se o checkbox(NF-e) esta marcado (Por padrão ja vem marcado)
    const [checkNFCE, setCheckNFCE] = useState(true); //Ve se o checkbox(NFC-e) esta marcado (Por padrão ja vem marcado)
    const [checkTOP, setCheckTOP] = useState(true); //Ve se o Checkbox(Incluir T.OP. Salvas) esta marcado (Por padrão ja vem marcado)

    const customStyles = { //Estilo Do Modal de Graficos 
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

    const handleChecked = (e) => { //Seta o Estado do NF-e
        setCheckNFE(e.currentTarget.checked);
    }

    const handleChecked01 = (e) => { //Seta o estado do NFC-e
        setCheckNFCE(e.currentTarget.checked);
    }

    const handleChecked02 = (e) => { //Seta o estado do T.OP
        setCheckTOP(e.currentTarget.checked);
    }

    const [valor, setValor] = useState([])

    const valorFilial = valor.map((test) => ( //Pega o numero do código(Filial) para a API
        (test.id)
    ))

    const [valorTop, setValorTop] = useState([])

    const valorIdTop = valorTop.map((test) => ( //Pega o numero do código(TOPS) para a API
        (test.id)
    ))

    const objs = //JSON que é enviada para as APIS 
    {
        "incluirNfe": checkNFE,
        "incluirNfce": checkNFCE,
        "statusVenda": filter,
        "dataInicial": dataIni,
        "dataFinal": dataFin,
        "idFilial": valorFilial.toString(),
        "idTop": valorIdTop.toString()
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

    async function setDataFilial() { //Envia o JSON para a api e pega os dados de Filial
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

    async function setDataCliente() {//Envia o JSON para a api e pega os dados de Cliente
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorCliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {

                setDadosCliente(data);
            });
        }
    }

    function comparer(a, b) {
        if (a.idFilial < b.idFilial)
            return -1;

        if (a.idFilial > b.idFilial)
            return 1;

        return 0;
    }

    async function setDataRegiao() {//Envia o JSON para a api e pega os dados de Região
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorRegiao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                if (data.length === 0) {
                    setShowElement(false)
                    setDaDosKeys([])
                    setDadosTipoPagamento([])
                    setDadosLeitura([])
                    alert('Consulta Finalizada')

                }
                setDadosRegiao(data);
                data.sort(comparer)
            });
        } else {
            setShowElement(false)
            setDaDosKeys([])
            setDadosTipoPagamento([])
            setDadosLeitura([])
            alert('Consulta Finalizada')
        }
    }

    const [keys, setDaDosKeys] = useState([]) //Usado para escrever o nome dos labels 
    const [dadosLeitura, setDadosLeitura] = useState([]) //Dados em Geral (Tipo de Pagamento)

    async function setDataTipoPagamento() { //Envia o JSON para a api e pega os dados de Tipo de Pagamento
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorTipoPagamento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosTipoPagamento(Object.values(data[0]));
                setDadosTipoPagamento1(Object.values(data[1]));
                setDadosTipoPagamento2(Object.values(data[2]));
                setDadosTipoPagamento3(Object.values(data[3]));
                setDadosTipoPagamento4(Object.values(data[4]));
                setDadosTipoPagamento5(Object.values(data[5]));
                setDadosTipoPagamento6(Object.values(data[6]));
                setDadosTipoPagamento7(Object.values(data[7]));
                setDadosTipoPagamento8(Object.values(data[8]));
                setDadosTipoPagamento9(Object.values(data[9]));
                setDaDosKeys(Object.keys(data[0]));
                setDadosLeitura(data);
            });
        }
    }

    async function setDataVendedor() { //Envia o JSON para a api e pega os dados de Vendedor
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

    async function setDataProduto() { //Envia o JSON para a api e pega os dados de Produto
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorProduto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosProduto(data);
            })
        }
    }

    async function setDataGrupo() { //Envia o JSON para a api e pega os dados de Grupo
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorGrupo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosGrupo(data);
            })
        }
    }

    async function setDataFornecedor() { //Envia o JSON para a api e pega os dados de Fornecedor
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorFornecedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                setDadosFornecedor(data);
            })
        }
    }

    const handleSetData = () => { //Envia o JSON para todas as APIS ao mesmo tempo 
        setDados([]);
        setDadosCliente([]);
        setDadosFornecedor([]);
        setDadosGrupo([]);
        setDadosProduto([]);
        setDadosRegiao([]);
        setDadosVendedor([]);
        setDadosLeitura([]);
        setDaDosKeys([]);
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

    function onChangeDataIni(e) { //Pega os valores da Data Inicial 
        setDataIni(e.currentTarget.value)
    }

    function onChangeDataFin(e) { //Pega os Valores da Data Final
        setDataFin(e.currentTarget.value)
    }

    const divData = dataIni && dataIni.split("-");

    function passarMeses() {
        if (divData[1] === '01') {
            setDataIni(divData[0] + "-02-01");
            setDataFin(divData[0] + "-02-28");
        } else if (divData[1] === '02') {
            setDataIni(divData[0] + "-03-01");
            setDataFin(divData[0] + "-03-31");
        } else if (divData[1] === '03') {
            setDataIni(divData[0] + "-04-01");
            setDataFin(divData[0] + "-04-30");
        } else if (divData[1] === '04') {
            setDataIni(divData[0] + "-05-01");
            setDataFin(divData[0] + "-05-31");
        } else if (divData[1] === '05') {
            setDataIni(divData[0] + "-06-01");
            setDataFin(divData[0] + "-06-30");
        } else if (divData[1] === '06') {
            setDataIni(divData[0] + "-07-01");
            setDataFin(divData[0] + "-07-31");
        } else if (divData[1] === '07') {
            setDataIni(divData[0] + "-08-01");
            setDataFin(divData[0] + "-08-31");
        } else if (divData[1] === '08') {
            setDataIni(divData[0] + "-09-01");
            setDataFin(divData[0] + "-09-30");
        } else if (divData[1] === '09') {
            setDataIni(divData[0] + "-10-01");
            setDataFin(divData[0] + "-10-31");
        } else if (divData[1] === '10') {
            setDataIni(divData[0] + "-11-01");
            setDataFin(divData[0] + "-11-30");
        } else if (divData[1] === '11') {
            setDataIni(divData[0] + "-12-01");
            setDataFin(divData[0] + "-12-31");
        } else if (divData[1] === '12') {
            setDataIni((parseFloat(divData[0]) + 1).toString() + "-01-01");
            setDataFin((parseFloat(divData[0]) + 1).toString() + "-01-31");
        }
    }

    function voltarMeses() {
        if (divData[1] === '01') {
            setDataIni((parseFloat(divData[0]) - 1).toString() + "-12-01");
            setDataFin((parseFloat(divData[0]) - 1).toString() + "-12-31");
        } else if (divData[1] === '02') {
            setDataIni(divData[0] + "-01-01");
            setDataFin(divData[0] + "-01-31");
        } else if (divData[1] === '03') {
            setDataIni(divData[0] + "-02-01");
            setDataFin(divData[0] + "-02-28");
        } else if (divData[1] === '04') {
            setDataIni(divData[0] + "-03-01");
            setDataFin(divData[0] + "-03-31");
        } else if (divData[1] === '05') {
            setDataIni(divData[0] + "-04-01");
            setDataFin(divData[0] + "-04-30");
        } else if (divData[1] === '06') {
            setDataIni(divData[0] + "-05-01");
            setDataFin(divData[0] + "-05-31");
        } else if (divData[1] === '07') {
            setDataIni(divData[0] + "-06-01");
            setDataFin(divData[0] + "-06-30");
        } else if (divData[1] === '08') {
            setDataIni(divData[0] + "-07-01");
            setDataIni(divData[0] + "-07-31");
        } else if (divData[1] === '09') {
            setDataIni(divData[0] + "-08-01");
            setDataFin(divData[0] + "-08-31");
        } else if (divData[1] === '10') {
            setDataIni(divData[0] + "-09-01");
            setDataFin(divData[0] + "-09-30");
        } else if (divData[1] === '11') {
            setDataIni(divData[0] + "-10-01");
            setDataFin(divData[0] + "-10-31");
        } else if (divData[1] === '12') {
            setDataIni(divData[0] + "-11-01");
            setDataFin(divData[0] + "-11-30");
        }
    }

    //------------------------------------------------------------------ Dashboard Geral ----------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardGeral, setIsOpenDashboardGeral] = useState(false); //Estado do Modal

    function openDashboardGeral() { //Função para Abrir o Modal de Gráficos Geral
        setIsOpenDashboardGeral(true);
    }
    function closeDashboardGeral() { //Função para Fechar o Modal de Gráficos Geral
        setIsOpenDashboardGeral(false);
    }

    //------------------------------------------------------------------Dashboards Região----------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardRegiao, setIsOpenDashboardRegiao] = useState(false);//Estado do Modal

    function openDashboardRegiao() { //Função para Abrir o Modal de Gráficos de Região
        setIsOpenDashboardRegiao(true)
    }
    function closeDashboardRegiao() { //Função para Fechar o Modal de Gráficos de Região
        setIsOpenDashboardRegiao(false)
    }

    const result = dadosRegiao.reduce((a, b) => a + b.vlCustoTotal, 0) //Dados Totais somados de Custo Total (Região) 
    const result1 = dadosRegiao.reduce((a, b) => a + b.vlVendaTotal, 0) //Dados Totais somados de Venda Total (Região) 
    const result2 = dadosRegiao.reduce((a, b) => a + b.vlLucroVenda, 0) //Dados Totais somados de Lucro Venda (Região) 
    const result3 = dadosRegiao.reduce((a, b) => a + b.vlTotalNfe, 0) //Dados Totais somados de NF-e (Região) 
    const result4 = dadosRegiao.reduce((a, b) => a + b.vlTotalNfce, 0) //Dados Totais somados de NFC-e (Região) 

    const options2 = { //Configuração do Terceiro Gráfico de Região 
        title: "Valores NF-e / NFC-e",
        is3D: true,
        backgroundColor: "#ffff",
        colors: ["#bc1b9c", "#1b7abc"]
    };

    const barOptions = { //Configuração do Quinto Gráfico de Região 
        title: "Valores Totais Região .",
        //backgroundColor: '#d3d3d3',
        width: "95%",
        height: "95%",
        bar: { groupWidth: "95%", },
        legend: { position: "none" },
    };

    const barData = [ // Dados, Cores e Nomes Utilizados no Quinto Gráfico de Região
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

    const chartRegiao = [
        ["Valores em R$", "Venda", "Lucro"],
        ...dadosRegiao.map(item => [item.regiao, item.vlVendaTotal, item.vlLucroVenda])
    ];

    const optionsRegiao = {
        chart: {
            title: "Regiões",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "Ok",
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
        colors: ["#F7C64F", "#bc1b2b"],
    }

    //-------------------------------------------------------------Dashboard Filial----------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardFilial, setIsOpenDashboardFilial] = useState(false);//Estado do Modal 

    function openDashboardFilial() { //Função para Abrir o Modal de Gráficos de Filial
        setIsOpenDashboardFilial(true)
    }
    function closeDashboardFilial() { //Função para Fechar o Modal de Gráficos de Filial
        setIsOpenDashboardFilial(false)
    }

    const [graficosCadaFilial, setGraficosCadaFilial] = useState(false)

    const lLiquido = dados.reduce((a, b) => a + b.vlLucroLiquido, 0)
    const MedItensCup = dados.reduce((a, b) => a + b.qtdItensCupom, 0)
    const resultFi = dados.reduce((a, b) => a + b.vlCustoTotal, 0) //Dados Totais somados de Custo Total(Filial)
    const resultFi1 = dados.reduce((a, b) => a + b.vlVendaTotal, 0) //Dados Totais somados de Venda Total(Filial)
    const resultFi2 = dados.reduce((a, b) => a + b.vlLucroVenda, 0) //Dados Totais somados de Lucro Venda(Filial)
    const resultFi3 = dados.reduce((a, b) => a + b.vlTotalNfe, 0) //Dados Totais somados de NF-e(Filial)
    const resultFi4 = dados.reduce((a, b) => a + b.vlTotalNfce, 0) //Dados Totais somados de NFC-e(Filial)
    const resultFi5 = dados.reduce((a, b) => a + b.vlTotalCredito, 0) //Dados Totais somados de Total Credito(Filial)
    const resultFi6 = dados.reduce((a, b) => a + b.vlTotalLiquido, 0) //Dados Totais somados de Total Liquido(Filial)

    const barOptionsFi = { //Configuração do Segundo Gráfico de Filial
        title: "Valores Totais Filial.",
        width: "95%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataFi = [ //Dados, Cores e Nomes Utilizados no Segundo Gráfico de Filial
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

    const chartFilial = [
        ["Valores em R$", "Venda", "Lucro"],
        ...dados.map(item => [item.filial, item.vlVendaTotal, item.vlLucroVenda])
    ]

    const filialOptions = {
        chart: {
            title: "Filiais",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "Ok",
            minValue: 0,
        },
        bars: "horizontal",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
        colors: ["#f6d001", "#b2bb1c"]
    }

    //------------------------------------------------------------------Dashboard Vendedor----------------------------------------------------------------------------------------------------------------------------------------------------  

    const [dashboardVendedor, setIsOpenDashboardVendedor] = useState(false);//Estado do Modal

    function openDashboardVendedor() { //Função para Abrir o Modal de Gráficos de Vendedor
        setIsOpenDashboardVendedor(true)
    }
    function closeDashboardVendedor() { //Função para Fechar o Modal de Gráficos de Vendedor
        setIsOpenDashboardVendedor(false)
    }

    const resultVen = dadosVendedor.reduce((a, b) => a + b.vlCustoTotal, 0) //Dados Totais somados de Custo Total (Vendedor)
    const resultVen1 = dadosVendedor.reduce((a, b) => a + b.vlVendaTotal, 0) //Dados Totais somados de Venda Total (Vendedor)
    const resultVen2 = dadosVendedor.reduce((a, b) => a + b.vlLucroVenda, 0) //Dados Totais somados de Lucro Venda (Vendedor)
    const resultVen3 = dadosVendedor.reduce((a, b) => a + b.vlTotalNfe, 0) //Dados Totais somados de NF-e (Vendedor)
    const resultVen4 = dadosVendedor.reduce((a, b) => a + b.vlTotalNfce, 0) //Dados Totais somados de NFC-e (Vendedor)
    const resultVen5 = dadosVendedor.reduce((a, b) => a + b.vlTotalCredito, 0) //Dados Totais somados de Total Credito (Vendedor)
    const resultVen6 = dadosVendedor.reduce((a, b) => a + b.vlTotalCancelamento, 0) //Dados Totais somados de Total Cancelamento (Vendedor)
    const resultVen7 = dadosVendedor.reduce((a, b) => a + b.vlTotalComissao, 0) //Dados Totais somados de Total Comissão (Vendedor)
    const resultVen8 = dadosVendedor.reduce((a, b) => a + b.vlTotalDesconto, 0) //Dados Totais somados de Total Desconto (Vendedor)

    const barOptionsVen = { //Configuração do Quarto Gráfico de Filial
        title: "Valores Totais Vendedor.",
        width: "100%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataVen = [ //Dados, Cores e Nomes Utilizados no Quarto Gráfico de Vendedor
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

    const chartDataVend = [
        ["Valores em R$", "Venda", "Lucro"],
        ...dadosVendedor.map(item => [item.vendedor, item.vlVendaTotal, item.vlLucroVenda])
    ];

    const optionsVendedor = {
        chart: {
            title: "Dez Primeiros Vendedores",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "Value",
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
    }

    //---------------------------------------------------------------Dashboard Cliente------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardCliente, setIsOpenDashboardCliente] = useState(false);//Estado do Modal 

    function openDashboardCliente() { //Função para Abrir o Modal de Gráficos de Cliente
        setIsOpenDashboardCliente(true)
    }
    function closeDashboardCliente() { //Função para Fechar o Modal de Gráficos de Cliente
        setIsOpenDashboardCliente(false)
    }

    const [dashboardClienteAll, setIsOpenDashboardClienteAll] = useState(false);

    const resultCli = dadosCliente.reduce((a, b) => a + b.vlVendaTotal, 0) //Dados Totais somados de Venda Total (Cliente)
    const resultCli1 = dadosCliente.reduce((a, b) => a + b.vlLucroVenda, 0) //Dados Totais somados de Lucro Venda (Cliente)
    const resultCli2 = dadosCliente.reduce((a, b) => a + b.vlTotalNfe, 0) //Dados Totais somados de NF-e (Cliente)
    const resultCli3 = dadosCliente.reduce((a, b) => a + b.vlTotalNfce, 0) //Dados Totais somados de NFC-e (Cliente)
    const resultCli4 = dadosCliente.reduce((a, b) => a + b.vlCustoTotal, 0) //Dados Totais somados de Custo Total (Cliente)
    const resultCli5 = dadosCliente.reduce((a, b) => a + b.vlTotalDesconto, 0) //Dados Totais somados de Total Desconto (Cliente)
    const resultCli6 = dadosCliente.reduce((a, b) => a + b.vlLucroLiquido, 0) //Dados Totais somados de Lucro Liquido (Cliente)
    const resultCli7 = dadosCliente.reduce((a, b) => a + b.vlTotalCredito, 0) //Dados Totais somados de Total Credito (Cliente)

    const barOptionsCli = { //Configuração do Segundo Gráfico de Cliente
        title: "Valores Totais Cliente.",
        width: "100%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataCli = [ //Dados, Cores e Nomes Utilizados no Segundo Gráfico de Cliente
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

    const optionsCli0 = { //Configuração do Quarto Gráfico de Cliente 
        chart: {
            title: "Valores Gerais",
            subtitle: "Comparativo",
        },
        hAxis: {
            title: "GGG",
            minValue: 0,
        },
        chartArea: {
            width: '100%'
        },
        vAxis: {
            title: "Valores",
        },
        bars: "horizontal",
        annotations: {
            textStyle: {
                fontName: 'Times-Roman',
                fontSize: 8,
                bold: true,
                italic: true,
                color: '#871b47',
                auraColor: '#d799ae',
                opacity: 0.8
            }
        },
        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const dataCli0 = [ //Dados, Cores e Nomes Utilizados no Quarto Gráfico de Cliente
        ["Valores em R$", "Liquido", "Venda"],
        ...dadosCliente.map(item => [item.cliente, item.vlLucroLiquido, item.vlVendaTotal])
    ];

    //------------------------------------------------------------------Dashboard Tipo de Pagamento-----------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardTipoDePagamento, setIsOpenDashboardTipoDePagamento] = useState(false) //Estado do Modal
    const [openIndividualVend, setOpenIndivualVend] = useState(false)

    function openDashboardTipoDePagamento() { //Função para Abrir o Modal de Gráficos de Tipo de Pagamento
        setIsOpenDashboardTipoDePagamento(true)
    }
    function closeDashboardTipoDePagamento() { //Função para Fechar o Modal de Gráficos de Tipo de Pagamento
        setIsOpenDashboardTipoDePagamento(false)
    }

    const resultTpPg = dadosLeitura.reduce((a, b) => a + b.dinheiro, 0) //Dados Totais somados de Dinheiro (Tipo de Pagamento)
    const resultTpPg1 = dadosLeitura.reduce((a, b) => a + b.total, 0)  //Dados Totais somados de Total (Tipo de Pagamento)
    const resultTpPg2 = dadosLeitura.reduce((a, b) => a + b.cartao_de_credito, 0) //Dados Totais somados de Cartão de Credito (Tipo de Pagamento)
    const resultTpPg3 = dadosLeitura.reduce((a, b) => a + b.cartao_de_debito, 0) //Dados Totais somados de Cartão de Credito (Tipo de Pagamento)
    const resultTpPg4 = dadosLeitura.reduce((a, b) => a + b.cheque, 0) //Dados Totais somados de Cheque (Tipo de Pagamento)
    const resultTpPg5 = dadosLeitura.reduce((a, b) => a + b.boleto_bancario, 0) //Dados Totais somados de Boleto (Tipo de Pagamento)
    const resultTpPg6 = dadosLeitura.reduce((a, b) => a + b.credito_loja, 0) //Dados Totais somados de Credito Loja (Tipo de Pagamento)
    const resultTpPg7 = dadosLeitura.reduce((a, b) => a + b.cancelamento_total, 0) //Dados Totais somados de Cancelamento Total (Tipo de Pagamento)
    const resultTpPg8 = dadosLeitura.reduce((a, b) => a + b.desconto_total, 0) //Dados Totais somados de Desconto Total (Tipo de Pagamento)
    const DPMercantil = dadosLeitura.reduce((a, b) => a + b.duplicata_mercantil, 0)

    const resultTpPg9 = dadosLeitura.reduce((a, b) => a + b.vale_alimentacao, 0) //Dados Totais somados de Vale Alimentação (Tipo de Pagamento)
    const resultTpPg10 = dadosLeitura.reduce((a, b) => a + b.vale_combustivel, 0) //Dados Totais somados de Vale Combustivel (Tipo de Pagamento)
    const resultTpPg11 = dadosLeitura.reduce((a, b) => a + b.vale_presente, 0) //Dados Totais somados de Vale Presente (Tipo de Pagamento)
    const resultTpPg12 = dadosLeitura.reduce((a, b) => a + b.vale_refeicao, 0) //Dados Totais somados de Vale Refeição (Tipo de Pagamento)
    const resultTpPg13 = dadosLeitura.reduce((a, b) => a + b.pix, 0) //Dados Totais somados de Pix (Tipo de Pagamento)

    const dataTpPg = [ //Dados, Cores e Nomes Utilizados no Primeiro Gráfico de Tipo de Pagamento
        ["Element", "Valor", { role: "style" }],
        ["Credito Loja", resultTpPg6, "#ff6ad8"],
        ["Cancelamento", resultTpPg7, "#ffaf56"],
        ["Desconto", resultTpPg8, "#ffaf56"],
    ];

    const barOptionsTpPg = { //Configuração do Segundo Gráfico de Tipo de Pagamento
        title: "Pagamentos",
        width: "100%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const dataTipoPagamento = [ //Dados, Cores e Nomes Utilizados no Segundo Gráfico de Tipo de Pagamento
        ["Element", "Valor", { role: "style" }],
        ["Boleto", resultTpPg5, "#1f80ed"],
        ["Cheque", resultTpPg4, "#d24159"],
        ["C.Credito", resultTpPg2, "#9bf967"],
        ["C.Debito", resultTpPg3, "#f98b68"],
        ["Dinheiro", resultTpPg, "#ffe670"],
        ["Pix", resultTpPg13, "32b6aa"],
        ["Total", resultTpPg1, "#b2bb1c"],
    ];

    const optionsTpPg = { //Configuração do Terceiro Gráfico de Cliente
        title: "Valores",
        is3D: true,
        colors: ["#a6dce8", "#a6dce8", "#a6dce8", "#f98b68", "#ffe670"],
    };

    const dataTipoPagamentoPizza = [ //Dados, Cores e Nomes Utilizados no Terceiro Gráfico de Tipo de Pagamento
        ["Element", "Valor", { role: "style" }],
        ["Boleto", resultTpPg5, "#1f80ed"],
        ["Cheque", resultTpPg4, "#d24159"],
        ["C.Credito", resultTpPg2, "#a6dce8"],
        ["C.Debito", resultTpPg3, "#f98b68"],
        ["Dinheiro", resultTpPg, "#ffe670"],
    ];

    const dataTpPg0 = [ //Dados, Cores e Nomes Utilizados no Quarto Gráfico de Tipo de Pagamento
        ["Valores em R$", "Dinheiro/Credito", "Total/Debito"],
        ["Dinheiro , Total", resultTpPg, resultTpPg1],
        ["Credito , Debito", resultTpPg2, resultTpPg3],
    ];

    const dataTpPgVale = [ //Dados, Cores e Nomes Utilizados no Quinto Gráfico de Tipo de Pagamento
        ["Element", "Valor", { role: "style" }],
        ["Alimentação", resultTpPg9, "#D44A26"],
        ["Combustivel", resultTpPg10, "#D40B0B"],
        ["Presente", resultTpPg11, "#D44A26"],
        ["Refeição", resultTpPg12, "#D40B0B"],
    ];

    //------------------------------------------------------------------Dashboard Produtos--------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardProdutos, setIsOpenDashboardProdutos] = useState(false); //Estado do Modal
    const [dashboardProdutosDetalhado, setIsOpenDashboardProdutosDetalhados] = useState(false); //Estado do Modal com 10 

    function openDashboardProdutos() { //Função para Abrir o Modal de Gráficos de Produto
        setIsOpenDashboardProdutos(true)
    }
    function closeDashboardProdutos() { //Função para Fechar o Modal de Gráficos de Produto 
        setIsOpenDashboardProdutos(false)
    }

    function openDashboardProdutosDetalhados() { //Função para Abrir o Modal de Gráficos de 10 primeiros Produtos
        setIsOpenDashboardProdutosDetalhados(true)
    }
    function closeDashboardProdutosDetalhados() { //Função para Fechar o Modal de Gráficos de 10 primeiros Clientes
        setIsOpenDashboardProdutosDetalhados(false)
    }

    const resultProd = dadosProduto.reduce((a, b) => a + b.vlr_venda_total, 0) //Dados Totais somados de Venda Total
    const resultProd1 = dadosProduto.reduce((a, b) => a + b.vlr_lucro_total, 0) //Dados Totais somados de Lucro Total 
    const resultProd2 = dadosProduto.reduce((a, b) => a + b.vlr_custo_total, 0) //Dados Totais somados de Custo Total
    const resultProd3 = dadosProduto.reduce((a, b) => a + b.sub_total, 0) //Dados Totais somados de Sub Total
    const resultProd4 = dadosProduto.reduce((a, b) => a + b.vlr_desconto_total, 0) //Dados Totais somados de Desconto Total

    const barOptionsPro = { //Configuração do Terceiro Gráfico de Produto
        title: "Valores Totais Tipo de Pagamento .",
        width: "100%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataPro = [ //Dados, Cores e Nomes Utilizados no Terceiro Gráfico de Produto
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

    const optionsProd0 = { //Configuração do Quarto Gráfico de Produto
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

    const [produtoDetalhado, setProdutoDetalhado] = useState()

    function abp1() { setProdutoDetalhado(dadosProduto.slice(0, 90)) }; function abp2() { setProdutoDetalhado(dadosProduto.slice(91, 181)) }; function abp3() { setProdutoDetalhado(dadosProduto.slice(182, 272)) }; function abp4() { setProdutoDetalhado(dadosProduto.slice(273, 363)) }; function abp5() { setProdutoDetalhado(dadosProduto.slice(364, 454)) };
    function abp6() { setProdutoDetalhado(dadosProduto.slice(455, 545)) }; function abp7() { setProdutoDetalhado(dadosProduto.slice(546, 636)) }; function abp8() { setProdutoDetalhado(dadosProduto.slice(637, 727)) }; function abp9() { setProdutoDetalhado(dadosProduto.slice(728, 818)) }; function abp10() { setProdutoDetalhado(dadosProduto.slice(819, 909)) };
    function abp11() { setProdutoDetalhado(dadosProduto.slice(910, 1000)) };

    const dataProd0 = produtoDetalhado && [
        ["Valores em R$", "Venda", "Lucro"],
        ...produtoDetalhado.map(item => [item.produto, item.vlr_venda_total, item.vlr_lucro_total])
    ]

    //------------------------------------------------------------------------Dashboard Grupo-----------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardGrupo, setIsOpenDashboardGrupo] = useState(false); //Estado do Modal
    const [dashboardGrupoDetalhado, setIsOpenDashboardGrupoDetalhado] = useState(false); //Estado do Modal com 10 

    function openDashboardGrupoDetalhado() { //Função para Abrir o Modal de Gráficos de Grupo
        setIsOpenDashboardGrupoDetalhado(true);
    }
    function closeDashboardGrupoDetalhado() { //Função para Fechar o Modal de Gráficos de Grupo
        setIsOpenDashboardGrupoDetalhado(false);
    }

    function openDashboardGrupo() { //Função para Abrir o Modal de Gráficos de 10 primeiros Grupos
        setIsOpenDashboardGrupo(true);
    }
    function closeDashboardGrupo() { //Função para Fechar o Modal de Gráficos de 10 primeiros Grupos
        setIsOpenDashboardGrupo(false);
    }

    const dadosGrupoDetalhado = dadosGrupo.slice(0, 10) //Constante com os 10 primeiros Grupos

    const resultGru = dadosGrupo.reduce((a, b) => a + b.vlr_venda_total, 0); //Dados Totais somados de Venda Total
    const resultGru1 = dadosGrupo.reduce((a, b) => a + b.vlr_lucro_total, 0); //Dados Totais somados de Lucro Total
    const resultGru2 = dadosGrupo.reduce((a, b) => a + b.sub_total, 0); //Dados Totais somados de Sub.Total
    const resultGru3 = dadosGrupo.reduce((a, b) => a + b.vlr_desconto_total, 0); //Dados Totais somados de Desconto Total

    const barOptionsGru = { //Configuração do Segundo Gráfico de Grupo
        title: "Valores Totais Grupos.",
        width: "100%",
        height: '23vh',
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataGru = [ //Dados, Cores e Nomes Utilizados no Segundo Gráfico de Grupo
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

    const optionsGru0 = { //Configuração do Quarto Gráfico de Grupo
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

        colors: ["#bc1b2b", "#ffaf56"],

        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const dataGru0 = [ //Dados, Cores e Nomes Utilizados no Quarto Gráfico de Grupo
        ["Valores em R$", "Venda", "Lucro"],
        ...dadosGrupo.map(item => [item.grupo, item.vlr_venda_total, item.vlr_lucro_total])

    ];

    //------------------------------------------------------------------Dashboard Fornecedor------------------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardFornecedor, setIsOpenDashboardFornecedor] = useState(false) //Estado do Modal
    const [dashboardFornecedorDetalhado, setIsOpenDashboardFornecedorDetalhado] = useState(false) //Estado do Modal com 10 

    function openDashboardFornecedor() { //Função para Abrir o Modal de Gráficos de Fornecedor
        setIsOpenDashboardFornecedor(true);
    }
    function closeDashboardFornecedor() { //Função para Abrir o Modal de Gráficos de Fornecedor
        setIsOpenDashboardFornecedor(false);
    }

    function openDashboardFornecedorDetalhado() { //Função para Abrir o Modal de Gráficos de 10 primeiros Fornecedores
        setIsOpenDashboardFornecedorDetalhado(true)
    }
    function closeDashboardFornecedorDetalhado() { //Função para Fechar o Modal de Gráficos de 10 primeiros Fornecedores
        setIsOpenDashboardFornecedorDetalhado(false)
    }

    const resultFor = dadosFornecedor.reduce((a, b) => a + b.vlr_venda_total, 0) //Dados Totais somados de Venda Total (Fornecedor)
    const resultFor1 = dadosFornecedor.reduce((a, b) => a + b.vlr_lucro_total, 0) //Dados Totais somados de Lucro Total (Fornecedor)
    const resultFor2 = dadosFornecedor.reduce((a, b) => a + b.vlr_custo_total, 0) //Dados Totais somados de Custo Total (Fornecedor)
    const resultFor3 = dadosFornecedor.reduce((a, b) => a + b.vlr_desconto_total, 0) //Dados Totais somados de Desconto Total (Fornecedor)
    const resultFor4 = dadosFornecedor.reduce((a, b) => a + b.sub_total, 0) //Dados Totais somados de Sub.Total (Fornecedor)

    const barOptionsFor = { //Configuração do Segundo Gráfico de Fornecedor
        title: "Valores Totais Fornecedor .",
        width: "100%",
        height: "95%",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    const barDataFor = [ //Dados, Cores e Nomes Utilizados no Segundo Gráfico de Fornecedor
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

    const optionsFor0 = { //Configuração do Terceiro Gráfico de Fornecedor
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

    const dataFor0 = [ //Dados, Cores e Nomes Utilizados no Terceiro Gráfico de Fornecedor
        ["Valores em R$", "Venda", "Lucro"],
        ...dadosFornecedor.slice(0, 90).map(item => [item.fornecedor, item.vlr_venda_total, item.vlr_lucro_total])
    ];

    //------------------------------------------------------------------Dashboard Geral--------------------------------------------------------------------------------------------------------------------------------------------------------

    const dataNfs = [
        ["Element", "Valor Total", { role: "style" }],
        ["NF-e", resultFi3, "#F7C64F"],
        ["NFC-e", resultFi4, "#bc1b2b"],
    ];

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

    const [dsRegiaoDetalhada, setDsRegiaoDetalhada] = useState(false)

    //------------------------------------------------------------------VISUAL-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (

        <C.Container>

            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header> <h3>Resumo de Faturamento</h3> </C.Header>

            <span>Atenção: Ao selecionar NF-e, é importante destacar as T.OP.´s que serão tomadas em consideração na consulta, consultando sem nenhuma T.OP.(consulta geral), poderá vir ENTRADAS </span>

            <RF.Filtros>
                <div className='FTFilterTop' >
                    <div className='btns'>
                        <button className='topFilialBtn' style={{ backgroundColor: filial === true ? "#8CB9DF" : "", borderBottom: filial === true ? "none" : "" }} onClick={() => setFilial(true)} >Filial</button>
                        <button className='topsBtn' style={{ backgroundColor: filial === false ? "#8CB9DF" : "", borderBottom: filial === false ? "none" : "" }} onClick={() => setFilial(false)} >Tops</button>
                    </div>
                    <RF.FilialTop>
                        {filial ? (
                            <div className='filial-top'>

                                <div >
                                    <select>
                                        <option>Filial</option>
                                        <option>Região</option>
                                    </select>
                                    <input placeholder='Buscar...' onChange={(e) => setQuery(e.target.value)} />
                                    <img src='/images/LUPA.png' onClick={() => setIsModalFilial(true)} />
                                    <button onClick={() => setValor([])} >Limpar</button>
                                </div>

                                <div className='table-responsive'>
                                    <table id='table' >
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
                                        {valor.filter(dat => dat.nome_fantasia.toLowerCase().includes(query)).map((item) => {

                                            return (
                                                
                                                    <tr>
                                                        <img className='del' src='/images/lixeira.png' onClick={() => deleteById(item.id)} />
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
                                    <input placeholder='Buscar pela Descrição...' onChange={(e) => setQuery1(e.target.value)} />
                                    <img src='/images/LUPA.png' onClick={() => setIsModalTop(true)} />
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
                                        {valorTop.filter(dat => dat.descricao.toLowerCase().includes(query1)).map((item) => {

                                            return (
                                                <tr>
                                                    <img className='del' src='/images/lixeira.png' onClick={() => deleteByIdTop(item.id)} />
                                                    <td>{item.id}</td>
                                                    <td>{item.descricao}</td>
                                                </tr>
                                            )

                                        })}
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
                            <input value={dataIni} type="date" id="DataIni" onChange={onChangeDataIni} />
                        </div>
                        <div className="data" >
                            <label>Data Final</label>
                            <input value={dataFin} type="date" id="DataFin" onChange={onChangeDataFin} />
                        </div>

                        <div className="select">
                            <label>Status NFC-e</label>
                            <select onChange={(e) => setFilter(e.target.value)}>
                                <option id='todo' value="TODOS">TODOS</option>
                                <option value="VENDA">VENDA</option>
                                <option value="ORCAMENTO">ORÇAMENTO</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className='setaE' onClick={voltarMeses} ><img className='close' src='/images/setaEsquerda.png' /></button>
                        <button className='setaD' onClick={passarMeses} ><img className='close' src='/images/setaDireita.png' /></button>
                        <div className='checks' >
                            <input type="checkbox" value="false" id='TOP' checked={checkTOP} onChange={handleChecked02} /><label>Incluir T.OP. Salvas</label>
                            <input type="checkbox" value="false" id='NFE' checked={checkNFE} onChange={handleChecked} /><label>NF-e</label>
                            <input type="checkbox" value="false" id='NFCE' checked={checkNFCE} onChange={handleChecked01} /><label>NFC-e</label>
                        </div>
                    </div>

                    <div className='botao-pesquisar'>
                        <button onClick={handleSetData} >Pesquisar</button>
                    </div>
                </RF.Data>
            </RF.Filtros>
            <RF.Navegacao>
                <div>
                    <button className='CE' style={{ backgroundColor: aba === "regiao" ? "#8CB9DF" : "", borderBottom: aba === 'regiao' ? "none" : "" }} onClick={() => setOpenAba("regiao")} >Região</button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "filial" ? "#8CB9DF" : "", borderBottom: aba === 'filial' ? "none" : "" }} onClick={() => setOpenAba("filial")}  >Filial</button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "vendedor" ? "#8CB9DF" : "", borderBottom: aba === 'vendedor' ? "none" : "" }} onClick={() => setOpenAba("vendedor")} > Vendedor </button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "cliente" ? "#8CB9DF" : "", borderBottom: aba === 'cliente' ? "none" : "" }} onClick={() => setOpenAba("cliente")} > Cliente </button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "tpPg" ? "#8CB9DF" : "", borderBottom: aba === 'tpPg' ? "none" : "" }} onClick={() => setOpenAba("tpPg")} > Tipo de Pagamento </button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "produto" ? "#8CB9DF" : "", borderBottom: aba === 'produto' ? "none" : "" }} onClick={() => setOpenAba("produto")} > Produto </button>
                    <button className='botão-filtros' style={{ backgroundColor: aba === "grupo" ? "#8CB9DF" : "", borderBottom: aba === 'grupo' ? "none" : "" }} onClick={() => setOpenAba("grupo")} > Grupo </button>
                    <button className='CD' style={{ backgroundColor: aba === "fornecedor" ? "#8CB9DF" : "", borderBottom: aba === 'fornecedor' ? "none" : "" }} onClick={() => setOpenAba("fornecedor")} >Fornecedor</button>
                </div>
            </RF.Navegacao>

            {aba === "regiao" ? (
                <>
                    <RF.DataGeral>
                        {dadosRegiao.length === 0 && showElement === true ? (
                            <div className='c'>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label>

                                    <button className='dashboardBtn' onClick={openDashboardRegiao}><img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                </div>

                                <div className='table-responsive'>

                                    <table id='table'>
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

                                            <th>Markup %</th>

                                        </tr>
                                        {dadosRegiao.map((f1) => {

                                            const ordenado = f1.idFilial.split(',').sort(function (a, b) {
                                                return a - b;
                                            })

                                            console.log(ordenado)

                                            return (
                                                <tr key={f1.idFilial}>

                                                    <td>{f1.idRegiao}</td>

                                                    <td>{f1.regiao}</td>

                                                    <td>{ordenado.map(ok => ok + ',')}</td>

                                                    <td>{parseFloat(f1.qtdVendas.toFixed(2)).toLocaleString('pt-BR')}</td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlMedioVendas.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlTotalNfe.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlTotalNfce).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlVendaTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlCustoTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f1.vlLucroVenda.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td>{parseFloat(f1.margem.toFixed(2)).toLocaleString('pt-BR')} % </td>

                                                    <td>{parseFloat(f1.markup.toFixed(2)).toLocaleString('pt-BR')}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </>
                        )}
                    </RF.DataGeral>
                </>
            ) : aba === "filial" ? (
                <>
                    <RF.DataGeral>
                        {dados.length === 0 && showElement === true ? (
                            <div className='c' >
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Totais abaixo da lista! )</label>

                                    <button className='dashboardBtn' onClick={openDashboardFilial}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>
                                </div>

                                <div className='table-responsive' >
                                    <table>
                                        <thead>


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
                                        </thead>

                                        {dados.map((f2) => {

                                            if (f2.vlTotalCredito === null) {
                                                f2.vlTotalCredito = 0
                                            }

                                            return (
                                                <tr>
                                                    <td> {f2.idFilial} </td>

                                                    <td>{f2.filial}</td>

                                                    <td>{parseFloat(f2.qtdVendas).toLocaleString('pt-BR')}</td>

                                                    <td>{parseFloat(f2.qtdItens).toLocaleString('pt-BR')}</td>

                                                    <td>{parseFloat(f2.qtdItensCupom.toFixed(2)).toLocaleString('pt-BR')}</td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlMedioVendas.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlTotalNfe.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlTotalNfce.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlVendaTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlTotalCredito.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlTotalLiquido.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlCustoTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlLucroVenda.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td><p className='alinharValor' >{parseFloat(f2.vlLucroLiquido.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                                    <td>{parseFloat(f2.margem.toFixed(2)).toLocaleString('pt-BR')} %</td>

                                                    <td>{parseFloat(f2.percentual.toFixed(2)).toLocaleString('pt-BR')} %</td>
                                                </tr>
                                            );
                                        })}
                                    </table>

                                </div>
                            </>
                        )}
                    </RF.DataGeral>

                    <div className='row' >
                        <div className='item-bottom' >Méd.Itens/Cup: {MedItensCup.toFixed(2).replace('.', ',')}</div> <div className='item-bottom' >Vlr.Total NF-e: {parseFloat(resultFi3.toFixed(2)).toLocaleString('pt-BR')}</div> <div className='item-bottom' >Vlr.Total NFC-e: {parseFloat(resultFi4.toFixed(2)).toLocaleString('pt-BR')}</div> <div className='item-bottom' >Vlr.Venda Total: {parseFloat(resultFi1.toFixed(2)).toLocaleString('pt-BR')}</div> <div className='item-bottom' >Vlr.Total Credito: {parseFloat(resultFi5.toFixed(2)).toLocaleString('pt-BR')} </div>
                        <div className='item-bottom' >Vlr.Total Líquido: {parseFloat(resultFi6.toFixed(2)).toLocaleString('pt-BR')} </div> <div className='item-bottom' >Vlr.Custo Total: {parseFloat(resultFi.toFixed(2)).toLocaleString('pt-BR')} </div> <div className='item-bottom' >Vlr.Lucro Venda: {parseFloat(resultFi2.toFixed(2)).toLocaleString('pt-BR')} </div> <div className='item-bottom' >Vlr.Lucro Líquido: {parseFloat(lLiquido.toFixed(2)).toLocaleString('pt-BR')} </div> <div className='item-bottom' >% Margem: {((resultFi2 / resultFi1) * 100).toFixed(2).replace('.', ',').replace('NaN', '0,00')} </div>
                        <div>% Markup: {((resultFi1 - resultFi) / resultFi * 100).toFixed(2).replace('.', ',').replace("NaN", "0,00")} </div>
                    </div>
                </>
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
                                <label>Dashboards</label>

                                <button className='dashboardBtn' onClick={openDashboardVendedor}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                <button className='dashboardBtn' onClick={imprimirVendedor} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className='table-responsive'>
                                <table>
                                    <thead>
                                        <tr>
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
                                    </thead>
                                    {dadosVendedor.filter(dat => dat.vendedor.toLowerCase().includes(query4)).map((dat) => (

                                        <tr>
                                            <td>{dat.idFilial}</td>

                                            <td>{dat.idVendedor}</td>

                                            <td>{dat.vendedor}</td>

                                            <td>{parseFloat(dat.qtdVendas.toFixed(2)).toLocaleString('pt-BR')}</td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalNfe.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalNfce.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlVendaTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalCancelamento.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalDesconto.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalCredito.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlTotalComissao.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat((dat.vlCustoTotal).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat((dat.vlLucroVenda).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat((dat.vlLucroLiquido).toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td> {(dat.plucroLiquido).toFixed(2).replace('.', ',')} % </td>

                                            <td>{(dat.percentual).toFixed(2).replace('.', ',')} %</td>
                                        </tr>

                                    ))}
                                </table>
                            </div>
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
                                <label>Dashboards</label>

                                <button className='dashboardBtn' onClick={openDashboardCliente}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
                                        <tr>
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
                                    </thead>

                                    {dadosCliente.filter(dat => dat.cliente.toLowerCase().includes(query5)).map((dat1) => (
                                        <tr>

                                            <td>{dat1.idFilial}</td>

                                            <td>{dat1.idCliente}</td>

                                            <td>{dat1.cliente}</td>

                                            <td>{parseFloat(dat1.qtdVendas).toLocaleString('pt-BR')}</td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlTotalNfe.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlTotalNfce.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlVendaTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlTotalDesconto.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlTotalCredito.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlCustoTotal.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlLucroVenda.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat1.vlLucroLiquido.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td>{dat1.plucroLiquido.toFixed(2).replace('.', ',')} %</td>

                                            <td>{(dat1.percentual).toFixed(3).replace('.', ',')} % </td>

                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </>
                    )}
                </RF.DataGeral>
            ) : aba === "tpPg" ? (
                <>
                    <RF.DataGeral>
                        {dadosLeitura.length === 0 && showElement === true ? (
                            <div className='c'>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className='dashboardLine'>
                                    <label>Dashboards</label> <label>( Totais abaixo da lista! )</label>

                                    <button className='dashboardBtn' onClick={openDashboardTipoDePagamento}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>
                                </div>
                                <div className='table-responsive'>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                {keys.map((nomes) => {
                                                    return (
                                                        <th>{(nomes).replace('_', ' ').toUpperCase()}</th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tr>
                                            {dadosTipoPagamento.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (
                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>
                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento1.map((item) => {
                                                if (item === null || item === 0) {
                                                    item = 0.00;
                                                }

                                                return (
                                                    <td> <p className='alinharValor' >{parseFloat(item.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> </td>
                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento2.map((item) => {
                                                if (item === null || item === 0) {
                                                    item = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(item.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento3.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' >{parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> </td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento4.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p> {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento5.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento6.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento7.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento8.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                );
                                            })}
                                        </tr>

                                        <tr>
                                            {dadosTipoPagamento9.map((f5) => {
                                                if (f5 === null || f5 === 0) {
                                                    f5 = 0.00;
                                                }

                                                return (

                                                    <td> <p className='alinharValor' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> </td>

                                                );
                                            })}
                                        </tr>

                                    </table>
                                </div>
                            </>
                        )}
                    </RF.DataGeral>

                    <div className='row' >
                        <div className='item-bottom' >Boleto: {parseFloat(resultTpPg5.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Dinheiro: {parseFloat(resultTpPg.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Cartão de Credito: {parseFloat(resultTpPg2.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Cartão de Debito: {parseFloat(resultTpPg3.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Cheque: {parseFloat(resultTpPg4.toFixed(2).replace('.', ',').replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Pix: {parseFloat(resultTpPg13.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Cancelamento Total: {parseFloat(resultTpPg7.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Duplicata Mercanvil: {parseFloat(DPMercantil.toFixed(2).replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                        <div className='item-bottom' >Desconto Total: {parseFloat(resultTpPg8.toFixed(2).replace('NaN', '0,00'))}</div>
                        <div className='item-bottom' >Total: {parseFloat(resultTpPg1.toFixed(2).replace('.', ',').replace('NaN', '0,00')).toLocaleString('pt-BR')}</div>
                    </div>
                </>
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
                                <label>Dashboards</label>

                                <button className='dashboardBtn' onClick={openDashboardProdutos}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirProduto} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
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
                                    </thead>
                                    {dadosProduto.filter(dat => dat.produto.toLowerCase().includes(query6)).map((dat2) => {

                                        return (

                                            <tr>
                                                <td> {dat2.ranking} </td>

                                                <td> {dat2.id_produto} </td>

                                                <td> {dat2.produto} </td>

                                                <td><p className='alinharValor' >{parseFloat(dat2.qtd_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {parseFloat(dat2.sub_total.toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td> {parseFloat((dat2.p_desconto).toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td><p className='alinharValor' > {parseFloat(dat2.vlr_desconto_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat2.vlr_venda_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat2.vlr_custo_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat2.vlr_lucro_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {dat2.p_markup.toFixed(2).replace('.', ',')} % </td>

                                                <td> {dat2.p_margem.toFixed(2).replace('.', ',')} % </td>

                                                <td> {(dat2.percentual).toFixed(2).replace('.', ',')} % </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
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
                                <label>Dashboards</label>

                                <button className='dashboardBtn' onClick={openDashboardGrupo}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirGrupo} > <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
                                        <tr>
                                            <th>Ranking</th>

                                            <th>Id. Grupo</th>

                                            <th>Grupo</th>

                                            <th>Qtd. Total</th>

                                            <th>Sub Total</th>

                                            <th>% Desconto</th>

                                            <th>Vlr. Desconto Total</th>

                                            <th>Vlr. Venda Total</th>

                                            <th>Vlr. Custo Total</th>

                                            <th>Vlr. Lucro Total</th>

                                            <th>% Markup</th>

                                            <th>% Margem</th>

                                            <th>% Percentual</th>
                                        </tr>
                                    </thead>
                                    {dadosGrupo.filter(dat => dat.grupo.toLowerCase().includes(query7)).map((dat3) => {

                                        return (

                                            <tr>

                                                <td>{dat3.ranking}</td>

                                                <td>{dat3.id_grupo}</td>

                                                <td> {dat3.grupo} </td>

                                                <td> {parseFloat(dat3.qtd_total.toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td><p className='alinharValor' > {parseFloat(dat3.sub_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {parseFloat(dat3.p_desconto.toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td><p className='alinharValor' > {parseFloat(dat3.vlr_desconto_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat3.vlr_venda_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat3.vlr_custo_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(dat3.vlr_lucro_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {parseFloat(dat3.p_markup.toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td> {parseFloat(dat3.p_margem.toFixed(2)).toLocaleString('pt-BR')} </td>

                                                <td> {parseFloat(dat3.percentual.toFixed(2)).toLocaleString('pt-BR')} </td>
                                            </tr>

                                        );

                                    })}
                                </table>
                            </div>
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
                                <label>Dashboards</label>

                                <button className='dashboardBtn' onClick={openDashboardFornecedor}> <img className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirFornecedor}> <img className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
                            </div>
                            <div className='table-responsive'>
                                <table id='table'>
                                    <thead>
                                        <tr>
                                            <th>Ranking</th>

                                            <th>Id. Fornecedor</th>

                                            <th>Fornecedor</th>

                                            <th>Qtd. Total</th>

                                            <th>Sub Total</th>

                                            <th>% Desconto</th>

                                            <th>Vlr. Desconto Total</th>

                                            <th>Vlr. Venda Total</th>

                                            <th>Vlr. Custo Total</th>

                                            <th>Vlr. Lucro Total</th>

                                            <th>% Markup</th>

                                            <th>% Margem</th>

                                            <th>% Percentual</th>
                                        </tr>
                                    </thead>
                                    {dadosFornecedor.filter(dat => dat.fornecedor.toLowerCase().includes(query8)).map((dat) => (

                                        <tr>
                                            <td> {dat.ranking} </td>

                                            <td> {dat.id_fornecedor} </td>

                                            <td> {dat.fornecedor} </td>

                                            <td> {parseFloat(dat.qtd_total).toLocaleString('pt-BR')} </td>

                                            <td><p className='alinharValor' > {parseFloat(dat.sub_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td> {parseFloat((dat.p_desconto).toFixed(3)).toLocaleString('pt-BR')} </td>

                                            <td><p className='alinharValor' > {parseFloat(dat.vlr_desconto_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' >{parseFloat(dat.vlr_venda_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' > {parseFloat(dat.vlr_custo_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' > {parseFloat(dat.vlr_lucro_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td> {dat.p_markup.toFixed(2).replace('.', ',')} </td>

                                            <td> {dat.p_margem.toFixed(2).replace('.', ',')} </td>

                                            <td> {(dat.percentual).toFixed(2).replace('.', ',')} </td>

                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </>

                    )}
                </RF.DataGeral>
            ) : null}

            <Modal shouldCloseOnEsc={false} isOpen={dashboardRegiao} onRequestClose={closeDashboardRegiao} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles}>

                <div className='topo-content' >
                    <button onClick={closeDashboardRegiao} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Região <button className='filialBTN' onClick={() => setDsRegiaoDetalhada(true)}><img className='close' src='/images/regiao.png' />Cada Região</button></h1>
                </div>

                <div>

                    <div className='dashboardTexts'>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: R$ {parseFloat(result2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: R$ {parseFloat(result.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: R$ {parseFloat(result1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {parseFloat(result3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {parseFloat(result4.toFixed(2).toLocaleString('pt-BR'))}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <div className='grafico-reg' > <Chart chartType='Bar' width='100%' height='95%' data={chartRegiao} options={optionsRegiao} /> </div>
                    </RF.Dashboard>

                    <Modal className='dashboardCadaFilial' shouldCloseOnEsc={false} isOpen={dsRegiaoDetalhada} onRequestClose={() => setDsRegiaoDetalhada(false)} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" >

                        <button className='closeBtnMenor' onClick={() => setDsRegiaoDetalhada(false)}><img className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Região</h1>

                        <RF.Dashboard0>
                            {dadosRegiao.map((data) => {
                                const chartRe = [
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
                                    ["Lucro", data.vlLucroTotal, "#f6d001", null],
                                    ["Custo", data.vlCustoTotal, "#bc1b2b", null],
                                    ["Venda Total", data.vlVendaTotal, "#F7C64F", null],
                                    ["NF-e", data.vlTotalNfe, "#bc1b9c", null],
                                    ["NFC-e", data.vlTotalNfce, "#0854b2", null],
                                ]

                                const optionsRe = {
                                    title: data.regiao,
                                    width: "100%",
                                    height: "95%",
                                    bar: { groupWidth: "95%", },
                                    legend: { position: "none" }
                                }

                                return (
                                    <div className='grafico' ><Chart chartType='BarChart' data={chartRe} options={optionsRe} /></div>
                                )

                            })}
                        </RF.Dashboard0>

                    </Modal>

                </div>
            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardFilial} onRequestClose={closeDashboardFilial} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <div className='topo-content' >

                    <button onClick={closeDashboardFilial} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                    <h1>Dados Filial<button onClick={() => setGraficosCadaFilial(true)} className='filialBTN' > <img className='close' src='/images/filiais.png' /> Cada Filial</button></h1>

                </div>

                <div>
                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: R$ {parseFloat(resultFi2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: R$ {parseFloat(resultFi.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: R$ {parseFloat(resultFi1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {parseFloat(resultFi3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {parseFloat(resultFi4.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Valor Credito: R$ {parseFloat(resultFi5.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Valor Liquido: R$ {parseFloat(resultFi6.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>
                    </div>

                    <RF.Dashboard>
                        <div className='justSize' ><Chart width='98%' height='96%' chartType='Bar' data={chartFilial} options={filialOptions} /></div>
                    </RF.Dashboard>


                    <Modal isOpen={graficosCadaFilial} onRequestClose={() => setGraficosCadaFilial(false)} className='dashboardCadaFilial' overlayClassName='none'>
                        <button className='closeBtnMenor' onClick={() => setGraficosCadaFilial(false)}><img className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Filial</h1>

                        <RF.Dashboard0>
                            {dados.map((data) => {
                                const ChartFi = [
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
                                    ["Lucro", data.vlLucroVenda, "#f6d002", null],
                                    ["Custo", data.vlCustoTotal, "#ad1b27", null],
                                    ["Total Venda", data.vlVendaTotal, "#b2bb1c", null],
                                    ["NF-e", data.vlTotalNfe, "#bc1b9c", null],
                                    ["NFC-e", data.vlTotalNfce, "#1b7abc", null],
                                    ["Credito", data.vlTotalCredito, "#ff6ad8", null],
                                    ["Liquido", data.vlTotalLiquido, "#ffaf56", null],
                                ]

                                const optionsFili = {
                                    title: data.filial,
                                    width: "100%",
                                    height: "95%",
                                    bar: { groupWidth: "95%", },
                                    legend: { position: "none" }
                                }

                                return (

                                    <div className='grafico'><Chart chartType='BarChart' data={ChartFi} options={optionsFili} /></div>

                                )
                            })}
                        </RF.Dashboard0>

                    </Modal>

                </div>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardVendedor} onRequestClose={closeDashboardVendedor} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <div className='topo-content' >
                    <button onClick={closeDashboardVendedor} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Vendedor<button onClick={() => setOpenIndivualVend(true)} className='filialBTN' > <img className='close' src='/images/vendedor.png' /> Cada Vendedor</button></h1>
                </div>

                <div>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro: R$ {parseFloat((resultVen2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Custo: R$ {parseFloat((resultVen)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Total: R$ {parseFloat(resultVen1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {parseFloat(resultVen3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {parseFloat(resultVen4.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Credito: R$ {parseFloat(resultVen5.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Cancelamento: R$ {parseFloat(resultVen6.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Comissão: R$ {parseFloat(resultVen7.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoCinza.png' /> Desconto: R$ {parseFloat(resultVen8.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>
                    </div>

                </div>

                <RF.Dashboard>
                    <div className='justSize' ><Chart chartType='Bar' width="100%" height="2000px" data={chartDataVend} options={optionsVendedor} className='grafico' /></div>
                </RF.Dashboard>

                <Modal isOpen={openIndividualVend} shouldCloseOnEsc={false} onRequestClose={() => setOpenIndivualVend(false)} contentLabel='dashboard' shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" className='dashboardCadaFilial' >
                    <button className='closeBtnMenor' onClick={() => setOpenIndivualVend(false)}><img className='close' src='/images/voltar.png' />Voltar</button>

                    <h1>Cada Vendedor</h1>

                    <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Vendedor" onChange={(e) => setQuery2(e.target.value)} />
                    <RF.Dashboard0>
                        {dadosVendedor.filter(dat => dat.vendedor.toLowerCase().includes(query2)).map((data) => {
                            const optionsVen = {
                                title: data.vendedor,
                                width: "100%",
                                height: "95%",
                                bar: { groupWidth: "95%", },
                                legend: { position: "none" }
                            }

                            const ChartFi = [
                                ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
                                ["Lucro", data.vlLucroVenda, "#f6d001", null],
                                ["Custo", data.vlCustoTotal, "#bc1b2b", null],
                                ["Venda Total", data.vlVendaTotal, "#b2bb1c", null],
                                ["NF-e", data.vlTotalNfe, "#bc1b9c", null],
                                ["NFC-e", data.vlTotalNfce, "#1b7abc", null],
                                ["Credito", data.vlTotalCredito, "ff6ad8", null],
                                ["Cancelamento", data.vlTotalCancelamento, "ffaf56", null],
                                ["Comissão", data.vlTotalComissao, "#57ffe8", null],
                                ["Desconto", data.vlTotalDesconto, "#727272", null],
                            ]

                            return (
                                <div className='grafico' ><Chart chartType='BarChart' data={ChartFi} options={optionsVen} /></div>
                            )
                        })}
                    </RF.Dashboard0>

                </Modal>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardCliente} onRequestClose={closeDashboardCliente} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <div className='topo-content' >
                    <button onClick={closeDashboardCliente} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Cliente <button className='filialBTN' onClick={() => setIsOpenDashboardClienteAll(true)}><img className='close' src='/images/cliente.png' />Cada Cliente</button> </h1>
                </div>

                <div>

                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro Venda: R$ {parseFloat(resultCli1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Custo: R$ {parseFloat(resultCli4.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Venda Total: R$ {parseFloat(resultCli.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: R$ {parseFloat(resultCli2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: R$ {parseFloat(resultCli3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Credito: {parseFloat(resultCli7.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Lucro Liqudido: R$ {parseFloat(resultCli6.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Desconto {parseFloat(resultCli5.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                    </div>

                    <Modal isOpen={dashboardClienteAll} onRequestClose={() => setIsOpenDashboardClienteAll(false)} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                        <button className='closeBtnMenor' onClick={() => setIsOpenDashboardClienteAll(false)} ><img className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Cliente</h1>

                        <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Cliente..." onChange={(e) => setQueryC(e.target.value)} />

                        <RF.Dashboard0>
                            {dadosCliente.filter(dat => dat.cliente.toLowerCase().includes(queryC)).map((data) => {
                                const ChartCli = [
                                    ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
                                    ["Lucro", data.vlLucroVenda, "#f6d001", null],
                                    ["Custo", data.vlLucroVenda, "#bc1b2b", null],
                                    ["Venda", data.vlVendaTotal, "#b2bb1c", null],
                                    ["NF-e", data.vlTotalNfe, "#bc1b9c", null],
                                    ["NFC-e", data.vlTotalNfce, "#1b7abc", null],
                                    ["Credito", data.vlTotalCredito, "#ff6ad8", null],
                                    ["Liquido", data.vlTotalLiquido, "#ffaf56", null],
                                    ["Desconto", data.vlTotalDesconto, "#57ffe8", null]
                                ]

                                const optionCli = {
                                    title: data.cliente,
                                    width: "100%",
                                    height: "95%",
                                    bar: { groupWidth: "95%", },
                                    legend: { position: "none" }
                                }

                                return (

                                    <div className='grafico' ><Chart chartType='BarChart' data={ChartCli} options={optionCli} /></div>

                                )
                            })}
                        </RF.Dashboard0>


                    </Modal>


                </div>

                <RF.Dashboard>
                    <div className='justSize' ><Chart chartType="Bar" width="100%" height="2000px" data={dataCli0} options={optionsCli0} /></div>
                </RF.Dashboard>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardTipoDePagamento} onRequestClose={closeDashboardTipoDePagamento} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                <div className='topo-content' >
                    <button onClick={closeDashboardTipoDePagamento} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Tipo Pagamento</h1>
                </div>

                <div>
                    <RF.A>
                        <table className='pricesTpPg' >
                            <thead>
                                <div className='ajuste' >
                                    {keys.map((nomes) => {
                                        return (
                                            <div className='labels' >{(nomes).replace('_', ' ').toUpperCase()}:</div>
                                        );
                                    })}
                                </div>
                            </thead>
                            <div className='ajuste' >
                                {dadosTipoPagamento.map((f5) => {
                                    console.log(dadosLeitura)
                                    if (f5 === null || f5 === 0) {
                                        f5 = 0.00;
                                    }

                                    return (
                                        <div className='labels' > {parseFloat(f5.toFixed(2)).toLocaleString('pt-BR')} </div>
                                    );
                                })}
                            </div>
                        </table>
                    </RF.A>

                    <RF.Dashboard>
                        <div className="grafico" ><Chart chartType="ColumnChart" width="100%" height="95%" data={dataTpPg} /> </div>
                        <div className="graficoLongo" ><Chart chartType="BarChart" data={dataTipoPagamento} options={barOptionsTpPg} /> </div>
                        <div className="grafico" ><Chart chartType="PieChart" data={dataTipoPagamentoPizza} options={optionsTpPg} width="100%" height="95%" /> </div>
                    </RF.Dashboard>

                </div>

                <RF.Dashboard>
                    <div className='graficoLongoB' ><Chart chartType="Bar" width="90%" height="230px" data={dataTpPg0} options={optionsCli0} /></div>
                    <div className='graficoLongoA' > <Chart chartType="ColumnChart" width="350px" height="230px" data={dataTpPgVale} /></div>
                </RF.Dashboard>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardProdutos} onRequestClose={closeDashboardProdutos} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles}>

                <div className='topo-content' >
                    <button onClick={closeDashboardProdutos} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Produtos<button onClick={openDashboardProdutosDetalhados} className='filialBTN' > <img className='close' src='/images/produto.png' /> Cada Produto</button></h1>
                </div>

                <div>
                    <div className='dashboardTexts'>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Valor venda: {parseFloat(resultProd.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Lucro: {parseFloat(resultProd1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoRosa.png' /> Sub Total: {parseFloat(resultProd3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoCinza.png' /> Custo: {parseFloat(resultProd2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices'>
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Desconto: {parseFloat(resultProd4.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <div className='next' >
                            <button onClick={abp1} >1-90</button> <button onClick={abp2} >91-181</button> <button onClick={abp3} >182-272</button> <button onClick={abp4} >273-363</button> <button onClick={abp5} >364-454</button>
                            <button onClick={abp6} >455-545</button> <button onClick={abp7} >546-636</button> <button onClick={abp8} >637-727</button> <button onClick={abp9} >728-818</button> <button onClick={abp10} >819-909</button>
                            <button onClick={abp11} >910-1000</button>
                        </div>

                        <div className='justSize' ><Chart chartType="Bar" width="100%" height="2000px" data={dataProd0} options={optionsProd0} className='grafico' /></div>
                    </RF.Dashboard>

                </div>

                <Modal isOpen={dashboardProdutosDetalhado} onRequestClose={closeDashboardProdutosDetalhados} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado'>
                    <button className='closeBtnMenor' onClick={closeDashboardProdutosDetalhados} ><img className='close' src='/images/voltar.png' />Voltar</button>

                    <h1>Cada Produto</h1>

                    <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Produto..." onChange={(e) => setQueryP(e.target.value)} />

                    {dadosProduto.filter(dat => dat.produto.toLowerCase().includes(queryP)).slice(0, 90).map((data) => {
                        const ChartProd = [
                            ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
                            ["Venda", data.vlr_venda_total, "#f6d001", null],
                            ["Lucro", data.vlr_lucro_total, "#1b7abc", null],
                            ["Sub.Total", data.sub_total, "#ff6ad8", null],
                            ["Custo", data.vlr_custo_total, "#727272", null],
                            ["Desconto", data.vlr_desconto_total, "#b2bb1c", null],
                        ]

                        const optionProd = {
                            title: data.produto,
                            width: "100%",
                            height: "95%",
                            bar: { groupWidth: "95%", },
                            legend: { position: "none" }
                        }

                        return (
                            <RF.Dashboard0>
                                <div className='grafico' ><Chart chartType='BarChart' data={ChartProd} options={optionProd} /></div>
                            </RF.Dashboard0>
                        )
                    })}
                </Modal>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardGrupo} onRequestClose={closeDashboardGrupo} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles} >

                <div className='topo-content' >
                    <button onClick={closeDashboardGrupo} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Grupo <button onClick={openDashboardGrupoDetalhado} className='filialBTN' > <img className='close' src='/images/grupo.png' /> Cada Grupo</button> </h1>
                </div>

                <div>
                    <div className='dashboardTexts' >

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {parseFloat(resultGru.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoLaranja.png' /> Valor Lucro: {parseFloat(resultGru1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAmarelo.png' /> Sub Total: {parseFloat(resultGru2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Desconto Total: {parseFloat(resultGru3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <div className='justSize' ><Chart chartType="Bar" width="100%" height="2000px" data={dataGru0} options={optionsGru0} /></div>
                    </RF.Dashboard>



                </div>

                <Modal shouldCloseOnEsc={false} isOpen={dashboardGrupoDetalhado} onRequestClose={closeDashboardGrupoDetalhado} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                    <button className='closeBtnMenor' onClick={closeDashboardGrupoDetalhado}><img className='close' src='/images/voltar.png' />Voltar</button>

                    <h1>Cada Grupo</h1>

                    <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Grupo..." onChange={(e) => setQueryG(e.target.value)} />

                    <RF.Dashboard0>
                        {dadosGrupo.filter(dat => dat.grupo.toLowerCase().includes(queryG)).map((data) => {
                            const optionGru = {
                                title: data.grupo,
                                width: "100%",
                                height: "95%",
                                bar: { groupWidth: "95%", },
                                legend: { position: "none" }
                            }

                            const ChartGru = [
                                ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
                                ["Venda", data.vlr_venda_total, "#bc1b2b", null],
                                ["Lucro", data.vlr_lucro_total, "#ffaf56", null],
                                ["Sub.Total", data.sub_total, "#f6d001", null],
                                ["Desc.Total", data.desconto_tota, "#1b7abc", null],
                            ]

                            return (

                                <div className='grafico'><Chart chartType='BarChart' data={ChartGru} options={optionGru} /></div>

                            )
                        })}
                    </RF.Dashboard0>

                </Modal>

            </Modal>

            <Modal isOpen={dashboardFornecedor} onRequestClose={closeDashboardFornecedor} shouldCloseOnOverlayClick={false} style={customStyles} overlayClassName="null"  >

                <div className='topo-content' >
                    <button onClick={closeDashboardFornecedor} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Fornecedor<button onClick={openDashboardFornecedorDetalhado} className='filialBTN' > <img className='close' src='/images/fornecedor.png' /> Cada Fornecedor</button></h1>
                </div>

                <div>
                    <div className='dashboardTexts' >
                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {parseFloat(resultFor.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzulClaro.png' /> Valor Lucro: {parseFloat(resultFor1.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoRoxo.png' /> Valor Custo: {parseFloat(resultFor2.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoAzul.png' /> Valor Desconto: {parseFloat(resultFor3.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                        <h2 className='prices' >
                            <img className='cifrões' src='/images/cifraoVerde.jpg' /> Sub.Total: {parseFloat(resultFor4.toFixed(2)).toLocaleString('pt-BR')}
                        </h2>

                    </div>

                    <RF.Dashboard>
                        <div className='justSize' ><Chart chartType="Bar" width="100%" height="2000px" data={dataFor0} options={optionsFor0} /></div>
                    </RF.Dashboard>

                </div>

                <Modal isOpen={dashboardFornecedorDetalhado} onRequestClose={closeDashboardFornecedorDetalhado} shouldCloseOnOverlayClick={false} className='dashboardDetalhado' overlayClassName="dashboard-overlay"  >
                    <button className='closeBtnMenor' onClick={closeDashboardFornecedorDetalhado}><img className='close' src='/images/voltar.png' />Voltar</button>

                    <h1>Cada Fornecedor</h1>

                    <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Fornecedor..." onChange={(e) => setQueryF(e.target.value)} />

                    <RF.Dashboard0>
                        {dadosFornecedor.filter(dat => dat.fornecedor.toLowerCase().includes(queryF)).slice(0, 90).map((data) => {
                            const ChartFor = [
                                ["Element", "Valor", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify", },],
                                ["Venda", data.vlr_venda_total, "#bc1b2b", null],
                                ["Lucro", data.vlr_lucro_total, "#57ffe8", null],
                                ["Custo", data.vlr_custo_total, "#bc1b9c", null],
                                ["Desconto", data.vlr_desconto_total, "#1b7abc", null],
                                ["Sub.Total", data.sub_total, "#b2bb1c", null],
                            ]

                            const optionFor = {
                                title: data.fornecedor,
                                width: "100%",
                                height: "95%",
                                bar: { groupWidth: "95%" }
                            }

                            return (

                                <div className='grafico' ><Chart chartType='BarChart' data={ChartFor} options={optionFor} /></div>

                            )
                        })}
                    </RF.Dashboard0>

                </Modal>
            </Modal>

            <C.Footer >

                <div className='buttons'>
                    <button onClick={openDashboardGeral}> <img src='/images/grafico.png' /> Graf. Gerais</button>
                    <button onClick={() => navigate('/home')}> <img src='/images/voltar.png' /> Voltar</button>
                </div>

                <Modal isOpen={dashboardGeral} onRequestClose={closeDashboardGeral} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} style={customStyles} overlayClassName="none" >

                    <button onClick={closeDashboardGeral} className='closeBtn'>  Fechar<img className='close' src='/images/voltar.png' /> </button>

                    <h1>Dashboard Geral</h1>

                    <div className='dashboardTexts'>

                        <h2 className='prices' > <p className='Gtext' > Venda Total:  R$ {parseFloat(resultFi1.toFixed(2)).toLocaleString('pt-BR')} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > Lucro V.Total:  R$ {parseFloat(resultFi2.toFixed(2)).toLocaleString('pt-BR')} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > Liquido Total: R$ {parseFloat(resultFi6.toFixed(2)).toLocaleString('pt-BR')} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > NF-e Total:  R$ {parseFloat(resultFi3.toFixed(2)).toLocaleString('pt-BR')} </p> </h2>

                        <h2 className='prices' > <p className='Gtext' > NFC-e Total: R$ {parseFloat(resultFi4.toFixed(2)).toLocaleString('pt-BR')} </p> </h2>
                    </div>

                    <RF.Dashboard>
                        <div className="grafico" ><Chart chartType="BarChart" data={barData} options={barOptions} /></div>
                        <div className="graficoLongo" ><Chart chartType="BarChart" data={barDataFi} options={barOptionsFi} /></div>
                        <div className="graficoLongo" ><Chart chartType="BarChart" data={barDataVen} options={barOptionsVen} /></div>
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <div className="grafico" ><Chart chartType="BarChart" data={barDataCli} options={barOptionsCli} /></div>
                        <div className="graficoLongo" ><Chart chartType="BarChart" data={dataTipoPagamento} options={barOptionsTpPg} /></div>
                        <div className="grafico" ><Chart chartType="PieChart" data={dataNfs} options={options2} width="100%" height="95%" /></div>
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <div className="grafico" ><Chart chartType="BarChart" data={barDataPro} options={barOptionsPro} /></div>
                        <div className="grafico" ><Chart chartType="BarChart" data={barDataGru} options={barOptionsGru} /></div>
                        <div className="grafico" ><Chart chartType="BarChart" data={barDataFor} options={barOptionsFor} /></div>
                    </RF.Dashboard>

                </Modal>

            </C.Footer>

            {isModalTop ? <Top onClose={() => setIsModalTop(false)} setDataSelectTop={setDataSelectTop} setValorTop={setValorTop} valorTop={valorTop} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente} setDataSelectDadosEmitente={setDataSelectDadosEmitente} setValor={setValor} valor={valor} /> : null}
        </C.Container>

    );
}

export default ResumoFaturamento;