import React, {useEffect, useState} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Pgt = ({onClose = () =>{}, setDataSelectPgt, setDataIdSelectPgt}) => {

    const [pgto, setPgto] = useState([]);
    const [selectPgt, setSelectPgt] = useState();
    const [selectIdPgt, setSelectIdPgt] = useState();
    const [busca, setBusca] = useState('');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8092/tipoPagamento/all");
            const data = await response.json();
         setPgto(data);
        }
            fetchData();
    }, []);

    const SelectedPgt = (pgto) => {
        setSelectPgt(pgto.descricao);
        setSelectIdPgt(pgto.id);
        setDataSelectPgt(pgto.descricao);
        setDataIdSelectPgt(pgto.id);
        onClose();
    };

    //Filtro de busca
    const resultado = Array.isArray(pgto) && pgto.filter((pgto) => {
        return pgto.descricao.toLowerCase().includes(busca);
    })

    return(
        <Modal>
            <Container>
            <Header>
                <label>Tipo Pagamento</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>                        
                <div className="div-search">
                    <label>Buscar: </label>                    
                    <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)}/>
                </div>                
            </Filtro>
                <table id="table" >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Ativo</th>
                            <th>Descrição</th>
                            <th>Raiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.map( (pgto) => {
                            return(
                                <tr key={pgto.id} onDoubleClick={SelectedPgt.bind(this, pgto)} >
                                    <td>{pgto.id}</td>
                                    <td>Sim</td>
                                    <td>{pgto.descricao}</td>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};