import React, {useEffect, useState, useRef, useContext} from "react";
import { Loading } from "../../../loading/index";
import * as C from "../../../cadastro/cadastro";
import * as CO from "../../../Consultar/consultar";
import * as CCL from "../../consulta_cliente/consultaCliente";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/Auth/authContext";


export const ConsultaTop = ({}) => {
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);

    const [top, setTop] = useState([]);
    const [selectTop, setSelectTop] = useState();
    const [selectIdTop, setSelectIdTop] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('codigo');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2004/top/all");//http://localhost:5000/tops
            const data = await response.json();
            setTop(data);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const SelectedTop = (top) => {
        
    };

    // Filtro de busca

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value)
    };

    const resultado = Array.isArray(top) && top.filter((top) => {
        if(filtro === 'codigo'){
            return String(top.id).toLowerCase().includes(busca);
        }else if(filtro === 'descricao'){
            return top.descricao.toLowerCase().includes(busca);
        }
    });

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (top, index) => {
        setSelectIndex(index);
    }

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

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}</C.NaviBar>
            <C.Header>
                <h3>Top</h3>
            </C.Header>
            <CO.Filtro>
                <div className="div-checkbox">
                    <div>
                        <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange}/>
                        <label> Código </label>
                    </div>
                    <div>
                        <input type="radio" value="descricao" className="checkbox" name="checkbox" checked={filtro === 'descricao'} onChange={handleFiltroChange}/>
                        <label> Descrição </label>
                    </div>
                </div>
                <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>               
            </CO.Filtro>
            <CCL.Lista>
                {top.length === 0 ? (
                    <Loading/>
                ) : (
                <div className="table-responsive" style={{height: "80%"}}>
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0} >
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Mov. Est. reservado</th>
                                    <th>Mov. Est. Real</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.slice(0, 10).map( (top, index) => {
                                    return(
                                        <tr 
                                        key={top.id} 
                                        onClick={selecionado.bind(this, top, index)}
                                        onDoubleClick={SelectedTop.bind(this, top)}
                                        style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}} >
                                            <td>{top.id}</td>
                                            <td>{top.descricao}</td>
                                            <td>{top.rotina_movimenta_estoque_reservado === false ? ('Não') : ('Sim')}</td>
                                            <td>{top.rotina_movimenta_estoque_real === false ? ('Não') : ('Sim')}</td>                                   
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={()=> navigate('/cadastrarTop')}><img src="/images/add.png"/>Novo</button>
                    <button><img src="/images/abrir.png"/>Abrir</button>
                    <button onClick={()=> navigate('/home')}><img src="/images/voltar.png"/>Fechar</button>
                </div>
            </C.Footer>
        </C.Container>
    );
};