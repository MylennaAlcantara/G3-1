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
                    <label>Emitente: 
                    <input className="f1"/>
                    </label>
                    <input className="option"/>
                    <label>T.O.P: 
                    <input className="f1"/>
                    <input className="option"/>
                    </label>
                    <label>Vendedor: 
                    <input className="f1"/>
                    <input className="option"/>
                    </label>
                    <label>Parceiro: 
                    <input className="f1"/>
                    <input className="partner"/>
                    </label>
                    <label>CPF/CNPJ: </label>
                    <input/>
                    <label>Tipo pgto: 
                    <input className="f1"/>
                    <input className="option"/>
                    </label>
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
                <input/>
                <label>Valor Unitário: </label>
                <input list="#"></input>
                <datalist></datalist>
                <label>Desconto: </label>
                <input/><input/>
                <label>Tota do item: </label>
                <input/>
                <label>Descrição: </label>
                <input/>
            </form>
            </C.Add>
            <C.Display>

            </C.Display>
            <C.Footer>
                
            </C.Footer>
        </C.Container>   
    );
}