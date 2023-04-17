import React, { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./authContext";
import { MD5 } from "crypto-js";


export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState([]);
    const [company, setCompany] = useState('');
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    
    // Converte para MD5 o que foi digitado na senha
    const senha = MD5(password).toString();
    useEffect(() => {
        async function fetchData (){
            const response = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/user/all`);// http://10.0.1.10:8099/user/all
            const data = await response.json();
            setUsuario(data);
            console.log('executado')
            autenticar();
        }
            fetchData();
    }, []);

    const [empresa, setEmpresa] = useState([]);
    const [filiais, setFiliais] = useState([]);
    const [nivel, setNivel] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("http://8b38091fc43d.sn.mynetname.net:2005/emitente/all");
            const data = await response.json();
            setFiliais(data);
        }
            fetchData();
    }, []);

    const handleLogin = async () => {
        if(matricula && senha && company){
            var login = usuario.filter(user => user.matricula === matricula && user.senha === senha);
            console.log(login)
            login.forEach(user => { 
                if(user.matricula===matricula && user.senha === senha){
                        localStorage.setItem('token', 123456);
                        localStorage.setItem('id', user.id);
                        localStorage.setItem('filial', company);
                        localStorage.setItem('nivel', user.nivelAcesso.id);
                        autenticar();
                    }else{
                    alert("Matricula e senha incorreta!");
                }
            });          
        }
    }

    const autenticar = async () => {
        const id = localStorage.getItem('id');
        const filial = localStorage.getItem('filial');
        const nivel = localStorage.getItem('nivel')
        if(id, filial){
            const response = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/user/all`);
            const data = await response.json();
            const resposta = await fetch("http://8b38091fc43d.sn.mynetname.net:2005/emitente/all");
            const dados = await resposta.json();
            const responseNivel = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/nivel/${nivel}`);
            const dadosNivel = await responseNivel.json();
            const logado = data.filter(user => user.id === parseFloat(id));
            const empresa = dados.filter(filiais => filiais.nome_fantasia === filial);
            setUser(logado);
            setEmpresa(empresa);
            setNivel(dadosNivel);
        }else{
            localStorage.clear();
            console.log("sem usuario logado!")
        }
    }

    return (
        <AuthContext.Provider value={{ usuario,company, matricula, password, senha, user, empresa, filiais, nivel, setCompany, setMatricula, setPassword, handleLogin, autenticar}}>
            {children}
        </AuthContext.Provider>
    );
}