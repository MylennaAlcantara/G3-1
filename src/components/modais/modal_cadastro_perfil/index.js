import React, { useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const CadastroPerfil = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    const [novoPerfil, setNovoPerfil] = useState('');

    async function salvar (){
        try{
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/perfilRegra/",{
                method: "POST",    
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    descricao: novoPerfil,
                })
            })
            if(response.status === 201){
                alert('Salvo com sucesso!');
                close();
            }  
        }catch(err){
            console.log(err);
        }        
    }
    return(
        <M.Modal style={{zIndex: minimizado.perfil ? minimizar : "1"}}>
            <M.Container>
                <M.Header>
                    <label>Cadastro de Perfil</label>
                    <div className="buttons">
                        <button className="minimizar" onClick={()=> {setMinimizar("-5"); setMinimizado({...minimizado, perfil: true})}}><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <CP.Content>
                    <div>
                        <div className="codigo">
                            <label>Código: </label>
                        </div>
                        <div className="div-descri">
                            <label>Descrição: </label>
                            <input onChange={(e)=> setNovoPerfil(e.target.value)}/>
                        </div>
                    </div>
                </CP.Content>
                <M.Footer>
                    <div className="buttons">
                        <button onClick={salvar}><img src="/images/salvar.png" />Salvar</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Cancelar</button>
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
}