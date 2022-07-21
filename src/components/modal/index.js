import React from "react";
import * as C from './modal.js';
import "../cadastro/index.js";

export const Modal = ({ onClose = () => {},children }) => {
    return(
        <C.Modal>
            <C.Container>
               <button className="close" onClick={onClose}>X</button>
               <div className="content">{children}</div>
            </C.Container>
        </C.Modal>
    );
};