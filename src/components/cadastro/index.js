import React, {useEffect, useState} from "react";
import { Modal } from "../modal/index.js";
import "../modal/modal.js";
import * as C from './cadastro.js';
import '../../App.js';


export const Cadastro = ({children}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    

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
                    <input className="f1" onClick={() => setIsModalVisible(true)}/>                    
                    <input className="option"/>
                    </div>
                    <div>
                    <label>T.O.P: </label>
                    <input className="f1" onClick={() => setIsModalVisible(true)}/>
                    <input className="option" />
                    </div>
                    <div>
                    <label>Vendedor: </label>
                    <input className="f1" onClick={() => setIsModalVisible(true)}/>
                    <input className="option"/>
                    </div>
                    <div>
                    <label>Parceiro: </label>
                    <input className="f1" onClick={() => setIsModalVisible(true)}/>
                    <input className="partner"/>
                    <label>CPF/CNPJ: </label>
                    <input/>
                    </div>
                    <div>
                    <label>Tipo pgto: </label>
                    <input className="f1" onClick={() => setIsModalVisible(true)}/>
                    <input className="option"/>
                    </div>
                </form>
                {/*<fieldset><legend>Observação</legend>Observação</fieldset>*/}
            </C.Info>
                
            <C.Header>
                <button>Produtos</button><button>Financeiro</button>
            </C.Header>
            <C.Add>
            <form>
                <label>Código: </label>
                <input/>
                <label>Quantidade: </label>
                <input className="add-item" placeholder="1,000"/>
                <label>Valor Unitário: </label>
                <input className="add-item"list="#"></input>
                <datalist></datalist>
                <div>
                <label>Desconto: </label>
                <input className="add-item" placeholder="0,000000"/><input className="add-item"/>
                </div>
                <label>Tota do item: </label>
                <input/>
                <br/>
                <div>
                <label>Descrição: </label>
                <input className="descrição"/>
                </div>
            </form>
            </C.Add>
            <C.Display>
                <div className="div-col">
                    <div>Item</div>
                    <div>Cód. I. </div>
                    <div>EAN</div>
                    <div>Descrição</div>
                    <div>Unidade</div>
                    <div>Quant.</div>
                    <div>Valor Unid.</div>
                    <div>Subtotal</div>
                    <div>Acres. R$</div>
                </div>
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
                <Modal onClose = {() => setIsModalVisible(false)}/>
            ) : null}
        </C.Container>   
    );
}