import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoProdutoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosProduto) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    const qtdTotal = dadosProduto.reduce((a, b) => a + b.qtd_total, 0)
    const Custo = dadosProduto.reduce((a, b) => a + b.vlr_custo_total, 0)
    const Venda = dadosProduto.reduce((a, b) => a + b.vlr_venda_total, 0)
    const Lucro = dadosProduto.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const Markup = dadosProduto.reduce((a, b) => a + b.p_markup, 0)
    const Margem = dadosProduto.reduce((a, b) => a + b.p_margem, 0)
    const percentual = dadosProduto.reduce((a, b) => a + b.percentual, 0)

    const produto = dadosProduto.map((data) => {
        return [
            { text: data.id_produto, fontSize: 8 },
            { text: data.produto, fontSize: 8 },
            { text: data.qtd_total, fontSize: 8 },
            { text: data.vlr_custo_total.toFixed(2).replace('.', ','), fontSize: 8 },
            { text: data.vlr_venda_total.toFixed(2).replace('.', ','), fontSize: 8 },
            { text: data.vlr_lucro_total.toFixed(2).replace('.', ','), fontSize: 8 },
            { text: data.p_markup.toFixed(2).replace('.', ','), fontSize: 8 },
            { text: data.p_margem.toFixed(2).replace('.', ','), fontSize: 8 },
            { text: data.percentual.toFixed(2).replace('.', ','), fontSize: 8 },
        ]
    })

    const dataAtual = new Date().toLocaleString();

    const header = [
        {
            text: 'Resumo de Faturamento Por Produto',
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

    const content = [
        {
            table: {
                widths: ['*', 150],
                body: [
                    [
                        { text: 'Filial: ' + (Filial()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'T.OP: ' + (Top()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'Período: ' + (dataIni) + ' Á ' + (dataFin), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'NF-e: ' + (nfe()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'NFC-e: ' + (nfce()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: '', fontSize: 8 },
                    ],

                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: [30, 150, 40, 45, 45, 45, 45, 45, 45],
                body: [
                    [
                        { text: 'Id. Produto', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Produto', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Percentual', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...produto
                ],
            },
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        { text: 'Totais', alignment: 'center', fillColor: '#E0E7ED',  bold: true, },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Qtd. Total: ' + (qtdTotal), fontSize: 8 },
                        { text: 'Custo: ' + (Custo.toFixed(2).replace('.', ',')), fontSize: 8 },
                        { text: 'Venda: ' + (Venda.toFixed(2).replace('.', ',')), fontSize: 8 },
                        { text: 'Lucro: ' + (Lucro.toFixed(2).replace('.', ',')), fontSize: 8 },
                        { text: 'Markup: ' + (Markup.toFixed(2).replace('.', ',') + '%'), fontSize: 8 },
                        { text: 'Margem: ' + (Margem.toFixed(2).replace('.', ',') + '%'), fontSize: 8 },
                        { text: 'Percentual: ' + (percentual.toFixed(2).replace('.', ',')), fontSize: 8 },
                    ],
                ],
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
        pageMargins: [15, 15, 15, 40],
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}

