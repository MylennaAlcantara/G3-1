import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./opcoes";
import { Setor } from "../modais/modal_setor";

export const OpFuncionarios = ({setOpfuncionario}) => {
    const navigate = useNavigate();
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [cadastroSetor, setCadastroSetor] = useState(false)
    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Opções Funcionários</h3>
                </C.Header>
               <CO.Opcoes>
                    <div onClick={()=> {navigate('/funcionarios'); setOpfuncionario(false)}}>Cadastrar</div>
                    <div onClick={()=> {setIsModalSetor(true); setCadastroSetor(true)}}>Cadastrar Setor</div>
                    <div>Cadastrar Nível</div>
                </CO.Opcoes>
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
            </C.Container>
        </M.Modal>
    )
}