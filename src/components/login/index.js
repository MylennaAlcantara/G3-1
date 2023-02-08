import React, { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/authContext";
import * as C from "./login.js";

export const Login = () => {
            
    const colors = ["../images/Image01.jpeg","../images/Image02.jpeg","../images/Image03.jpeg" ];
    const [index, setIndex] = useState(0);
    const delay = 3500;
    const timeoutRef = useRef(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function resetTimeout(){
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {   
        resetTimeout();     
            timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) =>
                prevIndex === colors.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [index]);

    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



        //const matricula = 'admin';
        //const senha = '1f65e165335193ad6ee6635ae3f0f95a';
        const [usuario, setUsuario] = useState([]);

    const caracter = 'character';
        useEffect(() => {
            async function fetchData (){
                const response = await fetch(`http://10.0.1.10:8099/user/all`);//https://rickandmortyapi.com/api/${caracter}/
                const data = await response.json();
                setUsuario(data);
                
            }
                fetchData();
        }, []);

    const handleLogin = async () => {
        if(email && password){
            var login = usuario.filter(user => user.matricula === email && user.senha === password);
            login.forEach(user => { 
                if(user.matricula===email && user.senha === password){
                        navigate('/consultar');
                        localStorage.setItem('token', 123456);
                    }else{
                    alert("Matricula e senha incorreta!");
                }
            });          
        }
    }

    return(
        <C.Container>
            <C.Image>
                <div className="slideShow">
                    <div className="slideshowSlider" style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
                       {colors.map((background, index) => (
                        <img className="slide"  src= {background} key={index} style={{background}} alt={'imagem'}></img>
                       ))}  
                    </div>
                    <div className="slideshowDots">
                        {colors.map(( _, idx) => (
                            <div 
                            key={idx}
                            className={`slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }} 
                            > </div>
                        ))}
                    </div>
                </div>
            </C.Image>
            <C.Acessar>
                <form className="login" onSubmit={handleLogin}>
                    <div className="auth">
                        <label>Autentificação</label>
                    </div>
                    <div className="user">                        
                            <label>Empresa</label>
                            <input className="company" name="company" value={company} onChange={e => setCompany(e.target.value)}/>
                        <div >
                            <div className="matricula-senha">
                                <label>Matricula</label>
                                <input name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="matricula-senha">
                                <label>Senha</label>
                                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogin}>entrar</button>
                </form>

            </C.Acessar>
        </C.Container>
    )
};