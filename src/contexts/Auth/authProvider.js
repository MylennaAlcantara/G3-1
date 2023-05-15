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

    const cnpjMask = (value) => {
        if(value.length === 11){
            return value
                .replace(/\D+/g, '') 
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1-$2')
        }else{
            return value
              .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
              .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
              .replace(/(\d{4})(\d)/, '$1-$2')
              .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
        }
    }

    function dataMask(value) {
        var ano  = value.split("-")[0];
        var mes  = value.split("-")[1];
        var dia  = value.split("-")[2];
      
        return ("0"+dia).slice(-2) + '-' + ("0"+mes).slice(-2) + '-' + ano;
    }

    function cepMask (value){
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
    }

    return (
        <AuthContext.Provider value={{ usuario,company, matricula, password, senha, user, empresa, filiais, nivel, setCompany, setMatricula, setPassword, handleLogin, autenticar, cnpjMask, dataMask, cepMask}}>
            {children}
        </AuthContext.Provider>
    );
}