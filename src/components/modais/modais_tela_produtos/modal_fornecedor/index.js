import React, { useEffect, useRef, useState } from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";

export const Fornecedor = ({close}) => {
    const [users, setUsers] = useState([]);
    const [filtro, setFiltro] = useState("social");
    const [busca, setBusca] = useState('');

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
            return user.id === Number(busca);
        }else if(filtro === 'documento'){
            return user.numero_documento === Number(busca);
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
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Fornecedores</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
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
                                            <td>{user.numero_documento}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                <C.Footer>
                    <div className="buttons">
                        <button><img src="/images/add.png"/>Novo</button>
                    </div>
                </C.Footer>
            </M.Container>
        </M.Modal>
    )
}