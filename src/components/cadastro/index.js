import React, {useContext, useEffect, useState} from "react";
import { Modal} from "../modal/index.js";
import { Saler } from "../modal_vendedor/index.js";
import "../modal/modal.js";
import * as C from './cadastro.js';
import '../../App.js';
import { Emitente } from "../modal_emitente/index.js";
import { Top } from "../modal_top/index.js";
import { Pgt } from "../modal_pgt/index.js";
import { Produtos } from "../modal_produtos/index.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext.js";




export const Cadastro = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    /*Estado dos Modais */
    const [isModalPartner, setIsModalPartner] = useState(false);
    const [isModalSaler, setIsModalSaler] = useState(false);
    const [isModalTop, setIsModalTop] = useState(false);
    const [isModalPgt, setIsModalPgt] = useState(false);
    const [isModalEmitente, setIsModalEmitente] = useState(false);
    const [isModalProdutos, setIsModalProdutos] = useState(false);
    
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
        quantidade: ''
    });
    
    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState('');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState('');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState('');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState('');

    //Atualização da lista de itens
    const [listItens, setListItens] = useState([]);
    console.log(listItens);

    const [counter, setCounter] = useState(listItens.length+1);
    
    const changeHandler = e => {
        setDataSelectItem({...dataSelectItem, [e.target?.name]: (e.target?.value).replace(',','.'), item: counter});
    }
 console.log(counter);

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
        document.getElementById('produto').focus();
    }

    //valida se a quantidade inserida no item é valida, se é maior que a quantidade disponivel ou se esta vazio
    const totalQtd = listItens.reduce((acumulador, objeto) => {
        if(objeto.id_produto === dataSelectItem.id_produto){
            return acumulador + parseFloat(objeto.quantidade.replace(',','.'));
        }
        return acumulador;
    }, 0)

    const validarQtd = () => {
        const soma = parseFloat(numero1.replace(",","."))+parseFloat(totalQtd);
        console.log('soma: '+soma, 'top: '+ dataSelectTop)
        if( dataSelectItem.qtd_estoque < dataSelectItem.quantidade && dataSelectTop.tipo_movimentacao === 'S'){
            alert('Quantidade inserida maior que o estoque disponivel!');
            console.log("quantidade inserida: " +dataSelectItem.quantidade);
            console.log("quantidade estoque: "+dataSelectItem.qtd_estoque);
        }else if(dataSelectItem.quantidade === 0 || dataSelectItem.quantidade < 0 || dataSelectItem.quantidade === "" || dataSelectItem.quantidade === "undefined" ){
            alert('Quantidade inserida invalida!');
        }else if(dataSelectTop.tipo_movimentacao === 'S' && (totalQtd === dataSelectItem.qtd_estoque || totalQtd > dataSelectItem.qtd_estoque || soma > dataSelectItem.qtd_estoque) ){
            alert('Quantidade limite atingida!');
            zerarInput()
        }else if(dataSelectItem.quantidade != 0 ){
            setListItens([...listItens, dataSelectItem]);
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
 
    const totalVenda = listItens.reduce((acumulador, objeto) => acumulador + parseFloat((objeto.subtotal).replace(",", ".")), 0);

    // Funções para abrir o modal de cada campo apertando F2
    function onKeyUp(event){
        if(	event.keyCode === 113){
            setIsModalEmitente(true);
        }    
    }
    function keyProduto(event){
        if( event.keyCode === 113 && document.getElementById('emitente').value && document.getElementById('pgto').value && document.getElementById('vendedor').value && document.getElementById('top').value && document.getElementById('parceiro').value){
            setIsModalProdutos(true);
        }else if(event.keyCode != 113){
            event.preventDefault();
        }
        else{
            setCor('yellow');
            alert("Preencha os campos acima!")
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
            if(dataSelectItem.qtd_estoque < numero1 && dataSelectTop.tipo_movimentacao === 'S'){
                alert('Quantidade inserida maior que o estoque disponivel!');
                zerarInput();
            }else if(dataSelectTop === 'S' && soma > dataSelectItem.qtd_estoque ){
                alert('Quantidade limite atingida!');
                zerarInput();
            }
            else if(dataSelectTop.tipo_movimentacao === 'E'){
                e.preventDefault();
                document.getElementById('valorUnit').focus();
            }else if(dataSelectTop.tipo_movimentacao === 'S' && dataSelectItem.qtd_estoque >= numero1){
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
    function NextPoduto (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('produto').focus();
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
    const [dataEmissao, setDataEmissao] = useState('');
    const [horaEmissao, setHoraEmissao] = useState('');

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
            setDataEmissao(String(dataAtual));
            setHoraEmissao(String(horaAtual));
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
        if(document.getElementById('emitente').value && document.getElementById('top').value && document.getElementById('vendedor').value && document.getElementById('parceiro').value && document.getElementById('pgto').value && listItens.length > 0 ){
            try{
                const res = await fetch("http://10.0.1.10:8091/preVenda", { //http://10.0.1.10:8091/preVenda
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id_empresa: dataIdSelectEmitente,
                        id_top: dataSelectTop.id_top,
                        id_cliente: dataIdSelectPartner,
                        nome_cliente: dataSelectPartner,
                        id_funcionario: dataIdSelectSaler,
                        id_tipo_pagamento: dataIdSelectPgt,
                        situacao: 'P',
                        descontoValor: '',
                        dataEmissao: String(dataEmissao),
                        hora_emissao: String(horaEmissao),
                        total: parseFloat(totalVenda).toFixed(2),
                        subtotal: parseFloat(totalVenda).toFixed(2),
                        valor_extenso: '',
                        observacao_pre_venda: '',
                        tipo_venda: tipoVenda,
                        venda_externa: false,
                            pre_venda_detalhe: listItens,
                    }),
                });
                if(res.status === 201){
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
    }

    const Voltar = () => {
        navigate('/consultar');
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

    function decrementarItem (index) {
        for (let i = 0; i< listItens.length; i++){
            if(listItens[i].item != 1 && listItens[i].item > index){
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
           
    return(
        
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Cadastro de Rotina</h3>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div>
                            <label>Código da rotina: </label>
                            <input className="cod"></input>
                        </div>
                        <div id="checkbox">
                            <div className="atacado-varejo">
                                <div id="line"></div>
                                <input type="radio" id="atacado" className="radio" name="radio" value='atacado' onFocus={validarTipoVenda2}></input>
                                <label>Atacado</label>
                                <input type="radio" id="varejo" className="radio" name="radio" value='varejo' onFocus={validarTipoVenda} checked></input>
                                <label>Varejo</label>
                                <div id="line"></div>
                            </div>
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
                        <input name="id_empresa" className="f1" id="emitente" onKeyDown={NextTop} onKeyUp={onKeyUp} onDoubleClick={() => setIsModalEmitente(true)} value={dataIdSelectEmitente} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>                    
                        <input name="emitente" className="option" value={dataSelectEmitente}/>
                        </div>
                        <div>
                        <label>T.O.P: </label>
                        <input name="cod_top" className="f1" id="top" onKeyDown={NextVendedor} onKeyUp={keyTop} onDoubleClick={() => setIsModalTop(true)} value={dataSelectTop.id_top} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input name="top" className="option" value={dataSelectTop.descricao}/>
                        </div>
                        <div>
                        <label>Vendedor: </label>
                        <input name="cod_vendedor" className="f1" id="vendedor" onKeyDown={NextParceiro} onKeyUp={keySaler} onDoubleClick={() => setIsModalSaler(true)} value={dataIdSelectSaler} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input name="vendedor" className="option" value={dataSelectSaler} />
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" onKeyDown={NextPgto} onKeyUp={keyPartner} onDoubleClick={() => setIsModalPartner(true)} value={dataIdSelectPartner} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                                    <div className="div-partner">
                                        <input name="partner" className="partner" value={dataSelectPartner} />
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                        </div>
                        <div>
                        <label>Tipo pgto: </label>
                        <input className="f1" id="pgto" onKeyUp={keyPgt} onKeyDown={NextPoduto} onDoubleClick={() => setIsModalPgt(true)} value={dataIdSelectPgt} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input id="option_pgto" className="option" value={dataSelectPgt}/>
                        </div>
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
                <button onSubmit={validarQtd}>Adicionar</button>
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
                            {listItens.map((list, index) => {
                                return(
                                    <tr key={index}>
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
                    <input value={parseFloat(totalVenda).toFixed(2).replace(".", ",")}/>
                    </div>
                    <div>
                    <label>Total da Rotina: </label>
                    <input value={parseFloat(totalVenda).toFixed(2).replace(".", ",")}/>
                    </div> 
                    <div>
                    <label>descontoValor Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button className="liberar" id="submit" onClick={handleSubmit}><img src="/images/salvar.png"/>Liberar</button>
                    <button className="Excluir"><img src="/images/lixeira.png"/>Excluir</button>
                    <button className="Voltar" onClick={Voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalPartner ? (
                <Modal onClose = {() => setIsModalPartner(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPartner={setDataSelectPartner} setDataIdSelectPartner={setDataIdSelectPartner}/>
            ) : null}
            {isModalEmitente ? (
                <Emitente onClose = {() => setIsModalEmitente(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente}/>
            ) : null}
            {isModalTop ? (
                <Top onClose = {() => setIsModalTop(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectTop={setDataSelectTop}/>
            ) : null}
            {isModalSaler ? (
                <Saler onClose = {() => setIsModalSaler(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectSaler={setDataSelectSaler} setDataIdSelectSaler={setDataIdSelectSaler}/>
            ) : null}
            {isModalPgt ? (
                <Pgt onClose = {() => setIsModalPgt(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPgt={setDataSelectPgt} setDataIdSelectPgt={setDataIdSelectPgt}/>
            ) : null}
            {isModalProdutos ? (
                <Produtos onClose = {() => setIsModalProdutos(false)} focoQtd={focoQtd} setDataSelectItem={setDataSelectItem} dataIdSelectEmitente={dataIdSelectEmitente} dataIdSelectPgt ={dataIdSelectPgt} dataSelectTop={dataSelectTop}/>
            ) : null}
        </C.Container>   
    );
}