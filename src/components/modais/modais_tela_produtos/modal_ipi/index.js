import React, {useEffect, useRef, useState} from "react";
import * as M from "../../modal/modal";
import * as C from "../../../cadastro/cadastro";
import { CadastroPisCofins } from "../modal_cadastro_piscofins";
import { CadastroIpi } from "../modal_cadastro_ipi";

export const Ipi = ({close, minimizado, setMinimizado}) => {
    const [grupoIpi, setGrupoIpi] = useState([]);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [busca, setBusca] = useState('');

    
    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://10.0.1.107:8080/grupoIpi/all");
            const data = await response.json();
            setGrupoIpi(data);
        }
        fetchData();
        document.getElementById("search").focus();
    }, []);

    // Filtro de busca
    const [filtro, setFiltro] = useState('descricao');
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    const resultado = Array.isArray(grupoIpi) && grupoIpi.filter((grupoIpi) => {
        if(filtro === 'descricao'){
            return grupoIpi.descricao.toLowerCase().includes(busca);
        }else if(filtro === 'id'){
            return grupoIpi.id === Number(busca);
        }
    })

    //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
    const [selectIndex, setSelectIndex] = useState(0);
    const tableRef = useRef(null);

    const selecionado = (index) => {
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

    // Estado que indica quando minimizado para colocar atrás de tudo
    const [minimizar, setMinimizar] = useState("");

    return(
        <M.SubModal style={{zIndex: minimizado && minimizado.ipi ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <h3>Grupos de IPI</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, ipi: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <M.Filtro>
                    <div>
                        <div>
                            <input name="checkbox" type="radio" value="id" checked={filtro==='id'} onChange={handleFiltroChange}/>
                            <label>Código</label>
                        </div>
                        <div>
                            <input name="checkbox" type="radio" value="descricao" checked={filtro === 'descricao'} onChange={handleFiltroChange}/>
                            <label>Descrição</label>
                        </div>
                    </div>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((grupoIpi, index)=> {
                                return(
                                    <tr key={grupoIpi.id}
                                        onClick={selecionado.bind(this, index)}
                                        style={{backgroundColor: index === selectIndex ? '#87CEFA' : ''}}>
                                        <td>{grupoIpi.id}</td>
                                        <td>{grupoIpi.descricao}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=>setModalCadastro(true)}><img src="/images/add.png"/> Novo</button>
                        <button onClick={close}><img src="/images/voltar.png"/> Fechar</button>
                    </div>
                </C.Footer>
                {modalCadastro ? <CadastroIpi close={()=> setModalCadastro(false)} minimizado={minimizado} setMinimizado={setMinimizado} minimizar={minimizar} setMinimizar={setMinimizar}/> : null}
            </M.Container>
        </M.SubModal>
    )
}