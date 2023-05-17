import React, {useEffect, useRef, useState} from "react";
import * as M from "../modal/modal";
import * as C from "../../cadastro/cadastro";
import { Loading } from "../../loading/index";
import { CadastroMensagem } from "../modal_cadastro_mensagem";

export const MensagemNfe = ({close, setDadosTop, dadosTop, minimizado, setMinimizado}) => {
    const [mensagem, setMensagem] = useState([]);
    const [modalCadastro, setModalCadastro] = useState(false);
    const [busca, setBusca] = useState('');

    
    useEffect(() => {
        async function fetchData (){
            const response = await fetch("");
            const data = await response.json();
            setMensagem(data);
        }
        fetchData();
    }, []);


    function selected (mensagem){
        close();
    }

    // Filtro de busca

    const resultado = Array.isArray(mensagem) && mensagem.filter((mensagem) => mensagem.descricao.toLowerCase().includes(busca))

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
        }else if (e.keyCode === 13){
            e.preventDefault();
            if(selectIndex !== null){
                close();
            }
        }
    };

    return(
        <M.SubModal>
            <M.Container>
                <M.Header>
                    <label>Mensagem de NFe</label>
                    <div className="buttons">
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <M.Filtro>
                    <div className="div-search">
                        <input className="search" id="search" placeholder="Buscar" onChange={e => setBusca(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                </M.Filtro>
                {mensagem.length === 0 ? (
                    <Loading/>
                ) : (
                    <div className="table-responsive">
                        <table id="table" ref={tableRef} onKeyDown={handleKeyDown} tabIndex={0}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Mensagem</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                )}
                <C.Footer>
                    <div className="buttons">
                        <button onClick={()=>setModalCadastro(true)}><img src="/images/add.png"/> Novo</button>
                        <button><img src="/images/abrir.png"/>Abrir</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </C.Footer>
                {modalCadastro ? <CadastroMensagem close={()=> setModalCadastro(false)} /> : null}
            </M.Container>
        </M.SubModal>
    )
}