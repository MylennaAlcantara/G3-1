import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoGrupoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosGrupo, empresa, user) {
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

    const qtdTotal = dadosGrupo.reduce((a, b) => a + b.qtd_total, 0)
    const Custo = dadosGrupo.reduce((a, b) => a + b.vlr_custo_total, 0)
    const Venda = dadosGrupo.reduce((a, b) => a + b.vlr_venda_total, 0)
    const Lucro = dadosGrupo.reduce((a, b) => a + b.vlr_lucro_total, 0)
    const Markup = dadosGrupo.reduce((a, b) => a + b.p_markup, 0)
    const Margem = dadosGrupo.reduce((a, b) => a + b.p_margem, 0)
    const Percentual = dadosGrupo.reduce((a, b) => a + b.percentual, 0)

    const grupo = dadosGrupo.map((data) => {
        return [
            { text: data.id_grupo, fontSize: 8 },
            { text: data.grupo, fontSize: 8 },
            { text: parseFloat(data.qtd_total).toLocaleString('pt-BR'), fontSize: 8 },
            { text: parseFloat(data.vlr_custo_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(data.vlr_venda_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(data.vlr_lucro_total.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(data.p_markup.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
            { text: parseFloat(data.p_margem.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
            { text: parseFloat(data.percentual.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
        ]
    })

    const dataAtual = new Date().toLocaleString();

    const header = [
        {
            text: 'Resumo de Faturamento Por Grupo',
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
                        { text: 'Usuario: ' + (Array.isArray(user) && user.map(user => user.id))  + ' - ' + (Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)), bold: true, fontSize: 8 },
                        { text: 'T.OP: ' + (Top()), bold: true, fontSize: 8 },
                        { text: 'NFC-e: ' + (nfce()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: '', fontSize: 8 },
                        { text: '', fontSize: 8 },
                        { text: '', fontSize: 8 }
                    ],
                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: [30, 150, 30, 55, 55, 55, 35, 35, 45],
                body: [
                    [
                        { text: 'Id. Grupo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Grupo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Percentual(%)', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...grupo
                ],
            },
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [

                    [
                        { text: 'Total', alignment: 'center', bold: true },
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
                        { text: 'Qtd Total: ' + parseFloat(qtdTotal).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Custo: ' + parseFloat(Custo.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Venda: ' + parseFloat(Venda.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Lucro: ' + parseFloat(Lucro.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Markup: ' + parseFloat(Markup.toFixed(2)).toLocaleString('pt-BR') + '%', fontSize: 8 },
                        { text: 'Margem: ' + parseFloat((Margem.toFixed(2)).toLocaleString('pt-BR') + '%'), fontSize: 8 },
                        { text: 'Percentual: ' + parseFloat(Percentual.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
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

