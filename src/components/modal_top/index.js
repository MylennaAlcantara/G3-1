import React, {useEffect, useState, useRef} from "react";
import {Container, Filtro, Header, Modal} from './../modal/modal.js';


export const Top = ({onClose = () =>{}, setDataSelectTop, setDataIdSelectTop}) => {

    const [top, setTop] = useState([]);
    const [selectTop, setSelectTop] = useState();
    const [selectIdTop, setSelectIdTop] = useState();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('codigo');

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.10:8099/clientes");
            const data = await response.json();
            setTop(data);
        }
            fetchData();
    }, []);

    const SelectedTop = (top) => {
        setSelectTop(top.cep);
        setSelectIdTop(top.id);
        setDataSelectTop(top.cep);
        setDataIdSelectTop(top.id);
        onClose();
    };

    // Filtro de busca

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value)
    };

    const resultado = Array.isArray(top) && top.filter((top) => {
        if(filtro === 'codigo'){
            return top.id === Number(busca);
        }else if(filtro === 'descricao'){
            //return top.descricao.toLowerCase().includes(busca);
            return top.cep === Number(busca);
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
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                setSelectTop(resultado[selectIndex].cep);
                setSelectIdTop(resultado[selectIndex].id);
                setDataSelectTop(resultado[selectIndex].cep);
                setDataIdSelectTop(resultado[selectIndex].id);
                onClose();
            }
        }
    };

    return(
        <Modal>
            <Container>
            <Header>
                <label> Top</label>
                <button className="close" onClick={onClose}>X</button>
            </Header>
            <Filtro>
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
                    <div className="div-search">
                        <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>                
            </Filtro>
                <table id="table" >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Nat. Operação</th>
                            <th>Mov. Est. reservado</th>
                            <th>MOv. Est. Real</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.slice(0, 10).map( (top, index) => {
                            return(
                                <tr 
                                key={top.id} 
                                onDoubleClick={SelectedTop.bind(this, top)}
                                style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}} >
                                    <td>{top.id}</td>
                                    <td>{top.cep}</td>
                                    <td>{top.cep}</td>
                                    <td>{top.cep}</td>
                                    <td>{top.cep}</td>                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Container>
        </Modal>
    );
};