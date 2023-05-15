import React from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import * as M from "../modais/modal/modal";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpProdutos = ({setOpProdutos, close, modal, setModal, cadastro, setCadastro}) => {
    const navigate = useNavigate();

    return(
        <M.Modal>
            <C.Container style={{width: window.innerWidth < 700 ? '90%' : '40%'}}>
                <C.Header>
                    <h3>Opções Produtos</h3>
                </C.Header>
               <CO.Opcoes>
                <div className="div-botoes">
                    <div onClick={()=> {navigate('/produtos'); setOpProdutos(false)}}>Cadastrar</div>
                    <div onClick={()=> setModal({...modal, familia: true})}>Cadastrar Familia</div>
                    <div onClick={()=> setModal({...modal, grupo: true})}>Cadastrar Grupo</div>
                    <div onClick={()=> setModal({...modal, regraIcms: true})}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                    <div onClick={()=> setModal({...modal, grupoIpi: true})}>Cadastrar Grupos IPI</div>
                    <div onClick={()=> setModal({...modal, grupoPis: true})}>Cadastrar Grupo PIS/COFINS</div>
                </div>
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
            </C.Container>
        </M.Modal>
    )
}