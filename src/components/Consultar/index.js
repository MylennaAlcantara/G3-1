import React from "react";
import * as C from "./consultar.js";


export const Consultar = () => {
    return(
        <C.Container>
            <C.Header>
                <button>Consultar</button><button>Cadastrar</button>
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
        </C.Container>
    );
};