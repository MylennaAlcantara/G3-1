import React from "react";
import * as C from './cadastro.js';

export const Cadastro = () => {
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
                    <input type="checkbox"/>
                    <label>Aprovado</label>
                    <input type="checkbox"/>
                    <label>Cancelado</label>
                    <input type="checkbox"/>
                    <label>Entregue</label>
                </div>
                </form>
                <form className="information">
                    <div>
                    <label>Emitente: </label>
                    <input className="f1"/>
                    <input className="option"/>
                    </div>
                    <div>
                    <label>T.O.P: </label>
                    <input className="f1"/>
                    <input className="option"/>
                    </div>
                    <div>
                    <label>Vendedor: </label>
                    <input className="f1"/>
                    <input className="option"/>
                    </div>
                    <div>
                    <label>Parceiro: </label>
                    <input className="f1"/>
                    <input className="partner"/>
                    <label>CPF/CNPJ: </label>
                    <input/>
                    </div>
                    <div>
                    <label>Tipo pgto: </label>
                    <input className="f1"/>
                    <input className="option"/>
                    </div>
                </form>
                <fieldset><legend>Observação</legend>Observação</fieldset>
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
                <label>Desconto: </label>
                <input className="add-item" placeholder="0,000000"/><input className="add-item"/>
                <label>Tota do item: </label>
                <input/>
                <br/>
                <label>Descrição: 
                <input className="descrição"/></label>
            </form>
            </C.Add>
            <C.Display>

            </C.Display>
            <C.Footer>
                <form>
                    <div>
                    <label>Pré-desconto:</label>
                    <input placeholder="0,000000"/>
                    <label>Acrésc. Total(R$): </label>
                    <input placeholder="0,000000"/>
                    <label className="total-itens"></label>
                    <label>Subtotal da Rotina: </label>
                    <input/>
                    <label>Total da Rotina: </label>
                    <input/>
                    </div>
                    <div>
                    <label>Desconto Total(R$): </label>
                    <input placeholder="0,000000"/>
                    </div>
                </form>
                <div className="buttons">
                    <button className="liberar">Liberar</button>
                    <button className="Excluir">Excluir</button>
                    <button className="Voltar">Voltar</button>
                </div>
            </C.Footer>
        </C.Container>   
    );
}