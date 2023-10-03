import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useContext } from 'react';

export function resumoFaturamentoFornecedorPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosFornecedor, empresa, user) {
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

    const qtdTotal = dadosFornecedor.reduce((a, b) => a + b.qtd_total, 0)
    const Custo = dadosFornecedor.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const Venda = dadosFornecedor.reduce((a, b) => a + b.vlr_venda_total, 0)
    const Lucro = dadosFornecedor.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const Markup = dadosFornecedor.reduce((a, b) => a + b.p_markup, 0)
    const Margem = dadosFornecedor.reduce((a, b) => a + b.p_margem, 0)
    const Percentual = dadosFornecedor.reduce((a, b) => a + b.percentual, 0)

    const fornecedor = dadosFornecedor.map((data) => {
        return [
            { text: data.id_fornecedor, alignment: 'center', fontSize: 8 },
            { text: data.fornecedor, fontSize: 8 },
            { text: parseFloat(String(data.qtd_total).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3}), fontSize: 8, alignment: 'right' },
            { text: parseFloat(String(data.vlr_custo_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlr_venda_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlr_lucro_total).replace(null, "0,00")).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.p_markup).replace(null, "0,00")).toLocaleString('pt-BR',{style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), alignment: 'center', fontSize: 8 },
            { text: parseFloat(String(data.p_margem).replace(null, "0,00")).toLocaleString('pt-BR',{style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), alignment: 'center', fontSize: 8 },
            { text: parseFloat(String(data.percentual).replace(null, "0,00")).toLocaleString('pt-BR',{style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), alignment: 'center', fontSize: 8 },
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
                    ]
                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: [40, 150, 40, '*', '*', '*', 35, 35, 35],
                body: [
                    [
                        { text: 'Id. Fornecedor', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Fornecedor', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup %', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem %', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Percent. %', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...fornecedor
                ],
            },

        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        { text: 'Totais', alignment: 'center' }
                    ]
                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Qtd.Total: ' + parseFloat(String(qtdTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3}), fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Custo: ' + parseFloat(String(Custo).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Venda: ' + parseFloat(String(Venda).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Lucro: ' + parseFloat(String(Lucro).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Markup: ' + parseFloat(String(Markup).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%', fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Margem: ' + parseFloat(String(Margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%', fontSize: 8, alignment: 'center', bold: true },
                        { text: 'Percentual: ' + parseFloat(String(Percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})+ '%', fontSize: 8, alignment: 'center', bold: true },
                    ]
                ]
            }
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

