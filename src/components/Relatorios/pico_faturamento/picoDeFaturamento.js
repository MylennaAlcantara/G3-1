import React, { useState, useContext, useEffect } from "react";
import { Emitente } from "../../modais/modal_emitente";
import { Top } from "../../modais/modal_top";
import * as C from "../../cadastro/cadastro"
import { Loading } from "../../loading";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/Auth/authContext"
import * as LB from "../resumo_de_faturamento/resumoFaturamento"
import './picoDeFaturamento.css'

export const PicoDeFaturamento = () => {

    const [busca, setBusca] = useState();

    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();

    function GetDataIni(e) {
        setDataInicial(e.currentTarget.value);
    }

    function GetDataFin(e) {
        setDataFinal(e.currentTarget.value);
    }

    const { user, empresa, cnpjMask } = useContext(AuthContext);
    const navigate = useNavigate();

    const [NFE, setDataNFE] = useState();
    const [NFCE, setDataNFCE] = useState();

    const nfeCheck = (e) => {
        setDataNFE(e.currentTarget.checked)
    }

    const nfceCheck = (e) => {
        setDataNFCE(e.currentTarget.checked)
    }

    const [abaFilial, setAbaFilial] = useState(true);

    return (
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header><h3>Pico de Faturamento</h3></C.Header>

            <LB.Filtros>
                <div className="filial-top-content" >
                    <div className="buttons-filial-top">
                        <button className="button-filial" onClick={() => setAbaFilial(true)} >Filial</button>
                        <button className="button-top" onClick={() => setAbaFilial(false)} >Tops</button>
                    </div>
                    <LB.FilialTop>
                        {abaFilial ? (
                            <div className='filial-top'>

                                <div>
                                    <select>
                                        <option>Filial</option>
                                        <option>Região</option>
                                    </select>
                                    <input placeholder="Buscar..." onChange={(e) => setBusca(e.target.value)} />
                                    <img src="./images/LUPA.png" />
                                </div>

                                <div className='table-responsive'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Fantasia</th>
                                                <th>Razão Social</th>
                                                <th>Documento</th>
                                                <th>Município</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        ) : (
                            <div className='filial-top'>
                                <div>
                                    <input placeholder="Buscar..." />
                                    <img src="./images/LUPA.png" />
                                </div>

                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Descrição</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>

                        )}

                    </LB.FilialTop>
                </div>

                <LB.Data>
                    <div>
                        <div className="data" >
                            <label>Data Inicial</label>
                            <input type="date" onChange={GetDataIni} />
                        </div>

                        <div className="data" >
                            <label>Data Final</label>
                            <input type="date" onChange={GetDataFin} />
                        </div>
                    </div>
                    
                    <div className="checkbox-content" >
                        <input type="checkbox" /><label>NF-e</label>
                        <input type="checkbox" /><label>NFC-e</label>
                    </div>

                    <div className="search-button-content" >
                        <button className="buttons-config" >Pesquisar</button>
                    </div>
                </LB.Data>

            </LB.Filtros>

            <C.Footer>
                <div className="buttons" >
                    <button onClick={() => navigate('/home')}> <img src='/images/voltar.png' />Voltar</button>
                </div>
            </C.Footer>

        </C.Container>
    );

}

export default PicoDeFaturamento;