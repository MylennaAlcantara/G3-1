import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modal_emitente";
import { ListaMunicipio } from "../../modal_municipio";
import { PerfilCliente } from "../../modal_perfil_cliente";
import { RamoAtividade } from "../../modal_ramo_atividade";
import * as CC from "../cadastro_cliente/cadastroCliente";

export const CadastroCliente = () => {
    const navigate = useNavigate();
    const [isModalPerfil, setIsModalPerfil] = useState(false);
    const [isModalRamo, setIsModalRamo] = useState(false);
    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalEmpresa, setIsModalEmpresa] = useState(false);

    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState([]);

    //Função para abrir o modal com F2
    function keyPerfil (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPerfil(true);
        }
    }    
    function keyRamo (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalRamo(true);
        }
    }    
    function keyMunicipio (e){
        e.preventDefault();
        setIsModalMunicipio(true);
        if(e.keyCode === 113){
            setIsModalMunicipio(true);
        }
    }
    function keyEmpresa (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalEmpresa(true);
        }
    }

    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setEndereco(data);
    }

    const cancelar = () => {
        navigate('/clientes');
    }
    return (
        <C.Container>
            <C.Header>
                <h3>Cadastrar Cliente</h3>
            </C.Header>
            <CC.DadosCliente>
                <div>
                    <label>Código: </label>
                    <input/>
                </div>
                <div>
                    <label>Data: </label>
                    <input/>
                </div>
                <div className="checkbox">
                    <div>
                        <input type='checkbox'/>
                        <label>SPC</label>
                    </div>
                    <div>
                        <input type='checkbox'/>
                        <label>DESATIVADO</label>
                    </div>
                    <div>
                        <input type='checkbox'/>
                        <label>Cliente Simplificado</label>
                    </div>
                </div>
            </CC.DadosCliente>
            <CC.Documentos>
                <fieldset className="informacao">
                    <legend>Documentos</legend>
                    <div className="cnpj-cpf">
                        <div>
                            <input name="documento" type='radio' checked/>
                            <label>Pessoa Jurídica</label>
                        </div>
                        <div>
                            <label>CNPJ: </label>
                            <input className="input-documentos"/>
                            <button>Buscar</button>
                        </div>
                        <div>
                            <label>Inscr. Municipal: </label>
                            <input className="input-documentos"/>
                        </div>
                    </div>
                    <div className="cnpj-cpf">
                        <div>
                            <input name="documento" type='radio'/>
                            <label>Pessoa Física</label>
                        </div>
                        <div>
                            <label>CPF: </label>
                            <input className="input-documentos"/>
                        </div>
                        <div>
                            <label>RG: </label>
                            <input className="input-documentos"/>
                        </div>
                        <div>
                            <label>Orgão: </label>
                            <input className="input-documentos"/>
                        </div>
                    </div>
                    <div className="cnpj-cpf">
                        <div>
                            <label>Ins. Estadual: </label>
                            <input className="input-documentos"/>
                        </div>
                        <input type="checkbox"/>
                        <label>Contribuinte de ICMS</label>
                    </div>
                </fieldset>
                
            </CC.Documentos>
            <CC.Informacao>
                <fieldset className="informacao">
                    <legend>Informações</legend>
                    <div>
                        <label>Nome: </label>
                        <input className="input-unico"/>
                    </div>
                    <div>
                        <label>Fantasia/Apelido: </label>
                        <input className="input-unico"/>
                    </div>
                    <div className="div-input">
                        <label>CEP: </label>
                        <input className="codigo" value={cep} onChange={(e) => setCep(e.target.value)}/>
                        <button onClick={pesquisarCep}>busca</button>
                        <label>Complemento: </label>
                        <input className="complemento"/>
                    </div>
                    <div className="div-input">
                        <label>Logradouro: </label>
                        <input value={endereco.logradouro}/>
                        <input className="codigo"/>
                    </div>
                    <div>
                        <label>Bairro: </label>
                        <input className="input-unico" value={endereco.bairro}/>
                    </div>
                    <div className="div-input">
                        <label>Municipio: </label>
                        <input className="codigo" value={endereco.ibge} onKeyDown={keyMunicipio}/>
                        <button onClick={keyMunicipio}>+</button>
                        <input className="municipio" value={endereco.localidade} readOnly/>
                        <label>UF: </label>
                        <input className="codigo" value={endereco.uf}/>
                    </div>
                    <div>
                        <label>Telefone: </label>
                        <input className="codigo"/>
                        <label>Celular: </label>
                        <input className="codigo"/>
                        <label>Data Nasc: </label>
                        <input className="codigo"/>
                    </div>
                    <div className="div-input">
                        <label>Perfil Tributá.: </label>
                        <input className="codigo" onKeyDown={keyPerfil}/>
                        <input readOnly/>
                    </div>
                    <div className="div-input">
                        <label>Ramo de Ativ.: </label>
                        <input className="codigo" onKeyDown={keyRamo}/>
                        <input readOnly/>
                    </div>
                    <div>
                        <label>Última Alter.: </label>
                        <input className="input-unico"/>
                    </div>
                    <div>
                        <label>Filial: </label>
                        <input className="codigo" onKeyDown={keyEmpresa}/>
                        <input readOnly/>
                    </div>
                </fieldset>
                
            </CC.Informacao>
            <C.Footer>
                <div className="buttons">
                    <button><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={cancelar}><img src="/images/voltar.png"/>Cancelar</button>
                </div>
            </C.Footer>
            {isModalPerfil ? <PerfilCliente close={()=> setIsModalPerfil(false)}/> : null}
            {isModalRamo ? <RamoAtividade close={()=> setIsModalRamo(false)}/> : null}
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)}/> : null}
            {isModalEmpresa ? <Emitente setIsModalEmpresa = {setIsModalEmpresa}/> : null}
        </C.Container>
    )
}