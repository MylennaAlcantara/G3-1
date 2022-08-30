import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as C from "./login.js";

export const Login = () => {
            
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    const [index, setIndex] = useState(0);
    const delay = 4500;
    const timeoutRef = useRef(null);

    useEffect(() => {
        setTimeout(
            timeoutRef = setTimeout(
            () => setIndex((prevIndex) =>
                prevIndex === colors.length - 1 ? 0 : prevIndex + 1
            )),
            delay
        );
        return () => {};
    }, [index]);

    return(

        <C.Container>
            <C.Image>
                <div className="slideShow">
                    <div className="slideshowSlider" style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
                       {colors.map((background, index) => (
                        <div className="slide" key={index} style={{background}}></div>
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
                
                    <h1>Logo</h1>
                    <form>
                        <label>Matricula: </label>
                        <input/><br/>
                        <label>senha: </label>
                        <input/><br/>  
                        <button type="submit">Entrar</button>
                    </form>
              
            </C.Acessar>
        </C.Container>
    )
};