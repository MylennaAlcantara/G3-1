import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoProdutoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosProduto, empresa, user) {
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
            { text: parseFloat(String(data.qtd_total).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3}), fontSize: 8 },
            { text: parseFloat(String(data.vlr_custo_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlr_venda_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlr_lucro_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.p_markup).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
            { text: parseFloat(String(data.p_margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
            { text: parseFloat(String(data.percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
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
                widths: ['*', '*', '*'],
                body: [
                    [
                        { text: 'Filial: ' + (Filial()), bold: true, fontSize: 8 },
                        { text: 'Período: ' + (dataIni).substr(0, 10).split('-').reverse().join('/') + ' Á ' + (dataFin).substr(0, 10).split('-').reverse().join('/'), bold: true, fontSize: 8 },
                        { text: 'NF-e: ' + (nfe()), bold: true, fontSize: 8 },

                    ],
                    [
                        { text: 'Usuario: ' + (Array.isArray(user) && user.map(user => user.id)) + ' - ' + (Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia))  , bold: true, fontSize: 8 },
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
                widths: [35, 150, 40, '*','*','*', 30, 30, 30],
                body: [
                    [
                        { text: 'Id. Produto', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Produto', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup %', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem %', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Percent. %', fillColor: '#E0E7ED', fontSize: 7 },
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
                        { text: 'Totais', alignment: 'center', fillColor: '#E0E7ED', bold: true, },
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
                        { text: 'Qtd. Total: ' + parseFloat(String(qtdTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3}), fontSize: 8 },
                        { text: 'Custo: ' + parseFloat(String(Custo).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Venda: ' + parseFloat(String(Venda).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Lucro: ' + parseFloat(String(Lucro).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Markup: ' + (parseFloat(String(Markup).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%'), fontSize: 8 },
                        { text: 'Margem: ' + (parseFloat(String(Margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%'), fontSize: 8 },
                        { text: 'Percentual: ' + parseFloat(String(percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})+'%', fontSize: 8 },
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

