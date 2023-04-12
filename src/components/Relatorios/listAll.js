import React , {useState, useEffect} from 'react';
import './listAll.css'
import Modal from 'react-modal'
import Chart from 'react-google-charts';
import * as C from "../cadastro/cadastro"

Modal.setAppElement("#root")

export const ResumoFaturamento = () => {

    const[filterFilial, setIsOpenFilterFilial] = useState(true);
    const[filterTops, setIsOpenFilterTops] = useState(false);
    const[modalIsOpen, setIsOpen] = useState(false);
    const[regiaoIsOpen, setIsOpenRegiao] = useState(true);
    const[filialIsOpen, setIsOpenFilial] = useState(false);
    const[vendedorIsOpen, setIsOpenVendedor] = useState(false);
    const[clienteIsOpen, setIsOpenCliente] = useState(false);
    const[tipoPgIsOpen, setIsOpenTipoPg] = useState(false);
    const[produtoIsOpen, setIsOpenProduto] = useState(false);
    const[grupoIsOpen, setIsOpenGrupo] = useState(false);
    const[fornecdorIsOpen, setIsOpenFornecedor] = useState(false);
    const[relatorioIsOpen, setIsOpenRelatorio] = useState(false);

    function openFilterFilial (){
        setIsOpenFilterFilial(true);
    }
    function closeFilterFilial (){
        setIsOpenFilterFilial(false);
    }

    function openFilterTops (){
        setIsOpenFilterTops(true);
    }
    function closeFilterTops (){
        setIsOpenFilterTops(false);
    }

    function openRelatorio (){
        setIsOpenRelatorio(true);
    }
    function closeRelatorio (){
        setIsOpenRelatorio(false);
    }

    function openModal() {
        setIsOpen(true);
    } 
    function closeModal(){
        setIsOpen(false);
    }

    function openRegiao() {
        setIsOpenRegiao(true);
    } 
    function closeRegiao(){
        setIsOpenRegiao(false);
    }

    function openFilial() {
        setIsOpenFilial(true);
    } 
    function closeFilial(){
        setIsOpenFilial(false);
    }

    function openVendedor(){
        setIsOpenVendedor(true);
    }
    function closeVendedor (){
        setIsOpenVendedor(false);
    }

    function openCliente (){
        setIsOpenCliente(true);
    }
    function closeCliente (){
        setIsOpenCliente(false);
    }

    function openTipoPg (){
        setIsOpenTipoPg(true);
    }
    function closeTipoPg (){
        setIsOpenTipoPg(false);
    }

    function openProduto (){
        setIsOpenProduto(true);
    }
    function closeProduto (){
        setIsOpenProduto(false);
    }

    function openGrupo (){
        setIsOpenGrupo(true);
    }
    function closeGrupo (){
        setIsOpenGrupo(false);
    }

    function openFornecedor (){
        setIsOpenFornecedor(true);
    }
    function closeFornecedor (){
        setIsOpenFornecedor(false);
    }

    function abrirFiltroFilial (){
        openFilterFilial()
        closeFilterTops()
    }
    function abrirFiltroTops (){
        openFilterTops()
        closeFilterFilial()
    }
    function abrirRegiao (){
        closeRelatorio()
        closeFornecedor()
        closeGrupo()
        closeTipoPg()
        closeCliente()
        closeVendedor()
        closeFilial()
        closeProduto()
        openRegiao()
    }
    function abrirFilial (){
        closeRelatorio()
        closeGrupo()
        closeFornecedor()
        closeTipoPg()
        closeCliente()
        closeProduto()
        closeVendedor()
        closeRegiao()
        openFilial()
    }
    function abrirVendedor (){
        closeCliente()
        closeGrupo()
        closeFornecedor()
        closeFilial()
        closeRegiao()
        closeTipoPg()
        closeProduto()
        openRelatorio()
        openVendedor()
    }
    function abrirCliente (){
        closeRelatorio()
        closeTipoPg()
        closeFilial()
        closeRegiao()
        closeVendedor()
        closeProduto()
        closeFornecedor()
        closeGrupo()
        openCliente()
    }
    function abrirTipoPg (){
        closeFilial()
        closeRegiao()
        closeVendedor()
        closeCliente()
        closeFornecedor()
        closeProduto()
        closeGrupo()
        openRelatorio()
        openTipoPg()
    }
    function abrirProduto(){
        closeFilial()
        closeCliente()
        closeRegiao()
        closeFornecedor()
        closeTipoPg()
        closeVendedor()
        closeGrupo()
        openRelatorio()
        openProduto()
    }
    function abrirGrupo (){
        closeCliente()
        closeFilial()
        closeProduto()
        closeFornecedor()
        closeRegiao()
        closeTipoPg()
        closeVendedor()
        openRelatorio()
        openGrupo()
    }
    function abrirFornecedor (){
        closeCliente()
        closeFilial()
        closeGrupo()
        closeProduto()
        closeRegiao()
        closeTipoPg()
        closeVendedor()
        openRelatorio()
        openFornecedor()
    }

    //--------------------------------------------------------------Separando Filtros-------------------------------------------------------------------------

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
    const [products, setProducts] = useState([]);
    
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

    
    const opcTodos = document.getElementById('todo')
    
    const valorTodos = (opcTodos)

    console.log(valorTodos)

    const objs = 
        {
        "incluirNfe": checkNFE,
        "incluirNfce": checkNFCE,
        "statusVenda": "%",
        "dataInicial": dataIni,
        "dataFinal": dataFin, 
        "idFilial": "1",
        "idTop": null
    }

    console.log(dados)
    console.log(dadosCliente)
    console.log(dadosRegiao)
    console.log(dadosVendedor)
    console.log(dadosTipoPagamento)
    

    async function setDataFilial () 
    {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorFilial", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => { 
                setDados(data);
            });

        }
      }

      async function setDataCliente () 
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorCliente", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => { 
                setDadosCliente(data);
            });

        }
      }

      async function setDataRegiao () 
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorRegiao", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => { 
                setDadosRegiao(data);
            });

        }
      }

      const [keys, setDaDosKeys] = useState([])
      const [dadosLeitura, setDadosLeitura] = useState([])

      async function setDataTipoPagamento () 
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorTipoPagamento", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => { 
                setDadosTipoPagamento(Object.values(data[0]));
                setDaDosKeys(Object.keys(data[0]));
                setDadosLeitura(data);
            });

        }
      }

      console.log(dadosLeitura)

      async function setDataVendedor () 
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorVendedor", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => { 
                setDadosVendedor(data);
            });

        }
      }

      async function setDataProduto ()
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorProduto", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if(res.status === 200){
            res.json().then(data => {
                setDadosProduto(data);
            })
        }
      }

      async function setDataGrupo ()
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorGrupo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if (res.status === 200){
            res.json().then(data => {
                setDadosGrupo(data);
            })
        }
      }

      async function setDataFornecedor()
      {
        const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2002/resFatPorFornecedor", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objs),
        });
        if (res.status === 200){
            res.json().then(data => {
                setDadosFornecedor(data);
            })
        }
      }

      console.log(dadosProduto)
      console.log(dadosFornecedor)

      const handleSetData = () => {
        setDataCliente();
        setDataFilial();
        setDataRegiao();
        setDataTipoPagamento();
        setDataVendedor();
        setDataProduto();
        setDataGrupo();
        setDataFornecedor();
      }

    console.log(dadosGrupo)

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("https://fakestoreapi.com/products?limit=5"); 
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    const [teste, setTeste] = useState([]);

    function onChangeDataIni(e){
        setDataIni(e.currentTarget.value)
    }

    function onChangeDataFin(e){
        setDataFin(e.currentTarget.value)
    }

    console.log(filter)

    

