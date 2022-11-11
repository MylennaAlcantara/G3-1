import React from "react";
import { Link } from "react-router-dom";
import * as C from "./consultar.js";


export const Consultar = () => {
    return(
        <C.Container>
            <C.Header>
                <button>Consultar</button>
                <Link to="/rotina"><button>Cadastrar</button></Link>
            </C.Header>
            <C.Filtro>
                <div className="div-checkbox">
                    <input type="radio" className="checkbox" />
                    <label>Número</label>
                    <input type="radio" className="checkbox" />
                    <label>Data</label>
                    <input type="radio" className="checkbox" />
                    <label>TOP</label>
                    <input type="radio" className="checkbox" />
                    <label>Cliente</label>
                    <input type="radio" className="checkbox" />
                    <label>Vendedor</label>
                </div>
                <select>
                    <option value="1">1 -RAYANE SUPERMECADOS</option>
                </select>
                <input className="search" placeholder="Buscar"/>
                <div>
                <label>Situação da Rotina</label>
                    <select>
                        <option value="2">Todas</option>
                        <option value="3">Pendente</option>
                        <option value="4">Emitida</option>
                        <option value="5">Bloqueada</option>
                        <option value="1">Em Aberto</option>
                    </select>
                </div>
                <div className="line"/>
                <div>
                    <input type="number" />
                    <label>So as minhas</label>
                    <input type="checkbox" />
                </div>
            </C.Filtro>
            <C.Rotinas>
                <table id="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data Venda</th>
                            <th>Empresa</th>
                            <th>Cliente</th>
                            <th>Situação</th>
                            <th>Valor</th>
                            <th>TOP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>bla lba la</td>
                        </tr>
                    </tbody>
                </table>
            </C.Rotinas>
            <C.Footer>
                <div>
                    <label>Para exibir atalhos pressione [Alt]</label>
                </div>
                <div>
                    <button>Novo</button>
                    <button>Abrir</button>
                    <button>Fechar</button>
                </div>
                <div className="indice">
                    <div>
                        <div className="yellow"/><label>Pendente</label>
                    </div>
                    <div>
                        <div className="white"/><label>NF-e/NFC-e</label>
                    </div>
                    <div>
                        <div className="green"/><label>Cupom F.</label>
                    </div>
                    <div>
                        <div className="blue"/><label>Mesclada</label>
                    </div>
                </div>
            </C.Footer>
        </C.Container>
    );
};