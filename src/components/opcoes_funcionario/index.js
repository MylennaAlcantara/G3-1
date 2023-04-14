import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./opcoes";
import { Setor } from "../modais/modal_setor";
import { Nivel } from "../modais/modal_nivel";
import { AuthContext } from "../../contexts/Auth/authContext";

export const OpFuncionarios = ({setOpfuncionario, close}) => {
    const navigate = useNavigate();
    const {nivel} = useContext(AuthContext);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [cadastroSetor, setCadastroSetor] = useState(false);
    const [isModalNivel, setIsModalNivel] = useState(false);
    const [cadastroNivel, setCadastroNivel] = useState(false);

    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Opções Funcionários</h3>
                </C.Header>
               <CO.Opcoes>
                    {nivel.cadastro_funcionario ? <div onClick={()=> {navigate('/funcionarios'); setOpfuncionario(false)}}>Cadastrar</div> : null}
                    {nivel.tabela_auxiliar_setor_funcionario ? <div onClick={()=> {setIsModalSetor(true); setCadastroSetor(true)}}>Cadastrar Setor</div> : null}
                    {nivel.tabela_auxiliar_tipo_funcionario ? <div onClick={()=> {setIsModalNivel(true); setCadastroNivel(true)}}>Cadastrar Nível</div> : null}
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} cadastroSetor={cadastroSetor} /> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} cadastroNivel={cadastroNivel} /> : null}
            </C.Container>
        </M.Modal>
    )
}