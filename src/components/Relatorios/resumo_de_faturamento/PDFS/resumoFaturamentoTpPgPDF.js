import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoTpPgPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosLeitura, user) {
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

    //const vendedor = dadosVendedor.map((data) => {
        //return[
            //{text: data.idFilial, fontSize: 8 },
            //{text: data.idVendedor, fontSize: 8 },
           // {text: data.vendedor, fontSize: 8 },
           // {text: data.qtdVendas, fontSize: 8 },
           // {text: data.vlTotalNfe.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlTotalNfce.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlVendaTotal.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlTotalCancelamento.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlTotalComissao.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlCustoTotal.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlLucroVenda.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.vlLucroLiquido.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.plucroLiquido.toFixed(2).replace('.', ','), fontSize: 8 },
           // {text: data.percentual.toFixed(2).replace('.', ','), fontSize: 8 },
        //]
   // } )

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
                widths: ['*', 150],
                body: [
                    [
                        { text: 'Filial: ' + (valorFilial.toString()), bold: true, fontSize: 8 },                        
                        { text: 'T.OP: ' + (valorIdTop.toString()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: 'Período: ' + (dataIni).substr(0, 10).split('-').reverse().join('/') + ' Á ' + (dataFin).substr(0, 10).split('-').reverse().join('/'), bold: true, fontSize: 8 },
                        { text: '', fontSize: 8},
                    ],
                    [
                        { text: 'NF-e: ' + (nfe()), bold: true, fontSize: 8 },
                        { text: 'NFC-e: ' + (nfce()), bold: true, fontSize: 8 },
                    ],
                    [
                        { text: '', fontSize: 8 },
                        { text: '', fontSize: 8},
                    ],
                ]
            },
            layout: 'headerLineOnly',
        },
        {   table: {
            headerRows: 1,
            widths: [30,40,50,40,40,40,40,40,40,40,40,40,45,40,40,45],
                body: [
                    [

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

