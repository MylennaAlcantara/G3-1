import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoTpPgPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosLeitura, keys, dadosTipoPagamento, empresa, user) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    const listaBody = [];
    const listaBody2 = [];
    const body = [];
    const widths = [];
    const totalTipoPagamento = somarValores(dadosTipoPagamento);
    const totais = [];
    const widthsTotais = [];


    const nfe = () => {
        if (checkNFE === true) {
            return (
                "SIM"
            )
        } else if (checkNFE === false) {
            return (
                "NÃO"
            )
        }
    }

    const nfce = () => {
        if (checkNFCE === true) {
            return (
                "SIM"
            )

        } else if (checkNFCE === false) {
            return (
                "NÃO"
            )
        }
    }

    const Filial = () => {
        if (valorFilial.length === 0) {
            return (
                "TODAS"
            )
        } else {
            return valorFilial
        }
    }

    const Top = () => {
        if (valorIdTop.length === 0) {
            return (
                "TODAS"
            )
        } else {
            return valorIdTop
        }
    }

    const dataAtual = new Date().toLocaleString();

    const header = [
        {
            text: 'Resumo de Faturamento Por Tipo de Pagamento',
            style: 'subheader',
            fontSize: 15,
            bold: true,
            alignment: 'left',
            margin: [0, 0, 0, 0],
        },
        {
            text: [dataAtual],
            alignment: 'right',
            fontSize: 9,
        }

    ];

    for (const tp of keys) {
        if (dadosTipoPagamento[0][tp] > 0) {
            listaBody.push({ text: String(tp).toUpperCase(), fontSize: 8, bold: true, marginTop: 10 })
        }
    }

    const chartDataTipoPagamento = Object.keys(totalTipoPagamento).map(key => {
        if (key != "id_filial") {
            return (
                {
                    nome: key,
                    valor: totalTipoPagamento[key]
                }
            )
        }
    });

    chartDataTipoPagamento.sort(organizarTotais).map((tp) => {
        if (tp != undefined && tp != null) {
            if (tp.valor != 0) {
                totais.push({ text: String(tp.nome).toUpperCase() + ": " + parseFloat(String(tp.valor)).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }), fontSize: 8 })
            }
        }
    })

    function organizarKeys(a, b) {
        if (a.text === 'ID_FILIAL') {
            return -1;
        } else if (b.text === 'ID_FILIAL') {
            return 1;
        } else if (a.text === 'TOTAL') {
            return 1;
        } else if (b.text === 'TOTAL') {
            return -1;
        } else {
            return 0;
        }
    }

    function organizarTotais(a,b){
        if(a.nome === "total"){
            return 1;
        }else if(b.nome === "total"){
            return -1;
        }else{
            return 0;
        }
    }

    const dadosFiltrados = dadosTipoPagamento.map((item) => {
        const filteredItem = {};
        listaBody.forEach((bodyItem) => {
            const propertyName = String(bodyItem.text).toLowerCase();
            filteredItem[propertyName] = item[propertyName];
        });
        return filteredItem;
    });

    dadosFiltrados.map((tipo) => {
        const linha = new Array();
        const propriedadesDesejadas = listaBody.sort(organizarKeys).map((propriedade) => propriedade.text.toLowerCase());

        const objetoOrdenado = {};

        propriedadesDesejadas.forEach((propriedade) => {
            if (tipo.hasOwnProperty(propriedade)) {
                objetoOrdenado[propriedade] = tipo[propriedade];
            }
        });

        Object.values(objetoOrdenado).map((pgto, index) => {
            linha.push(
                {
                    text: linha.length === 0 ? pgto : pgto == null ? "0,00" : parseFloat(String(pgto)).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL'}),
                    fillColor: listaBody2.length % 2 === 0 ? '#ffffe6' : '#f0f0f0',
                    fontSize: 7,
                }
            )
        })

        listaBody2.push(linha);
    });

    body.push(listaBody.sort(organizarKeys));
    for (let i of listaBody2) {
        body.push(i);
    }

    const maxColumns = 7; 
    const tables = [];
    const tabelaTotal = [];

    for (let i = 0; i < body[0].length; i += maxColumns) {
        const header = body[0].slice(i, i + maxColumns);
        const rows = body.slice(1).map(row => row.slice(i, i + maxColumns));
        header.slice(i, i + maxColumns).map((h)=>{
            widths.push("*")
        })
        
        const table = {
            table: {
            headerRows: 1,
            widths: widths,
            body: [header, ...rows],
            },
            layout: 'lightHorizontalLines',
        };

        tables.push(table);
    }

    for (let i = 0; i < totais.length; i += maxColumns) {
        const header = totais.slice(i, i + maxColumns);
        header.slice(i, i + maxColumns).map((h)=>{
            widthsTotais.push("*")
        })
        
        const table = {
            table: {
            headerRows: 1,
            widths: widthsTotais,
            body: [header],
            },
        };

        tabelaTotal.push(table);
    }

    const content1 = [
        {
            table: {
                widths: ['*', '*', '*'],
                body: [
                    [
                        { text: 'Filial: ' + (Filial()), bold: true, fontSize: 8 },
                        { text: 'Período: ' + (dataIni).substr(0, 10).split('-').reverse().join('/') + ' Á ' + (dataFin).substr(0, 10).split('-').reverse().join('/'), bold: true, fontSize: 8 },
                        { text: 'NF-e: ' + (nfe()), bold: true, fontSize: 8 },

                    ],
                    [
                        { text: 'Usuario: ' + (Array.isArray(user) && user.map(user => user.id)) + ' - ' + (Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)), bold: true, fontSize: 8 },
                        { text: 'T.OP: ' + (Top()), bold: true, fontSize: 8 },
                        { text: 'NFC-e: ' + (nfce()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: '', fontSize: 8 },
                        { text: '', fontSize: 8 },
                        { text: '', fontSize: 8 },
                    ],

                ]
            },
            layout: 'headerLineOnly',
        }
    ]

    const content2 = [
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        { text: 'Totais', alignment: 'center', fillColor: '#E0E7ED', bold: true, },
                    ],
                ],
            },
        },
    ]

    const footer = (currentPage, pageCount) => {
        return [
            {
                text: 'Página ' + currentPage + ' de ' + pageCount,
                fontSize: 8,
                margin: [0, 10, 0, 0],
                bold: true,
                alignment: 'center',
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageOrientation: 'LANDSCAPE',
        pageMargins: [15, 15, 15, 40],
        content: [header, content1, tables, content2, tabelaTotal],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}

