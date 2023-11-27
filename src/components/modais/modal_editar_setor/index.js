import React, { useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const EditarSetor = ({close, listar, dadosSetor, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const nomeSetor = dadosSetor.descricao;
    const operadorCaixa = dadosSetor.operadorDeCaixa;
    const [novoSetor, setNovoSetor] = useState(nomeSetor);
    const [operador, setOperador] = useState(operadorCaixa);

    async function salvar (){
        try{
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/setorFuncionario/edit",{
                method: "PUT",    
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: dadosSetor.id,
                    descricao: novoSetor,
                    operadorDeCaixa: operador
                })
            })
            if(response.status === 200 || response.status === 201){
                alert('Salvo com sucesso!');
                close();
                listar();
            }  
        }catch(err){
            console.log(err);
        }        
    }

    async function excluir (){
        fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+`/setorFuncionario/delete`, {
            method: 'DELETE',    
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: dadosSetor.id,
                descricao: novoSetor,
                operadorDeCaixa: operador
            })
        }).catch(err => console.log(err))
        await listar();
        close();
        localStorage.removeItem('idSetor');
    }
    
    return(
        <M.Modal style={{zIndex: minimizado.setor === true ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <label>Editar Setor de Funcionário</label>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, setor: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <CP.Content>
                    <div>
                        <div className="codigo">
                            <label>Código: </label>
                            <label>{dadosSetor.id}</label>
                        </div>
                        <div className="div-descri">
                            <label>Descrição: </label>
                            <input value={novoSetor} onChange={(e)=>setNovoSetor(e.target.value)}/>
                        </div>
                        <div style={{height: 'auto', display: 'flex', flexDirection: 'row' ,  justifyContent: "start", alignItems: 'center'}}>
                            <input type="checkbox" checked={operador ? true : false} onChange={()=> setOperador(!operador)}/>
                            <label>Operador de Caixa</label>
                        </div>
                    </div>
                </CP.Content>
                <M.Footer>
                    <div className="buttons">
                        <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={excluir}><img src="/images/lixeira.png"/>Excluir</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
}