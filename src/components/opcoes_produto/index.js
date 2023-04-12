import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../cadastro/cadastro";
import { Familia } from "../modais/modais_tela_produtos/modal_familia";
import { GrupoIcms } from "../modais/modais_tela_produtos/modal_grupo_icms";
import { Ipi } from "../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../modais/modais_tela_produtos/modal_pis_cofins";
import * as M from "../modais/modal/modal";
import * as CO from "../opcoes_funcionario/opcoes";

export const OpProdutos = ({setOpProdutos}) => {
    const navigate = useNavigate();
    const [isModalFamilia, setIsModalFamilia] = useState(false);
    const [isModalRegra, setIsModalRegra] = useState(false);
    const [isModalPisCofins, setIsModalPisCofins] = useState(false);
    const [isModalIpi, setIsModalIpi] = useState(false);

    return(
        <M.Modal>
            <C.Container>
                <C.Header>
                    <h3>Opções Produtos</h3>
                </C.Header>
               <CO.Opcoes>
                    <div onClick={()=> {navigate('/produtos'); setOpProdutos(false)}}>Cadastrar</div>
                    <div onClick={()=> setIsModalFamilia(true)}>Cadastrar Familia</div>
                    <div >Cadastrar Grupo</div>
                    <div onClick={()=> setIsModalRegra(true)}>Cadastrar Grupos ICMS/Regras de ICMS</div>
                    <div onClick={()=> setIsModalIpi(true)}>Cadastrar Grupos IPI</div>
                    <div onClick={()=> setIsModalPisCofins(true)}>Cadastrar Grupo PIS/COFINS</div>
                </CO.Opcoes>
                {isModalFamilia ? <Familia close={()=> setIsModalFamilia(false)}/> : null}
                {isModalRegra ? <GrupoIcms close={()=> setIsModalRegra(false)}/> : null}
                {isModalPisCofins ? <PisCofins close={()=> setIsModalPisCofins(false)}/> : null}
                {isModalIpi ? <Ipi close={()=> setIsModalIpi(false)}/> : null}
            </C.Container>
        </M.Modal>
    )
}