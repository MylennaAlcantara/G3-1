import React, {useEffect, useState, useRef} from "react";
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

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (pgto, index) => {
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
                setSelectPgt(resultado[selectIndex].descricao);
                setSelectIdPgt(resultado[selectIndex].id);
                setDataSelectPgt(resultado[selectIndex].descricao);
                setDataIdSelectPgt(resultado[selectIndex].id);
                onClose();
            }
        }
    };

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
                    <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>                
            </Filtro>
                <table id="table" ref={tableRef} onKeyDown={handleKeyDown}  tabIndex={0}>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Ativo</th>
                            <th>Descrição</th>
                            <th>Raiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.map( (pgto, index) => {
                            return(
                                <tr 
                                    key={pgto.id} 
                                    onClick={selecionado.bind(this, pgto, index)}
                                    onDoubleClick={SelectedPgt.bind(this, pgto)}
                                    style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}} >
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