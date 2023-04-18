import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import { PerfilCliente } from "../modais/modal_perfil_cliente";
import { RamoAtividade } from "../modais/modal_ramo_atividade";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpAuxiliar = ({close, setOpAuxiliar}) => {
    const navigate = useNavigate();

    const [modalPerfil, setModalperfil] = useState(false);
    const [modalRamo, setModalRamo] = useState(false);
    
    const [cadastroRamo, setCadastroRamo] = useState(false);
    const [cadastroPerfil, setCadastroPerfil] = useState(false);

    return(
        <M.Modal>
            <C.Container style={{width: "40%"}}>
                <C.Header>
                    <h3>Tabelas Auxiliares</h3>
                </C.Header>
               <CO.Opcoes>
                    <div onClick={()=> {navigate('/top'); setOpAuxiliar(false)}}>T.O.P</div>
                    <div onClick={()=> {setModalperfil(true); setCadastroPerfil(true)}}>Perfil de Regra</div>
                    <div onClick={()=> {setModalRamo(true); setCadastroRamo(true)}}>Ramo de Atividade</div>
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
                {modalPerfil ? <PerfilCliente close={()=> setModalperfil(false)} cadastroPerfil={cadastroPerfil}/> : null}
                {modalRamo ? <RamoAtividade close={()=> setModalRamo(false)} cadastroRamo={cadastroRamo}/> : null}
            </C.Container>
        </M.Modal>
    )
}