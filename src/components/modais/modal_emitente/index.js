import React, { useEffect, useRef, useState } from "react";
import { Loading } from "../../loading/index";
import { Container, Filtro, Header, Modal } from '../modal/modal';


export const Emitente = ({onClose, focoCampoSeguinte, setDataSelectEmitente, setDataIdSelectEmitente, setEmitenteAlterado, setDataSelectDadosEmitente, dadosCliente, setDadosCliente, setDadosFuncionario, dadosFuncionario, setValor, valor, dadosRotina, setDadosRotina }) => {

    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('fantasia');

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+"/emitente/all");
            const data = await response.json();
            setUsers(data);
            if( response.status === 200){
                setCarregado(true);
            }
        }
            fetchData();
            document.getElementById('search').focus();
    }, []);

    const SelectedEmitente = (user) => {
        setValor && setValor([...valor, user]);
        setDataSelectEmitente && setDataSelectEmitente(user.razao_social);
        setDataIdSelectEmitente && setDataIdSelectEmitente(user.id);
        setDataSelectDadosEmitente && setDataSelectDadosEmitente({
            fantasia: user.nome_fantasia,
            doc: user.cnpj,
            municipio: user.municipio
        })
        setDadosCliente && setDadosCliente({
            ...dadosCliente,
            filial: {
                id: user.id,
                razaoSocial: user.razao_social
            }
        });
        setDadosFuncionario && setDadosFuncionario({
            ...dadosFuncionario,
            filial: {
                id: user.id,
                razaoSocial: user.razao_social
            }
        })
        setDadosRotina && setDadosRotina({
            ...dadosRotina,
            emitente: {
                id: user.id,
                descricao: user.razao_social
            }
        })
        onClose();
        focoCampoSeguinte();
        setEmitenteAlterado(true);
    };

    // Filtro de busca
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'social'){
            return user.razao_social.toLowerCase().includes(busca);
        }else if(filtro === 'codigo'){
            return user.id === Number(busca);
        }else if(filtro === 'documento'){
            return user.cnpj === Number(busca);
        }else if(filtro === 'fantasia'){
            return user.nome_fantasia.toLowerCase().includes(busca);
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
            }else if (e.keyCode === 13){
                e.preventDefault();
                if(selectIndex !== null){
                    setDataSelectEmitente && setDataSelectEmitente(resultado[selectIndex].razao_social);
                    setDataIdSelectEmitente && setDataIdSelectEmitente(resultado[selectIndex].id);
                    setValor && setValor([...valor, resultado[selectIndex]]);
                    setDataSelectDadosEmitente && setDataSelectDadosEmitente({
                        fantasia: resultado[selectIndex].nome_fantasia,
                        doc: resultado[selectIndex].cnpj,
                        municipio: resultado[selectIndex].municipio
                    })
                    setDadosCliente && setDadosCliente({
                        ...dadosCliente,
                        filial: {
                            id: resultado[selectIndex].id,
                            razaoSocial: resultado[selectIndex].razao_social
                        }
                    });
                    setDadosFuncionario && setDadosFuncionario({
                        ...dadosFuncionario,
                        filial: {
                            id: resultado[selectIndex].id,
                            razaoSocial: resultado[selectIndex].razao_social
                        }
                    })
                    setDadosRotina && setDadosRotina({
                        ...dadosRotina,
                        emitente: {
                            id: resultado[selectIndex].id,
                            descricao: resultado[selectIndex].razao_social
                        }
                    })
                    onClose();
                    focoCampoSeguinte();
                    setEmitenteAlterado(true);
                }
            }
        };

    return(
        <Modal>
            <Container>
            <Header>
                <label>Cadastro Emitente</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
                <Filtro>
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
                </Filtro>
                {users.length === 0 && carregado === false ? (
                    <Loading/>
                ) : users.length === 0 && carregado ? (
                    <div className="table-responsive">
                        <table className="table"  ref={tableRef} tabIndex={0} onKeyDown={handleKeyDown}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome Fantasia</th>
                                    <th>Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>Município</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{height: "90%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "red", fontWeight: "bold"}}>
                            Não Existem dados a serem exibidos!
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome Fantasia</th>
                                    <th>Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>Município</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.slice(0, 20).map( (user, index) => {
                                    return(
                                        <tr
                                            key={user.id} 
                                            onClick={selecionado.bind(this, user, index)}
                                            onDoubleClick={SelectedEmitente.bind(this, user)}
                                            style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                                <td>{user.id}</td>
                                                <td>{user.nome_fantasia}</td>
                                                <td>{user.razao_social}</td>
                                                <td>{user.cnpj.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')}</td>
                                                <td>{user.municipio}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Container>
        </Modal>
    );
}
