import React from "react";
import * as C from './modal.js';
import "../cadastro/index.js";

export const Modal = ({ onClose = () => {} }) => {
    return(
        <C.Modal>
            <C.Container>
                <C.Header>
                    <label>Cadastro Parceiros</label>
                    <button className="close" onClick={onClose}>X</button>
                </C.Header>
                <table >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Data Cadastro</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Documento</th>
                            <th>Endereço</th>
                            <th>CEP</th>
                            <th>Município</th>
                            <th>Telefone</th>
                            <th>Celular</th>
                            <th>Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Código</td>
                            <td>Data Cadastro</td>
                            <td>Razão Social</td>
                            <td>Nome Fantasia</td>
                            <td>Documento</td>
                            <td>Endereço</td>
                            <td>CEP</td>
                            <td>Município</td>
                            <td>Telefone</td>
                            <td>Celular</td>
                            <td>Vendedor</td>
                        </tr>
                        <tr>
                            <td>Código</td>
                            <td>Data Cadastro</td>
                            <td>Razão Social</td>
                            <td>Nome Fantasia</td>
                            <td>Documento</td>
                            <td>Endereço</td>
                            <td>CEP</td>
                            <td>Município</td>
                            <td>Telefone</td>
                            <td>Celular</td>
                            <td>Vendedor</td>
                        </tr>
                        <tr>
                            <td>Código</td>
                            <td>Data Cadastro</td>
                            <td>Razão Social</td>
                            <td>Nome Fantasia</td>
                            <td>Documento</td>
                            <td>Endereço</td>
                            <td>CEP</td>
                            <td>Município</td>
                            <td>Telefone</td>
                            <td>Celular</td>
                            <td>Vendedor</td>
                        </tr>
                    </tbody>
                </table>
            </C.Container>
        </C.Modal>
    );
};