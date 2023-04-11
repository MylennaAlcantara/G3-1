import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import { Familia } from "../modais/modais_tela_produtos/modal_familia";
import * as M from "../modais/modal/modal";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpProdutos = ({setOpProdutos}) => {
    const navigate = useNavigate();
    const [isModelFamilia, setIsModelFamilia] = useState(false);

    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Opções Produtos</h3>
                </C.Header>
               <CO.Opcoes>
                    <div onClick={()=> {navigate('/produtos'); setOpProdutos(false)}}>Cadastrar</div>
                    <div onClick={()=> setIsModelFamilia(true)}>Cadastrar Familia</div>
                    <div>Cadastrar Grupo</div>
                    <div>Cadastrar Grupos ICMS/Regras de ICMS</div>
                    <div>Cadastrar Grupos IPI</div>
                    <div>Cadastrar Grupo PIS/COFINS</div>
                </CO.Opcoes>
                {isModelFamilia ? <Familia close={()=> setIsModelFamilia(false)}/> : null}
            </C.Container>
        </M.Modal>
    )
}