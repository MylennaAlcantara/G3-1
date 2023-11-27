import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/authContext";
import * as C from "../cadastro/cadastro";
import * as H from "./home";

export const Home = () => {
    const {user, empresa, cnpjMask} = useContext(AuthContext);

    return(
        <H.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <img alt="" src="/images/logo.png"/>
        </H.Container>
    )
}