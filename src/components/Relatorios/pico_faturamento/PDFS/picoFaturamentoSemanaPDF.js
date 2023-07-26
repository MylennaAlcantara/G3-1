import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function picoFaturamentoSemanaPDF (dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop , semana, empresa, user){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    const Semanas = semana.map((data) => {
        if(data.dia === 'SUNDAY' ){
            data.dia = 'DOMINGO'
        }else if (data.dia === 'MONDAY'){
            data.dia = 'SEGUNDA'
        }else if (data.dia === 'TUESDAY'){
            data.dia = 'TERÇA'
        }else if (data.dia === 'WEDNESDAY'){
            data.dia = 'QUARTA'
        }else if (data.dia === 'THURSDAY'){
            data.dia = 'QUINTA'
        }else if (data.dia === 'FRIDAY'){
            data.dia = 'SEXTA'
        }else if (data.dia === 'SATURDAY'){
            data.dia = 'SABADO'
        }

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

    const dataAtual = new Date().toLocaleString();

    const header = [
        {
            text: 'Pico de Faturamento por Dia da Semana',
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
                    ...Semanas
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

}