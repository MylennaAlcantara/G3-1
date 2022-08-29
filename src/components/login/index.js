import React from "react";
import * as C from "./login.js";

export const Login = () => {
    return(
        <C.Container>
            <C.Image></C.Image>
            <C.Acessar>
                <h1>Logo</h1>
                <form>
                    <label>Matricula: </label>
                    <input/>
                    <label>senha: </label>
                    <input/>
                </form>
            </C.Acessar>
        </C.Container>
    )
};