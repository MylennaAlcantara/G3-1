import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function resumoFaturamentoClientePDF(valorFilial, valorIdTop, dataIni, dataFin, checkNFE, checkNFCE, dadosCliente, empresa, user){
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
        if(checkNFCE === true){
            return (
                "SIM"
            )
        } else if (checkNFCE === false){
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

    const Quantidade = dadosCliente.reduce((a, b) => a + b.qtdVendas, 0);
    const MedioVendas = dadosCliente.reduce((a, b) => a + b.vlCustoTotal, 0);
    const TotalNfe = dadosCliente.reduce((a, b) => a + b.vlTotalNfe, 0);
    const TotalNfce = dadosCliente.reduce((a, b) => a + b.vlTotalNfce, 0);
    const VendaTotal = dadosCliente.reduce((a, b) => a + b.vlVendaTotal, 0);
    const TotalCredito = dadosCliente.reduce((a, b) => a + b.vlTotalCredito, 0);
    const TotalLiquido = dadosCliente.reduce((a, b) => a + b.vlLucroLiquido, 0);
    const LucroVenda = dadosCliente.reduce((a, b) => a + b.vlLucroVenda, 0);
    const Margem = dadosCliente.reduce((a, b) => a + b.vlTotalDesconto, 0);
    const Percentual = dadosCliente.reduce((a, b) => a + b.percentual, 0);

    const dataAtual = new Date().toLocaleString();

    const header = [
        {
            text: 'Resumo de Faturamento Por Cliente',
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

    const cliente = dadosCliente.map((data) => {
        return [
            { text: data.idCliente, fontSize: 8 },
            { text: data.cliente, fontSize: 8 },
            { text: data.qtdVendas, fontSize: 8 },
            { text: parseFloat(String(data.vlTotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right' , fontSize: 8 },
            { text: parseFloat(String(data.vlTotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right' , fontSize: 8 },
            { text: parseFloat(String(data.vlVendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlTotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlCustoTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlLucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.vlTotalDesconto).replace(null, "0,00")).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.plucroLiquido).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), alignment: 'right', fontSize: 8 },
            { text: parseFloat(String(data.percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), alignment: 'right', fontSize: 8 },
        ]
    })

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
                widths: [30, 163, 36, 56, 54, 56, 56, 62, 60, 50,37, 43],
                body: [
                    [
                        { text: 'ID.Cliente', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Cliente', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Qtd.Vendas', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Total NF-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total NFC-e', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Venda Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Total Credito', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Custo Total', fillColor: '#E0E7ED', fontSize: 7 },
                        { text: 'Lucro Venda', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'Desconto Total', fillColor: '#E0E7ED', fontSize: 7},
                        { text: 'P.Lucro Liq.', fillColor: '#E0E7ED', fontSize: 6.5 },
                        { text: 'Percentual %', fillColor: '#E0E7ED', fontSize: 7 },
                    ],
                    ...cliente
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
                        { text: 'Quantidade: ' + parseFloat(String(Quantidade).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Custo Total: ' + parseFloat(String(MedioVendas).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'NFe : ' + parseFloat(String(TotalNfe).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'NFCe: ' + parseFloat(String(TotalNfce).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Venda Total : ' + (parseFloat(String(VendaTotal).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})), fontSize: 8 },
                        { text: 'Total Credito : ' + (parseFloat(String(TotalCredito).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})), fontSize: 8 },
                        { text: 'Total Lucro Liq : ' + (parseFloat(String(TotalLiquido).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})), fontSize: 8 },
                        { text: 'Lucro Venda : ' + (parseFloat(String(LucroVenda).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})), fontSize: 8 },
                        { text: 'Desconto Total: ' + parseFloat(String(Margem).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}), fontSize: 8 },
                        { text: 'Percentual: ' + parseFloat(String(Percentual).replace(null, "0,00")).toLocaleString('pt-BR', {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%' , fontSize: 8 },
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