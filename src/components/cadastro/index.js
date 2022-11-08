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



export const Cadastro = ({children}) => {

    /*Estado dos Modais */
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    const [dataSelectItem, setDataSelectItem] = useState('');
    
    /*Estado do id dos elementos selecionados no modal */
    const [dataIdSelectPartner, setDataIdSelectPartner] = useState('');
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState('');
    const [dataIdSelectTop, setDataIdSelectTop] = useState('');
    const [dataIdSelectSaler, setDataIdSelectSaler] = useState('');
    const [dataIdSelectPgt, setDataIdSelectPgt] = useState('');
    const [dataIdSelectItem, setDataIdSelectItem] = useState('');

    const [itens, setItens] = useState({
        cod: '', 
        quantidade: '',
        valorUnit: '',
        valorTotal: '',
        descricao: '',
    });
    const [listItens, setListItens] = useState([]);
    const [valorItem, setValorItem] = useState('');

    const changeHandler = e => {
        setItens({...itens, [e.target.name]: e.target.value})
    }

    function calcular() {
        var num1 = Number(document.getElementById("num1").value);
        var num2 = Number(document.getElementById("num2").value);
        var elemResult = document.getElementById("resultado");
    
        if (elemResult.textContent === undefined) {
           elemResult.textContent = "O resultado é " + String(num1 + num2) + ".";
        }
        else { // IE
           elemResult.innerText = "O resultado é " + String(num1 + num2) + ".";
        }
    }

    console.log(itens);
    console.log(listItens);

    return(
        
        <C.Container>
            
            <C.Header>
                <button>Consultar</button><button>Cadastrar</button>
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
                    <input className="f1" onClick={() => setIsModalEmitente(true)} value={dataIdSelectEmitente}/>                    
                    <input className="option" value={dataSelectEmitente}/>
                    </div>
                    <div>
                    <label>T.O.P: </label>
                    <input className="f1" onClick={() => setIsModalTop(true)} value={dataIdSelectTop}/>
                    <input className="option" value={dataSelectTop}/>
                    </div>
                    <div>
                    <label>Vendedor: </label>
                    <input className="f1" onClick={() => setIsModalSaler(true)} value={dataIdSelectSaler}/>
                    <input className="option" value={dataSelectSaler}/>
                    </div>
                    <div>
                    <label>Parceiro: </label>
                    <input className="f1" onClick={() => setIsModalVisible(true)}value={dataIdSelectPartner}/>
                    <input className="partner" value={dataSelectPartner}/>
                    <label>CPF/CNPJ: </label>
                    <input/>
                    </div>
                    <div>
                    <label>Tipo pgto: </label>
                    <input className="f1" onClick={() => setIsModalPgt(true)} value={dataIdSelectPgt}/>
                    <input className="option" value={dataSelectPgt}/>
                    </div>
                </form>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <button>Produtos</button><button>Financeiro</button>
            </C.Header>
            <C.Add>
            <form onSubmit={event =>{event.preventDefault(); setListItens([...listItens, itens]);}} >
                <label>Código: </label>
                <input onClick={() => setIsModalProdutos(true)} type="text" value={dataIdSelectItem} name="cod" onChange={changeHandler} />
                <button type="submit">lista</button>
                <label>Quantidade: </label>
                <input className="add-item" placeholder="1,000" name="quantidade" onChange={changeHandler} type="text" id="num1" onKeyUp="calcular();" />
                <label>Valor Unitário: </label>
                <input className="add-item" value={valorItem} name="valorUnit" onChange={changeHandler} type="text" id="num1" onKeyUp="calcular();"></input>
                <datalist></datalist>
                <div>
                <label>Desconto: </label>
                <input className="add-item" placeholder="0,000000"/><input className="add-item"/>
                </div>
                <label>Total do item: </label>
                <input name="valorTot" onChange={changeHandler}/>
                <br/>
                <div>
                <label>Descrição: </label>
                <input id="resultado" className="descrição" type="text" value={dataSelectItem} onChange={changeHandler} name="descricao" readonly/>
                </div>
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
                                <tr key={list}>
                                    <td>{index}</td>
                                    <td>{list.cod}</td>
                                    <td></td>
                                    <td>{list.descricao}</td>
                                    <td></td>
                                    <td>{list.quantidade}</td>
                                    <td>{list.valorUnit}</td>
                                    <td>{list.valorTotal}</td>
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
            {isModalVisible ? (
                <Modal onClose = {() => setIsModalVisible(false)} setDataSelectPartner={setDataSelectPartner} setDataIdSelectPartner={setDataIdSelectPartner}/>
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
                <Produtos onClose = {() => setIsModalProdutos(false)} setDataSelectItem={setDataSelectItem} setDataIdSelectItem={setDataIdSelectItem} setValorItem={setValorItem} />
            ) : null}
        </C.Container>   
    );
}