import React, { useContext } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "./opcoes";
import { AuthContext } from "../../contexts/Auth/authContext";

export const OpFuncionarios = ({setOpfuncionario, close, modal, setModal, cadastro, setCadastro}) => {
    const navigate = useNavigate();
    const {nivel} = useContext(AuthContext);

    return(
        <M.Modal>
            <C.Container style={{width: window.innerWidth < 700 ? '90%' : '40%', height: window.innerWidth < 700 ? '80%' : '', position: "fixed", top: window.innerWidth < 700 ? 'auto' : ''}}>
                <C.Header>
                    <h3>Opções Funcionários</h3>
                </C.Header>
               <CO.Opcoes>
                    {nivel.cadastro_funcionario ? <div onClick={()=> {navigate('/funcionarios'); setOpfuncionario(false)}}>Cadastrar</div> : null}
                    {nivel.tabela_auxiliar_setor_funcionario ? <div onClick={()=> {setModal({...modal, setor: true}); setCadastro({...cadastro, setor: true})}}>Cadastrar Setor</div> : null}
                    {nivel.tabela_auxiliar_tipo_funcionario ? <div onClick={()=> {setModal({...modal, nivel: true}); setCadastro({...cadastro, nivel: true})}}>Cadastrar Nível</div> : null}
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img alt="voltar" src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}