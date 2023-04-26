import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import { Familia } from "../modais/modais_tela_produtos/modal_familia";
import { GrupoIcms } from "../modais/modais_tela_produtos/modal_grupo_icms";
import { Grupo } from "../modais/modais_tela_produtos/modal_icms";
import { Ipi } from "../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../modais/modais_tela_produtos/modal_pis_cofins";
import * as M from "../modais/modal/modal";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpProdutos = ({setOpProdutos, close}) => {
    const navigate = useNavigate();
    const [isModalFamilia, setIsModalFamilia] = useState(false);
    const [isModalRegra, setIsModalRegra] = useState(false);
    const [isModalPisCofins, setIsModalPisCofins] = useState(false);
    const [isModalIpi, setIsModalIpi] = useState(false);
    const [isModalGrupo, setIsModalGrupo] = useState(false);

    return(
        <M.Modal>
            <C.Container style={{width: "40%"}}>
                <C.Header>
                    <h3>Opções Produtos</h3>
                </C.Header>
               <CO.Opcoes>
                <div className="div-botoes">
                    <div onClick={()=> {navigate('/produtos'); setOpProdutos(false)}}>Cadastrar</div>
                    <div onClick={()=> setIsModalFamilia(true)}>Cadastrar Familia</div>
                    <div onClick={()=> setIsModalGrupo(true)}>Cadastrar Grupo</div>
                    <div onClick={()=> setIsModalRegra(true)}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                    <div onClick={()=> setIsModalIpi(true)}>Cadastrar Grupos IPI</div>
                    <div onClick={()=> setIsModalPisCofins(true)}>Cadastrar Grupo PIS/COFINS</div>
                </div>
                </CO.Opcoes>
                <C.Footer>
                    <div className="buttons">
                        <button onClick={close}><img src="/images/voltar.png"/>Fechar</button>
                    </div>
                </C.Footer>
                {isModalFamilia ? <Familia close={()=> setIsModalFamilia(false)}/> : null}
                {isModalRegra ? <GrupoIcms close={()=> setIsModalRegra(false)}/> : null}
                {isModalPisCofins ? <PisCofins close={()=> setIsModalPisCofins(false)}/> : null}
                {isModalIpi ? <Ipi close={()=> setIsModalIpi(false)}/> : null}
                {isModalGrupo ? <Grupo close={()=> setIsModalGrupo(false)} /> : null}
            </C.Container>
        </M.Modal>
    )
}