//------------------------------------------------------------------Dashboards (Dashboard Região)-------------------------------------------------------------------------------
    const[dashboardRegiao, setIsOpenDashboardRegiao] = useState(false);
 
    function openDashboardRegiao (){
        setIsOpenDashboardRegiao(true)
    }
    function closeDashboardRegiao (){
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
        title: "Tabela Valores Totais.",
        //backgroundColor: '#d3d3d3',
        width: 400,
        height: 200,
        bar: { groupWidth: "95%" ,  },
        legend: { position: "none" },
      };
      

    const dataRegiao = [
        ["Element", "Valor Total", { role: "style" }],
        ["Valor de Lucro", result2, "#F7C64F"], 
        ["Valor de Custo", result , "#bc1b2b"],     
        ["Valor Total", result1, "#39E055"], 
      ];

      const dataRegiao2 = [
        ["Element", "Valor Total", { role: "style" }],
        ["NF-e", result3, "#F7C64F"], 
        ["NFC-e", result4 , "#bc1b2b"],     
      ];

      const dataRe0 = [
        ["Valores em R$", "", ""],
        ["NF-e / NFC-e  ", result3, result4],
        ["Custo / Lucro", result, result2],
      ];
    
    const optionsRe0 = {
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
//-------------------------------------------------------------Dashboard Filial-------------------------------------------------------------------------

const[dashboardFilial, setIsOpenDashboardFilial] = useState(false);

console.log(query)
console.log(query1)
console.log(query2)

function openDashboardFilial (){
    setIsOpenDashboardFilial(true)
}
function closeDashboardFilial (){
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
    ["Valor Lucro", resultFi2, "#F7C64F", null],
    ["Valor Custo", resultFi, "#b87333", null],
    ["Valor Total ", resultFi1, "#39E055", null],
    ["Valor  Nf-e", resultFi3, "#8226ED", null],
    ["Valor NFC-e", resultFi4, "#2686ED", null],
    ["Valor Credito", resultFi5, "#ff6ad8", null],
    ["Valor Liquido", resultFi6, "#ffaf56" , null]
  ];
  
const barOptionsFi = {
    title: "Tabela Valores Totais.",
    width: 450,
    height: 200,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataFilial = [
    ["Element", "Valor Total", { role: "style" }],
    ["Lucro Venda", result2, "#F7C64F"], 
    ["Valor Custo", result , "#b87333"],     
  ];

  const dataFilial2 = [
    ["Element", "Valor Total", { role: "style" }],
    ["Valor Liquido", resultFi6, "#ffaf56"], 
    ["Valor Total", resultFi1 , "#39E055"],     
  ];

  const dataFi0 = [
    ["Valores em R$", "", ""],
    ["Custo / Lucro", resultFi, resultFi2],
    ["NF-e / NFC-e  ", resultFi3, resultFi4],
    ["Liquido / Total", resultFi6, resultFi1 ],
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
   
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  };

//------------------------------------------------------------------Dashboard Vendedor----------------------------------------------------------------------  
const[dashboardVendedor, setIsOpenDashboardVendedor] = useState(false);

function openDashboardVendedor (){
    setIsOpenDashboardVendedor(true)
}
function closeDashboardVendedor (){
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
const resultVen8 = dadosVendedor.reduce((a, b) => a + b.vlTotalDesconto, 0 )

const datVendedor = [
    ["Element", "Valor Total", { role: "style" }],
    ["Cancelamento", resultVen6, "#ffaf56"], 
    ["Comissão", resultVen7 , "#57ffe8"],
    ["Desconto", resultVen8 , "#727272" ],    
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
    title: "Tabela Valores Totais.",
    width: 400,
    height: 250,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataVendedor = [
    ["Element", "Valor Total", { role: "style" }],
    ["Nf-e", resultVen3, "#8226ED"],
    ["NFC-e", resultVen4, "#2686ED"], 
  ];

//---------------------------------------------------------------Dashboard Cliente--------------------------------------------------------------------------
const [dashboardCliente, setIsOpenDashboardCliente] = useState(false);

function openDashboardCliente (){
    setIsOpenDashboardCliente(true)
}
function closeDashboardCliente(){
    setIsOpenDashboardCliente(false)
}

const resultCli = dadosCliente.reduce((a, b) => a + b.vlVendaTotal, 0 )
const resultCli1 = dadosCliente.reduce((a, b) => a + b.vlLucroVenda, 0 )
const resultCli2 = dadosCliente.reduce((a, b) => a + b.vlTotalNfe, 0 )
const resultCli3 = dadosCliente.reduce((a, b) => a + b.vlTotalNfce, 0 )
const resultCli4 = dadosCliente.reduce((a, b) => a + b.vlCustoTotal, 0 )
const resultCli5 = dadosCliente.reduce((a, b) => a + b.vlTotalDesconto, 0 )
const resultCli6 = dadosCliente.reduce((a, b) => a + b.vlLucroLiquido, 0)
const resultCli7 = dadosCliente.reduce((a, b) => a + b.vlTotalCredito, 0)



const optionsCli = {
    title: "Valores",
    is3D: true,
    colors: ["#8226ED", "#2686ED"]
};

const dataCli0 = [
    ["Valores em R$", "", ""],
    ["NF-e / NFC-e  ", resultCli2, resultCli3],
    ["Custo / Lucro", resultCli4, resultCli1],
    ["Desconto / Venda", resultCli5, resultCli],
    ["Liquido/ Bruto", resultCli6, resultCli],
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
    title: "Tabela Valores Totais.",
    width: 400,
    height: 250,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataCliente = [
    ["Element", "Valor Total", { role: "style" }],
    ["Custo", resultCli4 , "#bc1b2b"], 
    ["Lucro", resultCli1, "#f6d001"], 
    ["Total", resultCli, "#b2bb1c"], 
  ];    

  const dataCliente0 = [
    ["Element", "Valor Total", { role: "style" }],
    ["NF-e", resultCli2, "#8226ED"],
    ["NFC-e", resultCli3, "#2686ED"],
  ];   

//------------------------------------------------------------------Dashboard Tipo de Pagamento-------------------------------------------------------------

const [dashboardTipoDePagamento, setIsOpenDashboardTipoDePagamento] = useState(false)

function openDashboardTipoDePagamento (){
    setIsOpenDashboardTipoDePagamento(true)
}
function closeDashboardTipoDePagamento(){
    setIsOpenDashboardTipoDePagamento(false)
}

const resultTpPg = dadosLeitura.reduce((a, b) => a + b.dinheiro, 0 )
const resultTpPg1 = dadosLeitura.reduce((a, b) => a + b.total, 0 )
const resultTpPg2 = dadosLeitura.reduce((a, b) => a + b.cartao_de_credito, 0)
const resultTpPg3 = dadosLeitura.reduce((a, b) => a + b.cartao_de_debito, 0 )
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
    ["Valores em R$", "",""],
    [" (Cima)Dinheiro / (Baixo)Total", resultTpPg , resultTpPg1],
    ["Credito , Debito", resultTpPg2, resultTpPg3],
];

const barOptionsTpPg = {
    title: "Pagamentos",
    width: 400,
    height: 200,
    bar: {groupWidth: "95%"},
    legend: {position: "none"},
};

const dataTpPg = [
    ["Element", "Valor", { role: "style"}],
    ["Credito Loja", resultTpPg6, "#ff6ad8"],
    ["Cancelamento", resultTpPg7 ,"#ffaf56"],
    ["Desconto", resultTpPg8 ,"#ffaf56"],
];

const dataTpPgVale = [
    ["Element", "Valor", { role: "style"}],
    ["Alimentação", resultTpPg9 ,"#D44A26"],
    ["Combustivel", resultTpPg10 ,"#D40B0B"],
    ["Presente", resultTpPg11 ,"#D44A26"],
    ["Refeição", resultTpPg12 ,"#D40B0B"],
];

const dataTipoPagamento = [
    ["Element", "Valor", { role: "style"}],
    ["Boleto", resultTpPg5, "#1f80ed"],
    ["Cheque", resultTpPg4 , "#d24159"],
    ["C.Credito", resultTpPg2 ,"#9bf967"],
    ["C.Debito", resultTpPg3 ,"#f98b68"],
    ["Dinheiro", resultTpPg, "#ffe670"],
    ["Total", resultTpPg1 , "#b2bb1c"],
];

const dataTipoPagamentoPizza = [
    ["Element", "Valor", { role: "style"}],
    ["Boleto", resultTpPg5, "#1f80ed"],
    ["Cheque", resultTpPg4 , "#d24159"],
    ["C.Credito", resultTpPg2 ,"#9bf967"],
    ["C.Debito", resultTpPg3 ,"#f98b68"],
    ["Dinheiro", resultTpPg, "#ffe670"],
];

//------------------------------------------------------------------Dashboard Produtos---------------------------------------------------------------------

const [dashboardProdutos, setIsOpenDashboardProdutos] = useState(false);
const [dashboardProdutosDetalhado, setIsOpenDashboardProdutosDetalhados] = useState(false);

function openDashboardProdutos(){
    setIsOpenDashboardProdutos(true)
}
function closeDashboardProdutos(){
    setIsOpenDashboardProdutos(false)
}

function openDashboardProdutosDetalhados(){
    setIsOpenDashboardProdutosDetalhados(true)
}
function closeDashboardProdutosDetalhados(){
    setIsOpenDashboardProdutosDetalhados(false)
}

const dadosProdutoReduzidos = dadosProduto.slice(0, 10);

const resultProd = dadosProduto.reduce((a, b) => a + b.vlr_venda_total , 0)
const resultProd1 = dadosProduto.reduce((a, b) => a + b.vlr_lucro_total, 0)
const resultProd2 = dadosProduto.reduce((a, b) => a + b.vlr_custo_total,  0)
const resultProd3 = dadosProduto.reduce((a, b) => a + b.sub_total, 0)
const resultProd4 = dadosProduto.reduce((a, b) => a + b.vlr_desconto_total, 0)

const dataProd = [
    ["Element", "Valor", { role: "style"}],
    ["Venda:", resultProd, "#f6d001"],
    ["Lucro", resultProd1 ,"#1b7abc"],
];

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
    title: "Tabela Valores Totais.",
    width: 300,
    height: 200,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

//------------------------------------------------------------------------Dashboard Grupo------------------------------------------------------------------

const [dashboardGrupo, setIsOpenDashboardGrupo] = useState(false);
const [dashboardGrupoDetalhado, setIsOpenDashboardGrupoDetalhado] = useState(false);

function openDashboardGrupoDetalhado(){
    setIsOpenDashboardGrupoDetalhado(true);
}
function closeDashboardGrupoDetalhado(){
    setIsOpenDashboardGrupoDetalhado(false);
}

function openDashboardGrupo(){
    setIsOpenDashboardGrupo(true);
}
function closeDashboardGrupo(){
    setIsOpenDashboardGrupo(false);
}

const dadosGrupoDetalhado = dadosGrupo.slice(0, 10)

const resultGru = dadosGrupo.reduce((a, b) => a + b.vlr_venda_total, 0);
const resultGru1 = dadosGrupo.reduce((a, b) => a + b.vlr_lucro_total, 0);
const resultGru2 = dadosGrupo.reduce((a, b) => a + b.sub_total, 0);
const resultGru3 = dadosGrupo.reduce((a, b) => a + b.vlr_desconto_total, 0);

const dataGru = [
    ["Element", "Valor", {role: "style"}],
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
    title: "Tabela Valores Totais.",
    width: 300,
    height: 200,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

//------------------------------------------------------------------Dashboard Fornecedor------------------------------------------------------------------

const [dashboardFornecedor, setIsOpenDashboardFornecedor] = useState(false)
const [dashboardFornecedorDetalhado, setIsOpenDashboardFornecedorDetalhado] = useState(false)

function openDashboardFornecedor(){
    setIsOpenDashboardFornecedor(true);
}
function closeDashboardFornecedor(){
    setIsOpenDashboardFornecedor(false);
}

function openDashboardFornecedorDetalhado(){
    setIsOpenDashboardFornecedorDetalhado(true)
}
function closeDashboardFornecedorDetalhado(){
    setIsOpenDashboardFornecedorDetalhado(false)
}

const dadosFornecedorDetalhado = dadosFornecedor.slice(0, 10);

const resultFor = dadosFornecedor.reduce((a, b) => a + b.vlr_venda_total, 0)
const resultFor1 = dadosFornecedor.reduce((a , b) => a + b.vlr_lucro_total, 0)
const resultFor2 = dadosFornecedor.reduce((a, b) => a + b.vlr_custo_total, 0)
const resultFor3 = dadosFornecedor.reduce((a, b) => a + b.vlr_desconto_total, 0)


const dataFor = [
    ["Element", "Valor", {role: "style"}],
    ["Venda", resultFor, "#bc1b2b"],
    ["Lucro", resultFor1, "#57ffe8"],
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
    title: "Tabela Valores Totais.",
    width: 300,
    height: 200,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };


//------------------------------------------------------------------Picos----------------------------------------------------------------------------------
const[modalPico, setIsOpenModalPico] = useState(false);

function openModalPico (){
    setIsOpenModalPico(true);
}

function closeModalPico (){
    setIsOpenModalPico(false);
}

function closeFilterFilial (){
    setIsOpenFilterFilial(false);
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
//------------------------------------------------------------------Visual----------------------------------------------------------------------------------
        return (
            <C.Container>
                <div className="wrapper">
                
                <div className='test1'>

                <span className='frontSpan' >Atenção: Ao selecionar NF-e, é importante destacar as T.OP.´s que serão tomadas em consideração na consulta, consultando sem nenhuma T.OP.(consulta geral), poderá vir ENTRADAS </span>

                <div className='btns'>
                    <button className='topFilialBtn' onClick={abrirFiltroFilial} >Filial</button>
                    <button className='topsBtn' onClick={abrirFiltroTops} >Tops</button>
                </div>
            
                <Modal isOpen={filterFilial} onRequestClose={closeFilterFilial} contentLabel="Filtro-Filial" overlayClassName="filtroFilialOverlay" className="filtro-filial-content">
                    <form className='filtro1'>
                        <div className='filter01' >
                        <select className='custom-select' >
                            <option>Filial</option>
                            <option>Região</option>
                        </select>
                                       
                            <label htmlFor="search-form" className='botãoEmodal' >
                                <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Buscar..." onChange={(e) => setQuery(e.target.value)}/><img className='lupa' src="/images/LUPA.png" onClick={openModal}/>                    
                            </label>
                        
                            <div className='icon2'>
                                <button className="clear"> Limpar </button>
                                
                            </div>
                                                
                        <Modal isOpen={modalIsOpen} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} onRequestClose={closeModal} contentLabel="testando" overlayClassName="modal-overlay" className="modal-content"  >   
                            
                            <div className='parla' >

                                <div className='checkboxes' >
                                    <input type="checkbox" className='cb'/> <p className='cbText' >Código</p>
                                    <input type="checkbox" className='cb' /> <p className='cbText'>R. Social</p>
                                </div>

                                <div className='checkboxes1' >
                                    <input type="checkbox" className='cb' /> <p className='cbText'>N. Fantasia</p>
                                    <input type="checkbox" className='cb' /> <p className='cbText'>N. Documento</p>
                                </div>
                             
                            </div>

                            <input type="search" name="search-form" id="search-form" className="search-input-modal" placeholder="Buscar por Filial" onChange={(e) => setQuery1(e.target.value)}/>
                            <button className='modalBtn' onClick={closeModal}>Fechar</button>
                            
                            <ul className="card-grid">
                                    {(products).map((item) => (
                                <li>
                                        <article className="card" key={item.id}>
                                            <div className="card-content">
                                                <h2 className="card-name">{item.title}</h2>
                                                <ol className="card-list">

                                                    <li>Teste:{" "}<span>{item.price}</span></li>
                                            </ol>
                                            </div>
                                        </article>
                                </li>
                             ))}
                            </ul>

                            
                        </Modal>
                    
                        <div>
                                <thead>
                                    <tr className='obs'>
                                        <th >Código</th>

                                        <th >Fantasia</th>

                                        <th className='ep3' >Razão Social</th>

                                        <th >Documento</th>

                                        <th >Município</th>
                                    </tr>
                                </thead>
                            </div>
                    </div>
                    </form>
                </Modal>

                <Modal
                    isOpen={filterTops}
                    onRequestClose={closeFilterTops}
                    contentLabel="Filtro-Tops"
                    overlayClassName="FitlroTopsOverlay"
                    className="filtro-tops-content">

                    <form className='filtro1' >
                        <div className='filter01' >                                        
                            <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Buscar..."
                                onChange={(e) => setQuery2(e.target.value)}
                            /><img src="/images/LUPA.png"/>
                        
                            </label>

                            <div className='icon2'>
                               
                            </div>

                            <div>
                                <thead>
                                    <tr>
                                        <th>
                                            teste1
                                        </th>

                                        <th>
                                            teste2
                                        </th>
                                    </tr>
                                </thead>
                            </div>
                                                
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="testando"
                            overlayClassName="modal-overlay"
                            className="modal-content2"

                        >   

                            <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Buscar por Filial" onChange={(e) => setQuery3(e.target.value)}/>

                            <ul className="card-grid">
                               {dados.filter(dat => dat.filial.toLowerCase().includes(query3)).map((dat) => (
                                 <li key={dat.idFilial} >
                                    {dat.filial}
                                 </li>
                               ))}         
                            </ul>

                
                            <button onClick={closeModal}>Fechar</button>

                        </Modal>
                    
                    </div>
                    </form>
                                       
                </Modal>

                    <Modal isOpen={relatorioIsOpen} onRequestClose={closeRelatorio} contentLabel="Relatorio" overlayClassName="relatorioOverlay" className="relatorio-content"> 
                    <button className='relatorioBtn' onClick={() => window.print()} >Relatório</button>  </Modal>

                <div>   

                    <div className='test' >
                        
                        <div className="dataIni" >
                            <p className='dataLabel' >Data Inicial</p>
                            <input type="date" onChange={onChangeDataIni}/>
                        </div>

                        <div className="dataFin" >
                            <p>Data Final</p>
                            <input type="date" onChange={onChangeDataFin}/>
                        </div>

                        <div className="select">
                            <span className="sr-only">Status NFC-e</span>
                            <select
                                onChange={(e) => setFilter(e.target.value)}
                                className="custom-select01"
                                aria-label="Filter By Category"
                        >
                                <option id='todo' value="%">TODOS</option>
                                <option value="">VENDA</option>
                                <option value="">ORÇAMENTO</option>
                            </select>
                        </div>

                        <div>
                            <button className="pesquisar" onClick={handleSetData} >Pesquisar</button>
                        </div>

                        <div className="checkboxs" >
                             <input className='check' type="checkbox" value="false" id='TOP' checked={checkTOP} onChange={handleChecked02} /><label>Incluir T.OP. Salvas</label>

                            <input className='check' type="checkbox" value="false" id='NFE' checked={checkNFE} onChange={handleChecked} /><label>NF-e</label>

                             <input className='check' type="checkbox" value="false" id='NFCE' checked={checkNFCE} onChange={handleChecked01} /><label>NFC-e</label>

                        </div>
                    
                    </div>
                </div>

                <div className="search-wrapper">
              
                    <div className="filtros" >                               
                        <button className='regiaoBtn' onClick={abrirRegiao} >Região</button>          
                        <Modal isOpen={regiaoIsOpen} onRequestClose={closeRegiao} contentLabel="testando1" shouldCloseOnOverlayClick={false} overlayClassName="modal-overlay" className="ModalDados" >

                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label className='esc' >( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardRegiao} ><img className='grafico' src="/images/grafico.png"/> <p>Graficos </p></button>  
                                </div>  
                    
                        <div className='table-resp' >
                            <table className='table'>
                                    <tr>
                                        <th >Id.Região</th>

                                        <th >Região</th> 

                                        <th >Id. Filial</th>    

                                        <th >Qtd. Vendas</th>

                                        <th >Vlr.Médio Venda</th>

                                        <th >Vlr. Total NF-e</th>

                                        <th >Vlr. Total NFC-e</th>

                                        <th >Vlr. Venda Total</th>

                                        <th >Vlr. Custo Total</th>

                                        <th >Vlr. Lucro Venda</th>

                                        <th  >Margem</th>

                                        <th  >Markup</th> 
                                    </tr>                                    
                                {dadosRegiao.map((f1) =>{
                                    return (
                                        <tr key={f1.idFilial} >
                                            
                                            <td>{f1.idRegiao}</td>
                                                
                                            <td className='filter-name' >{f1.regiao}</td>
                                            
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
                                    )
                                }       )}
                            
                           
                            <Modal isOpen={dashboardRegiao} onRequestClose={closeDashboardRegiao} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                                <div >

                                    <h1>Dados Região</h1>

                                    <div className='dashboardTexts' >

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoAmarelo.png' />  Valor de Lucro: R$ {result2}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoVermelho.png' /> Valor de Custo: R$ {result}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoVerde.jpg' /> Valor Total: R$ {result1}
                                        </h2>
                                        
                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoRoxo.png' /> NF-e: R$ {result3}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoAzul.png' /> NFC-e: R$ {result4}
                                        </h2>

                                    </div>
                                
                                <div className='dashboard' >
                                    <Chart chartType="ColumnChart" width="300px" height="220px" data={dataRegiao} options={options} className="grafico1" />
                                    <Chart chartType="Bar" width="300px" height="220px" data={dataRe0} options={optionsRe0} className="grafico1" />
                                    <Chart chartType="PieChart" data={dataRegiao2} options={options2} width="300px" height="220px" className="grafico1" />
                                </div>

                                <div className='dashboardOk' >
                                    <label className='bestRegion' >{dadosRegiao.map((banRe) => {                                      
                                            
                                            if(banRe.regiao === 'PERNAMBUCO'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/PE.png' />  
                                                      <p>Pernambuco</p> <img className='regiaoImg' src='images/nordeste.png' /> <span className='spanName' >Nordeste</span>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'PARAIBA'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/PB.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'ACRE'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/AC.png' />  
                                                      <p>Região Norte</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'AMAZONAS'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/AM.png' />  
                                                      <p>Região Norte</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'ALAGOAS'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/AL.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'PIAUÍ'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/PI.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'AMAPÁ'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/AP.png' />  
                                                      <p>Região Norte</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'SÃO PAULO'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/SP.png' />  
                                                      <p>Região Suldeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'RIO DE JANEIRO'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/RJ.png' />  
                                                      <p>Região Suldeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'MINAS GERAIS'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/MG.png' />  
                                                      <p>Região Suldeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'ESPÍRITO SANTO'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/ES.png' />  
                                                      <p>Região Suldeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'BAHIA'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/BA.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'CEARA'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/CE.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'MATO GROSSO'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/MT.png' />  
                                                      <p>Região Centro Oeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'TOCANTINS'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/TO.png' />  
                                                      <p>Região Norte</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === 'PARANÁ'){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/PB.png' />  
                                                      <p>Região Sul</p>
                                                    </div>                                                 
                                                )                                           
                                            }else if(banRe.regiao === ''){
                                                return(
                                                    <div className='tlou'>
                                                      <img className='bandeira' src='images/bandeiras/PB.png' />  
                                                      <p>Região Nordeste</p>
                                                    </div>                                                 
                                                )                                           
                                            }
                                        
                                    } )}</label>
                                    <Chart chartType="BarChart" data={barData} options={barOptions} className="grafico3" />
                                </div>
                                    
                                </div>
                                
                                
                            </Modal>

                            </table> 
                        </div>

                        </Modal>

                        <button className='filialBtn' onClick={abrirFilial} >Filial</button>     
                        <Modal isOpen={filialIsOpen} onRequestClose={closeFilial} contentLabel="Filial" shouldCloseOnOverlayClick={false} overlayClassName="filial-overlay" className="ModalDados">
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardFilial} > <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p> </button>
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
                                        return(
                                            <tr>
                                                <td> {f2.idFilial} </td>

                                                <td className='filter-name' >{f2.filial}</td>

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
                                        )
                                    })} 
                                    </table>
                                </div>
                           
                            <Modal isOpen={dashboardFilial} onRequestClose={closeDashboardFilial} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                                
                                <div>

                                    <h1>Dados Filial</h1>

                                    <div className='dashboardTexts' >
                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoAmarelo.png' />  Valor de Lucro: R$ {resultFi2}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoVermelho.png' /> Valor de Custo: R$ {resultFi}
                                        </h2>

                                        <h2 className='prices'>
                                            <img className='cifrões' src='images/cifrãoVerde.jpg' /> Valor Total: R$ {resultFi1}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoRoxo.png' /> NF-e: R$ {resultFi3}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoAzul.png' /> NFC-e: R$ {resultFi4}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoRosa.png' /> Valor Credito: R$ {resultFi5}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoLaranja.png' /> Valor Liquido: R$ {resultFi6}
                                        </h2>
                                    </div>

                                    <div className='dashboard' >
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataFilial} className="grafico1" />
                                        <Chart chartType="BarChart" data={barDataFi} options={barOptionsFi} className="grafico1" />
                                        <Chart chartType="PieChart" data={dataFilial2} options={optionsFi} width="300px" height="200px" className="grafico1" />
                                    </div>
                                    <Chart chartType="Bar" width="350px" height="250px" data={dataFi0} options={optionsFi0} backgroundColor="#d3d3d3" className="grafico3" />
                                </div>
                                
                                
                            </Modal>

                        </Modal>
                    
                        <button className='vendedorBtn' onClick={abrirVendedor} > Vendedor </button>
                        <Modal isOpen={vendedorIsOpen} onRequestClose={closeVendedor} contentLabel="Vendedor" shouldCloseOnOverlayClick={false} overlayClassName="vendedor-overlay" className="ModalDados"> 
                        <input type="search" name="search-vend" id="search-vend" className="search" placeholder="Buscar por Vendedor" onChange={(e) => setQuery4(e.target.value)}/>
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardVendedor}> <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p> </button>
                                </div>

                                <table className='table-resp' >
                                    <tr className='table' >
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

                                        <td className='filter-name' >{dat.vendedor}</td>

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

                                        <td className='filter-all' >% {(dat.plucroLiquido).toFixed(2)}</td>

                                        <td >{(dat.percentual).toFixed(2)}</td>
                                    </tr>

                        ))}   
                            </table>
                         
                            <Modal isOpen={dashboardVendedor} onRequestClose={closeDashboardVendedor} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                               
                                <div>
                                    <h1>Dados Vendedor</h1>

                                    <div className='dashboardTexts' >
                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoAmarelo.png' /> Lucro: R$ {(resultVen2).toFixed(3)}
                                        </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoVermelho.png' /> Custo: R$ {(resultVen).toFixed(2)}
                                    </h2>

                                    <h2 className='prices'>
                                        <img className='cifrões' src='images/cifrãoVerde.jpg' /> Total: R$ {resultVen1}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoRoxo.png' /> NF-e: R$ {resultVen3}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzul.png' /> NFC-e: R$ {resultVen4}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoRosa.png' /> Credito: R$ {resultVen5}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoLaranja.png' /> Cancelamento: R$ {resultVen6}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzulClaro.png' /> Comissão: R$ {resultVen7} 
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoCinza.png' /> Desconto: R$ {resultVen8}
                                    </h2>
                                </div>

                                    <div className='dashboard' >
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={datVendedor} className="grafico1" />
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={datVendedor0} className="grafico1" />
                                        <Chart chartType="PieChart" data={dataVendedor} options={optionsVen} width="300px" height="200px" className="grafico1" />
                                    </div>
                                </div>
                                <Chart chartType="BarChart" data={barDataVen} options={barOptionsVen} className="grafico3" />
                            </Modal>

                        </Modal>
                    
                        <button className='clienteBtn' onClick={abrirCliente} > Cliente </button>
                        <Modal isOpen={clienteIsOpen} onRequestClose={closeCliente} contentLabel="Cliente" shouldCloseOnOverlayClick={false} overlayClassName="Cliente-overlay" className="ModalDados"> 
                        <input type="search" name="search-cli" id="search-cli" className="search" placeholder="Buscar por Cliente" onChange={(e) => setQuery5(e.target.value)} />
                        <div className='dashboard-label' >
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardCliente} > <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p> </button>
                                </div>
                        
                            </div>
                            
                            <table className='table-resp'>
                                <tr className='labels'>
                                    <th > Id. Filial </th>

                                    <th > Id. Cliente </th>

                                    <th > Cliente </th>

                                    <th > Qtd. Vendas </th>

                                    <th > Vlr. Total NF-e </th>

                                    <th > Vlr. Total NFC-e </th>

                                    <th > Vlr. Venda Total </th>

                                    <th > Vlr. Total Desconto </th>

                                    <th > Vlr. Total Credito </th>

                                    <th > Vlr. Custo Total </th>

                                    <th > Vlr. Lucro Venda </th>

                                    <th > Vlr. Lucro Líquido </th>

                                    <th > Per. Lucro Líquido </th>

                                    <th > Percentual </th>
                                </tr>

                        {dadosCliente.filter(dat => dat.cliente.toLowerCase().includes(query5)).map((dat1) => (
                                <tr className='labels'>

                                            <td >{dat1.idFilial}</td>

                                            <td >{dat1.idCliente}</td>

                                            <td className='filter-name' >{dat1.cliente}</td>

                                            <td >{dat1.qtdVendas}</td>

                                            <td >{dat1.vlTotalNfe}</td>

                                            <td >{dat1.vlTotalNfce}</td>

                                            <td >{dat1.vlVendaTotal}</td>

                                            <td >{dat1.vlTotalDesconto}</td>

                                            <td >{dat1.vlTotalCredito}</td>

                                            <td >{dat1.vlCustoTotal}</td>

                                            <td >{dat1.vlLucroVenda}</td>

                                            <td >{dat1.vlLucroLiquido}</td>

                                            <td >{dat1.plucroLiquido} %</td>

                                            <td >{(dat1.percentual).toFixed(3)}</td>

                                </tr>
                        ))}
                           </table>

                            <Modal isOpen={dashboardCliente} onRequestClose={closeDashboardCliente} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >

                            <div>
                                 <h1>Dados Cliente</h1>

                                 <div className='dashboardTexts' >
                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAmarelo.png' /> Lucro Venda: R$ {resultCli1.toFixed(2)}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoVermelho.png' /> Custo: R$ {resultCli4}
                                    </h2>

                                    <h2 className='prices'>
                                        <img className='cifrões' src='images/cifrãoVerde.jpg' /> Venda Total: R$ {resultCli.toFixed(2)}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoRoxo.png' /> NF-e: R$ {resultCli2.toFixed(2)}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzul.png' /> NFC-e: R$ {resultCli3}
                                    </h2>

                                    <h2 className='prices' > 
                                        <img className='cifrões' src='images/cifrãoRosa.png' /> Credito: {resultCli7}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoLaranja.png' /> Lucro Liqudido: R$ {resultCli6.toFixed(2)}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzulClaro.png' /> Desconto {resultCli5}
                                    </h2>

                                </div>

                                <div className='dashboard' >
                                    <Chart chartType="ColumnChart" width="300px" height="250px" data={dataCliente} className="grafico1" />
                                    <Chart chartType="BarChart" data={barDataCli} options={barOptionsCli} className="grafico1" />
                                    <Chart chartType="PieChart" data={dataCliente0} options={optionsCli} width={"300px"} height={"200px"} className="grafico1" />
                                </div>          
                                                      
                            </div>
                                <Chart chartType="Bar" width="400px" height="250px" data={dataCli0} options={optionsCli0} className="grafico3" />
                            </Modal>

                        </Modal>
                    
                        <button className='tipoDePagamentoBtn' onClick={abrirTipoPg} > Tipo de Pagamento </button>
                        <Modal isOpen={tipoPgIsOpen} onRequestClose={closeTipoPg} contentLabel="Tipo de Pagamento" shouldCloseOnOverlayClick={false} overlayClassName="TipoPg-overlay" className="ModalDados"> 
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardTipoDePagamento} > <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p></button>
                                </div>
                        
                        <table>
                        <tr className='labels' >
                            {keys.map((nomes) => {
                                return(
                                    <th className='filter-all'>{(nomes).replace( '_' , ' ').toUpperCase()}</th>  
                                )
                            } )}
                        </tr>
        
                                <tr className='labels' >
                                    {dadosTipoPagamento.map((f5) => {
                                        return(
                                                <td className='filter-all' > {f5} </td> 
                                        )
                                    } )}                             
                                </tr>
                    </table>
                            <Modal isOpen={dashboardTipoDePagamento} onRequestClose={closeDashboardTipoDePagamento} contentLabel="dashboard" shouldCloseOnOverlayClick={false} overlayClassName="dashboard-overlay" style={customStyles} >
                                
                                <div>

                                    <h1>Dados Tipo Pagamento</h1>

                                    <div className='dashboardTexts' >

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/dinheiro.png' /> Dinheiro : R$ {resultTpPg}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/credito.png' /> Cartão Credito: R$ {resultTpPg2}
                                        </h2>

                                        <h2 className='prices'>
                                            <img className='cifrões' src='images/debito.png' /> Cartão Debito: R$ {resultTpPg3}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cheque.png' /> Cheque : R$ {resultTpPg4}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/boleto.png' /> Boleto Bancario: R$ {resultTpPg5}
                                        </h2>

                                        <h2 className='prices' > 
                                            <img className='cifrões' src='images/cifrãoRosa.png' /> Credito Loja: R$ {resultTpPg6}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoLaranja.png' /> Cancelamento Total: R$ {resultTpPg7}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoVermelho.png' /> Desconto Total: R$ {resultTpPg8}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/cifrãoVerde.jpg' /> Total: R$ {resultTpPg1}
                                        </h2>

                                </div>
                                        
                                    <h1>Vales(Caso possua)</h1>

                                    <div className='dashboardTexts'>
                                        
                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/valeAlimentação.png' /> Alimentação: R$ {resultTpPg9}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/valeCombustivel.png' /> Combustivel: R$ {resultTpPg10}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/valePresente.png' /> Presente: R$ {resultTpPg11}
                                        </h2>

                                        <h2 className='prices' >
                                            <img className='cifrões' src='images/valeRefeição.png' /> Refeição: R$ {resultTpPg12}
                                        </h2>
                                    </div>

                                    <div className='dashboard' >
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataTpPg} className="grafico1" />
                                        <Chart chartType="BarChart" data={dataTipoPagamento} options={barOptionsTpPg} className="grafico1" />
                                        <Chart chartType="PieChart" data={dataTipoPagamentoPizza} options={optionsTpPg} width="300px" height="200px" className="grafico1" />
                                    </div>          
                                        
                                </div> 
                                <div className='dashboard' >
                                    <Chart chartType="Bar" width="500px" height="250px" data={dataTpPg0} options={optionsCli0} className="grafico3" /> 
                                    <Chart chartType="ColumnChart" width="350px" height="250px" data={dataTpPgVale} className="grafico2" />
                                </div>
                                                                                           
                            </Modal>            

                                                                
                        </Modal>

                        <button className='produtoBtn' onClick={abrirProduto} > Produto </button>
                        <Modal isOpen={produtoIsOpen} onRequestClose={closeProduto} contentLabel="Produto" shouldCloseOnOverlayClick={false} overlayClassName="Produto-overlay" className="ModalDados"> 
                        <input type="search" name="search-pro" id="search-pro" className="search" placeholder="Buscar por Produto" onChange={(e) => setQuery6(e.target.value)}/>
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardProdutos}> <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p></button>
                                </div>

                        <Modal isOpen={modalPico} onRequestClose={closeModalPico} contentLabel="Picos"  > <Chart chartType="AreaChart" width="100%" height="400px" data={dataPico} options={optionsPico}/> </Modal>            
                        <div className='table-resp'>
                        <table className='table' >
                            <tr >
                                <th >Ranking</th>

                                <th >Id.Produto</th>

                                <th >Produto</th>

                                <th>Qtd. Total</th>

                                <th >Sub Total</th>

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

                            return(
                                
                                <tr >                                              
                                    <td> {dat2.ranking} </td>

                                    <td > {dat2.id_produto} </td>

                                    <td onDoubleClick={openModalPico} > {dat2.produto} </td>

                                    <td className='filter-all' > {dat2.qtd_total} </td>

                                    <td> {dat2.sub_total} </td>

                                    <td> {(dat2.p_desconto).toFixed(3)} </td>

                                    <td> {dat2.vlr_desconto_total} </td>

                                    <td> {dat2.vlr_venda_total} </td>

                                    <td> {dat2.vlr_custo_total} </td>

                                    <td> {dat2.vlr_lucro_total} </td>

                                    <td> {dat2.p_markup} </td>

                                    <td> {dat2.p_margem} </td>

                                    <td> {(dat2.percentual).toFixed(2) } </td>                  
                                </tr>  
                            )                
                        })} 

                        </table>
                            <Modal isOpen={dashboardProdutos} onRequestClose={closeDashboardProdutos} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles} > 
                                
                                <div>
                                    
                                    <h1>Dados Produtos <button className='btnDetalhes' onClick={openDashboardProdutosDetalhados} ><img className='grafico' src='images/itens.png'/> Por itens </button> </h1>

                                        <div className='dashboardTexts' >

                                            <h2 className='prices' >
                                                <img className='cifrões' src='images/cifrãoAmarelo.png'/> Valor venda: {resultProd.toFixed(3)}
                                            </h2>

                                            <h2 className='prices' >
                                                <img className='cifrões' src='images/cifrãoAzul.png'/> Lucro: {resultProd1.toFixed(3)}
                                            </h2>

                                            <h2 className='prices' >
                                                <img className='cifrões' src='images/cifrãoRosa.png' /> Sub Total:0
                                            </h2>
                                            
                                            <h2 className='prices' >
                                                <img className='cifrões' src='images/cifrãoCinza.png' /> Custo:
                                            </h2>

                                        </div>

                                    <div className='dashboard' >
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dataProd} className="grafico1" />
                                        <Chart chartType="PieChart" data={dataProd} options={optionsProd} width="300px" height="200px" className="grafico1" />
                                        <Chart chartType="BarChart" data={barDataPro} options={barOptionsPro} className="grafico1" />
                                    </div>  

                                </div>

                                <Modal isOpen={dashboardProdutosDetalhado} onRequestClose={closeDashboardProdutosDetalhados} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                                    {dadosProdutoReduzidos.map((prod) => {

                                        const dashboard = [
                                            ["Element", "Valor", { role: "style"}],
                                            ["Venda:", prod.vlr_venda_total , "#f6d001"],
                                            ["Lucro", prod.vlr_lucro_total ,"#1b7abc"],
                                        ];

                                        return(
                                            <div  className='a'>
                                                <h2>{prod.produto}</h2>
                                                <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard} className="graficoA" />
                                            </div>
                                        )

                                    })}
                                </Modal>

                            </Modal>

                        </div>      
                         </Modal>

                        <button className='grupoBtn' onClick={abrirGrupo} > Grupo </button>
                        <Modal isOpen={grupoIsOpen} onRequestClose={closeGrupo} shouldCloseOnOverlayClick={true} overlayClassName="Grupo-overlay" contentLabel="Grupo" className="ModalDados">                                                     
                        <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Grupo" onChange={(e) => setQuery7(e.target.value)} />
                        
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardGrupo}> <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p></button>
                                </div>

                    <table>
                        <tr className='labels' >
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

                            return(
                            
                            <tr className='labels' >

                                <td >{dat3.ranking}</td>

                                <td >{dat3.id_grupo}</td>

                                <td > {dat3.grupo} </td>

                                <td > {dat3.qtd_total} </td>

                                <td > {dat3.sub_total} </td>

                                <td > {dat3.p_desconto} </td>

                                <td > {dat3.vlr_desconto_total} </td>

                                <td > {dat3.vlr_venda_total} </td>

                                <td > {dat3.vlr_custo_total} </td>

                                <td > {dat3.vlr_lucro_total} </td>

                                <td > {dat3.p_markup} </td>

                                <td > {dat3.p_margem} </td>

                               <td > {(dat3.percentual).toFixed(3)} </td>
                            </tr>
  
                            )
                            
                            
                        })}
                    </table>

                        <Modal isOpen={dashboardGrupo} onRequestClose={closeDashboardGrupo} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" style={customStyles} >
                            
                            <div>

                                <h1>Dados Grupo  <button className='btnDetalhes' onClick={openDashboardGrupoDetalhado} > <img className='grafico' src='images/itens.png'/> Cada Grupo  </button> </h1>

                                <div className='dashboardTexts' >

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoVermelho.png'/> Valor Venda: {resultGru}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoLaranja.png'/> Valor Lucro: {resultGru1}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAmarelo.png' /> Sub Total: {resultGru2.toFixed(2)}
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzul.png' /> Desconto Total: {resultGru3}
                                    </h2>

                                </div>

                                <div className='dashboard01' >
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dataGru} className="grafico1" />
                                    <Chart chartType="BarChart" data={barDataGru} options={barOptionsGru} className="grafico0" />
                                </div>  

                            </div>

                            <Modal isOpen={dashboardGrupoDetalhado} onRequestClose={closeDashboardGrupoDetalhado} shouldCloseOnOverlayClick={false} contentLabel="dashboard" overlayClassName="dashboard-overlay" className='dashboardDetalhado' >
                                {dadosGrupoDetalhado.map((detalhado) => {

                                    const grupoDetalhado = [
                                        ["Element", "Valor", {role: "style"}],
                                        ["Venda:", detalhado.vlr_venda_total, "#bc1b2b"],
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

                                    return(
                                        <div className='a' >
                                            <h2>{detalhado.grupo}</h2>
                                            <div className='b'>
                                                <Chart chartType="ColumnChart" width="300px" height="200px" data={grupoDetalhado} className="graficoA" />
                                                <Chart chartType="BarChart" data={grupoDetalhadoBar} options={barGruOptions} className="graficoB" /> 
                                            </div>
                                        </div>
                                    )
                                })}
                            </Modal>

                        </Modal>    

                        </Modal>

                        <button className='fornecedorBtn' onClick={abrirFornecedor} >Fornecedor</button>
                        <Modal  isOpen={fornecdorIsOpen} onRequestClose={closeFornecedor} contentLabel="Fornecedor" shouldCloseOnOverlayClick={true} overlayClassName="Fornecedor-overlay" className="ModalDados"> 
                        <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Fornecedor" onChange={(e) => setQuery8(e.target.value)}/>
                        
                            <div className='dashboardLine' >     
                                <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                <button className='dashboardBtn' onClick={openDashboardFornecedor}> <img className='grafico' src="/images/grafico.png"/> <p>Graficos</p></button>
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
                                        <td className='filter-all' > {dat.ranking} </td>

                                        <td className='filter-all' > {dat.id_fornecedor} </td>
                                            
                                        <td className='filter-name' > {dat.fornecedor} </td>

                                        <td className='filter-all' > {dat.qtd_total} </td>

                                        <td className='filter-all' > {dat.sub_total} </td>

                                        <td className='filter-all' > {(dat.p_desconto).toFixed(3)} </td>

                                        <td className='filter-all' > {dat.vlr_desconto_total} </td>

                                        <td className='filter-all' > {dat.vlr_venda_total} </td>

                                        <td className='filter-all' > {dat.vlr_custo_total} </td>

                                        <td className='filter-all' > {dat.vlr_lucro_total} </td>

                                        <td className='filter-all' > {dat.p_markup} </td>
 
                                        <td className='filter-all' > {dat.p_margem} </td>

                                        <td className='filter-all' > {(dat.percentual).toFixed(2)} </td>
                                </tr>
                        ))}   
                    </table>
                        <Modal isOpen={dashboardFornecedor} onRequestClose={closeDashboardFornecedor} shouldCloseOnOverlayClick={false} style={customStyles} >
                            <div>

                                <h1>Dados Fornecedor <button onClick={openDashboardFornecedorDetalhado} className='btnDetalhes'> <img className='grafico' src='images/itens.png'/> Cada Item</button> </h1>

                                <div className='dashboardTexts' >
                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoVermelho.png'/> Valor Venda: 
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzulClaro.png'/> Valor Lucro: 
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoRoxo.png' /> Valor Custo:
                                    </h2>

                                    <h2 className='prices' >
                                        <img className='cifrões' src='images/cifrãoAzul.png' /> Valor Desconto:
                                    </h2>

                                </div>

                                <div className='dashboard01' >
                                    <Chart chartType="ColumnChart" width="300px" height="200px" data={dataFor} className="grafico1" />
                                    <Chart chartType="BarChart" data={barDataFor} options={barOptionsFor} className="grafico0" />
                                </div>  

                            </div>
                        </Modal>
                        
                        <Modal isOpen={dashboardFornecedorDetalhado} onRequestClose={closeDashboardFornecedorDetalhado} shouldCloseOnOverlayClick={false} className='dashboardDetalhado' >
                            {dadosFornecedorDetalhado.map((forn) => {

                                const dashboard = [
                                    ["Element", "Valor", {role: "style"}],
                                    ["Venda", forn.vlr_venda_total, "#bc1b2b"],
                                    ["Lucro", forn.vlr_lucro_total, "#57ffe8"],
                                ]

                                return(
                                    <div className='a' >
                                        <h2>{forn.fornecedor}</h2>
                                        <Chart chartType="ColumnChart" width="300px" height="200px" data={dashboard} className="graficoA" />
                                    </div>
                                )

                            })}
                        </Modal>
                        
                        </Modal>
                    </div>
                </div>
                </div>
            </div>
            </C.Container>
            
        );
}

export default ResumoFaturamento;