import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import styled from 'styled-components';

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
            listaBody.push({ text: String(tp).toUpperCase(), fillColor: '#E0E7ED', fontSize: 8, bold: true, })
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

    chartDataTipoPagamento.map((tp) => {
        if (tp != undefined && tp != null) {
            if (tp.valor != 0) {
                totais.push({ text: String(tp.nome).toUpperCase() + ": " + parseFloat(String(tp.valor)).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }), fontSize: 8 })
            }
        }
    })

    function organizarKeys(a, b) {
        if (a.text === 'ID_FILIAL') {
            return -1; // 'ID_FILIAL' vem primeiro
        } else if (b.text === 'ID_FILIAL') {
            return 1; // 'ID_FILIAL' vem primeiro
        } else if (a.text === 'TOTAL') {
            return 1; // 'TOTAL' vem por último
        } else if (b.text === 'TOTAL') {
            return -1; // 'TOTAL' vem por último
        } else {
            return 0; // Mantém a ordem atual para outros itens
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
                    text: linha.length == 0 ? pgto : pgto == null ? "0,00" : parseFloat(String(pgto)).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }),
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

    listaBody.map((item) => {
        widths.push("*")
    });

    totais.map((item) => {
        widthsTotais.push("*")
    })

    const content = [
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
        },
        {
            table: {
                headerRows: 1,
                widths: widths,
                body: body
            },

        },
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
        {
            table: {
                headerRows: 1,
                widths: widthsTotais,
                body: [totais],
                layout: 'lightHorizontalLines'
            },
        }
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
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}

