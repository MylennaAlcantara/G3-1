import React, { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./login.js";
import { AuthContext } from "../../contexts/Auth/authContext.js";

export const Login = () => {
            
    const colors = ["../images/Image01.jpeg","../images/Image02.jpeg","../images/Image03.jpeg" ];
    const [index, setIndex] = useState(0);
    const delay = 3500;
    const timeoutRef = useRef(null);

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
    const { matricula, password, filiais, setCompany, setMatricula, setPassword, handleLogin} = useContext(AuthContext);

    const verificar = ()=>{
        const token = localStorage.getItem('token');
        if( token === '123456' ){
            navigate('/home');
        }else{
            console.log('errou')
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
                <form className="login" onSubmit={()=>{handleLogin(); verificar()}}>
                    <div className="auth">
                        <label>Autenticação</label>
                    </div>
                    <div className="user">                        
                            <label>Empresa</label>
                            <select onChange={e => setCompany(e.target.value)}>
                                <option>Selecione a empresa</option>
                                {filiais.map(i=>{
                                    return (
                                        <option className="company" name='company' key={i.id} value={i.nome_fantasia} >
                                            {i.id} - {i.nome_fantasia} - {i.cnpj}
                                        </option>
                                    )
                                })}
                            </select>
                        <div >
                            <div className="matricula-senha">
                                <label>Matricula</label>
                                <input name="matricula" value={matricula} onChange={e => setMatricula(e.target.value)}/>
                            </div>
                            <div className="matricula-senha">
                                <label>Senha</label>
                                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    <button onClick={()=>{handleLogin(); verificar()}}>Entrar</button>
                    </div>
                </form>

            </C.Acessar>
        </C.Container>
    )
};