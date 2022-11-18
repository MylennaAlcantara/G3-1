import React, {useEffect, useState} from "react";
import { Modal, Selected } from "../modal/index.js";
import { Saler } from "../modal_vendedor/index.js";
import "../modal/modal.js";
import * as C from './cadastro.js';
import '../../App.js';
import { Emitente } from "../modal_emitente/index.js";
import { Top } from "../modal_top/index.js";
import { Pgt } from "../modal_pgt/index.js";
import { Produtos } from "../modal_produtos/index.js";
import { Link } from "react-router-dom";




export const Cadastro = ({children}) => {

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
        cod: '', 
        quantidade: '',
        valorUnit: '',
        Total: '',
        descricao: '',
        unidade_produto_nome: '',
    });
    
    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState('');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState('');
    const [dataIdSelectTop, setDataIdSelectTop] = useState('');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState('');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState('');

    //Atualização da lista de itens
    const [listItens, setListItens] = useState([]);
    
    const changeHandler = e => {
        setDataSelectItem({...dataSelectItem, [e.target?.name]: e.target?.value});
        
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
    
    return(
        
        <C.Container>
            
            <C.Header>
            <Link to="/consultar"><button>Consultar</button></Link>
                <button>Cadastrar</button>
            </C.Header>
            <C.Info>
                <form>
                <label>Código da rotina: </label>
                <input className="cod"></input>
                <div id="line"></div>
                <input type="radio" className="radio" name="Atacado"></input>
                <label>Atacado</label>
                <input type="radio" className="radio" name="Varejo"></input>
                <label>Varejo</label>
                <div id="line"></div>
                <div className="checkbox">
                    <input type="checkbox" className="checkbox-box"/>
                    <label>Aprovado</label>
                    <input type="checkbox" className="checkbox-box"/>
                    <label>Cancelado</label>
                    <input type="checkbox" className="checkbox-box"/>
                    <label>Entregue</label>
                </div>
                </form>
                <form className="information">
                    <div>
                    <label>Emitente: </label>
                    <input className="f1" onKeyUp={onKeyUp} value={dataIdSelectEmitente}/>                    
                    <input className="option" value={dataSelectEmitente}/>
                    </div>
                    <div>
                    <label>T.O.P: </label>
                    <input className="f1" onKeyUp={keyTop} value={dataIdSelectTop}/>
                    <input className="option" value={dataSelectTop}/>
                    </div>
                    <div>
                    <label>Vendedor: </label>
                    <input className="f1" onKeyUp={keySaler} value={dataIdSelectSaler}/>
                    <input className="option" value={dataSelectSaler}/>
                    </div>
                    <div>
                    <label>Parceiro: </label>
                    <input className="f1" onKeyUp={keyPartner} value={dataIdSelectPartner}/>
                    <input className="partner" value={dataSelectPartner}/>
                    <label>CPF/CNPJ: </label>
                    <input/>
                    </div>
                    <div>
                    <label>Tipo pgto: </label>
                    <input className="f1" onKeyUp={keyPgt} value={dataIdSelectPgt}/>
                    <input className="option" value={dataSelectPgt}/>
                    </div>
                </form>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <button>Produtos</button><button>Financeiro</button>
            </C.Header>
            <C.Add>
            <form onSubmit={event =>{event.preventDefault(); setListItens([...listItens, dataSelectItem]);}} >
                <label>Código: </label>
                <input onKeyDown={NextQuantidade} onKeyUp={keyProduto} type="text" value={dataSelectItem.cod} name="cod" onBlur={changeHandler} />
                <label>Quantidade: </label>
                <input  placeholder="1,000" name="quantidade" type="text" value={numero1} onChange={(e) => setNumero1(e.target.value)} onBlur={changeHandler} onKeyDown={NextValorUnit} id="quantidade"  />
                <label>Valor Unitário: </label>
                <input className="add-item" value={dataSelectItem.valorUnit} name="valorUnit" onFocus={(e) => setNumero2(e.target.value)} onBlur={changeHandler} onKeyDown={NextAddItem} type="text" id="valorUnit"/>
                <datalist></datalist>
                <div>
                <label>Desconto: </label>
                <input id="add-item" className="add-item" placeholder="0,000000" onKeyDown={NextAddItem2}/><input id="add-item2" className="add-item" type="text" onKeyDown={NextTotal} />
                </div>
                <label>Total do item: </label>
                <input type="text" name="Total" id="Total" value={total} onFocus={changeHandler} onKeyDown={NextDescrição} />
                <br/>
                <div>
                <label>Descrição: </label>
                <input id="descrição" className="descrição" type="text" value={dataSelectItem.descricao} onFocus={changeHandler} name="descricao" readOnly/>
                </div>
                <button type="submit"> enviar </button>
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
                                    <td>{index}</td>
                                    <td>{list.cod}</td>
                                    <td>{list.ean}</td>
                                    <td>{list.descricao}</td>
                                    <td>{list.unidade_produto_nome}</td>
                                    <td>{list.quantidade}</td>
                                    <td>{list.valorUnit}</td>
                                    <td>{list.Total}</td>
                                    <td></td>
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
                    <input/>
                    </div>
                    <div>
                    <label>Total da Rotina: </label>
                    <input/>
                    </div> 
                    <div>
                    <label>Desconto Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button className="liberar"><img src="/images/salvar.png"/>Liberar</button>
                    <button className="Excluir"><img src="/images/lixeira.png"/>Excluir</button>
                    <button className="Voltar"><img src="/images/voltar.png"/>Voltar</button>
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
                <Produtos onClose = {() => setIsModalProdutos(false)} setDataSelectItem={setDataSelectItem}  />
            ) : null}
        </C.Container>   
    );
}