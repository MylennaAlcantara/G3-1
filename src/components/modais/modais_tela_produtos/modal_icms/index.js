import React, { useState } from "react";
import * as M from "../../modal/modal";
import {Lista} from "./grupo";
import grupos from "../../../../grupos/grupos.json";

export const Grupo = ({close}) => {
    const [filho, setFilho] = useState(
        {
        ID: "",
        DESCRICAO: "",
        EXCLUIDO: "",
        ID_PAI: "",
        NOME_PAI: "",
        DATA_EDICAO: "",
        DATA_EXCLUSAO: "",
        DATA_INSERCAO: "",
        ID_USUARIO_INSERCAO: "",
        ID_USUARIO_EDICAO: "",
        ID_USUARIO_EXCLUSAO: "",
        CODIGO: ""
    }
    );
    const pai = grupos.filter((grupo) => grupo.DESCRICAO === grupo.NOME_PAI);

    function abrirFilho (grupo){
        const filho = grupos.filter((g)=> {
            if(g.ID_PAI === 0 || g.ID_PAI === null){
                return null
            }else{
                return grupo.ID === g.ID_PAI
            }
        })
        setFilho(filho);
    }

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Grupo / SubGrupo</h3>
                    <button onClick={close} className="close">X</button>
                </M.Header>
                <M.Filtro>
                    <input type="radio"/>
                    <label>Ativos</label>
                    <input type="radio"/>
                    <label>Inativos</label>
                    <select>
                        <option>Código</option>
                        <option>Descrição</option>
                    </select>
                    <input className="search" placeholder="Buscar..."/>
                </M.Filtro>
                <Lista>
                    <div>
                        <img src="/images/pastaFechada.png"/>
                        <label>Grupos:</label>
                    </div>
                    {pai.map((grupo)=> {
                        return(
                            <>
                                <div className="grupo" key={grupo.CODIGO} onDoubleClick={abrirFilho.bind(this, grupo)}>
                                <img src="/images/pastaFechada.png"/>{grupo.CODIGO} - {grupo.DESCRICAO}
                                </div>
                                {Array.isArray(filho) && filho.map((filho)=> {
                                    if(grupo.ID === filho.ID_PAI){
                                        return <div className="filho">{filho.CODIGO} - {filho.DESCRICAO}</div>
                                    }
                                })}
                            </>
                            )
                    })}
                </Lista>
            </M.Container>
        </M.Modal>
    )
}