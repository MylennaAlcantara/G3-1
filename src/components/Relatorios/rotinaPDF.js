import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


export function rotinaPDF (rotina, vendedor, parceiro, tipoPagamento, emitente, horaImpressao){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const descricaoParceiro = parceiro.filter((idParceiro) => {
        if(rotina.id_cliente === idParceiro.id){
            return idParceiro.nome;
        }
    });
    const descricaoVendedor = vendedor.filter((vendedor) => {
        if(rotina.id_funcionario === vendedor.id){
            return vendedor.nome;
        }
    });
    const descricaoPagamento = tipoPagamento.filter((pagamento) => {
        if(rotina.id_tipo_pagamento === pagamento.id){
            return pagamento.descricao;
        }
    });
    const descricaoEmitente = emitente.filter((idEmitente) => {
        if(rotina.id_empresa === idEmitente.id){
            return idEmitente.razao_social;
        }
    });

    const header =[
        {
            text: 'DOCUMENTO AUXILIAR DE VENDA - PEDIDO',
            style: 'subheader',
            fontSize: 12,
            bold: true,
            alignment: 'center',
            margin: [0, 0,0,0],
        },
        {
            text:['NÃO É DOCUMENTO FISCAL - NÃO É VÁLIDO COMO RECIBO DE GARANTIA DE MERCADORIA - NÃO COMPROVA PAGAMENTO'],
            alignment: 'center',
        }
    ];

    const produtos = rotina.pre_venda_detalhe && rotina.pre_venda_detalhe.map((rotina) => {
        return[
            {text: parseFloat(rotina.quantidade).toFixed(3).replace('.',','), fontSize: 10 },
            {text: rotina.id_produto, fontSize: 10 }, 
            {text: '', fontSize: 10 },
            {text: rotina.descricao_produto, fontSize: 10 }, 
            {text: parseFloat(rotina.valor_unitario).toFixed(2).replace('.',','), fontSize: 10 },
            {text: parseFloat(rotina.valor_total).toFixed(2).replace('.',','), fontSize: 10 },
        ]
    })
    
    const contentTable = [

        {
            table: {
                headerRows: 1,
                widths: ['*', 150],
                body: [
                    [
                        { text: 'Identificação do Estabelecimento Emitente',alignment: 'right', margin: [0, 15, 0, 0], },
                        { text: '',}
                    ],
                    [
                        {text: descricaoEmitente.map((item) => item.nome_fantasia )+ ' Telefone: 81 99999-9999', fontSize: 10,},
                        {text: 'Emissão: '+ rotina.dataEmissao, fontSize: 10},
                    ],
                    [
                        {text: descricaoEmitente.map((item) => item.razao_social ), fontSize: 10},
                        {text: 'Hora atual: ' + horaImpressao, fontSize: 10},
                    ],
                    [
                        {text: 'Endereço: ' +descricaoEmitente.map((item) => item.endereco ), fontSize: 10},
                        {text: 'Numero pedido: ' + rotina.id, bold: true, fontSize: 10},
                    ],
                    [
                        {text: 'CNPJ: '+ descricaoEmitente.map((item) => item.cnpj.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')), fontSize: 10},
                        {text: ''},
                    ],
                ]
            },
            layout: 'headerLineOnly',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*', 180],
                body: [
                    [
                        { text: 'Identificação do Destinatário',alignment: 'right'},
                        { text: '',}
                    ],
                    [
                        {text: 'Nome: ' + rotina.id_cliente + ' - ' + rotina.nome_cliente  +' / '+ 'telefone: ' + descricaoParceiro.map((item)=> item.telefone.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1')), fontSize: 10},
                        {text: 'CPF/CNPJ: ' + descricaoParceiro.map((item)=> item.cpf_cnpj.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')), fontSize: 10},
                    ],
                    [
                        {text: 'Rua: '+ descricaoParceiro.map((item)=> item.endereco)+ ' CEP: '+ descricaoParceiro.map((item)=> item.cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')) + ' Bairro: ' + descricaoParceiro.map((item)=> item.bairro), fontSize: 10},
                        {text: descricaoParceiro.map((item)=> item.municipio)+ ' - ' + descricaoParceiro.map((item)=> item.estado), fontSize: 10},
                    ],
                ]
            },
            layout: 'headerLineOnly',
        },
        [{text: 'Referência:', margin: [0, 15, 0, 0]}],
        [{text: 'Vendedor: '+ rotina.id_funcionario + ' - ' + descricaoVendedor.map((item) => item.nome ), bold: true,margin: [0, 15, 0, 5]}],
        [{text: 'T. Pag.: '+ rotina.id_tipo_pagamento + ' - ' + descricaoPagamento.map((item) => item.descricao ), bold: true,margin: [0, 0, 0, 15]}], 
        {   table: {
            headerRows: 1,
            widths: ['*'],
                body: [
                    [
                        {text: 'Ítens do Pedido', style: 'tableHeader', fontSize: 12, border: [false, false, false, true], alignment: 'center'},
                    ]
                ]
            },
        },
        {   table: {
            headerRows: 1,
            widths: [50,50,50,'*',50,50,],
                body: [
                    [
                        {text: 'Quant.', style: 'tableHeader', fontSize: 10},
                        {text: 'Cód. Int.', style: 'tableHeader', fontSize: 10 },
                        {text: 'Ref.', style: 'tableHeader', fontSize: 10},
                        {text: 'Produto', style: 'tableHeader', fontSize: 10},
                        {text: 'Preço', style: 'tableHeader', fontSize: 10},
                        {text: 'Total', style: 'tableHeader', fontSize: 10},
                    ],
                    ...produtos
                ]
            },
            layout: 'lightHorizontalLines'
        },
        [{text: 'observação: ', margin: [0, 15, 0, 20]}],
        [{text: 'Total: R$ ' + parseFloat(rotina.total).toFixed(2).replace('.',','), alignment: 'right', bold: true}],
        [{text: 'É vedada a autenticação deste documento', alignment: 'center', fontSize: 15,  margin: [0, 40, 0, 20]}],
        {   table: {
            headerRows: 1,
            widths: [200,'*'],
                body: [
                    [
                        {text: 'Data Recebimento:', style: 'tableHeader', fontSize: 10,lineHeight: 2 },
                        {text: ' Assinatura Responsável: ', style: 'tableHeader', fontSize: 10,  },
                    ]
                ]
            },
        },
    ];

    const footer = (currentPage, pageCount) => {
        return [
            {
                text: 'Página '+currentPage + ' de ' + pageCount,
                fontSize: 8,
                margin: [0, 10, 0, 0],
                bold: true,
                alignment: 'center',
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15,15,15,40],
        content: [header, contentTable],
        footer: footer,
    }
    pdfMake.createPdf(docDefinitios).open();
    //pdfMake.createPdf(docDefinitios).download();
}