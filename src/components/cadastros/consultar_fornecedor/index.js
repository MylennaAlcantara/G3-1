import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal" 
import * as CCL from "../../cadastros/consulta_cliente/consultaCliente";
import { AuthContext } from "../../../contexts/Auth/authContext";
import {Loading} from "../../loading";
export const ConsultarFornecedor = () => {
    const navigate = useNavigate();
    const {user, empresa, nivel, cnpjMask} = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('social');

    // Filtro de busca
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2005/fornecedor/all");
            const data = await response.json();
            setUsers(data);
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'fantasia'){
            return user.nome_fantasia.toLowerCase().includes(busca);
        }else if(filtro === 'codigo'){
            return String(user.id).toLowerCase().includes(busca);
        }else if(filtro === 'documento'){
            return String(user.numero_documento).toLowerCase().includes(busca);
        }else{
            return user.razao_social.toLowerCase().includes(busca);
        }
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (user, index) => {
        setSelectIndex(index);
        localStorage.setItem('idFornecedor', user.id);
        setCodigoFornecedor(user.id);
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

    const novo = () => {
        if(nivel.cadastro_fornecedor_incluir){
            navigate("/cadastrarFornecedor");
        }else{
            alert("Nivel de acesso negado!");
        }
    }
    const [codigoFornecedor, setCodigoFornecedor] = useState();
    const abrirEditar = async() => {
        if(nivel.cadastro_fornecedor_editar){
            const responseFornecedor = await fetch(`http://8b38091fc43d.sn.mynetname.net:2005/fornecedor/${codigoFornecedor}`);
            const fornecedor = await responseFornecedor.json();
            if(codigoFornecedor === undefined || codigoFornecedor === null){
                console.log('nenhum fornecedor selecionado')
            }else{
            navigate(`/editarFornecedor/${codigoFornecedor}`);
            }
        }else{
            alert("Nivel de acesso negado!");
        }
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Fornecedores</h3>
            </C.Header>
            <M.Filtro>
                <div className="div-checkbox">
                    <div>
                        <input type="radio" value="codigo" className="checkbox" name="checkbox" checked={filtro === 'codigo'} onChange={handleFiltroChange}/>
                        <label> Código </label>
                        <input type="radio" value="social" className="checkbox" name="checkbox" checked={filtro === 'social'} onChange={handleFiltroChange}/>
                        <label> R. Social </label>                            
                    </div>
                    <div>
                        <input type="radio" value="fantasia" className="checkbox" name="checkbox" checked={filtro === 'fantasia'} onChange={handleFiltroChange}/>
                        <label> N. Fantasia </label>
                        <input type="radio" value="documento" className="checkbox" name="checkbox" checked={filtro === 'documento'} onChange={handleFiltroChange}/>
                        <label> N.Documento </label>                            
                    </div>
                </div>
                <div className="div-search">
                    <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
            </M.Filtro>
            <CCL.Lista>
                {users.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table id="table" onKeyDown={handleKeyDown} ref={tableRef} tableRef={0}>
                            <thead>
                                <tr>
                                    <th>Ativo</th>
                                    <th>Código</th>
                                    <th>Razão Social</th>
                                    <th>Nome Fantasia</th>
                                    <th>Documento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.slice(0, 50).map( (user, index) => {
                                    return(
                                        <tr key={user.id} onClick={selecionado.bind(this, user, index)} style={{background: index === selectIndex ? '#87CEFA' : ''}}>
                                            <td>SIM</td>
                                            <td>{user.id}</td>
                                            <td>{user.razao_social}</td>
                                            <td>{user.nome_fantasia}</td>
                                            <td>{cnpjMask(user.numero_documento)}</td>
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
                    <button onClick={novo}><img src="/images/add.png" />Novo</button>
                    <button onClick={abrirEditar}><img src="/images/abrir.png" />Abrir</button>
                    <button onClick={()=> navigate('/home')}><img src="/images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}