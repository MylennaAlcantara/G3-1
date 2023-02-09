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




export const Cadastro = ({children}) => {
    const [subtotal, setSubtotal] = useState('');
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
        subtotal: ''
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

    const [counter, setCounter] = useState(0);
    console.log(counter);
    const changeHandler = e => {
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value, item: counter+1});
    }
 
    // Calcular o valor de quantidade vezes o valor para o total 
    const [numero1, setNumero1] = useState(0);
    const [numero2, setNumero2] = useState(0);
    const [total, setTotal] = useState(0);

    const calcular = () =>{
        return parseFloat(numero1) * parseFloat(numero2);
    }

    useEffect(()=>{
        setTotal(calcular());
    }, [numero1,numero2]);

    //Calcular total da rotina
    const [desconto, setDesconto] = useState();
    const [acrescimo, setAcrescimo] = useState();

     const totalVenda = listItens.reduce((a,b) => parseFloat(a) + parseFloat(b.valor_total), 0);   


    // Funções para abrir o modal de cada campo apertando F2
    function onKeyUp(event){
        if(	event.keyCode === 113){
            setIsModalEmitente(true);
        }    
    }
    function keyProduto(event){
        if( event.keyCode === 113){
            setIsModalProdutos(true);
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
    function NextQuantidade (e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById('quantidade').focus();
        }
    }
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

    const [dataEmissao, setDataEmissao] = useState('');
    const [horaEmissao, setHoraEmissao] = useState('');

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = ano + '-' + mes + '-' + dia;

    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = hora + ':' + minuto + ':' + segundo;


    //console.log(dataEmissao);
    //console.log(horaEmissao);

    //envio para a api das informações armazenadas
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataEmissao(dataAtual);
        setHoraEmissao(horaAtual);
        try{
            const res = await fetch("http://10.0.1.94:8091/preVenda", { //http://10.0.1.10:8091/preVenda
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
                    desconto: '',
                    dataEmissao: dataEmissao,
                    hora_emissao: horaEmissao,
                    total: totalVenda,
                    subtotal: totalVenda,
                    valor_extenso: '',
                    observacao_pre_venda: '',
                    tipo_venda: 'V',
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

        const navigate = useNavigate();


        const HandleLogout = async () => {
                setToken();
                localStorage.clear();
        }

        const Selecionado = (id) => {
            const newList = listItens.filter((item) => item != id);
            setListItens(newList);
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
                            <div>
                                <div id="line"></div>
                                <input type="radio" className="radio" name="Atacado"></input>
                                <label>Atacado</label>
                                <input type="radio" className="radio" name="Varejo"></input>
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
                        <input name="id_empresa" className="f1" id="emitente" onKeyDown={NextTop} onKeyUp={onKeyUp} value={dataIdSelectEmitente} required/>                    
                        <input name="emitente" className="option" value={dataSelectEmitente}/>
                        </div>
                        <div>
                        <label>T.O.P: </label>
                        <input name="cod_top" className="f1" id="top" onKeyDown={NextVendedor} onKeyUp={keyTop} value={dataIdSelectTop} required/>
                        <input name="top" className="option" value={dataSelectTop}/>
                        </div>
                        <div>
                        <label>Vendedor: </label>
                        <input name="cod_vendedor" className="f1" id="vendedor" onKeyDown={NextParceiro} onKeyUp={keySaler} value={dataIdSelectSaler}/>
                        <input name="vendedor" className="option" value={dataSelectSaler}/>
                        </div>
                        <div>
                            <label>Parceiro: </label>
                            <input className="f1" name="cod_partner" id="parceiro" onKeyDown={NextPgto} onKeyUp={keyPartner} value={dataIdSelectPartner} />
                                    <div className="div-partner">
                                        <input name="partner" className="partner" value={dataSelectPartner} />
                                        <label>CPF/CNPJ: </label>
                                        <input className="cpf"/>
                                    </div>
                        </div>
                        <div>
                        <label>Tipo pgto: </label>
                        <input className="f1" id="pgto" onKeyUp={keyPgt} value={dataIdSelectPgt} />
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
            <form onSubmit={event =>{event.preventDefault(); setListItens([...listItens, dataSelectItem]); setCounter(prevCounter => prevCounter + 1);}} >
                <div>
                <label>Código: </label>
                <input onKeyDown={NextQuantidade} onKeyUp={keyProduto} type="text" value={dataSelectItem.id_produto} name="id_produto" onBlur={changeHandler} />
                </div>
                <div>
                <label>Quantidade: </label>
                <input  placeholder="1,000" name="quantidade" type="text" value={numero1} onChange={(e) => setNumero1(e.target.value)} onBlur={changeHandler} onKeyDown={NextValorUnit} id="quantidade"  />
                </div>
                <div>
                <label>Valor Unitário: </label>
                <input className="add-item" value={dataSelectItem.valor_unitario} name="valor_unitario" onFocus={(e) => setNumero2(e.target.value)} onBlur={changeHandler} onKeyDown={NextAddItem} type="text" id="valorUnit"/>
                <datalist></datalist>
                </div>
                <div>
                <label>Desconto: </label>
                <input id="add-item" className="add-item" placeholder="0,000000" onKeyDown={NextAddItem2}/><input id="add-item2" className="add-item" type="text" onKeyDown={NextTotal} />
                </div>
                <div>
                <label>Total do item: </label>
                <input type="text" name="valor_total" id="Total" value={total} onFocus={changeHandler} onKeyDown={NextSubtotal}  />
                <label>Subtotal</label>
                <input name='subtotal' id="subtotal" value={total} onFocus={changeHandler} onKeyDown={NextDescrição}/>
                <br/>
                </div>
                <div className="div-descrição" >
                <label>Descrição: </label>
                <input id="descrição" className="descrição" type="text" value={dataSelectItem.descricao_produto} onFocus={changeHandler} name="descricao_produto" readOnly/>
                </div>
                <button>add</button>
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
                            <th>Acres. R$</th>                        
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
                                    <td>{list.valor_total}</td>
                                    <td>{list.subtotal}</td>
                                    <img src="/images/lixeira.png" className="button-excluir" onClick={Selecionado.bind(this, list)}/>
                                </tr>
                            )
                            })}                         
                    </tbody>
                </table>
            </C.Display>
            <C.Footer>
                <form>
                    <div>
                    <label>Pré-desconto:</label>
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
                    <label>Desconto Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button className="liberar" onClick={handleSubmit}><img src="/images/salvar.png"/>Liberar</button>
                    <button className="Excluir"><img src="/images/lixeira.png"/>Excluir</button>
                    <button className="Voltar" onClick={Voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalPartner ? (
                <Modal onClose = {() => setIsModalPartner(false)} setDataSelectPartner={setDataSelectPartner} setDataIdSelectPartner={setDataIdSelectPartner}/>
            ) : null}
            {isModalEmitente ? (
                <Emitente onClose = {() => setIsModalEmitente(false)} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente}/>
            ) : null}
            {isModalTop ? (
                <Top onClose = {() => setIsModalTop(false)} setDataSelectTop={setDataSelectTop} setDataIdSelectTop={setDataIdSelectTop}/>
            ) : null}
            {isModalSaler ? (
                <Saler onClose = {() => setIsModalSaler(false)} setDataSelectSaler={setDataSelectSaler} setDataIdSelectSaler={setDataIdSelectSaler}/>
            ) : null}
            {isModalPgt ? (
                <Pgt onClose = {() => setIsModalPgt(false)} setDataSelectPgt={setDataSelectPgt} setDataIdSelectPgt={setDataIdSelectPgt}/>
            ) : null}
            {isModalProdutos ? (
                <Produtos onClose = {() => setIsModalProdutos(false)} setDataSelectItem={setDataSelectItem}/>
            ) : null}
        </C.Container>   
    );
}