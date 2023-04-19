<<<<<<< HEAD
import React, { useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const CadastroPerfil = ({close}) => {
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
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Cadastro de Perfil</label>
                    <button className="close" onClick={close}>X</button>
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
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
=======
import React, { useState } from "react";
import * as M from "../modal/modal";
import * as CP from "../modal_cadastro_perfil/cadastroPerfil";

export const CadastroPerfil = ({close}) => {
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
        <M.Modal>
            <M.Container>
                <M.Header>
                    <label>Cadastro de Perfil</label>
                    <button className="close" onClick={close}>X</button>
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
                    </div>
                </M.Footer>
            </M.Container>
        </M.Modal>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}