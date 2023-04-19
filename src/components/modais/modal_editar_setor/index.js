<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const EditarSetor = ({close, dadosSetor}) => {
    const nomeSetor = dadosSetor.descricao;
    const [novoSetor, setNovoSetor] = useState(nomeSetor);
    const [operador, setOperador] = useState(false);

    async function salvar (){
        try{
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/edit",{
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
            }  
        }catch(err){
            console.log(err);
        }        
    }

    async function excluir (){
        fetch(`http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/delete`, {
            method: 'DELETE',    
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: dadosSetor.id,
                descricao: novoSetor,
                operadorDeCaixa: operador
            })
        }).catch(err => console.log(err))
        close();
        localStorage.removeItem('idSetor');
    }
    
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Editar Setor de Funcionário</label>
                    <button className="close" onClick={close}>X</button>
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
                            <input type="checkbox" onChange={()=> setOperador(!operador)}/>
                            <label>Operador de Caixa</label>
                        </div>
                    </div>
                </CP.Content>
                <M.Footer>
                    <div className="buttons">
                        <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={excluir}><img src="/images/lixeira.png"/>Excluir</button>
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
=======
import React, { useEffect, useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const EditarSetor = ({close, dadosSetor}) => {
    const nomeSetor = dadosSetor.descricao;
    const [novoSetor, setNovoSetor] = useState(nomeSetor);
    const [operador, setOperador] = useState(false);

    async function salvar (){
        try{
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/edit",{
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
            }  
        }catch(err){
            console.log(err);
        }        
    }

    async function excluir (){
        fetch(`http://8b38091fc43d.sn.mynetname.net:2003/setorFuncionario/delete`, {
            method: 'DELETE',    
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: dadosSetor.id,
                descricao: novoSetor,
                operadorDeCaixa: operador
            })
        }).catch(err => console.log(err))
        close();
        localStorage.removeItem('idSetor');
    }
    
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Editar Setor de Funcionário</label>
                    <button className="close" onClick={close}>X</button>
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
                            <input type="checkbox" onChange={()=> setOperador(!operador)}/>
                            <label>Operador de Caixa</label>
                        </div>
                    </div>
                </CP.Content>
                <M.Footer>
                    <div className="buttons">
                        <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                        <button onClick={excluir}><img src="/images/lixeira.png"/>Excluir</button>
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}