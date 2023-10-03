import React, { useState, useContext } from 'react';
import './listAll.css'
import Modal from 'react-modal'
import { Emitente } from '../../modais/modal_emitente';
import Chart from 'react-google-charts';
import * as C from '../../cadastro/cadastro'
import { Top } from '../../modais/modal_top';
import { Loading } from '../../loading';
import { resumoFaturamentoRegiaoPDF } from './PDFS/resumoFaturamentoRegiaoPDF';
import { resumoFaturamentoVendedorPDF } from './PDFS/resumoFaturamentoPDF'
import { resumoFaturamentoTpPgPDF } from './PDFS/resumoFaturamentoTpPgPDF';
import { resumoFaturamentoProdutoPDF } from './PDFS/resumoFaturamentoProdutoPDF';
import { resumoFaturamentoGrupoPDF } from './PDFS/resumoFaturamentoGrupoPDF';
import { resumoFaturamentoFornecedorPDF } from './PDFS/resumoFaturamentoFornecedorPDF';
import { resumoFaturamentoFilialPDF } from './PDFS/resumoFaturamentoFilialPDF';
import { resumoFaturamentoClientePDF } from './PDFS/resumoFaturamentoClientePDF';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Legend, Pie, PieChart, ReferenceLine, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from "recharts";

import { AuthContext } from "../../../contexts/Auth/authContext"
import * as RF from "../resumo_de_faturamento/resumoFaturamento"

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

Modal.setAppElement("#root")

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

