import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../cadastro/cadastro";
import { Emitente } from "../modal_emitente/index.js";
import { Saler } from "../modal_vendedor/index.js";
import { Top } from "../modal_top/index.js";
import { Pgt } from "../modal_pgt/index.js";
import { Produtos } from "../modal_produtos/index.js";
import { Modal} from "../modal/index.js";
import { AuthContext } from "../../contexts/Auth/authContext";
import { rotinaPDF } from "../Relatorios/rotinaPDF";

export const Editar = ({codigo, horaEmissao, dataEmissao, matriculaFuncionario, senhaFuncionario, codRotina}) => {
    const navigate = useNavigate();
    const {autenticar, user} = useContext(AuthContext);

    const [rotinas, setRotinas] = useState([]);
    const [emitente, setEmitente] = useState([]);
    const [top, setTop] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [parceiro, setParceiro] = useState([]);
    const [tipoPagamento, setTipoPagamento] = useState([]);

    /*Estado dos Modais */
    const [isModalPartner, setIsModalPartner] = useState(false);
    const [isModalSaler, setIsModalSaler] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);
    const [isModalPgt, setIsModalPgt] = useState(false);
    const [isModalEmitente, setIsModalEmitente] = useState(false);
    const [isModalProdutos, setIsModalProdutos] = useState(false);

    //Condição caso modificou alguma opção
    const [emitenteAlterado, setEmitenteAlterado] = useState(false);
    const [topAlterada, setTopAlterada] = useState(false);
    const [vendedorAlterado, setVendedorAlterado] = useState(false);
    const [parceiroAlterado, setParceiroAlterado] = useState(false);
    const [tipoPgtoAlterado, setTipoPgtoAlterado] = useState(false);
    const [itensAlterados, setItensAlterados] = useState(false);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const responseRotina = await fetch(`http://10.0.1.10:8091/preVenda/${codRotina}`); //http://10.0.1.10:8091/preVenda/id
            const rotina = await responseRotina.json();
            setRotinas(rotina);
            setListItens(rotina.pre_venda_detalhe)
            const responseEmitente = await fetch('http://10.0.1.10:8092/emitente/all'); 
            const Emitente = await responseEmitente.json();
            setEmitente(Emitente);
            const responseTop = await fetch('http://10.0.1.10:8091/top/all'); 
            const top = await responseTop.json();
            setTop(top);
            const responseVendedor = await fetch('http://10.0.1.10:8099/user/all'); 
            const vendedor = await responseVendedor.json();
            setVendedor(vendedor);
            const responseParceiro = await fetch('http://10.0.1.10:8099/clientes');
            const parceiro = await responseParceiro.json();
            setParceiro(parceiro);
            const responseTipoPagamento = await fetch('http://10.0.1.10:8092/tipoPagamento/all'); 
            const tipoPagamento = await responseTipoPagamento.json();
            setTipoPagamento(tipoPagamento);
        }
        fetchData();
        autenticar();
    }, []);



    /*Etado do elemento selecionado no modal */
    const [dataSelectPartner, setDataSelectPartner] = useState('');
    const [dataSelectEmitente, setDataSelectEmitente] = useState('');
    const [dataSelectTop, setDataSelectTop] = useState({
        id_top: '',
        id_perfil_movimentacao: '',
        libera_itens_estoque_indisponivel:  '',
        descricao:  '',
        tipo_movimentacao:  '',
        rotina_movimenta_estoque_reservado:  '',
        gera_financeiro: '',
        rotina_movimenta_estoque_real: '',
        rotina_movimenta_estoque_deposito_interno: '',
        libera_editar_nome_do_consumidor_final: '',
        editar_preco_rotina: '',
        tipo_edicao_preco_rotina: ''
    });
    const [dataSelectSaler, setDataSelectSaler] = useState('');
    const [dataSelectPgt, setDataSelectPgt] = useState('');
    const [dataSelectItem, setDataSelectItem] = useState({
        id_produto: '',
        gtin: '',
        valor_venda: '',
        descricaoPdv: '',
        unidade_produto_nome: '',
        subtotal: '',
        desconto: '',
        descontoPorcen:'',
        qtd_estoque: '',
        quantidade: '',
        id_top: top.id_top
    });
    
    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState('');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState('');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState('');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState('');

    //Atualização da lista de itens
    const [listItens, setListItens] = useState([]);
    console.log(listItens);

    const tamanho = listItens.length;
    const [counter, setCounter] = useState(0);
    
    const changeHandler = e => {
        setCounter(tamanho + 1);
        const idTop= document.getElementById('top').value;
        setDataSelectItem({...dataSelectItem, [e.target?.name]: (e.target?.value).replace(',','.'), item: counter, id_top: idTop});
    }
    console.log("contador: "+counter, "tamanho da lista: "+listItens.length, "tamanho: "+tamanho )

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
    }

    //valida se a quantidade inserida no item é valida, se é maior que a quantidade disponivel ou se esta vazio
    const totalQtd = listItens.reduce((acumulador, objeto) => {
        if(objeto.id_produto === dataSelectItem.id_produto){
            return acumulador + parseFloat(objeto.quantidade);
        }
        return acumulador;
    }, 0)

    const validarQtd = () => {
        const soma = parseFloat(numero1.replace(",","."))+parseFloat(totalQtd);
        if( dataSelectItem.qtd_estoque < dataSelectItem.quantidade && dataSelectTop.tipo_movimentacao === 'S'){
            alert('Quantidade inserida maior que o estoque disponivel!');
            console.log("quantidade inserida: " +dataSelectItem.quantidade);
            console.log("quantidade estoque: "+dataSelectItem.qtd_estoque);
        }else if(dataSelectItem.quantidade === 0 || dataSelectItem.quantidade < 0 || dataSelectItem.quantidade === "" || dataSelectItem.quantidade === "undefined" ){
            alert('Quantidade inserida invalida!');
        }else if(dataSelectTop === 'S' && (totalQtd === dataSelectItem.qtd_estoque || totalQtd > dataSelectItem.qtd_estoque || soma > dataSelectItem.qtd_estoque) ){
            alert('Quantidade limite atingida!');
            zerarInput()
        }else if(dataSelectItem.quantidade != 0 ){
            setListItens([...listItens, dataSelectItem]);
            setItensAlterados(true);
        }
    }

    //Calcular total da rotina
    const [descontoValor, setDescontoValor] = useState('0.00');
    const [descontoPorcen, setDescontoPorcen] = useState('0,00');
    const [acrescimo, setAcrescimo] = useState();

    function valorDescontoPer (e) {
        setDescontoPorcen((e.target.value).replace(",", "."));
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
    }
    function valorDesconto (e) {
        if(numero1 === '1,000' || numero1 === '1.000'){
            setDescontoValor((e.target.value).replace(",", "."));
            setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
        }else{
            setDescontoValor((e.target.value).replace(",", "."));
            setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
        }
    }
    function qtdEstoque (e) {
        setNumero1((e.target.value).replace(",", "."));
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
    }

    function handlePorcenBlur(){
        const valor = parseFloat(descontoPorcen).toFixed(2).replace("NaN", " ").replace(".", ",");
        setDescontoPorcen(valor);
    }
    function handleQtdEstoqueBlur(e){
        const valor = parseFloat(numero1).toFixed(3).replace("NaN", " ").replace(".", ",");
        setNumero1(valor);
        valorUnidade();
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
    }
    function handleValorSubtotalBlur () {
        const totalItem = parseFloat(subtotal).toFixed(2).replace("NaN", " ").replace(".", ",");
        setSubtotal(totalItem);
    }

    // Calcular o valor de quantidade vezes o valor para o total 
    const [numero1, setNumero1] = useState("1.000");
    const [numero2, setNumero2] = useState('');
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const valor1 = String(numero1).replace(",", ".");
    const valor2 = String(numero2).replace(",",".");
    const valorDesc = String(descontoValor).replace(",", ".");
    const valorPer = String(descontoPorcen).replace(',', '.');

    //Constante utilizada para exibir o valor com duas casas decimais no valor unitario
    const valorUnitario = String(dataSelectItem.valor_unitario).replace(".", ",").replace("NaN", " ").replace("undefined", " ");

    //Constante utilizada para converter de virgula para ponto para realizar o calculo de total e subtotal
    const valorUnita = String(valorUnitario).replace(",", ".");

    const valorTotal = String(total).replace(',','.');

    const valorUnidade = () => {
        setNumero2(parseFloat(dataSelectItem.valor_unitario).toFixed(2).replace(".", ",").replace("NaN", " ").replace("undefined", " "))
    }
    const calcular = () =>{
        if(dataSelectTop.editar_preco_rotina === true){
            return parseFloat(parseFloat(valor1) * parseFloat(valor2)).toFixed(2).replace("NaN", " ")//.replace(".", ",");
        }else{
            return parseFloat(parseFloat(valor1) * parseFloat(valorUnita)).toFixed(2).replace("NaN", " ")//.replace(".", ",");
        }
    }
    const calcularSubtotal = () => {
        if(valorDesc === total ){
            //alert('Desconto não pode ser maior que o valor total do item!');
            return total
        }else if(descontoPorcen === '' || valorDesc === '' || valorDesc === 'undefined'){
            return total
        }else if(valorDesc < 0){
            alert('Desconto não pode ser negativo!')
            setDescontoValor('0,00')
            return total
        }
        else{
            return parseFloat(parseFloat(valorTotal) - parseFloat(valorDesc)).toFixed(2).replace("NaN", " ")//.replace(".", ",");
        }
    }

    const condição = () => {
        if(descontoPorcen === '0,00' || descontoPorcen === 0 || descontoPorcen === ' '){
            return descontoValor
        }else if(descontoPorcen <= 100 && descontoValor < total){
            return parseFloat((parseFloat(valorTotal) * parseFloat(descontoPorcen)) / 100).toFixed(2).replace("NaN", " ");
        }else if(descontoPorcen > 100 || descontoPorcen < 0){
            //alert("Desconto não pode ser maior que o valor total do item!");
            return '0.00'
        }else{
            return descontoValor
        }
    }
    const calcularPorcentagem = () => {
        if(descontoValor === "0,00" || descontoValor === 0 || descontoValor === " "){
            return descontoPorcen
        }else{
            return parseFloat((parseFloat(descontoValor) / parseFloat(total))*100).toFixed(2).replace("NaN", " ").replace(".", ",");
        }
    }

    useEffect(()=>{
        setTotal(calcular());
        setDescontoValor(condição());
        setSubtotal(calcularSubtotal());
    }, [numero1,numero2,descontoValor,total,descontoPorcen]);
    
    const totalVenda = listItens.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.subtotal)), 0);

    // Funções para abrir o modal de cada campo apertando F2
    function onKeyUp(event){
        if(	event.keyCode === 113){
            setIsModalEmitente(true);
        }    
    }
    function keyProduto(event){
        if( event.keyCode === 113 && document.getElementById('emitente').value && document.getElementById('pgto').value && document.getElementById('vendedor').value /*&& document.getElementById('top').value*/ && document.getElementById('parceiro').value){
            setIsModalProdutos(true);
        }else{
            setCor('yellow');
            alert("Preencha os campos acima!")
        }
    }
    function keyTop(event){
        if( event.keyCode === 113){
            setIsModalTop(true);
        }
    }
    function keyTop(event){
        if( event.keyCode === 113){
            setIsModalTop(true);
        }
    }
    function keySaler(event){
        if( event.keyCode === 113){
            setIsModalSaler(true);
        }
    }
    function keyPartner(event){
        if( event.keyCode === 113){
            setIsModalPartner(true);
        }
    }
    function keyPgt(event){
        if( event.keyCode === 113){
            setIsModalPgt(true);
        }
    }

    //Funções para mudar de campo ao apertar enter
    function NextValorUnit (e){
        const soma = parseFloat(numero1.replace(",","."))+parseFloat(totalQtd);
        if(e.keyCode === 13){
            e.preventDefault();
            if(dataSelectItem.qtd_estoque < numero1 && (dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S')){
                alert('Quantidade inserida maior que o estoque disponivel!');
                zerarInput();
            }else if(dataSelectTop === 'S' && soma > dataSelectItem.qtd_estoque ){
                alert('Quantidade limite atingida!');
                zerarInput();
            }
            else if(dataSelectTop.tipo_movimentacao === 'E' || tipoMovimentacao === 'E'){
                e.preventDefault();
                document.getElementById('valorUnit').focus();
            }else if((dataSelectTop.tipo_movimentacao === 'S' || tipoMovimentacao === 'S') && dataSelectItem.qtd_estoque >= numero1){
                e.preventDefault();
                document.getElementById('valorUnit').focus();
            }
            
        }
    }
    function NextAddItem (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('add-item').focus();
        }
    }
    function NextAddItem2 (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('add-item2').focus();
        }
    }
    function NextTotal (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('Total').focus();
            setDescontoPorcen(calcularPorcentagem());
        }
    }
    function NextDescrição (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('descrição').focus();
        }
    }
    function NextTop (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('top').focus();
        }
    }
    function NextVendedor (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('vendedor').focus();
        }
    }
    function NextParceiro (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('parceiro').focus();
        }
    }
    function NextPgto (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('pgto').focus();
        }
    }
    function NextSubtotal (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('subtotal').focus();
        }
    }

    //Foco para os proximos campos
    function focoQtd () {
        if(document.getElementById('emitente').value && document.getElementById('top').value && document.getElementById('vendedor').value && document.getElementById('parceiro').value && document.getElementById('pgto').value && document.getElementById('codigo').value){
            document.getElementById('quantidade').focus();
        }
    }
    function focoCampoSeguinte () {
        if(isModalEmitente){
            document.getElementById('top').focus();
        }else if(isModalTop){
            document.getElementById('vendedor').focus();
        }else if(isModalSaler){
            document.getElementById('parceiro').focus();
        }else if(isModalPartner){
            document.getElementById('pgto').focus();
        }else if(isModalPgt){
            document.getElementById('produto').focus();
        }
    }

    //Pegar hora do computador
    const [dataEdicao, setDataEdicao] = useState('');
    const [horaImpressao, setHoraImpressao] = useState('');

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = String(hora + ':' + minuto + ':' + segundo);

    useEffect(()=>{
        async function setarHoraData(){
            setDataEdicao(String(dataAtual));
            setHoraImpressao(String(horaAtual));
        } 
        setarHoraData();
    },[])


    //Checar varejo ou atacado
    const [tipoVenda, setTipoVenda] = useState('V');

    const validarTipoVenda = () => {
        if(document.getElementById('varejo').value === 'varejo'){
            setTipoVenda('V');
        }
    }
    const validarTipoVenda2 = () => {
        if(document.getElementById('atacado').value === 'atacado'){
            setTipoVenda('A');
        }
    }

    //envio para a api das informações armazenadas
    const[cor, setCor] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(emitenteAlterado === true || vendedorAlterado === true || tipoPgtoAlterado === true || parceiroAlterado === true || topAlterada === true || itensAlterados === true){
            //Id dos campos cabeçalho da rotina
            const idEmitente= document.getElementById('emitente').value;
            const idTop= document.getElementById('top').value;
            const idVendedor= document.getElementById('vendedor').value;
            const idParceiro= document.getElementById('parceiro').value;
            const idPgto= document.getElementById('pgto').value;
            const nomeParceiro = document.getElementById('nome-Parceiro').value;
            console.log("emit: "+ idEmitente, "top: "+idTop, "vende: "+idVendedor, "parcei: "+idParceiro, "pgto: "+ idPgto, "nome par: "+nomeParceiro)

            if(document.getElementById('emitente').value && document.getElementById('top').value && document.getElementById('vendedor').value && document.getElementById('parceiro').value && document.getElementById('pgto').value && listItens.length > 0 ){
                try{
                    const res = await fetch(`http://10.0.1.10:8091/preVenda/${codRotina}`, { //http://10.0.1.10:8091/preVenda
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id_empresa: idEmitente,
                            id_top: idTop,
                            id_cliente: idParceiro,
                            nome_cliente: nomeParceiro,
                            id_funcionario: idVendedor,
                            id_tipo_pagamento: idPgto,
                            situacao: 'P',
                            descontoValor: '',
                            dataEdicao: String(dataEdicao),
                            dataEmissao: String(dataEmissao),
                            hora_emissao: String(horaEmissao),
                            total: totalVenda,
                            subtotal: totalVenda,
                            valor_extenso: '',
                            observacao_pre_venda: '',
                            tipo_venda: tipoVenda,
                            venda_externa: false,
                                pre_venda_detalhe: listItens,
                        }),
                    });
                    if(res.status === 200){
                        alert('salvo com sucesso');
                        navigate('/consultar');
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                setCor('yellow');
                alert('Preencha todos os campos!');
            } 
        }else if(listItens.length <= 0 ){
            alert('Não pode salvar sem produtos!');
        }else{
            navigate('/consultar');
            console.log('não alterou!')
        }
        
    }

    const Voltar = () => {
        navigate('/consultar');
        localStorage.removeItem('rotina');
    }
    const excluir = () => {
        fetch(`http://10.0.1.10:8091/preVenda/delete/${codRotina}/${user[0].id}`, {
            method: 'DELETE',
        }).catch(err => console.log(err))
        navigate('/consultar');
        localStorage.removeItem('rotina');
    }    
    const imprimir = () => {
        if(codRotina === undefined){
            console.log('Nenhuma rotina selecionada');
        }else{
            rotinaPDF(rotinas, vendedor, parceiro, tipoPagamento, emitente, horaImpressao);
        }
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    const [token, setToken] = useState();
    useEffect(()=>{
        const logged = localStorage.getItem('token');
        if(logged){
            const foundUser = JSON.parse(logged);
            setToken(foundUser);
        }
    },[]);

    //Ordena a exibição dos produtos de acordo com o valor de item
    function comparar (a, b){
        if(a.item > b.item){
            return 1;
        }
        if(a.item < b.item){
            return -1
        }
        return 0;
    }
    //Decrementa os valores de item dentro dos produtos ao deletar um produto
    function decrementarItem (index) {
        for (let i = 0; i< tamanho; i++){
            if(listItens[i].item != 1 && listItens[i].item > index){
                listItens[i].item--;
                listItens[0].item = 1;
            }
        }
    }
    const Deletar = (id, index) => {
        const newList = listItens.filter((item) => item != id);
            setListItens(newList);
            setCounter(tamanho);
            decrementarItem(index);
        
    }


    const razaoSocial = emitente.filter((idEmitente) => {
        if(rotinas.id_empresa === idEmitente.id){
            return idEmitente.razao_social;
        }
    });
    const descricaoTop = top.filter((top) => {
        if(rotinas.id_top === top.id){
            return top.descricao;
        }
    });
    const descricaoVendedor = vendedor.filter((vendedor) => {
        if(rotinas.id_funcionario === vendedor.id){
            return vendedor.nome;
        }
    });
    const descricaoPagamento = tipoPagamento.filter((pagamento) => {
        if(rotinas.id_tipo_pagamento === pagamento.id){
            return pagamento.descricao;
        }
    });
    const [liberaEstoque, setLiberaEstoque] = useState();
    const [tipoMovimentacao, setTipoMovimentacao] = useState();
        useEffect(()=>{
            descricaoTop.map((tp) => {
            console.log(tp.libera_itens_estoque_indisponivel);
            setLiberaEstoque(tp.libera_itens_estoque_indisponivel);
            setTipoMovimentacao(tp.tipo_movimentacao);
        },[])
    })


    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Aberta para edição</h3>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div>
                            <label>Código da rotina: </label>
                            <input className="cod" value={rotinas.id} readOnly></input>
                        </div>
                        

                        <div id="checkbox">
                            {rotinas.tipo_venda === 'A' ? (
                            <div className="atacado-varejo">
                            <div id="line"></div>
                            <input type="radio" id="atacado" className="radio" name="radio" value='atacado' onFocus={validarTipoVenda2} checked></input>
                            <label>Atacado</label>
                            <input type="radio" id="varejo" className="radio" name="radio" value='varejo' onFocus={validarTipoVenda}></input>
                            <label>Varejo</label>
                            <div id="line"></div>
                        </div>
                        ) : (<div className="atacado-varejo">
                            <div id="line"></div>
                            <input type="radio" id="atacado" className="radio" name="radio" value='atacado' onFocus={validarTipoVenda2} ></input>
                            <label>Atacado</label>
                            <input type="radio" id="varejo" className="radio" name="radio" value='varejo' onFocus={validarTipoVenda} checked></input>
                            <label>Varejo</label>
                            <div id="line"></div>
                            </div>
                        )}
                            <div className="checkbox">
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Aprovado</label>
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Cancelado</label>
                                <input type="checkbox" className="checkbox-box"/>
                                <label>Entregue</label>
                            </div>
                        </div>
                    </form>
                    <form action="POST" id="information" className="information" onSubmit={handleSubmit}>
                        
                            <div>
                            <label>Emitente: </label>
                            <input name="id_empresa" className="f1" id="emitente" value={rotinas.id_empresa} onKeyDown={NextTop} readOnly/>
                            {razaoSocial.map((item) => {
                                return <input name="emitente" className="option" value={item.razao_social}/>
                            })}          
                            </div>

                        {topAlterada === false ? (
                            <div>
                            <label>T.O.P: </label>
                            <input name="cod_top" className="f1" id="top" value={rotinas.id_top} onKeyDown={NextVendedor} onKeyUp={keyTop} onDoubleClick={() => setIsModalTop(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            {descricaoTop.map((item)=> {
                                return <input name="top" className="option" value={item.descricao}/>
                            })}
                            </div>
                        ) : (
                            <div>
                            <label>T.O.P: </label>
                            <input name="cod_top" className="f1" id="top" value={dataSelectTop.id_top} onKeyDown={NextVendedor} onKeyUp={keyTop} onDoubleClick={() => setIsModalTop(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            <input name="top" className="option" value={dataSelectTop.descricao}/>
                            </div>
                        )}

                        {vendedorAlterado === false ? (
                            <div>
                            <label>Vendedor: </label>
                            <input name="cod_vendedor" className="f1" id="vendedor" value={rotinas.id_funcionario} onKeyDown={NextParceiro} onKeyUp={keySaler} onDoubleClick={() => setIsModalSaler(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            {descricaoVendedor.map((item) => {
                                return <input name="vendedor" className="option" value={item.nome} />
                            })}
                            </div>
                        ) : (
                            <div>
                            <label>Vendedor: </label>
                            <input name="cod_vendedor" className="f1" id="vendedor" value={dataIdSelectSaler} onKeyDown={NextParceiro} onKeyUp={keySaler} onDoubleClick={() => setIsModalSaler(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            <input name="vendedor" className="option" value={dataSelectSaler} />
                            </div>
                        )}

                        {parceiroAlterado === false ? (
                            <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" value={rotinas.id_cliente} onKeyDown={NextPgto} onKeyUp={keyPartner} onDoubleClick={() => setIsModalPartner(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                                    <div className="div-partner">
                                        <input name="partner" className="partner" id="nome-Parceiro" value={rotinas.nome_cliente} readOnly/>
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                            </div>
                        ) : (
                            <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" value={dataIdSelectPartner} onKeyDown={NextPgto} onKeyUp={keyPartner} onDoubleClick={() => setIsModalPartner(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                                    <div className="div-partner">
                                        <input name="partner" className="partner" id="nome-Parceiro" value={dataSelectPartner} readOnly/>
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                            </div>
                        )}

                        {tipoPgtoAlterado === false ? (
                            <div>
                            <label>Tipo pgto: </label>
                            <input className="f1" id="pgto" value={rotinas.id_tipo_pagamento} onKeyUp={keyPgt} onDoubleClick={() => setIsModalPgt(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            {descricaoPagamento.map((item)=> {
                            return <input id="option_pgto" className="option" value={item.descricao} />
                            })}
                            </div>
                        ) : (
                            <div>
                            <label>Tipo pgto: </label>
                            <input className="f1" id="pgto" value={dataIdSelectPgt} onKeyUp={keyPgt} onDoubleClick={() => setIsModalPgt(true)} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} readOnly/>
                            <input id="option_pgto" className="option" value={dataSelectPgt} />
                            </div>
                        )}
                    </form>
                </div>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <h4>Produtos</h4>
            </C.Header>
            <C.Add>
            <form onSubmit={event =>{event.preventDefault();  setCounter(prevCounter => prevCounter + 1); zerarInput(); validarQtd();}} >
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
                    title='Aperte F2 para listar as opções' 
                    style={{backgroundColor: cor}} required/>
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
                    onKeyDown={NextValorUnit} 
                    id="quantidade"  required/>
                </div>
                <div>
                <label>Vl. Unit.: </label>
                {dataSelectTop.editar_preco_rotina === true ? (
                    <input 
                    className="add-item" 
                    value={numero2} 
                    name="valor_unitario" 
                    onChange={(e) => setNumero2(e.target.value)}
                    onBlur={changeHandler} 
                    onKeyDown={NextAddItem} 
                    type="text" 
                    id="valorUnit" required/>
                    ) : (
                    <input 
                    className="add-item" 
                    value={valorUnitario} 
                    name="valor_unitario" 
                    onFocus={(e) => setNumero2(e.target.value)} 
                    onBlur={changeHandler} 
                    onKeyDown={NextAddItem} 
                    type="text" 
                    id="valorUnit" required/>
                    )
                }
                <datalist></datalist>
                </div>
                <div>
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
                    value={descontoPorcen}/>% / R$
                <input 
                    id="add-item2" 
                    name="desconto" 
                    className="add-item" 
                    placeholder="R$ 0,000000" 
                    type='text' 
                    onKeyDown={NextTotal} 
                    onChange={valorDesconto} 
                    onFocus={changeHandler}
                    value={String(descontoValor).replace('.',',').replace('NaN','')}/>
                </div>
                <div>
                <label>Total do item: </label>
                <input 
                    type="text" 
                    name="valor_total" 
                    id="Total" 
                    value={String(total).replace('.',',').replace('NaN','')} 
                    onFocus={changeHandler} 
                    onKeyDown={NextSubtotal}  required/>
                <label>Subtotal</label>
                <input 
                    name='subtotal' 
                    id="subtotal" 
                    value={String(subtotal).replace('.',',').replace('NaN','')}
                    onFocus={changeHandler} 
                    onKeyDown={NextDescrição} required/>
                <br/>
                </div>
                <div className="div-descrição" >
                <label>Descrição: </label>
                <input 
                    id="descrição" 
                    className="descrição" 
                    type="text" 
                    value={dataSelectItem.descricao_produto} 
                    onFocus={changeHandler} 
                    onBlur={handleValorSubtotalBlur} 
                    name="descricao_produto" 
                    readOnly 
                    required/>
                </div>
                <button onSubmit={validarQtd}>add</button>
            </form>
            </C.Add>
            <C.Display>
                <div className="table-resp">
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
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(listItens) && listItens.sort(comparar).map((list, index) => {
                                return(
                                    <tr key={list.item}>
                                        <td>{index+1}</td>
                                        <td>{list.id_produto}</td>
                                        <td>{list.gtin_produto}</td>
                                        <td>{list.descricao_produto}</td>
                                        <td>{list.unidade_produto}</td>
                                        <td>{parseFloat(list.quantidade).toFixed(3).replace('.',',')}</td>
                                        <td>{String(list.valor_unitario).replace('.',',')}</td>
                                        <td>{String(list.subtotal).replace('.',',')}</td>
                                        <td>{parseFloat(list.desconto).toFixed(2).replace('.',',')}</td>
                                        <img src="/images/lixeira.png" className="button-excluir" onClick={Deletar.bind(this, list, index)}/>
                                    </tr>
                                )
                                })}                         
                        </tbody>
                    </table>
                </div>
            </C.Display>
            <C.Footer>
                <form>
                    <div>
                    <label>Pré-descontoValor:</label>
                    <input placeholder="0,000000"/>
                    </div>
                    <div>
                    <label>Acrésc. Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                    <label className="total-itens"></label>
                    <div>
                    <label>Subtotal da Rotina: </label>
                    <input value={parseFloat(totalVenda).toFixed(2).replace(".", ",")} readOnly/>
                    </div>
                    <div>
                    <label>Total da Rotina: </label>
                    <input value={parseFloat(totalVenda).toFixed(2).replace(".", ",")} readOnly />
                    </div> 
                    <div>
                    <label>descontoValor Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button className="liberar" id="submit" onClick={handleSubmit}><img src="/images/salvar.png"/>Liberar</button>
                    <button onClick={imprimir}><img src="/images/printer.png"/>Imprimir</button>
                    <button className="Excluir" onClick={excluir}><img src="/images/lixeira.png"/>Excluir</button>
                    <button className="Voltar" onClick={Voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalPartner ? (
                <Modal onClose = {() => setIsModalPartner(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPartner={setDataSelectPartner} setDataIdSelectPartner={setDataIdSelectPartner} setParceiroAlterado={setParceiroAlterado} />
            ) : null}
            {isModalEmitente ? (
                <Emitente onClose = {() => setIsModalEmitente(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente} setEmitenteAlterado={setEmitenteAlterado}/>
            ) : null}
            {isModalTop ? (
                <Top onClose = {() => setIsModalTop(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectTop={setDataSelectTop} setTopAlterada={setTopAlterada}/>
            ) : null}
            {isModalSaler ? (
                <Saler onClose = {() => setIsModalSaler(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectSaler={setDataSelectSaler} setDataIdSelectSaler={setDataIdSelectSaler} setVendedorAlterado={setVendedorAlterado}/>
            ) : null}
            {isModalPgt ? (
                <Pgt onClose = {() => setIsModalPgt(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPgt={setDataSelectPgt} setDataIdSelectPgt={setDataIdSelectPgt} setTipoPgtoAlterado={setTipoPgtoAlterado}/>
            ) : null}
            {isModalProdutos ? (
                <Produtos onClose = {() => setIsModalProdutos(false)} focoQtd={focoQtd} setDataSelectItem={setDataSelectItem} dataIdSelectEmitente={dataIdSelectEmitente} dataIdSelectPgt ={dataIdSelectPgt} dataSelectTop={dataSelectTop} rotinas={rotinas} tipoPgtoAlterado={tipoPgtoAlterado} emitenteAlterado={emitenteAlterado} liberaEstoque={liberaEstoque} tipoMovimentacao={tipoMovimentacao}/>
            ) : null}
        </C.Container>   
    );
}