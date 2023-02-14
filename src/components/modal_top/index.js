import React, {useEffect, useState} from "react";
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
    }

    const resultado = Array.isArray(top) && top.filter((top) => {
        if(filtro === 'codigo'){
            return top.id === Number(busca);
        }else if(filtro === 'descricao'){
            //return top.descricao.toLowerCase().includes(busca);
            return top.cep === Number(busca);
        }
    })

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
                        <input className="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)}/>
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
                        {resultado.slice(0, 10).map( (top) => {
                            return(
                                <tr key={top.id} onDoubleClick={SelectedTop.bind(this, top)} >
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