import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoTpPgPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosLeitura, empresa, user) {
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

    const tpPg = dadosLeitura.map((data) => {
        return[
            {text: data.id_filial, fontSize: 8 },
        ]
   } )

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
        {   table: {
            headerRows: 1,
            widths: [30,45,45,55,53,45,45,70,50,60],
                body: [
                    [
                        { text: 'ID Filial', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Boleto', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Dinheiro', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Cartão de Credito', fillColor: '#E0E7ED', fontSize: 6.5},
                        { text: 'Cartão de Debito', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Cheque', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Pix', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Duplicata Mercantil', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Outros', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Cancelamento Total', fillColor: '#E0E7ED', fontSize: 7}
                    ],
                   // ...vendedor
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
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}

