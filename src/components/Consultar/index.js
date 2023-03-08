import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext.js";
import * as C from "./consultar.js";


export const Consultar = ( {setCodigo, setDataEmissao, setHoraEmissao, matriculaFuncionario, senhaFuncionario} ) => {
    const [rotinas, setRotinas] = useState([]);
    const navigate = useNavigate();
    const {autenticar, user} = useContext(AuthContext);

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch('http://10.0.1.10:8091/preVenda/ofMonth'); // api POST e PUT -> http://10.0.1.10:8091/preVenda  minha Api fake ->  http://localhost:5000/rotinas
            const data = await response.json();
            setRotinas(data);
        }
        fetchData();
        autenticar();
        document.getElementById('search').focus();
    },[])

    //Filtro busca por: Top / id vendedor / codigo / cliente / data
    const [busca, setBusca] = useState('');
    const [filtroSelecionado, setFiltroSelecionado] = useState('cliente');

    function handleFiltroChange(event) {
        setFiltroSelecionado(event.target.value);
    }

    const resultado = Array.isArray(rotinas) && rotinas.filter((rotina) => {
        if(filtroSelecionado === 'cliente'){
            return rotina.nome_cliente.toLowerCase().includes(busca);
        }else if(filtroSelecionado === 'data'){
            return rotina.dataEmissao.toLowerCase().includes(busca);
        }else if(filtroSelecionado === 'top'){
            return rotina.id_top === Number(busca);
        }else if(filtroSelecionado === 'vendedor'){
            return rotina.id_funcionario === Number(busca);
        }else if(filtroSelecionado === 'numero'){
            return rotina.id === Number(busca);
        }
        
    });

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const handleKeyDown = (e) => {
        if(e.keyCode === 38){
            e.preventDefault();
            if(selectIndex === null || selectIndex === 0){
                return;
            }
            setSelectIndex(selectIndex-1);
        }else if (e.keyCode === 40){
            e.preventDefault();
            if(selectIndex === null || selectIndex === resultado.length -1 ){
                return;
            }
            setSelectIndex(selectIndex + 1);
        }
    };

    //Selecionar rotina para abrir para visualizar
    const [codigoRotina, setCodigoRotina] = useState();
    const selecionado = (index, item) => {
        setCodigoRotina(item.id);
        localStorage.setItem('rotina', item.id);
        setCodigo(item.id);
        setDataEmissao(item.dataEmissao);
        setHoraEmissao(item.hora_emissao);
        setSelectIndex(index);
    }



    //Função dos botões
    const Novo = () => {
        navigate("/rotina");
    }
    const abrirRotina = () => {
        navigate(`/rotina/${codigoRotina}`);
    }
    const abrirEditar = () => {
        if(codigoRotina === undefined){
            console.log('nenhuma rotina selecionada')
        }else{
        navigate(`/editarRotina/${codigoRotina}`);
        }
    }
    const Fechar = () => {

    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }
    return(
        <C.Container>
        <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} <button onClick={sair}>Sair</button></C.NaviBar>

            <C.Header>
                <h3>Consultar</h3>
            </C.Header>
            <C.Filtro>
                    <div className="div-checkbox">
                        <input type="radio"  value="numero" className="checkbox" name="checkbox" id="numero" checked={filtroSelecionado === 'numero'} onChange={handleFiltroChange}/>
                        <label>Número</label>
                        <input type="radio" value="data" className="checkbox" name="checkbox" id="data" checked={filtroSelecionado === 'data'} onChange={handleFiltroChange}/>
                        <label>Data</label>
                        <input type="radio" value="top" className="checkbox" name="checkbox" id="top" checked={filtroSelecionado === 'top'} onChange={handleFiltroChange}/>
                        <label>TOP</label>
                        <input type="radio" value="cliente" className="checkbox" name="checkbox" id="cliente" checked={filtroSelecionado === 'cliente'} onChange={handleFiltroChange}/>
                        <label>Cliente</label>
                        <input type="radio" value="vendedor" className="checkbox" name="checkbox" id="vendedor" checked={filtroSelecionado === 'vendedor'} onChange={handleFiltroChange}/>
                        <label>Id Vendedor</label>
                    </div>
                    <select>
                        <option value="1">1 -RAYANE SUPERMERCADOS</option>
                    </select>
                    <input className="search" id="search" placeholder="Buscar" value={busca} onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
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
                <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tableRef={0}>
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
                        { 
                        resultado.map((item, index)=>{
                            return(
                                <tr 
                                    key={item.id}
                                    onClick={selecionado.bind(this, index, item)}
                                    onDoubleClick={abrirRotina}
                                    style={{background: index === selectIndex ? '#87CEFA' : ''}} >
                                        <td>{item.id}</td>
                                        <td>{item.dataEmissao}</td>
                                        <td>{item.id_empresa}</td>
                                        <td>{item.nome_cliente}</td>
                                        <td>{item.situacao}</td>
                                        <td>{item.total}</td>
                                        <td>{item.id_top}</td>
                                </tr> 
                            )
                        })
                        }
                        
                    </tbody>
                </table>
            </C.Rotinas>
            <C.Footer>
                <div>
                    <label>Para exibir atalhos pressione [Alt]</label>
                </div>
                <div >
                    <button onClick={Novo}>Novo</button>
                    <button onClick={abrirEditar}>Abrir</button>
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