import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext.js";
import * as C from "./consultar.js";
import { rotinaPDF } from "../Relatorios/rotinaPDF.js";


export const Consultar = ( {setCodigo, setDataEmissao, setHoraEmissao, codRotina} ) => {
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

    //Filtro da situação das rotinas
    const select = document.getElementById('opções');
    const [filtroEscolhido, setFiltroEscolhido] = useState('T');
    function FiltroSituacao (){
        if(select.value === '1'){
            setFiltroEscolhido('A');
        }else if(select.value === '2'){
            setFiltroEscolhido('T');
        }else if(select.value === '3'){
            setFiltroEscolhido('P');
        }else if(select.value === '4'){
            setFiltroEscolhido('E');
        }else if(select.value === '5'){
            setFiltroEscolhido('B');
        }
    }
    const resultado2 = Array.isArray(rotinas) && rotinas.filter((rotina) => {
        if(filtroEscolhido === 'P' ){
            return rotina.situacao === 'P';
        }else if(filtroEscolhido === 'B'){
            return rotina.situacao ==='B';
        }else if(filtroEscolhido === 'T'){
            return rotina.situacao;
        }else if(filtroEscolhido === 'E'){
            return rotina.situacao ==='E'
        }else if(filtroEscolhido === 'A'){
            return rotina.situacao != 'E';
        }
    });

    //Filtro busca por: Top / id vendedor / codigo / cliente / data
    const [busca, setBusca] = useState('');
    const [filtroSelecionado, setFiltroSelecionado] = useState('cliente');

    function handleFiltroChange(event) {
        setFiltroSelecionado(event.target.value);
    }

    const resultado = Array.isArray(resultado2) && resultado2.filter((rotina) => {
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
    const [selectIndex, setSelectIndex] = useState(1);
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

console.log(codigoRotina)

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

    const [rotina, setRotina] = useState([]);
    const [vendedor, setVendedor] = useState([]);
    const [parceiro, setParceiro] = useState([]);
    const [tipoPagamento, setTipoPagamento] = useState([]);
    const [emitente, setEmitente] = useState([]);
    const [horaImpressao, setHoraImpressao] = useState('');
    
    const data = new Date();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const horaAtual = String(hora + ':' + minuto + ':' + segundo);
    
    useEffect(()=>{
        async function setarHoraData(){
            setHoraImpressao(String(horaAtual));
        } 
        setarHoraData();
    },[]);

    const imprimir = async() => {
        const responseRotina = await fetch(`http://10.0.1.10:8091/preVenda/${codigoRotina}`); //http://10.0.1.10:8091/preVenda/id
        const rotina = await responseRotina.json();
        setRotina(rotina);
        const responseVendedor = await fetch('http://10.0.1.10:8099/user/all'); 
        const vendedor = await responseVendedor.json();
        setVendedor(vendedor);
        const responseParceiro = await fetch('http://10.0.1.10:8099/clientes');
        const parceiro = await responseParceiro.json();
        setParceiro(parceiro);
        const responseTipoPagamento = await fetch('http://10.0.1.10:8092/tipoPagamento/all'); 
        const tipoPagamento = await responseTipoPagamento.json();
        setTipoPagamento(tipoPagamento);
        const responseEmitente = await fetch('http://10.0.1.10:8092/emitente/all'); 
        const Emitente = await responseEmitente.json();
        setEmitente(Emitente);
        rotinaPDF(rotina, vendedor, parceiro, tipoPagamento, emitente, horaImpressao);
    }
    const Fechar = () => {

    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    function comparar (a, b){
        if(a.id < b.id){
            return 1;
        }
        if(a.id > b.id){
            return -1
        }
        return 0;
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
                        <select id="opções" onChange={FiltroSituacao}>
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
                    <tbody >
                        { 
                        resultado.sort(comparar).map((item, index)=>{
                            return(
                                <tr 
                                    key={item.id}
                                    onClick={selecionado.bind(this, index, item)}
                                    onDoubleClick={abrirRotina}
                                    className={item.situacao === 'E' ? 'white' : item.situacao ==='B' ? 'red' : 'yellow'}
                                    style={{background: index === selectIndex ? '#87CEFA' : ''}} >
                                        <td>{item.id}</td>
                                        <td>{item.dataEmissao}</td>
                                        <td>{item.id_empresa}</td>
                                        <td>{item.nome_cliente}</td>
                                        <td>{item.situacao}</td>
                                        <td>{parseFloat(item.total).toFixed(2).replace('.',',')}</td>
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
                    <button onClick={Novo}><img src="/images/add.png"/>Novo</button>
                    <button onClick={abrirEditar}><img src="/images/abrir.png"/>Abrir</button>
                    <button onClick={imprimir}><img src="/images/printer.png"/>Imprimir</button>
                    <button><img src="/images/voltar.png"/>Fechar</button>
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