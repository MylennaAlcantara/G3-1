import React from "react";
import { Nav } from "./nav";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <Nav>
            <Link to='/rotina'>Logo</Link>
            <Link to='/'><button>Entrar</button></Link>
        </Nav>
    );
};