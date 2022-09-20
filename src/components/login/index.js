import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as C from "./login.js";

export const Login = () => {
            
    const colors = ["../images/Image01.jpeg","../images/Image02.jpeg","../images/Image03.jpeg" ];
    const [index, setIndex] = useState(0);
    const delay = 3500;
    const timeoutRef = useRef(null);

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
                <div className="login">
                    <div className="auth">
                        <label>Autentificação</label>
                    </div>
                    <div className="user">                        
                            <label>Empresa</label>
                            <input className="company"/>
                        <div >
                            <div className="matricula-senha">
                                <label>Matricula</label>
                                <input/>
                            </div>
                            <div className="matricula-senha">
                                <label>Senha</label>
                                <input/>
                            </div>
                        </div>
                    </div>
                </div>
            </C.Acessar>
        </C.Container>
    )
};