import React, { useContext } from "react";
import * as H from "./home";
import * as C from "../cadastro/cadastro";
import { AuthContext } from "../../contexts/Auth/authContext";

export const Home = () => {
    const {user, empresa, cnpjMask} = useContext(AuthContext);

    return(
        <H.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <img src="/images/logo.png"/>
        </H.Container>
    )
}