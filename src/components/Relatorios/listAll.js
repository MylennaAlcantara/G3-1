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
        },
      };

      const styleDashboard = {
        content: {
          backgroundColor: '#d3d3d3',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          height: '80%',
        },
      };

      const modalDados = {
        content: {
          margin: '0px',
          padding: '0px',
          top: '69.4%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          height: '37%',
          border: 'solid',
          borderWidth: '1px',
          borderRadius: '0px',
          backgroundColor: '#F0F0F0',
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
        title: "Valores",
        is3D: true,
        backgroundColor: "#d3d3d3",
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
        ["Valor Custo", result, "#b87333", null],
        ["Valor Total ", result1, "#39E055", null],
        ["Valor  Nf-e", result3, "#8226ED", null],
        ["Valor NFC-e", result4, "#2686ED", null],
      ];
      
    const barOptions = {
        title: "Tabela Valores Totais.",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };
      

    const dataRegiao = [
        ["Element", "Valor Total", { role: "style" }],
        ["Lucro Venda", result2, "#F7C64F"], 
        ["Valor Custo", result , "#b87333"],     
        ["Venda Total", result1, "#39E055"], 
        ["Valor Nf-e", result3 , "#8226ED"],     
        ["Venda NFC-e", result4, "#2686ED"], 
      ];
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

const optionsFi = {
    title: "Valores",
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
  ];
  
const barOptionsFi = {
    title: "Tabela Valores Totais.",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataFilial = [
    ["Element", "Valor Total", { role: "style" }],
    ["Lucro Venda", result2, "#F7C64F"], 
    ["Valor Custo", result , "#b87333"],     
    ["Venda Total", result1, "#39E055"], 
    ["Valor Nf-e", result3 , "#8226ED"],     
    ["Venda NFC-e", result4, "#2686ED"], 
  ];

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

const optionsVen = {
    title: "Valores",
    is3D: true,
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
    ["Valor Lucro", resultVen2, "#F7C64F", null],
    ["Valor Custo", resultVen, "#b87333", null],
    ["Valor Total ", resultVen1, "#39E055", null],
    ["Valor  Nf-e", resultVen3, "#8226ED", null],
    ["Valor NFC-e", resultVen4, "#2686ED", null],
  ];
  
const barOptionsVen = {
    title: "Tabela Valores Totais.",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataVendedor = [
    ["Element", "Valor Total", { role: "style" }],
    ["Lucro Venda", resultVen2, "#F7C64F"], 
    ["Valor Custo", resultVen , "#b87333"],     
    ["Venda Total", resultVen1, "#39E055"], 
    ["Valor Nf-e", resultVen3 , "#8226ED"],     
    ["Venda NFC-e", resultVen4, "#2686ED"], 
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


const optionsCli = {
    title: "Valores",
    is3D: true,
};

const dataCli0 = [
    ["Valores em R$", "V1", "V2"],
    ["NF-e / NFC-e  ", resultCli2, resultCli3],
    ["Custo / Lucro", resultCli4, resultCli1],
    ["Desconto / Venda", resultCli5, resultCli],
  ];

const optionsCli0 = {
    chart: {
      title: "Valores Gerais",
      subtitle: "Testando",
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
    ["Valor Lucro", resultCli1, "#F7C64F", null],
    ["Valor Custo", resultCli4, "#b87333", null],
    ["Valor Total ", resultCli, "#39E055", null],
    ["Valor  Nf-e", resultCli2, "#8226ED", null],
    ["Valor NFC-e", resultCli3, "#2686ED", null],
  ];
  
const barOptionsCli = {
    title: "Tabela Valores Totais.",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  
const dataCliente = [
    ["Element", "Valor Total", { role: "style" }],
    ["Lucro Venda", resultCli1, "#F7C64F"], 
    ["Valor Custo", resultCli4 , "#b87333"],     
    ["Venda Total", resultCli, "#39E055"], 
    ["Valor Nf-e", resultCli2 , "#8226ED"],     
    ["Venda NFC-e", resultCli3, "#2686ED"], 
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

const optionsTpPg = {
    title: "Valores",
    is3D: true,
};

const dataTpPg0 = [
    ["Valores em R$", "V1" , "V2"],
    [" (Cima)Dinheiro / (Baixo)Total", resultTpPg , resultTpPg1],
    ["Cartão(Acima Credito) , (Abaixo Debito)", resultTpPg2, resultTpPg3],
];

const optionsTpPg0 = {
    chart: {
      title: "Valores Gerais",
      subtitle: "Testando",
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

  const barDataTpPg = [
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
    ["Dinheiro", resultTpPg, "#A3DE68"],
    ["Total" , resultTpPg1, "#8848D4"],
    ["Cartão de Credito", resultTpPg2 ,"#D44A26"],
    ["Cartão de Debito", resultTpPg3 ,"#D40B0B"],
  ];

const barOptionsTpPg = {
    title: "Valores",
    width: 600,
    height: 400,
    bar: {groupWidth: "95%"},
    legend: {position: "none"},
};

const dataTpPg = [
    ["Element", "Valor", { role: "style"}],
    ["Dinheiro", resultTpPg, "#A3DE68"],
    ["Total" , resultTpPg1, "#8848D4"],
    ["Cartão de Credito", resultTpPg2 ,"#D44A26"],
    ["Cartão de Debito", resultTpPg3 ,"#D40B0B"],
];

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
                                       
                            <label htmlFor="search-form">
                            <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Buscar..." onChange={(e) => setQuery(e.target.value)}/>
                        
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
                            />
                        
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
                        <Modal isOpen={regiaoIsOpen} onRequestClose={closeRegiao} contentLabel="testando1" shouldCloseOnOverlayClick={false} overlayClassName="modal-overlay" style={modalDados} >

                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label className='esc' >( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardRegiao} >Graficos</button>  
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
                            
                           
                            <Modal isOpen={dashboardRegiao} onRequestClose={closeDashboardRegiao} contentLabel="dashboard" shouldCloseOnOverlayClick={true} overlayClassName="dashboard-overlay" style={styleDashboard} >
                                
                                <div className='dashboard' >
                                        <h1>Dashboard</h1>

                                    <div className='paia' >
                                        <p>gg</p> <p>gg</p> <p>gg</p>
                                    </div>

                                    <Chart chartType="ColumnChart" width="500px" height="400px" data={dataRegiao} className="up-column" />
                                    <Chart chartType="BarChart" width="500px" height="250px" data={barData} options={barOptions} className="side-column" />
                                    <Chart chartType="PieChart" data={dataRegiao} options={options} width={"500px"} height={"400px"} className="pie-chart" />
                                </div>
                                
                            </Modal>

                            </table> 
                        </div>

                        </Modal>

                        <button className='filialBtn' onClick={abrirFilial} >Filial</button>     
                        <Modal isOpen={filialIsOpen} onRequestClose={closeFilial} contentLabel="Filial" shouldCloseOnOverlayClick={true} overlayClassName="filial-overlay" style={modalDados}>
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardFilial} >Graficos</button>
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
                           
                            <Modal isOpen={dashboardFilial} onRequestClose={closeDashboardFilial} contentLabel="dashboard" shouldCloseOnOverlayClick={true} overlayClassName="dashboard-overlay" >
                                
                                <Chart chartType="ColumnChart" width="500" height="400px" data={dataFilial} className="up-column" />
                                <Chart chartType="BarChart" width="400px" height="200px" data={barDataFi} options={barOptionsFi} className="side-column" />
                                <Chart chartType="PieChart" data={dataFilial} options={optionsFi} width={"500px"} height={"400px"} className="pie-chart" />
    
                            </Modal>

                        </Modal>
                    
                        <button className='vendedorBtn' onClick={abrirVendedor} > Vendedor </button>
                        <Modal isOpen={vendedorIsOpen} onRequestClose={closeVendedor} contentLabel="Vendedor" shouldCloseOnOverlayClick={true} overlayClassName="vendedor-overlay" style={modalDados}> 
                        <input type="search" name="search-vend" id="search-vend" className="search" placeholder="Buscar por Vendedor" onChange={(e) => setQuery4(e.target.value)}/>
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardVendedor} >Graficos</button>
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
                         
                            <Modal isOpen={dashboardVendedor} onRequestClose={closeDashboardVendedor} contentLabel="dashboard" shouldCloseOnOverlayClick={true} overlayClassName="dashboard-overlay" >
                                <Chart chartType="ColumnChart" width="500" height="400px" data={dataFilial} className="up-column" />
                                <Chart chartType="BarChart" width="500px" height="300px" data={barDataVen} options={barOptionsVen} className="side-column" />
                                <Chart chartType="PieChart" data={dataVendedor} options={optionsVen} width={"500px"} height={"400px"} className="pie-chart" />

                            </Modal>

                        </Modal>
                    
                        <button className='clienteBtn' onClick={abrirCliente} > Cliente </button>
                        <Modal isOpen={clienteIsOpen} onRequestClose={closeCliente} contentLabel="Cliente" shouldCloseOnOverlayClick={true} overlayClassName="Cliente-overlay" style={modalDados}> 
                        <input type="search" name="search-cli" id="search-cli" className="search" placeholder="Buscar por Cliente" onChange={(e) => setQuery5(e.target.value)} />
                        <div className='dashboard-label' >
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardCliente} >Graficos</button>
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

                            <Modal isOpen={dashboardCliente} onRequestClose={closeDashboardCliente} contentLabel="dashboard" shouldCloseOnOverlayClick={true} overlayClassName="dashboard-overlay" >
                                
                                <div className='dashboard0' >
                                    <Chart chartType="ColumnChart" width="500px" height="400px" data={dataCliente} className="up-column" />
                                    <Chart chartType="BarChart" width="500px" height="250px" data={barDataCli} options={barOptionsCli} className="side-column" />
                                </div>          
                                
                                
                                <div className='dashboard0'>
                                    <Chart chartType="PieChart" data={dataCliente} options={optionsCli} width={"500px"} height={"400px"} className="pie-chart" />
                                    <Chart chartType="Bar" width="95%" height="300px" data={dataCli0} options={optionsCli0} className="bar-chart" />
                                </div>
                                
                            </Modal>

                        </Modal>
                    
                        <button className='tipoDePagamentoBtn' onClick={abrirTipoPg} > Tipo de Pagamento </button>
                        <Modal isOpen={tipoPgIsOpen} onRequestClose={closeTipoPg} contentLabel="Tipo de Pagamento" shouldCloseOnOverlayClick={true} overlayClassName="TipoPg-overlay" style={modalDados}> 
                            <div className='dashboard-label' >
                                
                                <div className='dashboardLine' >
                                    <label>Dashboards</label> <label>( Use 'Esc' para fechar )</label>
                                    <button className='dashboardBtn' onClick={openDashboardTipoDePagamento} >Graficos</button>
                                </div>
                        
                            
                        <table>
                        <div className='labels' >
                            {keys.map((nomes) => {
                                return(
                                    <th className='filter-all'>{(nomes).replace( '_' , ' ').toUpperCase()}</th>  
                                )
                            } )}
                        </div>
                            
                                <div className='labels' >
                                    {dadosTipoPagamento.map((f5) => {
                                        return(
                                                <td className='filter-all' > {f5} </td> 
                                        )
                                    } )}                             
                                </div>
                </table>
                            <Modal isOpen={dashboardTipoDePagamento} onRequestClose={closeDashboardTipoDePagamento} contentLabel="dashboard" shouldCloseOnOverlayClick={true} overlayClassName="dashboard-overlay" style={customStyles} >
                                
                                <div className='dashboardTpPg' >
                                    <div className='dashboard0' >
                                        <Chart chartType="ColumnChart" width="500px" height="400px" data={dataTpPg} className="up-column" />
                                        <Chart chartType="BarChart" width="500px" height="250px" data={dataTpPg} options={barOptionsTpPg} className="side-column" />
                                    </div>          
                                
                                
                                    <div className='dashboard0'>
                                        <Chart chartType="PieChart" data={dataTpPg} options={optionsTpPg} width={"500px"} height={"400px"} className="pie-chart" />
                                        <Chart chartType="Bar" width="95%" height="300px" data={dataTpPg0} options={optionsTpPg0} className="bar-chart" />
                                    </div>
                                </div>                                                                
                            </Modal>            

                        </div>
                        </Modal>

                        <button className='produtoBtn' onClick={abrirProduto} > Produto </button>
                        <Modal isOpen={produtoIsOpen} onRequestClose={closeProduto} contentLabel="Produto" shouldCloseOnOverlayClick={true} overlayClassName="Produto-overlay" style={modalDados}> 
                        <input type="search" name="search-pro" id="search-pro" className="search" placeholder="Buscar por Produto" onChange={(e) => setQuery6(e.target.value)}/>
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

                        {dadosProduto.filter(dat => dat.produto.toLowerCase().includes(query6)).map((dat2) => (
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
                        ))} 
                        </table>
                        </div>      
                         </Modal>

                        <button className='grupoBtn' onClick={abrirGrupo} > Grupo </button>
                        <Modal isOpen={grupoIsOpen} onRequestClose={closeGrupo} shouldCloseOnOverlayClick={true} overlayClassName="Grupo-overlay" contentLabel="Grupo" style={modalDados}>                                                     
                        <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Grupo" onChange={(e) => setQuery7(e.target.value)} />
                        
                        <div className='labels' >
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
                            </div>

                        {dadosGrupo.filter(dat => dat.grupo.toLowerCase().includes(query7)).map((dat3) => (
                            
                            <div className='labels' >
                                <td className='filter-all'>{dat3.ranking}</td>

                                <td className='filter-all'>{dat3.id_grupo}</td>

                                <td className='filter-name'> {dat3.grupo} </td>

                                <td className='filter-all'> {dat3.qtd_total} </td>

                                <td className='filter-all'> {dat3.sub_total} </td>

                                <td className='filter-all'> {dat3.p_desconto} </td>

                                <td className='filter-all'> {dat3.vlr_desconto_total} </td>

                                <td className='filter-all'> {dat3.vlr_venda_total} </td>

                                <td className='filter-all'> {dat3.vlr_custo_total} </td>

                                <td className='filter-all'> {dat3.vlr_lucro_total} </td>

                                <td className='filter-all'> {dat3.p_markup} </td>

                                <td className='filter-all'> {dat3.p_margem} </td>

                               <td className='filter-all'> {(dat3.percentual).toFixed(3)} </td>
                            </div>

                        ))}
                                                       
                        </Modal>

                        <button className='fornecedorBtn' onClick={abrirFornecedor} >Fornecedor</button>
                        <Modal  isOpen={fornecdorIsOpen} onRequestClose={closeFornecedor} contentLabel="Fornecedor" shouldCloseOnOverlayClick={true} overlayClassName="Fornecedor-overlay" style={modalDados}> 
                        <input type="search" name="search-gru" id="search-gru" className="search" placeholder="Buscar por Fornecedor" onChange={(e) => setQuery8(e.target.value)}/>
                        <div className='labels'>
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
                            </div>
                        {dadosFornecedor.filter(dat => dat.fornecedor.toLowerCase().includes(query8)).map((dat) => (
                                <div className='labels'>
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
                                </div>
                        ))}                            
                        </Modal>
                    </div>
                </div>
                </div>
            </div>
            </C.Container>
            
        );
}

export default ResumoFaturamento;