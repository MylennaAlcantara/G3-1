import React, { useRef, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as M from "../../modais/modal/modal" 

export const CadastroFornecedor = () => {
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('fantasia');

    // Filtro de busca
    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    /*const resultado = Array.isArray(users) && users.filter((user) => {
        if(filtro === 'social'){
            return user.razao_social.toLowerCase().includes(busca);
        }else if(filtro === 'codigo'){
            return user.id === Number(busca);
        }else if(filtro === 'documento'){
            return user.cnpj === Number(busca);
        }else if(filtro === 'fantasia'){
            return user.nome_fantasia.toLowerCase().includes(busca);
        }
    })*/

        //selecionar o produto atraves da seta para baixo e para cima, adicionar o item pela tecla enter
        const [selectIndex, setSelectIndex] = useState(0);
        const tableRef = useRef(null);

        const selecionado = (user, index) => {
            setSelectIndex(index);
        }
    
        /*const handleKeyDown = (e) => {
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
                    setSelectEmitente(resultado[selectIndex].razao_social);
                    setSelectIdEmitente(resultado[selectIndex].id);
                    setDataSelectEmitente(resultado[selectIndex].razao_social);
                    setDataIdSelectEmitente(resultado[selectIndex].id);
                }
            }
        };*/
    return(
        <C.Container>
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
            <C.Footer>
                <div className="buttons">
                    <button>Novo</button>
                    <button>Voltar</button>
                </div>
            </C.Footer>
        </C.Container>
    )
}