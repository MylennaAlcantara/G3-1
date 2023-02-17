import React, {useEffect, useState} from "react";
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




export const Cadastro = () => {
    const navigate = useNavigate();
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
    const [dataSelectTop, setDataSelectTop] = useState('');
    const [dataSelectSaler, setDataSelectSaler] = useState('');
    const [dataSelectPgt, setDataSelectPgt] = useState('');
    const [dataSelectItem, setDataSelectItem] = useState({
        id: '',
        gtin: '',
        valor_venda: '',
        descricaoPdv: '',
        unidade_produto_nome: '',
        subtotal: '',
        desconto: '',
        descontoPorcen:''
    });
    
    
    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState('');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState('');
    const [dataIdSelectTop, setDataIdSelectTop] = useState('');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState('');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState('');

    //Atualização da lista de itens
    const [listItens, setListItens] = useState([]);
    console.log(listItens);

    const [counter, setCounter] = useState(listItens.length+1);
    console.log(counter);

    
    const changeHandler = e => {
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
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
    }

    //Calcular total da rotina
    const [descontoValor, setDescontoValor] = useState(0);
    const [descontoPorcen, setDescontoPorcen] = useState(0);
    const [acrescimo, setAcrescimo] = useState();

    function valorDescontoPer (e) {
        setDescontoPorcen((e.target.value).replace(",", "."));
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
    }
    function valorDesconto (e) {
        setDescontoValor((e.target.value).replace(",", "."));
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter});
    }

    function handleValorBlur (){
        const valor = parseFloat(descontoPorcen).toFixed(2).replace("NaN", " ").replace(".", ",");
        setDescontoPorcen(valor);
        const valor2 = parseFloat(descontoValor).toFixed(2).replace("NaN", " ").replace(".", ",");
        setDescontoValor(valor2);
    }
    function handleValorTotalBlur () {
        const totalItem = parseFloat(total).toFixed(2).replace("NaN", " ").replace(".", ",");
        setTotal(totalItem);
    }
    function handleValorSubtotalBlur () {
        const totalItem = parseFloat(subtotal).toFixed(2).replace("NaN", " ").replace(".", ",");
        setSubtotal(totalItem);
    }

    // Calcular o valor de quantidade vezes o valor para o total 
    const [numero1, setNumero1] = useState(1);
    const [numero2, setNumero2] = useState(0);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    const calcular = () =>{
        return parseFloat(numero1) * parseFloat(numero2);
    }

    const calcularSubtotal = () => {
        return (parseFloat(numero1) * parseFloat(numero2)) - parseFloat(descontoValor);
    }

    const condição = () => {
        if(descontoPorcen === '0,00' || descontoPorcen === 0 || descontoPorcen === ''){
            return descontoValor
        }else{
            return (parseFloat(total) * parseFloat(descontoPorcen)) / 100;
        }
    }

    useEffect(()=>{
        setTotal(calcular());
        setDescontoValor(condição());
        setSubtotal(calcularSubtotal());
    }, [numero1,numero2,descontoValor,total,descontoPorcen]);
 
     const totalVenda = listItens.reduce((a,b) => parseFloat(a) + parseFloat(b.subtotal), 0).toFixed(2);   

    // Funções para abrir o modal de cada campo apertando F2
    function onKeyUp(event){
        if(	event.keyCode === 113){
            setIsModalEmitente(true);
        }    
    }
    function keyProduto(event){
        if( event.keyCode === 113 && document.getElementById('emitente').value && document.getElementById('pgto').value && document.getElementById('vendedor').value && document.getElementById('top').value && document.getElementById('parceiro').value){
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
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('valorUnit').focus();
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
                        id_top: dataIdSelectTop,
                        id_cliente: dataIdSelectPartner,
                        nome_cliente: dataSelectPartner,
                        id_funcionario: dataIdSelectSaler,
                        id_tipo_pagamento: dataIdSelectPgt,
                        situacao: 'P',
                        descontoValor: '',
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

    const [token, setToken] = useState();
    useEffect(()=>{
        const logged = localStorage.getItem('token');
        if(logged){
            const foundUser = JSON.parse(logged);
            setToken(foundUser);
        }
    },[]);

    const HandleLogout = async () => {
            setToken();
            localStorage.clear();
    }

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
            <Link to="/"><button onClick={HandleLogout}>Sair</button></Link>
            <C.Header>
            <Link to="/consultar"><button>Consultar</button></Link>
                <button>Cadastrar</button>
            </C.Header>
            <C.Info>
                <div className="div-info">
                    <form>
                        <div>
                            <label>Código da rotina: </label>
                            <input className="cod"></input>
                        </div>
                        <div id="checkbox">
                            <form>
                                <div id="line"></div>
                                <input type="radio" id="atacado" className="radio" name="radio" value='atacado' onFocus={validarTipoVenda2}></input>
                                <label>Atacado</label>
                                <input type="radio" id="varejo" className="radio" name="radio" value='varejo' onFocus={validarTipoVenda} checked></input>
                                <label>Varejo</label>
                                <div id="line"></div>
                            </form>
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
                        <input name="id_empresa" className="f1" id="emitente" onKeyDown={NextTop} onKeyUp={onKeyUp} value={dataIdSelectEmitente} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>                    
                        <input name="emitente" className="option" value={dataSelectEmitente}/>
                        </div>
                        <div>
                        <label>T.O.P: </label>
                        <input name="cod_top" className="f1" id="top" onKeyDown={NextVendedor} onKeyUp={keyTop} value={dataIdSelectTop} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input name="top" className="option" value={dataSelectTop}/>
                        </div>
                        <div>
                        <label>Vendedor: </label>
                        <input name="cod_vendedor" className="f1" id="vendedor" onKeyDown={NextParceiro} onKeyUp={keySaler} value={dataIdSelectSaler} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input name="vendedor" className="option" value={dataSelectSaler} />
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" onKeyDown={NextPgto} onKeyUp={keyPartner} value={dataIdSelectPartner} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                                    <div className="div-partner">
                                        <input name="partner" className="partner" value={dataSelectPartner} />
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                        </div>
                        <div>
                        <label>Tipo pgto: </label>
                        <input className="f1" id="pgto" onKeyUp={keyPgt} value={dataIdSelectPgt} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                        <input id="option_pgto" className="option" value={dataSelectPgt}/>
                        </div>
                    </form>
                </div>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <label>Produtos</label>
            </C.Header>
            <C.Add>
            <form onSubmit={event =>{event.preventDefault(); setListItens([...listItens, dataSelectItem]); setCounter(prevCounter => prevCounter + 1); zerarInput();}} >
                <div>
                <label>Código: </label>
                <input id="produto" onKeyDown={keyProduto} type="text" value={dataSelectItem.id_produto} name="id_produto" onBlur={changeHandler} title='Aperte F2 para listar as opções' style={{backgroundColor: cor}} required/>
                </div>
                <div>
                <label>Qtd: </label>
                <input  placeholder="1,000" name="quantidade" type="text" value={numero1} onChange={(e) => setNumero1(e.target.value)} onBlur={changeHandler} onKeyDown={NextValorUnit} id="quantidade"  required/>
                </div>
                <div>
                <label>Vl. Unit.: </label>
                <input className="add-item" value={dataSelectItem.valor_unitario} name="valor_unitario" onFocus={(e) => setNumero2(e.target.value)} onBlur={changeHandler} onKeyDown={NextAddItem} type="text" id="valorUnit" required/>
                <datalist></datalist>
                </div>
                <div>
                <label>Desc.: </label>
                <input id="add-item" name="descontoPorcen" className="add-item" placeholder="0,000000%" type="text"  onKeyDown={NextAddItem2} onFocus={changeHandler} onChange={valorDescontoPer} onBlur={handleValorBlur} value={descontoPorcen}/>% / R$
                <input id="add-item2" name="desconto" className="add-item" placeholder="R$ 0,000000" type='text' onKeyDown={NextTotal} onChange={valorDesconto} onFocus={changeHandler} onBlur={handleValorSubtotalBlur}  value={descontoValor}/>
                </div>
                <div>
                <label>Total do item: </label>
                <input type="text" name="valor_total" id="Total" value={total} onBlur={handleValorTotalBlur} onFocus={changeHandler} onKeyDown={NextSubtotal}  required/>
                <label>Subtotal</label>
                <input name='subtotal' id="subtotal" value={subtotal} onFocus={changeHandler} onKeyDown={NextDescrição} required/>
                <br/>
                </div>
                <div className="div-descrição" >
                <label>Descrição: </label>
                <input id="descrição" className="descrição" type="text" value={dataSelectItem.descricao_produto} onFocus={changeHandler} name="descricao_produto" readOnly required/>
                </div>
                <button onSubmit={zerarInput}>add</button>
            </form>
            </C.Add>
            <C.Display>
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
                                    <td>{list.quantidade}</td>
                                    <td>{list.valor_unitario}</td>
                                    <td>{list.subtotal}</td>
                                    <td>{list.desconto}</td>
                                    <img src="/images/lixeira.png" className="button-excluir" onClick={Deletar.bind(this, list, index)}/>
                                </tr>
                            )
                            })}                         
                    </tbody>
                </table>
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
                    <input value={totalVenda}/>
                    </div>
                    <div>
                    <label>Total da Rotina: </label>
                    <input value={totalVenda}/>
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
                <Top onClose = {() => setIsModalTop(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectTop={setDataSelectTop} setDataIdSelectTop={setDataIdSelectTop}/>
            ) : null}
            {isModalSaler ? (
                <Saler onClose = {() => setIsModalSaler(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectSaler={setDataSelectSaler} setDataIdSelectSaler={setDataIdSelectSaler}/>
            ) : null}
            {isModalPgt ? (
                <Pgt onClose = {() => setIsModalPgt(false)} focoCampoSeguinte={focoCampoSeguinte} setDataSelectPgt={setDataSelectPgt} setDataIdSelectPgt={setDataIdSelectPgt}/>
            ) : null}
            {isModalProdutos ? (
                <Produtos onClose = {() => setIsModalProdutos(false)} focoQtd={focoQtd} setDataSelectItem={setDataSelectItem} dataIdSelectEmitente={dataIdSelectEmitente} dataIdSelectPgt ={dataIdSelectPgt}/>
            ) : null}
        </C.Container>   
    );
}