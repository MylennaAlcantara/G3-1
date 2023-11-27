import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modais/modal_emitente";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { Nivel } from "../../modais/modal_nivel";
import { Setor } from "../../modais/modal_setor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "../cadastro_funcionario/cadastroFuncionario";
import { MD5 } from "crypto-js";

export const EditarFuncionario = ({ minimizado, setMinimizado }) => {
    const navigate = useNavigate();
    const { user, empresa, cnpjMask, dataMask } = useContext(AuthContext);
    const codigoFuncionario = localStorage.getItem('idFuncionario');

    useEffect(() => {
        async function fetchDataFuncionario() {
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL + `/user/${codigoFuncionario}`);
            const data = await response.json();
            setDadosFuncionario({
                id: data.id,
                nome: data.nome,
                matricula: data.matricula,
                senha: data.senha,
                comissao: data.comissao,
                cpf: data.cpf,
                ctps: data.ctps,
                ctps_serie: data.ctps_serie,
                salario: data.salario,
                cep: data.cep,
                telefone: data.telefone,
                celular: data.celular,
                email: data.email,
                bairro: data.bairro,
                codigo_municipio: data.codigo_municipio,
                complemento_endereco: data.complemento_endereco,
                pessoa_contato: data.pessoa_contato,
                endereco: data.endereco,
                uf: data.uf,
                municipio: data.municipio,
                numero_endereco: data.numero_endereco,
                obs: data.obs,
                data_cadastro: data.data_cadastro,
                data_admissao: data.data_admissao,
                rg: data.rg,
                titulo_eleitor: data.titulo_eleitor,
                ric: data.ric,
                pis: data.pis,
                setorFuncionario: data.setorFuncionario,
                nivelAcesso: data.nivelAcesso,
                meta: data.meta,
                senhaExpirada: data.senhaExpirada,
                filial: data.filial,
                usuarioSistema: data.usuarioSistema,
                motorista: data.motorista,
                dataNascimento: data.dataNascimento,
                excluido: data.excluido,
                ativo: data.ativo
            })
        }
        fetchDataFuncionario();
    }, []);

    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [isModalNivel, setIsModalNivel] = useState(false);

    const [dadosFuncionario, setDadosFuncionario] = useState(JSON.parse(localStorage.getItem("dadosFuncionario")) || {
        id: "",
        nome: "",
        matricula: "",
        senha: "",
        comissao: "",
        cpf: "",
        ctps: "",
        ctps_serie: "",
        salario: "",
        cep: "",
        telefone: "",
        celular: "",
        email: "",
        bairro: "",
        codigo_municipio: "",
        complemento_endereco: "",
        pessoa_contato: "",
        endereco: "",
        uf: "",
        municipio: "",
        numero_endereco: "",
        obs: "",
        data_cadastro: "",
        data_admissao: "",
        rg: "",
        titulo_eleitor: "",
        ric: "",
        pis: "",
        setorFuncionario: {
            id: "",
            descricao: "",
            operadorDeCaixa: ""
        },
        nivelAcesso: {
            id: "",
            descricao: ""
        },
        meta: "",
        senhaExpirada: "",
        filial: {
            id: "",
            razaoSocial: ""
        },
        usuarioSistema: false,
        motorista: false,
        dataNascimento: "",
        excluido: false,
        ativo: true
    });

    const [aba, setAba] = useState('geral');

    function geral() {
        setAba('geral');
    }
    function documentos() {
        setAba('documentos');
    }

    // Abrir modais com F1
    function filiais(e) {
        e.preventDefault();
        if (e.keyCode === 112) {
            setIsModalFilial(true);
        }
    }
    function setores(e) {
        e.preventDefault();
        if (e.keyCode === 112) {
            setIsModalSetor(true);
        }
    }
    function niveis(e) {
        e.preventDefault();
        if (e.keyCode === 112) {
            setIsModalNivel(true);
        }
    }

    // Bloqueia o F1 padrão do site
    document.onkeydown = function f1(e) { if (e.keyCode === 112) e.preventDefault() }

    function municipios(e) {
        setIsModalMunicipio(true);
    }

    //Pegar hora do computador
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    useEffect(() => {
        async function setarHoraData() {
            const password = MD5(dadosFuncionario.senha).toString();
            setDadosFuncionario({ ...dadosFuncionario, data_cadastro: String(dataAtual), senha: password });
        }
        setarHoraData();
    }, [])

    const [cor, setCor] = useState('');

    const salvar = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL + "/user/edit", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosFuncionario)
            });
            if (res.status === 201 || res.status === 200) {
                alert('Editado com sucesso!');
                navigate('/funcionarios');
                localStorage.removeItem("dadosFuncionario");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function minimizar() {
        setMinimizado({ ...minimizado, editarFuncionario: true })
        localStorage.setItem("dadosFuncionario", JSON.stringify(dadosFuncionario));
        navigate("/home");
    }
    function voltar() {
        navigate('/funcionarios');
        localStorage.removeItem("dadosFuncionario");
    }

    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))} </C.NaviBar>
            <C.Header>
                <h3> Editar Funcionário</h3>
                <div className="buttons">
                    <button className="minimizar" onClick={minimizar}><div className="linha" /></button>
                    <button className="close" onClick={voltar}>X</button>
                </div>
            </C.Header>
            <CF.DadosFuncionario>
                <div>
                    <label>Código:</label>
                    <input value={dadosFuncionario.id} style={{ outline: 0, color: "black" }} disabled readOnly />
                </div>
                <div className="campo">
                    <div style={{ justifyContent: "start", alignContent: "center", height: "100%" }}>
                        <input className="checkbox" type="checkbox" checked={dadosFuncionario.motorista ? true : false} onChange={() => setDadosFuncionario({ ...dadosFuncionario, motorista: !dadosFuncionario.motorista })} />
                        <label>Motorista</label>
                    </div>
                </div>
                <div className="campo">
                    <div style={{ justifyContent: "end" }}>
                        <label>Data Modificação: </label>
                        <input value={dataMask(dadosFuncionario.data_cadastro)} style={{ outline: 0, color: "black" }} disabled readOnly />
                    </div>
                    <div style={{ justifyContent: "end" }}>
                        <label>Data de Admissão: </label>
                        <input type="date" value={dadosFuncionario.data_admissao} onChange={(e) => setDadosFuncionario({ ...dadosFuncionario, data_admissao: e.target.value })} style={{ backgroundColor: cor }} />
                    </div>
                </div>
            </CF.DadosFuncionario>
            <CC.Navegacao>
                <div onClick={geral} style={{ backgroundColor: aba === 'geral' ? "white" : "", borderBottom: aba === 'geral' ? "none" : "" }}>Gerais</div>
                <div onClick={documentos} style={{ backgroundColor: aba === 'documentos' ? "white" : "", borderBottom: aba === 'documentos' ? "none" : "" }}>Documento/Obs</div>
            </CC.Navegacao>
            {aba === "geral" ? (
                <CF.Geral>
                    <div className="geral">
                        <div>
                            <label>Nome: </label>
                            <input className="input-unico" value={dadosFuncionario.nome} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, nome: e.target.value }) }} style={{ backgroundColor: cor }} />
                        </div>
                        <div>
                            <label>Endereço: </label>
                            <div className="input-unico">
                                <input value={dadosFuncionario.endereco} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, endereco: e.target.value }) }} />
                                <label>Nº: </label>
                                <input className="codigo" value={dadosFuncionario.numero_endereco} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, numero_endereco: e.target.value }) }} />
                            </div>
                        </div>
                        <div>
                            <label>Complemento: </label>
                            <input className="input-unico" value={dadosFuncionario.complemento_endereco} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, complemento_endereco: e.target.value }) }} />
                        </div>
                        <div>
                            <label>Bairro: </label>
                            <input className="input-unico" value={dadosFuncionario.bairro} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, bairro: e.target.value }) }} />
                        </div>
                        <div>
                            <label>Contato: </label>
                            <input className="input-unico" value={dadosFuncionario.pessoa_contato} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, pessoa_contato: e.target.value }) }} />
                        </div>
                        <div id="municipio" className="municipio">
                            <label>Municipio: </label>
                            <input className="codigo" id="codigoMunicipio" value={dadosFuncionario.codigo_municipio} />
                            <img alt="" src="/images/add.png" onClick={municipios} style={{ margin: "auto 5px 2px 0px" }} />
                            <input id="municipio-uf" value={dadosFuncionario.municipio} style={{ outline: 0, color: "black" }} disabled readOnly />
                            <input id="municipio-uf" value={dadosFuncionario.uf} style={{ outline: 0, color: "black", marginLeft: "5px" }} disabled readOnly />
                        </div>
                        <div id="municipio">
                            <label>Telefone: </label>
                            <input className="codigo" id="meta" value={dadosFuncionario.telefone} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, telefone: e.target.value }) }} />
                            <div className="telefone-celular-data">
                                <label>CEP: </label>
                                <input className="codigo" id="meta" value={dadosFuncionario.cep} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, cep: e.target.value }) }} />
                            </div>
                            <div className="telefone-celular-data">
                                <label>Celular: </label>
                                <input className="codigo" id="meta" value={dadosFuncionario.celular} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, celular: e.target.value }) }} />
                            </div>
                        </div>
                        <div>
                            <label>Email: </label>
                            <input className="input-unico" value={dadosFuncionario.email} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, email: e.target.value }) }} />
                        </div>
                        <div id="municipio">
                            <label>Comissão: </label>
                            <input className="codigo" id="comissao" value={dadosFuncionario.comissao} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, comissao: e.target.value }) }} /><label style={{ color: 'red', fontWeight: 'bold' }}>%</label>
                            <div className="telefone-celular-data">
                                <label>Meta: </label>
                                <input className="codigo" id="meta" value={dadosFuncionario.meta} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, meta: e.target.value }) }} />
                            </div>
                            <div className="telefone-celular-data">
                                <label>Salário: </label>
                                <input className="codigo" id="salario" value={dadosFuncionario.salario} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, salario: e.target.value }) }} /><label style={{ color: 'red', fontWeight: 'bold' }}>R$</label>
                            </div>
                        </div>
                        <div>
                            <label>Setor: </label>
                            <div className="input-unico">
                                <input className="codigo" value={dadosFuncionario.setorFuncionario && dadosFuncionario.setorFuncionario.id} onDoubleClick={() => setIsModalSetor(true)} onKeyDown={setores} style={{ backgroundColor: cor }} title='Aperte F2 para listar as opções' />
                                <input value={dadosFuncionario.setorFuncionario && dadosFuncionario.setorFuncionario.descricao} style={{ outline: 0, color: "black" }} disabled readOnly />
                            </div>
                        </div>
                        <div>
                            <label>Nível: </label>
                            <div className="input-unico">
                                <input className="codigo" value={dadosFuncionario.nivelAcesso && dadosFuncionario.nivelAcesso.id} onKeyDown={niveis} onDoubleClick={() => setIsModalNivel(true)} style={{ backgroundColor: cor }} title='Aperte F2 para listar as opções' />
                                <input value={dadosFuncionario.nivelAcesso && dadosFuncionario.nivelAcesso.descricao} style={{ outline: 0, color: "black" }} disabled readOnly />
                            </div>
                        </div>
                        <div>
                            <label>Filial: </label>
                            <div className="input-unico">
                                <input className="codigo" value={dadosFuncionario.filial && dadosFuncionario.filial.id} onDoubleClick={() => setIsModalFilial(true)} onKeyDown={filiais} style={{ backgroundColor: cor }} title='Aperte F2 para listar as opções' />
                                <input value={dadosFuncionario.filial && dadosFuncionario.filial.razaoSocial} style={{ outline: 0, color: "black" }} disabled readOnly />
                            </div>
                        </div>
                    </div>
                </CF.Geral>
            ) : (
                <CF.Documentos>
                    <div className="documentos">
                        <div className="doc">
                            <div className="cpf-ctps">
                                <div>
                                    <label>CPF: </label>
                                    <input value={dadosFuncionario.cpf} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, cpf: e.target.value }) }} />
                                </div>
                                <div>
                                    <label>RG: </label>
                                    <input value={dadosFuncionario.rg} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, rg: e.target.value }) }} />
                                </div>
                                <div>
                                    <label>RIC: </label>
                                    <input value={dadosFuncionario.ric} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, ric: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="cpf-ctps">
                                <div>
                                    <label>CTPS: </label>
                                    <input value={dadosFuncionario.ctps} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, ctps: e.target.value }) }} />
                                </div>
                                <div>
                                    <label>CTPS Série: </label>
                                    <input value={dadosFuncionario.ctps_serie} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, ctps_serie: e.target.value }) }} />
                                </div>
                                <div>
                                    <label>Título de eleitor: </label>
                                    <input value={dadosFuncionario.titulo_eleitor} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, titulo_eleitor: e.target.value }) }} />
                                </div>
                                <div>
                                    <label>PIS: </label>
                                    <input value={dadosFuncionario.pis} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, pis: e.target.value }) }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Observação:</label>
                            <textarea value={dadosFuncionario.obs} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, obs: e.target.value }) }} style={{ resize: "none" }} />
                        </div>
                        <div>
                            <label>Data Nasc.: </label>
                            <input type="date" value={dadosFuncionario.dataNascimento} onChange={(e) => setDadosFuncionario({ ...dadosFuncionario, dataNascimento: e.target.value })} />
                        </div>
                    </div>
                </CF.Documentos>
            )}
            <CF.Fieldset>
                <fieldset>
                    <legend>Controle de Usuário</legend>
                    <div>
                        <input type="checkbox" className="checkbox" checked={dadosFuncionario.usuarioSistema ? true : false} onChange={() => setDadosFuncionario({ ...dadosFuncionario, usuarioSistema: !dadosFuncionario.usuarioSistema })} />
                        <label>Usuário do sistema</label>
                    </div>
                    <div>
                        <label>Matrícula: </label>
                        <input value={dadosFuncionario.matricula} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, matricula: e.target.value }) }} />
                        <label>Senha: </label>
                        <input type="password" value={dadosFuncionario.senha} onChange={(e) => { setDadosFuncionario({ ...dadosFuncionario, senha: e.target.value }) }} />
                    </div>
                </fieldset>
            </CF.Fieldset>
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img alt="" src="/images/salvar.png" />Salvar</button>
                    {dadosFuncionario.ativo ? (
                        <button onClick={() => setDadosFuncionario({ ...dadosFuncionario, ativo: false })}><img alt="" src="/images/off.png" className="ativo" />Desativar</button>
                    ) : (
                        <button onClick={() => setDadosFuncionario({ ...dadosFuncionario, ativo: true })}><img alt="" src="/images/on.png" className="ativo" />Ativar</button>
                    )}
                    <button onClick={voltar}><img alt="" src="/images/voltar.png" />Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={() => setIsModalMunicipio(false)} setIsModalMunicipio={setIsModalMunicipio} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario} /> : null}
            {isModalFilial ? <Emitente onClose={() => setIsModalFilial(false)} setIsModalFilial={setIsModalFilial} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario} /> : null}
            {isModalSetor ? <Setor close={() => setIsModalSetor(false)} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario} cadastro={{ setor: null }} /> : null}
            {isModalNivel ? <Nivel close={() => setIsModalNivel(false)} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario} cadastro={{ nivel: null }} /> : null}
        </C.Container>
    )
}