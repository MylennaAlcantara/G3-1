import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./consultar.js";


export const Consultar = () => {
    const [rotinas, setRotinas] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch('http://10.0.1.94:8091/preVenda/ofMonth'); // api POST e PUT -> http://10.0.1.10:8091/preVenda  minha Api fake -> http://localhost:5000/rotinas
            const data = await response.json();
            setRotinas(data);
        }
        fetchData();
    },[])
    console.log(rotinas);

    //Filtro busca
    const [busca, setBusca] = useState('');
    const [cliente, setCliente] = useState(false);

    const resultado = Array.isArray(rotinas) && rotinas.filter((rotina) => rotina.nome_cliente.toLowerCase().includes(busca));

    //Função dos botões
    const Novo = () => {
        navigate("/rotina")
    }
    const Abrir = () => {

    }
    const Fechar = () => {

    }

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
                        <option value="1">1 -RAYANE SUPERMERCADOS</option>
                    </select>
                    <input className="search" placeholder="Buscar" value={busca} onChange={e => setBusca(e.target.value)}/>
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
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.map((item)=>{
                            return(
                                <tr key={item.id} >
                                    <td>{item.id}</td>
                                    <td>{item.dataEmissao}</td>
                                    <td>{item.id_empresa}</td>
                                    <td>{item.nome_cliente}</td>
                                    <td>{item.situacao}</td>
                                    <td>{item.total}</td>
                                    <td>{item.id_top}</td>
                                </tr> 
                            )
                        })}
                        
                    </tbody>
                </table>
            </C.Rotinas>
            <C.Footer>
                <div>
                    <label>Para exibir atalhos pressione [Alt]</label>
                </div>
                <div >
                    <button onClick={Novo}>Novo</button>
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