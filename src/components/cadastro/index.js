import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.js';
import { AuthContext } from "../../contexts/Auth/authContext.js";
import { Modal } from "../modais/modal/index";
import "../modais/modal/modal.js";
import { Emitente } from "../modais/modal_emitente/index.js";
import { Pgt } from "../modais/modal_pgt/index";
import { Produtos } from "../modais/modal_produtos/index.js";
import { Top } from "../modais/modal_top/index";
import { Saler } from "../modais/modal_vendedor/index.js";
import * as C from './cadastro.js';


export const Cadastro = ({ setMinimizado, minimizado }) => {
    const navigate = useNavigate();
    const { user, empresa, cnpjMask } = useContext(AuthContext);

    /*Estado dos Modais */
    const [isModalPartner, setIsModalPartner] = useState(false);
    const [isModalSaler, setIsModalSaler] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);
    const [isModalPgt, setIsModalPgt] = useState(false);
    const [isModalEmitente, setIsModalEmitente] = useState(false);
    const [isModalProdutos, setIsModalProdutos] = useState(false);

    const [dadosRotina, setDadosRotina] = useState(JSON.parse(localStorage.getItem("dadosRotina")) || {
        emitente: {
            id: "",
            descricao: ""
        },
        vendedor: {
            id: "",
            descricao: ""
        },
        parceiro: {
            id: "",
            descricao: ""
        },
        pgto: {
            id: "",
            descricao: ""
        },
        top: {
            id_top: '',
            id_perfil_movimentacao: '',
            libera_itens_estoque_indisponivel: '',
            descricao: '',
            tipo_movimentacao: '',
            rotina_movimenta_estoque_reservado: '',
            gera_financeiro: '',
            rotina_movimenta_estoque_real: '',
            rotina_movimenta_estoque_deposito_interno: '',
            libera_editar_nome_do_consumidor_final: '',
            editar_preco_rotina: '',
            tipo_edicao_preco_rotina: ''
        },
    })

    /*Etado do elemento selecionado no modal */
    const [dataSelectPartner, setDataSelectPartner] = useState(dadosRotina.parceiro.descricao || '');
    const [dataSelectEmitente, setDataSelectEmitente] = useState(dadosRotina.emitente.descricao || '');
    const [dataSelectTop, setDataSelectTop] = useState(dadosRotina.top || {
        id_top: '',
        id_perfil_movimentacao: '',
        libera_itens_estoque_indisponivel: '',
        descricao: '',
        tipo_movimentacao: '',
        rotina_movimenta_estoque_reservado: '',
        gera_financeiro: '',
        rotina_movimenta_estoque_real: '',
        rotina_movimenta_estoque_deposito_interno: '',
        libera_editar_nome_do_consumidor_final: '',
        editar_preco_rotina: '',
        tipo_edicao_preco_rotina: '',
        index_preco_vinculado: ''
    });
    const [dataSelectSaler, setDataSelectSaler] = useState(dadosRotina.vendedor.descricao || '');
    const [dataSelectPgt, setDataSelectPgt] = useState(dadosRotina.pgto.descricao || '');
    const [dataSelectItem, setDataSelectItem] = useState({
        id_produto: '',
        gtin: '',
        valor_venda: '',
        descricaoPdv: '',
        unidade_produto_nome: '',
        subtotal: String('').replace(",", "."),
        desconto: '',
        descontoPorcen: '',
        qtd_estoque: '',
        quantidade: '',
        valor_unitario: String('').replace(",", ".")
    });

    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState(dadosRotina.parceiro.id || '');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState(dadosRotina.emitente.id || '');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState(dadosRotina.vendedor.id || '');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState(dadosRotina.pgto.id || '');

    const [promocao, setPromocao] = useState([]);
    const [listItens, setListItens] = useState(JSON.parse(localStorage.getItem("lista")) || []);

    const [counter, setCounter] = useState(listItens.length + 1);
    
    const [tipoVenda, setTipoVenda] = useState('V');

    const totalItens = listItens.length;
    const totalQtd = listItens.reduce((acumulador, objeto) => {
        if (objeto.id_produto === dataSelectItem.id_produto) {
            return acumulador + parseFloat(objeto.quantidade.replace(',', '.'));
        }
        return acumulador;
    }, 0);
    const [descontoValor, setDescontoValor] = useState('0.00');
    const [descontoPorcen, setDescontoPorcen] = useState('0,00');
    const [cor, setCor] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [token, setToken] = useState();

    const [numero1, setNumero1] = useState("1.000");
    const [numero2, setNumero2] = useState('');
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const valor1 = String(numero1).replace(",", ".");
    const valor2 = String(numero2).replace(",", ".");

    //Constante utilizada para exibir o valor com duas casas decimais no valor unitario
    const valorUnitario = String(dataSelectItem.valor_unitario).replace(".", ",").replace("NaN", " ").replace("undefined", " ");

    //Constante utilizada para converter de virgula para ponto para realizar o calculo de total e subtotal
    const valorUnita = String(valorUnitario).replace(",", ".");

    const valorTotal = String(total).replace(',', '.');

    const subTotalVenda = listItens.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.subtotal)), 0);
    const descontoTotal = listItens.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.desconto.replace(",", "."))), 0);
    const totalVenda = subTotalVenda - descontoTotal;

    //Atualização da lista de itens
    const changeHandler = (e) => {
        setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(',', '.'), item: counter });
    }

    const zerarInput = () => {
        setDataSelectItem({
            acrescimo: '',
            descontoValor: '',
            descricao_produto: '',
            gtin_produto: '',
            id_produto: '',
            item: '',
            ncm: '',
            ncmEx: '',
            subtotal: '',
            unidade_produto: '',
            valor_icms_st: '',
            valor_total: '',
            valor_unitario: ''
        });
        setTotal(0);
        setSubtotal(0);
        setDescontoValor(0);
        setDescontoPorcen(0);
        setNumero1("1.000");
        setNumero2((dataSelectItem.valor_unitario).replace(",","."));
        document.getElementById('produto').focus();
    }

    //valida se a quantidade inserida no item é valida, se é maior que a quantidade disponivel ou se esta vazio
    const validarQtd = () => {
        const soma = parseFloat(numero1.replace(",", ".")) + parseFloat(totalQtd);
        if (dataSelectItem.qtd_estoque < dataSelectItem.quantidade && dataSelectTop.tipo_movimentacao === 'S') {
            alert('Quantidade inserida maior que o estoque disponivel!');
            console.log("quantidade inserida: " + dataSelectItem.quantidade);
            console.log("quantidade estoque: " + dataSelectItem.qtd_estoque);
        } else if (dataSelectItem.quantidade === 0 || dataSelectItem.quantidade < 0 || dataSelectItem.quantidade === "" || dataSelectItem.quantidade === "undefined") {
            alert('Quantidade inserida invalida!');
        } else if (dataSelectTop.tipo_movimentacao === 'S' && (totalQtd === dataSelectItem.qtd_estoque || totalQtd > dataSelectItem.qtd_estoque || soma > dataSelectItem.qtd_estoque)) {
            alert('Quantidade limite atingida!');
            zerarInput()
        } else if (dataSelectItem.quantidade != 0) {
            setListItens([...listItens, dataSelectItem]);
        }
    }

    //Calcular total da rotina
    function valorDescontoPer(e) {
        setDescontoPorcen((e.target.value).replace(",", "."));
        setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(",","."), item: counter });
    }
    function valorDesconto(e) {
        if (numero1 === '1,000' || numero1 === '1.000') {
            setDescontoValor((e.target.value).replace(",", "."));
            setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(",","."), item: counter });
            setDescontoPorcen(calcularPorcentagem());
        } else {
            setDescontoValor((e.target.value).replace(",", "."));
            setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(",","."), item: counter });
            setDescontoPorcen(calcularPorcentagem());
        }
    }
    function qtdEstoque(e) {
        setNumero1((e.target.value).replace(",", "."));
        setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(",","."), item: counter });
        valorUnidade();
    }

    function handlePorcenBlur() {
        const valor = parseFloat(descontoPorcen).toFixed(2).replace("NaN", " ").replace(".", ",");
        setDescontoPorcen(valor);
    }
    function handleQtdEstoqueBlur(e) {
        const valor = parseFloat(numero1).toFixed(3).replace("NaN", " ")//.replace(".", ",");
        setNumero1(valor);
        valorUnidade();
        setDataSelectItem({ ...dataSelectItem, [e.target?.name]: (e.target?.value).replace(",","."), item: counter });
    }

    const valorUnidade = () => {
        setNumero2(parseFloat(dataSelectItem.valor_unitario).toFixed(2).replace(",", ".").replace("NaN", " ").replace("undefined", " "))
    }

    // Calcular o valor de quantidade vezes o valor para o total 
    const calcular = () => {
        if (dataSelectTop.editar_preco_rotina === true) {
            return parseFloat(parseFloat(valor1) * parseFloat(valor2)).toFixed(2).replace("NaN", " ")//.replace(".", ",");
        } else {
            return parseFloat(parseFloat(valor1) * parseFloat(valor2)).toFixed(2).replace("NaN", " ")//.replace(".", ",");
        }
    }
    const calcularSubtotal = () => {
        const valorDesc = String(descontoValor).replace(",", ".");
        if (valorDesc === total) {
            //alert('Desconto não pode ser maior que o valor total do item!');
            return valorTotal;
        } else if (descontoPorcen === '' || valorDesc === '' || valorDesc === 'undefined') {
            return valorTotal;
        } else if (valorDesc < 0) {
            alert('Desconto não pode ser negativo!')
            setDescontoValor('0,00')
            return valorTotal;
        }
        else {
            return parseFloat(parseFloat(valorTotal) - parseFloat(valorDesc)).toFixed(2).replace("NaN", " ");
        }
    }

    const condicao = () => {
        if (descontoPorcen === '0,00' || descontoPorcen === 0 || descontoPorcen === ' ') {
            return descontoValor
        } else if (descontoPorcen <= 100 && descontoValor < total) {
            return parseFloat((parseFloat(valorTotal) * parseFloat(descontoPorcen)) / 100).toFixed(2).replace("NaN", " ");
        } else if (descontoPorcen > 100 || descontoPorcen < 0) {
            //alert("Desconto não pode ser maior que o valor total do item!");
            return '0.00'
        } else {
            return descontoValor
        }
    }
    const calcularPorcentagem = () => {
        if (descontoValor === "0,00" || descontoValor === 0 || descontoValor === " ") {
            return descontoPorcen
        } else {
            return parseFloat((parseFloat(descontoValor) / parseFloat(total)) * 100).toFixed(2).replace("NaN", " ").replace(".", ",");
        }
    }

    const pegarDados = async () => {
        const quantidade = await document.getElementById('quantidade').value;
        const preco = await document.getElementById('valorUnit').value;
        const subtotal = await document.getElementById('subtotal').value;
        const total = await document.getElementById('Total').value;
        const desconto = await document.getElementById("add-item2").value;
        const descPer = await document.getElementById("add-item").value;
        setDataSelectItem({
            ...dataSelectItem,
            valor_unitario: String(preco).replace(",","."),
            valor_total: String(total).replace(",", "."),
            subtotal: (subtotal).replace(",", "."),
            quantidade: quantidade,
            desconto: desconto.replace(",", "."),
            descontoPorcen: descPer.replace(",", ".")
        })
    }
    const validarValor = (e) => {
        if (promocao.length > 0) {
            if (promocao[0].aplicarNaPreVenda === true) {
                if (String(numero1).replace(',', '.') >= promocao[0].qtdMinima) {
                    setNumero2((promocao[0].precoPromocional).replace(",","."));
                } else {
                    setNumero2((dataSelectItem.valor_unitario).replace(",","."));
                }
            }
        } else {
            if (dataSelectItem.qtd_atacado != 0) {
                if (String(numero1).replace(',', '.') >= dataSelectItem.qtd_atacado && tipoVenda === 'A') {
                    setNumero2((dataSelectItem.preco_atacado).replace(",","."));
                } else if (String(numero1).replace(',', '.') < dataSelectItem.qtd_atacado) {
                    setNumero2(String(dataSelectItem.valor_unitario).replace(",","."));
                }
            } else {
                setNumero2((dataSelectItem.valor_unitario).replace(",","."));
            }
        }
    }

    useEffect(() => {
        setTotal(calcular());
        setDescontoValor(condicao());
        setSubtotal(calcularSubtotal());
        pegarDados();
        setDescontoPorcen(calcularPorcentagem())
    }, [numero1, numero2, descontoValor, total]); //, descontoPorcen TO DO: tirar variavel descontoPorcent esta dando conflito, aplicar o desconto somente quando mudar foco

    // Funções para abrir o modal de cada campo apertando F1
    function onKeyUp(event) {
        event.preventDefault();
        if (event.keyCode === 112) {
            event.preventDefault();
            setIsModalEmitente(true);
        }
    }
    function keyProduto(event) {
        if (event.keyCode === 112 && document.getElementById('emitente').value && document.getElementById('pgto').value && document.getElementById('vendedor').value && document.getElementById('top').value && document.getElementById('parceiro').value) {
            setIsModalProdutos(true);
            zerarInput();
        } else if (event.keyCode != 112) {
            event.preventDefault();
        }
        else {
            setCor('yellow');
            alert("Preencha os campos acima!")
        }
    }
    function keyTop(event) {
        if (event.keyCode === 112) {
            setIsModalTop(true);
        }
    }
    function keySaler(event) {
        if (event.keyCode === 112) {
            setIsModalSaler(true);
        }
    }
    function keyPartner(event) {
        if (event.keyCode === 112) {
            setIsModalPartner(true);
        }
    }
    function keyPgt(event) {
        if (event.keyCode === 112) {
            setIsModalPgt(true);
        }
    }

    // Bloqueia o F1 padrão do site
    document.onkeydown = function f1(e){ if(e.keyCode === 112)e.preventDefault() }

    //Funções para mudar de campo ao apertar enter
    function NextValorUnit(e) {
        const soma = parseFloat(numero1.replace(",", ".")) + parseFloat(totalQtd);
        if (e.keyCode === 13) {
            e.preventDefault();
            if (dataSelectItem.qtd_estoque < numero1 && dataSelectTop.tipo_movimentacao === 'S') {
                alert('Quantidade inserida maior que o estoque disponivel!');
                zerarInput();
            } else if (dataSelectTop === 'S' && soma > dataSelectItem.qtd_estoque) {
                alert('Quantidade limite atingida!');
                zerarInput();
            }
            else if (dataSelectTop.tipo_movimentacao === 'E') {
                e.preventDefault();
                document.getElementById('valorUnit').focus();
            } else if (dataSelectTop.tipo_movimentacao === 'S' && dataSelectItem.qtd_estoque >= numero1) {
                e.preventDefault();
                document.getElementById('valorUnit').focus();
            }

        }
    }
    function NextAddItem(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('add-item').focus();
        }
    }
    function NextAddItem2(e) {
        if (e.keyCode === 13) {
            setDescontoValor(condicao());
            e.preventDefault();
            document.getElementById('add-item2').focus();
        }
    }
    function NextTotal(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('Total').focus();
            setDescontoPorcen(calcularPorcentagem());
        }
    }
    function NextTop(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('top').focus();
        }
    }
    function NextVendedor(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('vendedor').focus();
        }
    }
    function NextParceiro(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('parceiro').focus();
        }
    }
    function NextPgto(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('pgto').focus();
        }
    }
    function NextSubtotal(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('subtotal').focus();
        }
    }
    function NextAdd(e) {
        if (e.keyCode === 13) {
            setDescontoPorcen(calcularPorcentagem());
            e.preventDefault();
            if(dataSelectTop.index_preco_vinculado !== 3 && document.getElementById("Total").value <= "0,00"){
                alert("Não pode ser adicionado sem preço de venda!");
                zerarInput();
            }else{
                if(document.getElementById("Total").value !== "" && document.getElementById("quantidade").value !== "" && document.getElementById("valorUnit").value !== "" && document.getElementById("add-item").value !== "" && document.getElementById("add-item2").value !== ""){
                    setDescontoPorcen(calcularPorcentagem());
                    validarQtd();
                    zerarInput();
                }else{
                    alert("Preencha todas as infomações antes de adicionar o produto!");
                    zerarInput();
                }
            }
        }
    }
    function NextPoduto(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById('produto').focus();
        }
    }

    //Foco para os proximos campos
    function focoQtd() {
        if (document.getElementById('emitente').value && document.getElementById('top').value && document.getElementById('vendedor').value && document.getElementById('parceiro').value && document.getElementById('pgto').value && document.getElementById('codigo').value) {
            document.getElementById('quantidade').focus();
            document.getElementById('quantidade').select();
        }
    }
    function focoCampoSeguinte() {
        if (isModalEmitente) {
            document.getElementById('top').focus();
        } else if (isModalTop) {
            document.getElementById('vendedor').focus();
        } else if (isModalSaler) {
            document.getElementById('parceiro').focus();
        } else if (isModalPartner) {
            document.getElementById('pgto').focus();
        } else if (isModalPgt) {
            document.getElementById('produto').focus();
        }
    }

    //Pegar hora do computador
    const [dataEmissao, setDataEmissao] = useState('');
    const [horaEmissao, setHoraEmissao] = useState('');

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = String(hora + ':' + minuto + ':' + segundo);

    useEffect(() => {
        async function setarHoraData() {
            setDataEmissao(String(dataAtual));
            setHoraEmissao(String(horaAtual));
        }
        setarHoraData();
    }, [])


    //Checar varejo ou atacado

    const validarTipoVenda = () => {
        if (document.getElementById('varejo').value === 'varejo') {
            setTipoVenda('V');
        }
    }
    const validarTipoVenda2 = () => {
        if (document.getElementById('atacado').value === 'atacado') {
            setTipoVenda('A');
        }
    }

    //envio para a api das informações armazenadas
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (document.getElementById('emitente').value && document.getElementById('top').value && document.getElementById('vendedor').value && document.getElementById('parceiro').value && document.getElementById('pgto').value && listItens.length > 0) {
            try {
                const res = await fetch(process.env.REACT_APP_LINK_ROTINA_TIPO_PGTO_TOP_PERFIL_MOVIMENTACAO+"/preVenda", { //http://10.0.1.10:8091/preVenda
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_empresa: dataIdSelectEmitente,
                        id_top: dataSelectTop.id_top,
                        id_cliente: dataIdSelectPartner,
                        nome_cliente: dataSelectPartner,
                        id_funcionario: dataIdSelectSaler,
                        id_tipo_pagamento: dataIdSelectPgt,
                        situacao: dataSelectTop.rotina_movimenta_estoque_real ? 'F' : 'P',
                        desconto: String(descontoTotal).replace(",", "."),
                        dataEmissao: String(dataEmissao),
                        hora_emissao: String(horaEmissao),
                        total: parseFloat(totalVenda).toFixed(2),
                        subtotal: parseFloat(subTotalVenda).toFixed(2),
                        valor_extenso: '',
                        observacao_pre_venda: '',
                        tipo_venda: tipoVenda,
                        venda_externa: false,
                        pre_venda_detalhe: listItens,
                    }),
                });
                if (res.status === 201) {
                    alert('salvo com sucesso');
                    navigate('/consultar');
                    localStorage.removeItem("dadosRotina");
                    localStorage.removeItem("lista");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setCor('yellow');
            alert('Preencha todos os campos!');
        }
    }

    const Voltar = () => {
        navigate('/consultar');
        localStorage.removeItem("dadosRotina");
        localStorage.removeItem("lista");
    }

    useEffect(() => {
        const logged = localStorage.getItem('token');
        if (logged) {
            const foundUser = JSON.parse(logged);
            setToken(foundUser);
        }
    }, []);

    function decrementarItem(index) {
        for (let i = 0; i < listItens.length; i++) {
            if (listItens[i].item != 1 && listItens[i].item > index) {
                listItens[i].item--;
                listItens[0].item = 1;
            }
        }
    }
    const Deletar = (id, index) => {
        const newList = listItens.filter((item) => item != id);
        setListItens(newList);
        setCounter(listItens.length);
        decrementarItem(index);

    }

    useEffect(() => {
        const handleResize = () => {
            setShowButton(window.innerWidth <= 440);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function minimizar() {
        setMinimizado({ ...minimizado, cadastroRotina: true })
        navigate("/home");
        localStorage.setItem("dadosRotina", JSON.stringify(dadosRotina));
        localStorage.setItem("lista", JSON.stringify(listItens));
    }

    return (

        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Cadastro de Rotina</h3>
                <div className="buttons">
                    <button className="minimizar" onClick={minimizar}><div className="linha" /></button>
                    <button className="close" onClick={Voltar}>X</button>
                </div>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div className="codigo">
                            <label>Código da rotina: </label>
                            <input className="cod" style={{ outline: 0, color: "black" }} disabled />
                        </div>
                        <div id="checkbox">
                            <div className="atacado-varejo">
                                <div id="line"></div>
                                <input type="radio" id="atacado" className="radio" name="radio" value='atacado' onFocus={validarTipoVenda2} checked={tipoVenda === "A" ? true : false}></input>
                                <label>Atacado</label>
                                <input type="radio" id="varejo" className="radio" name="radio" value='varejo' onFocus={validarTipoVenda} checked={tipoVenda === "V" ? true : false}></input>
                                <label>Varejo</label>
                                <div id="line"></div>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" className="checkbox-box" />
                                <label>Aprovado</label>
                                <input type="checkbox" className="checkbox-box" />
                                <label>Cancelado</label>
                                <input type="checkbox" className="checkbox-box" />
                                <label>Entregue</label>
                            </div>
                        </div>
                    </form>
                    <form action="POST" id="information" className="information" onSubmit={handleSubmit}>
                        <div>
                            <label>Emitente: </label>
                            <input name="id_empresa" className="f1" id="emitente" onKeyDown={NextTop} onKeyUp={onKeyUp} onDoubleClick={() => setIsModalEmitente(true)} value={dataIdSelectEmitente} title='Aperte F1 para listar as opções' style={{ backgroundColor: cor }} autoFocus required />
                            <input name="emitente" className="option" value={dataSelectEmitente} style={{ outline: 0 }} disabled />
                        </div>
                        <div>
                            <label>T.O.P: </label>
                            <input name="cod_top" className="f1" id="top" onKeyDown={NextVendedor} onKeyUp={keyTop} onDoubleClick={() => setIsModalTop(true)} value={dataSelectTop.id_top} title='Aperte F1 para listar as opções' style={{ backgroundColor: cor }} required />
                            <input name="top" className="option" value={dataSelectTop.descricao} style={{ outline: 0 }} disabled />
                        </div>
                        <div>
                            <label>Vendedor: </label>
                            <input name="cod_vendedor" className="f1" id="vendedor" onKeyDown={NextParceiro} onKeyUp={keySaler} onDoubleClick={() => setIsModalSaler(true)} value={dataIdSelectSaler} title='Aperte F1 para listar as opções' style={{ backgroundColor: cor }} required />
                            <input name="vendedor" className="option" value={dataSelectSaler} style={{ outline: 0 }} disabled />
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" onKeyDown={NextPgto} onKeyUp={keyPartner} onDoubleClick={() => setIsModalPartner(true)} value={dataIdSelectPartner} title='Aperte F1 para listar as opções' style={{ backgroundColor: cor }} required />
                            <div className="div-partner">
                                <input name="partner" className="partner" value={dataSelectPartner} style={{ outline: 0 }} disabled />
                                <label>CPF/CNPJ: </label>
                                <input className="cpf" />
                            </div>
                        </div>
                        <div>
                            <label>Tipo pgto: </label>
                            <input className="f1" id="pgto" onKeyUp={keyPgt} onKeyDown={NextPoduto} onDoubleClick={() => setIsModalPgt(true)} value={dataIdSelectPgt} title='Aperte F1 para listar as opções' style={{ backgroundColor: cor }} required />
                            <input id="option_pgto" className="option" value={dataSelectPgt} style={{ outline: 0 }} disabled />
                        </div>
                    </form>
                </div>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>

            <C.Header style={{ position: "relative" }}>
                <h4>Produtos</h4>
            </C.Header>
            <C.Add>
                <form onSubmit={event => { event.preventDefault(); setCounter(prevCounter => prevCounter + 1); zerarInput(); validarQtd(); }} >
                    <div>
                        <label>Código: </label>
                        <input
                            id="produto"
                            onKeyDown={keyProduto}
                            type="text"
                            value={dataSelectItem.id_produto}
                            name="id_produto"
                            onBlur={changeHandler}
                            onDoubleClick={() => setIsModalProdutos(true)}
                            title='Aperte F1 para listar as opções'
                            style={{ backgroundColor: cor }} required />
                    </div>
                    <div>
                        <label>Qtd: </label>
                        <input
                            placeholder="1,000"
                            name="quantidade"
                            type="text"
                            value={numero1}
                            onChange={qtdEstoque}
                            onBlur={handleQtdEstoqueBlur}
                            onFocus={() => document.getElementById('quantidade').select()}
                            onKeyDown={NextValorUnit}
                            id="quantidade" required />
                    </div>
                    <div>
                        <label>Vl. Unit.: </label>
                        {dataSelectTop.editar_preco_rotina === true && tipoVenda === 'V' ? (
                            <input
                                className="add-item"
                                value={parseFloat(numero2).toFixed(2).replace(".",",").replace("NaN", "0,00").replace(null, "0,00")}
                                name="valor_unitario"
                                onChange={(e) => setNumero2(e.target.value)}
                                onBlur={changeHandler}
                                onFocus={validarValor}
                                onKeyDown={NextAddItem}
                                type="text"
                                id="valorUnit" required />
                        ) : (
                            <input
                                className="add-item"
                                value={numero2}
                                name="valor_unitario"
                                onFocus={validarValor}
                                onBlur={changeHandler}
                                onKeyDown={NextAddItem}
                                type="text"
                                id="valorUnit" required />
                        )
                        }
                        <datalist></datalist>
                    </div>
                    <div className="desconto">
                        <label>Desc.: </label>
                        <input
                            id="add-item"
                            name="descontoPorcen"
                            className="add-item"
                            placeholder="0,000000%"
                            type="text"
                            onKeyDown={NextAddItem2}
                            onFocus={changeHandler}
                            onChange={valorDescontoPer}
                            onBlur={handlePorcenBlur}
                            value={descontoPorcen} />% / R$
                        <input
                            id="add-item2"
                            name="desconto"
                            className="add-item"
                            placeholder="R$ 0,000000"
                            type='text'
                            onKeyDown={NextAdd}
                            onChange={valorDesconto}
                            onFocus={changeHandler}
                            onBlur={() => setDescontoPorcen(calcularPorcentagem())}
                            value={String(descontoValor).replace('.', ',').replace('NaN', '')} />
                    </div>
                    <div className="desconto">
                        <label>Total: </label>
                        <input
                            type="text"
                            name="valor_total"
                            id="Total"
                            value={String(subtotal).replace('.', ',').replace('NaN', '')}
                            style={{ outline: 0, color: "black" }}
                            disabled
                            required />
                        <label>Subtotal:</label>
                        <input
                            name='subtotal'
                            id="subtotal"
                            value={String(total).replace('.', ',').replace('NaN', '')}
                            style={{ outline: 0, color: "black" }}
                            disabled
                            required />
                        <br />
                    </div>
                    <div className="div-descrição" >
                        <label>Descrição: </label>
                        <input
                            id="descrição"
                            className="descrição"
                            type="text"
                            value={dataSelectItem.descricao_produto}
                            name="descricao_produto"
                            style={{ outline: 0, color: "black" }}
                            disabled
                            readOnly
                            required />
                    </div>
                    {showButton ? <button onSubmit={validarQtd}><img alt="" src="/images/add.png"/>Adicionar</button> : null}

                </form>
            </C.Add>
            <C.Display>
                <div className="table-responsive">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cód. I.</th>
                                <th>EAN</th>
                                <th>Descrição</th>
                                <th>Unidade</th>
                                <th>Quant.</th>
                                <th>Valor Unid.</th>
                                <th>Subtotal</th>
                                <th>Desc. R$</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItens.map((list, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.id_produto}</td>
                                        <td>{list.gtin_produto}</td>
                                        <td>{list.descricao_produto}</td>
                                        <td>{list.unidade_produto}</td>
                                        <td>{parseFloat(list.quantidade).toFixed(3).replace('.', ',')}</td>
                                        <td>{String(list.valor_unitario).replace('.', ',')}</td>
                                        <td>{parseFloat(list.subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')}</td>
                                        <td>{parseFloat(list.desconto).toFixed(2).replace('.', ',')}</td>
                                        <td>{parseFloat(list.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')}</td>
                                        <img src="/images/lixeira.png" className="button-excluir" onClick={Deletar.bind(this, list, index)} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </C.Display>
            <C.Footer style={{ position: "relative" }}>
                <label className="total-itens">{totalItens > 1 ? totalItens + " itens" : totalItens + " item"}</label>
                <form>
                    <div>
                        <label>Pré-descontoValor:</label>
                        <input placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                    <div>
                        <label>Acrésc. Total(R$): </label>
                        <input placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                    <div>
                        <label>Subtotal da Rotina: </label>
                        <input value={parseFloat(subTotalVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')} style={{ outline: 0, color: "black" }} disabled />
                    </div>
                    <div>
                        <label>Total da Rotina: </label>
                        <input value={parseFloat(totalVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('NaN', '')} style={{ outline: 0, color: "black" }} disabled />
                    </div>
                    <div>
                        <label>descontoValor Total(R$): </label>
                        <input value={descontoTotal.toFixed(2).replace('NaN', '').replace('.', ',')} placeholder="0,000000" style={{ outline: 0 }} disabled readOnly />
                    </div>
                </form>
            </C.Footer>
            <C.Footer>
                <div className="buttons">
                    <button className="liberar" id="submit" onClick={handleSubmit}><img alt="salvar" src="/images/salvar.png" />Liberar</button>
                    <button className="Excluir"><img alt="excluir" src="/images/lixeira.png" />Excluir</button>
                    <button className="Voltar" onClick={Voltar}><img alt="voltar" src="/images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
            {isModalPartner ? (
                <Modal onClose={() => setIsModalPartner(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPartner={setDataSelectPartner} setDataIdSelectPartner={setDataIdSelectPartner} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
            {isModalEmitente ? (
                <Emitente onClose={() => setIsModalEmitente(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
            {isModalTop ? (
                <Top onClose={() => setIsModalTop(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectTop={setDataSelectTop} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
            {isModalSaler ? (
                <Saler onClose={() => setIsModalSaler(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectSaler={setDataSelectSaler} setDataIdSelectSaler={setDataIdSelectSaler} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
            {isModalPgt ? (
                <Pgt onClose={() => setIsModalPgt(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPgt={setDataSelectPgt} setDataIdSelectPgt={setDataIdSelectPgt} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
            {isModalProdutos ? (
                <Produtos onClose={() => setIsModalProdutos(false)} focoQtd={focoQtd} setDataSelectItem={setDataSelectItem} setPromocao={setPromocao} dataIdSelectEmitente={dataIdSelectEmitente} dataIdSelectPgt={dataIdSelectPgt} dataSelectTop={dataSelectTop} dadosRotina={dadosRotina} setDadosRotina={setDadosRotina} />
            ) : null}
        </C.Container>
    );
}