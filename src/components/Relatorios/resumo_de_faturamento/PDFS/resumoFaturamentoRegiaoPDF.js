import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoRegiaoPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosRegiao, empresa, user){
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
        if (valorFilial.length === 0){
            return (
                "TODAS"
            )
        } else {
            return valorFilial
        }
    }
    
    const Top = () => {
        if (valorIdTop.length === 0){
            return (
                "TODAS"
            )
        } else {
            return valorIdTop
        }
    }

    const dataAtual = new Date().toLocaleString();

    const totalNFE = dadosRegiao.reduce((a, b) => a + b.vlTotalNfe, 0);
    const totalNFCE = dadosRegiao.reduce((a, b) => a + b.vlTotalNfce, 0);

    const header = [
        {
            text: 'Resumo de Faturamento Por Região',
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
                widths: [40, 130, 55, 45, 45, 45, 45, 40, 40],
                body: [
                    [
                        { text: 'Id. Região', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Região', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Médio Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. NFE', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. NFCE', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr. Lucro', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Vlr Custo', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Markup(%)', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Margem(%)', fillColor: '#E0E7ED', fontSize: 7 },
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
        pageMargins: [15, 15, 15, 40],
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();

}