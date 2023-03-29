import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal" 
import * as CCL from "../../cadastros/consulta_cliente/consultaCliente";
import { AuthContext } from "../../../contexts/Auth/authContext";

export const ConsultarFornecedor = () => {
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('social');

    // Filtro de busca
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/clientes");
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
            return user.id === Number(busca);
        }else if(filtro === 'documento'){
            return user.cpf_cnpj === Number(busca);
        }else{
            return user.nome.toLowerCase().includes(busca);
        }
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (user, index) => {
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

    const novo = () => {
        navigate("/cadastrarFornecedor");
    }
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
            <C.Header>
                <h3>Cadastro Fornecedor</h3>
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
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)}/>
                    </div>
            </M.Filtro>
            <CCL.Lista>
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
                                        <td>{user.id}</td>
                                        <td>{user.data_cadastro}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.nome_fantasia}</td>
                                        <td>{user.cpf_cnpj}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CCL.Lista>
            <C.Footer>
                <div className="buttons">
                    <button onClick={novo}><img src="images/add.png" />Novo</button>
                    <button><img src="images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}