export const ResumoFaturamento = () => {

    const imprimirRegiao = () => {
        resumoFaturamentoRegiaoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosRegiao, empresa, user)
    }

    const imprimirFilial = () => {
        resumoFaturamentoFilialPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dados, empresa, user)
    }

    const imprimirVendedor = () => {
        resumoFaturamentoVendedorPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosVendedor, empresa, user)
    }

    const imprimirCliente = () => {
        resumoFaturamentoClientePDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosCliente, empresa, user)
    }

    const imprimirTpPg = () => {
        resumoFaturamentoTpPgPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosLeitura, keys, dadosTipoPagamento, empresa, user)
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
    const [queryFi, setQueryFi] = useState("");
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
    const [dadosTipoPagamento, setDadosTipoPagamento] = useState([{}]);
    const [dadosVendedor, setDadosVendedor] = useState([]); //Pega dados de Vendedor 
    const [dadosProduto, setDadosProduto] = useState([]); //Pega dados de Produtos
    const [dadosGrupo, setDadosGrupo] = useState([]); //Pega dados de Grupo
    const [dadosFornecedor, setDadosFornecedor] = useState([]); //Pega dados de Fornecedor 

    const [checkNFE, setCheckNFE] = useState(true); //Ve se o checkbox(NF-e) esta marcado (Por padrão ja vem marcado)
    const [checkNFCE, setCheckNFCE] = useState(true); //Ve se o checkbox(NFC-e) esta marcado (Por padrão ja vem marcado)
    const [checkTOP, setCheckTOP] = useState(true); //Ve se o Checkbox(Incluir T.OP. Salvas) esta marcado (Por padrão ja vem marcado)

    const COLORS = ['#064A8B', '#00C49F', '#00A5DD', '#8884d8'];

    const [activeIndex, setActiveIndex] = useState(0);
   
    const somarValores = (dados) => {
        return dados.reduce((resultado, objeto) => {
          for (const chave in objeto) {
            if (resultado.hasOwnProperty(chave)) {
              resultado[chave] += objeto[chave];
            } else {
              resultado[chave] = objeto[chave];
            }
          }
          return resultado;
        }, {});
    };

    const totalTipoPagamento = somarValores(dadosTipoPagamento);
    const chartDataTipoPagamento = Object.keys(totalTipoPagamento).map(key => {
        if(key != "id_filial" && key != "total"){
            return(
                {
                    nome: key,
                    valor: totalTipoPagamento[key]
                }
            )
        }
    });

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const customStyles = { //Estilo Do Modal de Graficos 
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            paddingTop: 0,
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

    const valoresA = valor.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    const valorFilial = valor.map((test) => ( //Pega o numero do código(Filial) para a API
        (test.id)
    ))

    const [valorTop, setValorTop] = useState([])

    const valoresB = valorTop.filter(function (b) {
        return !this[JSON.stringify(b)] && (this[JSON.stringify(b)] = true);
    }, Object.create(null))

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
                    setKeys([])
                    setDadosTipoPagamento([])
                    setDadosLeitura([])
                    alert('Consulta Finalizada')

                }
                setDadosRegiao(data);
                data.sort(comparer)
            });
        } else {
            setShowElement(false)
            setKeys([])
            setDadosTipoPagamento([])
            setDadosLeitura([])
            alert('Consulta Finalizada')
        }
    }

    const [keys, setKeys] = useState([]) //Usado para escrever o nome dos labels 
    const [dadosLeitura, setDadosLeitura] = useState([]) //Dados em Geral (Tipo de Pagamento)

    async function setDataTipoPagamento() { //Envia o JSON para a api e pega os dados de Tipo de Pagamento
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorTipoPagamento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objs),
        });
        if (res.status === 200) {
            res.json().then(data => {
                if(data[0].total){
                    setDadosTipoPagamento(data);
                    setKeys(Object.keys(data[0]));
                    setDadosLeitura(data);
                }
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
        setKeys([]);
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
        colors: ["#bc1b9c", "#1b7abc"],
    };

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

    //------------------------------------------------------------------Dashboard Tipo de Pagamento-----------------------------------------------------------------------------------------------------------------------------------------------

    const [dashboardTipoDePagamento, setIsOpenDashboardTipoDePagamento] = useState(false) //Estado do Modal
    const [openIndividualVend, setOpenIndivualVend] = useState(false)

    function openDashboardTipoDePagamento() { //Função para Abrir o Modal de Gráficos de Tipo de Pagamento
        setIsOpenDashboardTipoDePagamento(true)
    }
    function closeDashboardTipoDePagamento() { //Função para Fechar o Modal de Gráficos de Tipo de Pagamento
        setIsOpenDashboardTipoDePagamento(false)
    }

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

    const resultGru = dadosGrupo.reduce((a, b) => a + b.vlr_venda_total, 0); //Dados Totais somados de Venda Total
    const resultGru1 = dadosGrupo.reduce((a, b) => a + b.vlr_lucro_total, 0); //Dados Totais somados de Lucro Total
    const resultGru2 = dadosGrupo.reduce((a, b) => a + b.sub_total, 0); //Dados Totais somados de Sub.Total
    const resultGru3 = dadosGrupo.reduce((a, b) => a + b.vlr_desconto_total, 0); //Dados Totais somados de Desconto Total

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

    const [dsRegiaoDetalhada, setDsRegiaoDetalhada] = useState(false);

    function organizarKeys(a, b){
        if(a == "id_filial"){
            return -1;
        }
        if(a == "total"){
            return 1;
        }
        return 0;
    }

    function organizarValores(a, b){
        if(Object.key(a) == "id_filial"){
            return -1;
        }
        return 0;
    }

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
                                    <img alt='' src='/images/LUPA.png' onClick={() => setIsModalFilial(true)} />
                                    <button onClick={() => setValor([])} >Limpar</button>
                                </div>

                                <div>
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
                                        {valoresA.filter(dat => dat.nome_fantasia.toLowerCase().includes(query)).map((item) => {

                                            return (

                                                <tr>
                                                    <td><img alt='' src='/images/lixeira.png' onClick={() => deleteById(item.id)} /></td>
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
                                    <img alt='' src='/images/LUPA.png' onClick={() => setIsModalTop(true)} />
                                    <button onClick={() => setValorTop([])} >Limpar</button>
                                </div>

                                <div>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Código</th>
                                                <th >Descrição</th>
                                            </tr>
                                        </thead>
                                        {valoresB.filter(dat => dat.descricao.toLowerCase().includes(query1)).map((item) => {

                                            return (
                                                <tr>
                                                    <img alt='' src='/images/lixeira.png' onClick={() => deleteByIdTop(item.id)} />
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
                        <button className='setaE' onClick={voltarMeses} ><img alt='' className='close' src='/images/setaEsquerda.png' /></button>
                        <button className='setaD' onClick={passarMeses} ><img alt='' className='close' src='/images/setaDireita.png' /></button>
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

                                    <button className='dashboardBtn' onClick={openDashboardRegiao}><img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                    <button className='dashboardBtn' onClick={imprimirRegiao} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                    <button className='dashboardBtn' onClick={openDashboardFilial}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                    <button className='dashboardBtn' onClick={imprimirFilial} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>

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
                        <div className='item-bottom' >
                            <label>Méd.Itens/Cup:</label>
                            <label>{MedItensCup.toFixed(2).replace('.', ',')}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Total NF-e:</label>
                            <label>{parseFloat(String(resultFi3).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Total NFC-e: </label>
                            <label>{parseFloat(String(resultFi4).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Venda Total: </label>
                            <label>{parseFloat(String(resultFi1).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Total Credito: </label>
                            <label>{parseFloat(String(resultFi5).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Total Líquido: </label>
                            <label>{parseFloat(String(resultFi6).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Custo Total: </label>
                            <label>{parseFloat(String(resultFi).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Lucro Venda: </label>
                            <label>{parseFloat(String(resultFi2).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>Vlr.Lucro Líquido: </label>
                            <label>{parseFloat(String(lLiquido).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>
                        <div className='item-bottom' >
                            <label>% Margem:</label>
                            <label>{((resultFi2 / resultFi1) * 100).toFixed(2).replace('.', ',').replace('NaN', '0,00')}</label>
                        </div>
                        <div className='item-bottom' style={{ borderRight: "none" }}>
                            <label>% Markup: </label>
                            <label>{((resultFi1 - resultFi) / resultFi * 100).toFixed(2).replace('.', ',').replace("NaN", "0,00")}</label>
                        </div>
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

                                <button className='dashboardBtn' onClick={openDashboardVendedor}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                <button className='dashboardBtn' onClick={imprimirVendedor} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                            <td>{parseFloat(String(dat.qtdVendas).replace(null, "0,00")).toLocaleString('pt-BR')}</td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlVendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalCancelamento).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalDesconto).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlTotalComissao).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlCustoTotal).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlLucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlLucroLiquido).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td> {parseFloat(String(dat.plucroLiquido).replace(null, "0,00")).toFixed(2).replace('.', ',')} % </td>

                                            <td>{parseFloat(String(dat.percentual).replace(null, "0,00")).toFixed(2).replace('.', ',')} %</td>
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

                                <button className='dashboardBtn' onClick={openDashboardCliente}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p> </button>

                                <button className='dashboardBtn' onClick={imprimirCliente} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                            <td>{parseFloat(String(dat1.qtdVendas).replace(null, "0,00")).toLocaleString('pt-BR')}</td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlTotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlTotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlVendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlTotalDesconto).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlTotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlCustoTotal).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlLucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat1.vlLucroLiquido).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></td>

                                            <td>{String(dat1.plucroLiquido).replace('.', ',').replace(null, "0,00")} %</td>

                                            <td>{parseFloat(String(dat1.percentual).replace(null, "0,00")).toFixed(3).replace('.', ',')} % </td>

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
                                    <button className='dashboardBtn' onClick={openDashboardTipoDePagamento}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>
                                    <button className='dashboardBtn' onClick={imprimirTpPg}> <img alt='' className='grafico' src='/images/printer.png' />Imprimir</button>
                                </div>
                                <div className='table-responsive'>
                                    <table id='table'>
                                        <thead>
                                            <tr>
                                                {keys.sort(organizarKeys).map((nomes, index) => {
                                                    return (
                                                        <th key={index}>{(nomes).replace('_', ' ').replace('_', ' ').replace('_', ' ').toUpperCase()}</th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dadosTipoPagamento.map((pagamento, indx)=>{
                                                return(
                                                    <tr key={indx}>
                                                        {
                                                            Object.values(pagamento).map((pgto, index) => {
                                                                return (
                                                                    <td key={index}>{pagamento.id_filial == pgto ? pgto : parseFloat(String(pgto).replace(null, "0,00")).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </RF.DataGeral>

                    <div className='row' >
                        {keys.map((key) => {
                            if(key != "id_filial"){
                                return (
                                    <div className='item-bottom' key={key}>
                                        <label>{key.replace('_', ' ').replace('_', ' ').replace('_', ' ').toUpperCase()}: </label>
                                        <label>{parseFloat(String(totalTipoPagamento[key]).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                                    </div>
                                )
                            }
                        })}
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

                                <button className='dashboardBtn' onClick={openDashboardProdutos}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirProduto} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                                <td><p className='alinharValor' >{parseFloat(dat2.qtd_total).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 3 })} </p></td>

                                                <td> {parseFloat(String(dat2.sub_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </td>

                                                <td> {parseFloat((String(dat2.p_desconto).replace(null, "0,00"))).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat2.vlr_desconto_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat2.vlr_venda_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat2.vlr_custo_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat2.vlr_lucro_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

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

                                <button className='dashboardBtn' onClick={openDashboardGrupo}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirGrupo} > <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                                <td> {parseFloat(String(dat3.qtd_total).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })} </td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat3.sub_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {parseFloat(String(dat3.p_desconto).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 })} </td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat3.vlr_desconto_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat3.vlr_venda_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat3.vlr_custo_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td><p className='alinharValor' > {parseFloat(String(dat3.vlr_lucro_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                                <td> {parseFloat(String(dat3.p_markup).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>

                                                <td> {parseFloat(String(dat3.p_margem).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>

                                                <td> {parseFloat(String(dat3.percentual).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
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

                                <button className='dashboardBtn' onClick={openDashboardFornecedor}> <img alt='' className='grafico' src="/images/grafico.png" /> <p>Gráficos</p></button>

                                <button className='dashboardBtn' onClick={imprimirFornecedor}> <img alt='' className='grafico' src="/images/printer.png" /> <p>Imprimir</p> </button>
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

                                            <td> {parseFloat(String(dat.qtd_total).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })} </td>

                                            <td><p className='alinharValor' > {parseFloat(String(dat.sub_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td> {parseFloat(String(dat.p_desconto).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })} </td>

                                            <td><p className='alinharValor' > {parseFloat(String(dat.vlr_desconto_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' >{parseFloat(String(dat.vlr_venda_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' > {parseFloat(String(dat.vlr_custo_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td><p className='alinharValor' > {parseFloat(String(dat.vlr_lucro_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p></td>

                                            <td> {parseFloat(String(dat.p_markup).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>

                                            <td> {parseFloat(String(dat.p_margem).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>

                                            <td> {parseFloat(String(dat.percentual).replace(null, "0,00")).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>

                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </>

                    )}
                </RF.DataGeral>
            ) : null}

            <Modal shouldCloseOnEsc={false} isOpen={dashboardRegiao} onRequestClose={closeDashboardRegiao} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles}>
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)" }}>
                    <button onClick={closeDashboardRegiao} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Região <button className='filialBTN' onClick={() => setDsRegiaoDetalhada(true)}><img alt='' className='close' src='/images/regiao.png' />Cada Região</button></h1>
                </div>

                <div className='dashboardTexts'>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: {parseFloat(result2.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: {parseFloat(result.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: {parseFloat(result1.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: {parseFloat(result3.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: {parseFloat(result4.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                </div>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosRegiao}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="regiao" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="regiao" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                {dadosRegiao.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                {dadosRegiao.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal className='dashboardCadaFilial' shouldCloseOnEsc={false} isOpen={dsRegiaoDetalhada} onRequestClose={() => setDsRegiaoDetalhada(false)} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" >

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={() => setDsRegiaoDetalhada(false)}><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Região</h1>
                    </div>

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
                            <RF.DashboardGrafico><Chart chartType='BarChart' data={chartRe} options={optionsRe} /></RF.DashboardGrafico>
                        )

                    })}

                </Modal>
            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardFilial} onRequestClose={closeDashboardFilial} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)" }}>
                    <button onClick={closeDashboardFilial} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Filial<button onClick={() => setGraficosCadaFilial(true)} className='filialBTN' > <img alt='' className='close' src='/images/filiais.png' /> Cada Filial</button></h1>
                </div>
                <div className='dashboardTexts' >
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' />  Valor de Lucro: {parseFloat(String(resultFi2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Valor de Custo: {parseFloat(String(resultFi).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Valor Total: {parseFloat(String(resultFi1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: {parseFloat(String(resultFi3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: {parseFloat(String(resultFi4).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoRosa.png' /> Valor Credito: {parseFloat(String(resultFi5).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoLaranja.png' /> Valor Liquido: {parseFloat(String(resultFi6).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>

                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dados}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="filial" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="filial" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                {dados.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                {dados.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal isOpen={graficosCadaFilial} onRequestClose={() => setGraficosCadaFilial(false)} className='dashboardCadaFilial' overlayClassName='none'>

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={() => setGraficosCadaFilial(false)}><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Filial</h1>

                        <input className='srch' type='search' name='search-fili' id='search-fili' placeholder='Buscar por Filial...' onChange={(e) => setQueryFi(e.target.value)} />
                    </div>

                    {dados.filter(dat => dat.filial.toLowerCase().includes(queryFi)).map((data) => {
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
                            <RF.DashboardGrafico><Chart chartType='BarChart' data={ChartFi} options={optionsFili} /></RF.DashboardGrafico>
                        )
                    })}

                </Modal>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardVendedor} onRequestClose={closeDashboardVendedor} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)" }}>
                    <button onClick={closeDashboardVendedor} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Vendedor<button onClick={() => setOpenIndivualVend(true)} className='filialBTN' > <img alt='' className='close' src='/images/vendedor.png' /> Cada Vendedor</button></h1>
                </div>

                <div className='dashboardTexts' >
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro: {parseFloat(String(resultVen2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Custo: {parseFloat(String(resultVen).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Total: {parseFloat(String(resultVen1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: {parseFloat(String(resultVen3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: {parseFloat(String(resultVen4).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoRosa.png' /> Credito: {parseFloat(String(resultVen5).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoLaranja.png' /> Cancelamento: {parseFloat(String(resultVen6).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzulClaro.png' /> Comissão: {parseFloat(String(resultVen7).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>

                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoCinza.png' /> Desconto: {parseFloat(String(resultVen8).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosVendedor}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="vendedor" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="vendedor" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                {dadosVendedor.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                {dadosVendedor.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal isOpen={openIndividualVend} shouldCloseOnEsc={false} onRequestClose={() => setOpenIndivualVend(false)} contentLabel='dashboard' shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" className='dashboardCadaFilial' >

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={() => setOpenIndivualVend(false)}><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Vendedor</h1>

                        <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Vendedor" onChange={(e) => setQuery2(e.target.value)} />
                    </div>

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
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)" }}>
                    <button onClick={closeDashboardCliente} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Cliente <button className='filialBTN' onClick={() => setIsOpenDashboardClienteAll(true)}><img alt='' className='close' src='/images/cliente.png' />Cada Cliente</button> </h1>
                </div>

                <div>
                    <div className='dashboardTexts' >
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' /> Lucro Venda: {parseFloat(String(resultCli1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Custo: {parseFloat(String(resultCli4).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices'>
                            <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Venda Total: {parseFloat(String(resultCli).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoRoxo.png' /> NF-e: {parseFloat(String(resultCli2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> NFC-e: {parseFloat(String(resultCli3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoRosa.png' /> Credito: {parseFloat(String(resultCli7).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoLaranja.png' /> Lucro Liqudido: {parseFloat(String(resultCli6).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className='prices' >
                            <img alt='' className='cifrões' src='/images/cifraoAzulClaro.png' /> Desconto {parseFloat(String(resultCli5).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>

                    <Modal isOpen={dashboardClienteAll} onRequestClose={() => setIsOpenDashboardClienteAll(false)} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" className='dashboardCadaFilial' >

                        <div className='topo-content' >
                            <button className='closeBtnMenor' onClick={() => setIsOpenDashboardClienteAll(false)} ><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                            <h1>Cada Cliente</h1>

                            <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Cliente..." onChange={(e) => setQueryC(e.target.value)} />
                        </div>

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

                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosCliente}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fornecedor" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="cliente" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                {dadosCliente.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00A5DD'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                {dadosCliente.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#8884d8'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardTipoDePagamento} onRequestClose={closeDashboardTipoDePagamento} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)", zIndex: 1 }}>
                    <button onClick={closeDashboardTipoDePagamento} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Tipo Pagamento</h1>
                </div>

                <RF.ValoresTipoPagamento>
                        {keys.map((key) => {
                            if(key != "id_filial"){
                                return (
                                    <div className='item-bottom' key={key}>
                                        <label>{key.replace('_', ' ').replace('_', ' ').replace('_', ' ').toUpperCase()}: </label>
                                        <label>{parseFloat(String(totalTipoPagamento[key]).replace('NaN', '0,00')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                                    </div>
                                )
                            }
                        })}
                </RF.ValoresTipoPagamento>
                <RF.Dashboards>
                    <div className='graficos-tipo-pgto' id='grafico-barra'>
                        <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                            <BarChart
                                data={chartDataTipoPagamento}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis />
                                <Tooltip />
                                <ReferenceLine y={0} stroke="#000" />
                                <Brush dataKey="nome" height={30} stroke="#8884d8" />
                                <XAxis dataKey="nome" />
                                <Bar dataKey="valor" fill="#8884d8" >
                                    {Array.isArray(chartDataTipoPagamento) && chartDataTipoPagamento.map((data, i) => (
                                        <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='graficos-tipo-pgto'>
                        <ResponsiveContainer style={{ height: "100%", width: "100%"}}>
                            <PieChart>
                                <Tooltip />
                                <Legend
                                    verticalAlign="top"
                                    layout="horizontal"
                                    align="top"
                                    wrapperStyle={{
                                        paddingTop: "20px",
                                    }}
                                />
                                    <Pie data={chartDataTipoPagamento} dataKey="valor" nameKey="nome" cx="50%" cy="50%"
                                        outerRadius={80} fill="#8884d8" activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        onMouseEnter={onPieEnter}
                                    >
                                        {Array.isArray(chartDataTipoPagamento) &&  chartDataTipoPagamento.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </RF.Dashboards>
            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardProdutos} onRequestClose={closeDashboardProdutos} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles}>
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)", zIndex: 1 }}>
                    <button onClick={closeDashboardProdutos} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Produtos<button onClick={openDashboardProdutosDetalhados} className='filialBTN' > <img alt='' className='close' src='/images/produto.png' /> Cada Produto</button></h1>
                </div>

                <div className='dashboardTexts'>
                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' /> Valor venda: {parseFloat(String(resultProd).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> Lucro: {parseFloat(String(resultProd1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoRosa.png' /> Sub Total: {parseFloat(String(resultProd3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoCinza.png' /> Custo: {parseFloat(String(resultProd2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices'>
                        <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Desconto: {parseFloat(String(resultProd4).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosProduto}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="produto" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="produto" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlr_venda_total" fill="#8884d8" >
                                {dadosProduto.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlr_lucro_total" fill="#8884d8" >
                                {dadosProduto.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal isOpen={dashboardProdutosDetalhado} onRequestClose={closeDashboardProdutosDetalhados} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardCadaFilial'>

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={closeDashboardProdutosDetalhados} ><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Produto</h1>

                        <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Produto..." onChange={(e) => setQueryP(e.target.value)} />
                    </div>

                    <RF.Dashboard0>
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
                                <div className='grafico' ><Chart chartType='BarChart' data={ChartProd} options={optionProd} /></div>
                            )
                        })}
                    </RF.Dashboard0>

                </Modal>

            </Modal>

            <Modal shouldCloseOnEsc={false} isOpen={dashboardGrupo} onRequestClose={closeDashboardGrupo} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles} >
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)", zIndex: 1 }}>
                    <button onClick={closeDashboardGrupo} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Grupo <button onClick={openDashboardGrupoDetalhado} className='filialBTN' > <img alt='' className='close' src='/images/grupo.png' /> Cada Grupo</button> </h1>
                </div>

                <div className='dashboardTexts' >
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {parseFloat(String(resultGru).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoLaranja.png' /> Valor Lucro: {parseFloat(String(resultGru1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAmarelo.png' /> Sub Total: {parseFloat(String(resultGru2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> Desconto Total: {parseFloat(String(resultGru3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosGrupo}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="grupo" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="grupo" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlr_venda_total" fill="#8884d8" >
                                {dadosGrupo.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlr_lucro_total" fill="#8884d8" >
                                {dadosGrupo.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal shouldCloseOnEsc={false} isOpen={dashboardGrupoDetalhado} onRequestClose={closeDashboardGrupoDetalhado} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardCadaFilial' >

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={closeDashboardGrupoDetalhado}><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Grupo</h1>

                        <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Grupo..." onChange={(e) => setQueryG(e.target.value)} />
                    </div>

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
                <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)", zIndex: 1 }}>
                    <button onClick={closeDashboardFornecedor} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                    <h1>Dados Fornecedor<button onClick={openDashboardFornecedorDetalhado} className='filialBTN' > <img alt='' className='close' src='/images/fornecedor.png' /> Cada Fornecedor</button></h1>
                </div>
                <div className='dashboardTexts' >
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoVermelho.png' /> Valor Venda: {parseFloat(String(resultFor).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzulClaro.png' /> Valor Lucro: {parseFloat(String(resultFor1).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoRoxo.png' /> Valor Custo: {parseFloat(String(resultFor2).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoAzul.png' /> Valor Desconto: {parseFloat(String(resultFor3).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='prices' >
                        <img alt='' className='cifrões' src='/images/cifraoVerde.jpg' /> Sub.Total: {parseFloat(String(resultFor4).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
                <div style={{ marginTop: "10px", width: "100%", height: "70%", backgroundColor: "white", border: "1px solid black", borderRadius: "8px" }}>
                    <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                        <BarChart
                            data={dadosFornecedor}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fornecedor" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Brush dataKey="fornecedor" height={30} stroke="#8884d8" />
                            <Bar dataKey="vlr_venda_total" fill="#8884d8" >
                                {dadosFornecedor.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                ))}
                            </Bar>
                            <Bar dataKey="vlr_lucro_total" fill="#8884d8" >
                                {dadosFornecedor.map((data, i) => (

                                    <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <Modal isOpen={dashboardFornecedorDetalhado} onRequestClose={closeDashboardFornecedorDetalhado} shouldCloseOnOverlayClick={false} className='dashboardCadaFilial' overlayClassName="dashboard-overlay"  >

                    <div className='topo-content' >
                        <button className='closeBtnMenor' onClick={closeDashboardFornecedorDetalhado}><img alt='' className='close' src='/images/voltar.png' />Voltar</button>

                        <h1>Cada Fornecedor</h1>

                        <input className='srch' type="search" name="search-vend" id="search-vend" placeholder="Buscar por Fornecedor..." onChange={(e) => setQueryF(e.target.value)} />
                    </div>

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
                    <button onClick={openDashboardGeral}> <img alt='' src='/images/grafico.png' /> Graf. Gerais</button>
                    <button onClick={() => navigate('/home')}> <img alt='' src='/images/voltar.png' /> Voltar</button>
                </div>

                <Modal isOpen={dashboardGeral} onRequestClose={closeDashboardGeral} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} style={customStyles} overlayClassName="none" >
                    <div style={{ position: "sticky", top: "0px", backgroundColor: "rgb(110, 194, 250)", zIndex: 1 }}>
                        <button onClick={closeDashboardGeral} className='closeBtn'>  Fechar<img alt='' className='close' src='/images/voltar.png' /> </button>
                        <h1>Dashboard Geral</h1>
                    </div>

                    <div className='dashboardTexts'>

                        <div className='prices' > <p className='Gtext' > Venda Total: {parseFloat(resultFi1.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p> </div>

                        <div className='prices' > <p className='Gtext' > Lucro V.Total: {parseFloat(resultFi2.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p> </div>

                        <div className='prices' > <p className='Gtext' > Liquido Total: {parseFloat(resultFi6.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p> </div>

                        <div className='prices' > <p className='Gtext' > NF-e Total:  {parseFloat(resultFi3.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p> </div>

                        <div className='prices' > <p className='Gtext' > NFC-e Total: {parseFloat(resultFi4.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p> </div>
                    </div>

                    <RF.Dashboard>
                        <div className="grafico" >
                            <ResponsiveContainer style={{ height: "100%", width: "100%"}}>
                                <BarChart
                                    data={dadosRegiao}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="regiao" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="regiao" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                        {dadosRegiao.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                        {dadosRegiao.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='grafico'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={dados}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="filial" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="filial" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                        {dados.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00A5DD'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                        {dados.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#8884d8'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='grafico'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={dadosVendedor}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="vendedor" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="vendedor" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                        {dadosVendedor.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                        {dadosVendedor.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </RF.Dashboard>

                    <RF.Dashboard>
                        <div className='grafico'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={dadosCliente}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="cliente" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="vendedor" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlVendaTotal" fill="#8884d8" >
                                        {dadosCliente.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00A5DD'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlLucroVenda" fill="#8884d8" >
                                        {dadosCliente.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#8884d8'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='grafico'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={chartDataTipoPagamento}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="nome" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="nome" height={30} stroke="#8884d8" />
                                    <Bar dataKey="valor" fill="#8884d8" >
                                        {Array.isArray(chartDataTipoPagamento) &&  chartDataTipoPagamento.map((data, i) => (
                                            <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grafico" ><Chart chartType="PieChart" data={dataNfs} options={options2} width="95%" height="95%" /></div>
                    </RF.Dashboard>

                    <RF.Dashboards style={{height: "40%"}}>
                        <div className='grafico-maior'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={dadosProduto}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="produto" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="produto" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlr_venda_total" fill="#8884d8" >
                                        {dadosProduto.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#064A8B'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlr_lucro_total" fill="#8884d8" >
                                        {dadosProduto.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00C49F'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='grafico-maior'>
                            <ResponsiveContainer style={{ height: "100%", width: "100%" }}>
                                <BarChart
                                    data={dadosFornecedor}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="fornecedor" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Brush dataKey="fornecedor" height={30} stroke="#8884d8" />
                                    <Bar dataKey="vlr_venda_total" fill="#8884d8" >
                                        {dadosFornecedor.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#00A5DD'} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="vlr_lucro_total" fill="#8884d8" >
                                        {dadosFornecedor.map((data, i) => (

                                            <Cell key={`cell-${i}`} fill={'#8884d8'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </RF.Dashboards>

                </Modal>

            </C.Footer>

            {isModalTop ? <Top onClose={() => setIsModalTop(false)} setValorTop={setValorTop} valorTop={valorTop} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setValor={setValor} valor={valor} /> : null}
        </C.Container>

    );
}

export default ResumoFaturamento;