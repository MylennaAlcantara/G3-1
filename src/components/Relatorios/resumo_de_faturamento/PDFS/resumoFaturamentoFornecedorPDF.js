import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoFornecedorPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosFornecedor) {
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

    const fornecedor = dadosFornecedor.map((data) => {
        return [
            { text: data.id_fornecedor, fontSize: 8 },
            { text: data.fornecedor, fontSize: 8 },
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
            text: 'Resumo de Faturamento Por Fornecedor',
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
                        { text: 'Filial: ' + (valorFilial.toString()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'T.OP: ' + (valorIdTop.toString()), bold: true, fontSize: 8 },
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
                        { text: 'Id. Fornecedor', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Fornecedor', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Percentual', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...fornecedor 
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
        pageMargins: [15, 15, 15, 40],
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}

