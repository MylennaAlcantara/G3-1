import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function picoDeFaturamentoMesPDF (dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, mes, empresa, user){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const QuantidadeNFE = mes.reduce((a, b) => a + b.qtd_nfe, 0);
    const QuantidadeNFCE = mes.reduce((a, b) => a + b.qtd_nfe, 0);
    const ValorNFE = mes.reduce((a, b) => a + b.vlr_total_nfe, 0);
    const ValorNFCE = mes.reduce((a, b) => a + b.vlr_total_nfce, 0);
    const QuantidadeVenda = mes.reduce((a, b) => a + b.qtd_vendas, 0);
    const ValorTotal = mes.reduce((a, b) => a + b.vlr_total, 0);
    const TiketMedio = mes.reduce((a, b) => a + b.tiket_medio, 0);

    const nfe = () => {
        if (NFE === true) {
            return (
                "SIM"
            )
        } else if (NFE === false) {
            return (
                "NÃO"
            )
        }
    }

    const nfce = () => {
        if(NFCE === true){
            return (
                "SIM"
            )
        } else if (NFCE === false){
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

    const Mês = mes.map((data) => {
        return [
            { text: data.dia, fontSize: 8 },
            { text: parseFloat(data.qtd_nfe).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.vlr_total_nfe).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.qtd_nfce).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) , fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.vlr_total_nfce).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.qtd_vendas).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) , fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.vlr_total).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), fontSize: 8, alignment: 'right' },
            { text: parseFloat(data.tiket_medio).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) , fontSize: 8, alignment: 'right' },
        ]
    })

    const header = [
        {
            text: 'Pico de Faturamento por Mês',
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
                        { text: 'Período: ' + (dataInicial).substr(0, 10).split('-').reverse().join('/') + ' Á ' + (dataFinal).substr(0, 10).split('-').reverse().join('/'), bold: true, fontSize: 8 },
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
                widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Dia', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Qtd. NF-e', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Vlr. Total NF-e', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Qtd. NFC-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr Total NFC-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Qtd. Vendas', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Tiket Médio', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...Mês
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
                widths: ['*', '*', '*', '*', '*' ,'*', '*'],
                body: [
                    [
                        { text: 'Qtd. NF-e: ' + parseFloat(QuantidadeNFE.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Vlr. NF-e: ' + parseFloat(ValorNFE.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Qtd. NFC-e : ' + parseFloat(QuantidadeNFCE.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Vlr. NFC-e: ' + parseFloat(ValorNFCE.toFixed(2)).toLocaleString('pt-BR'), fontSize: 8 },
                        { text: 'Qtd. Vendas : ' + (parseFloat(QuantidadeVenda.toFixed(2)).toLocaleString('pt-BR')), fontSize: 8 },
                        { text: 'Vlr. Total : ' + (parseFloat(ValorTotal.toFixed(2)).toLocaleString('pt-BR')), fontSize: 8 },
                        { text: 'Tiket Médio : ' + (parseFloat(TiketMedio.toFixed(2)).toLocaleString('pt-BR')), fontSize: 8 },
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

}