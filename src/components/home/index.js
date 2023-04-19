<<<<<<< HEAD
import React, { useContext } from "react";
import * as H from "./home";
import * as C from "../cadastro/cadastro";
import { AuthContext } from "../../contexts/Auth/authContext";

export const Home = () => {
    const {user, empresa} = useContext(AuthContext);

    return(
        <H.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}</C.NaviBar>
            <img src="/images/logo.png"/>
        </H.Container>
    )
=======
import React, { useContext } from "react";
import * as H from "./home";
import * as C from "../cadastro/cadastro";
import { AuthContext } from "../../contexts/Auth/authContext";

export const Home = () => {
    const {user, empresa} = useContext(AuthContext);

    return(
        <H.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}</C.NaviBar>
            <img src="/favicon.ico"/>
        </H.Container>
    )
>>>>>>> 792be7bed279f04a5296c345962e526aba2e8367
}