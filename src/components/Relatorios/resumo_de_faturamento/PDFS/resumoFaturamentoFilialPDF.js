import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoFilialPDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dados, empresa, user){
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

    const dataAtual = new Date().toLocaleString();

    const Quantidade = dados.reduce((a, b) => a + b.qtdVendas, 0);
    const MedioVendas = dados.reduce((a, b) => a + b.vlMedioVendas, 0);
    const TotalNfe = dados.reduce((a, b) => a + b.vlTotalNfe, 0);
    const TotalNfce = dados.reduce((a, b) => a + b.vlTotalNfce, 0);
    const VendaTotal = dados.reduce((a, b) => a + b.vlVendaTotal, 0);
    const TotalCredito = dados.reduce((a, b) => a + b.vlTotalCredito, 0);
    const TotalLiquido = dados.reduce((a, b) => a + b.vlTotalLiquido, 0);
    const LucroVenda = dados.reduce((a, b) => a + b.vlLucroVenda, 0);
    const Margem = dados.reduce((a, b) => a + b.margem, 0);
    const Percentual = dados.reduce((a, b) => a + b.percentual, 0);

    const filial = dados.map((data) => {
        return [
            { text: data.idFilial, fontSize: 8 },
            { text: data.filial, fontSize: 8 },
            { text: data.qtdVendas, fontSize: 8 },
            { text: parseFloat(String(data.vlMedioVendas).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right' , fontSize: 8 },
            { text: parseFloat(String(data.vlTotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right' , fontSize: 8 },
            { text: parseFloat(String(data.vlTotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right' , fontSize: 8 },
            { text: parseFloat(String(data.vlVendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlTotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlTotalLiquido).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlCustoTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlLucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), alignment: 'right', fontSize: 8 },
        ]
    })

    const header = [
        {
            text: 'Resumo de Faturamento Por Filial',
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
                    ],

                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: [22, 100, 36, 56, 56, 54, 56, 56, 55, 62, 60, 37, 43],
                body: [
                    [
                        { text: 'ID Filial', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Filial', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Qtd.Vendas', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Medio Venda', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total NF-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total NFC-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Venda Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total Credito', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total Liquido', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Custo Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Lucro Venda', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Margem %', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Percentual %', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...filial
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
                widths: ['*', '*', '*', '*', '*' ,'*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Quantidade: ' + parseFloat(String(Quantidade).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), fontSize: 8 },
                        { text: 'Medio Venda: ' + parseFloat(String(MedioVendas).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), fontSize: 8 },
                        { text: 'NFe : ' + parseFloat(String(TotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), fontSize: 8 },
                        { text: 'NFCe: ' + parseFloat(String(TotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }), fontSize: 8 },
                        { text: 'Venda Total : ' + (parseFloat(String(VendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })), fontSize: 8 },
                        { text: 'Total Credito : ' + (parseFloat(String(TotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })), fontSize: 8 },
                        { text: 'Total Liquido : ' + (parseFloat(String(TotalLiquido).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })), fontSize: 8 },
                        { text: 'Lucro Venda : ' + (parseFloat(String(LucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })), fontSize: 8 },
                        { text: 'Margem: ' + parseFloat(String(Margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' , fontSize: 8 },
                        { text: 'Percentual: ' + parseFloat(String(Percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' , fontSize: 8 },
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
        pageOrientation: 'LANDSCAPE',
        pageMargins: [15, 15, 15, 40],
        content: [header, content],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
}