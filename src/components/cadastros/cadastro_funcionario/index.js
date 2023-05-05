import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modais/modal_emitente";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { Nivel } from "../../modais/modal_nivel";
import { Setor } from "../../modais/modal_setor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "./cadastroFuncionario";
import { MD5 } from "crypto-js";

export const CadastroFuncionario = ({minimizado, setMinimizado}) => {
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);

    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [isModalNivel, setIsModalNivel] = useState(false);

    const [dadosFuncionario, setDadosFuncionario] = useState(JSON.parse(localStorage.getItem("dadosFuncionario")) || {
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
        celular:  "",
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

    function geral (){
        setAba('geral');
    }
    function documentos (){
        setAba('documentos');
    }

    // Abrir modais com F2
    function filiais (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalFilial(true);
        }
    }
    function setores (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalSetor(true);
        }
    }
    function niveis (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalNivel(true);
        }
    }
    function municipios (e){
        setIsModalMunicipio(true);
    }

    //Pegar hora do computador
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    useEffect(()=>{
        async function setarHoraData(){
            const password = MD5(dadosFuncionario.senha).toString();
            setDadosFuncionario({...dadosFuncionario, data_cadastro: String(dataAtual), senha: password});
        } 
        setarHoraData();
    },[])

    const [cor, setCor] = useState('');

    const salvar = async () => {
        if(dadosFuncionario.nome && dadosFuncionario.data_admissao && dadosFuncionario.setorFuncionario.id && dadosFuncionario.filial.id){
            try{
                const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/user/save",{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(dadosFuncionario)
                });
                if(res.status === 201 || res.status === 200){
                    alert('salvo com sucesso');
                    navigate('/funcionarios');
                    localStorage.removeItem("dadosFuncionario");
                }
            }catch(err){
                console.log(err);
            }
        }else{
            alert("Preencha os campos acima!");
            setCor('yellow');
        }
    }

    function minimizar (){
        setMinimizado({...minimizado, cadastroFuncionario: true})
        localStorage.setItem("dadosFuncionario", JSON.stringify(dadosFuncionario));
        navigate("/home");
    }
    function voltar (){
        navigate('/funcionarios');
        localStorage.removeItem("dadosFuncionario");
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)} </C.NaviBar>
            <C.Header>
                <h3> Cadastrar Funcionário</h3>
                <div className="buttons">
                    <button className="minimizar" onClick={minimizar}><div className="linha"/></button>
                    <button className="close" onClick={voltar}>X</button>
                </div>
            </C.Header>
            <CF.DadosFuncionario>
                <div>
                    <label>Código:</label>
                    <input readOnly/>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "start", alignContent: "center", height: "100%"}}>
                        <input className="checkbox" type="checkbox" checked={dadosFuncionario.motorista ? true : false} onChange={()=> setDadosFuncionario({...dadosFuncionario, motorista: !dadosFuncionario.motorista})}/>
                        <label>Motorista</label>
                    </div>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "end"}}>
                        <label>Data Modificação: </label>
                        <input value={dadosFuncionario.data_cadastro} readOnly/>
                    </div>
                    <div style={{justifyContent: "end"}}>
                        <label>Data de Admissão: </label>
                        <input type="date" value={dadosFuncionario.data_admissao} onChange={(e)=> setDadosFuncionario({...dadosFuncionario, data_admissao: e.target.value})} style={{backgroundColor: cor}}/>
                    </div>
                </div>
            </CF.DadosFuncionario>
            <CC.Navegacao>
                <div onClick={geral} style={{backgroundColor: aba === 'geral' ? "white" : "", borderBottom: aba === 'geral' ? "none" : ""}}>Gerais</div>
                <div onClick={documentos} style={{backgroundColor: aba === 'documentos' ? "white" : "", borderBottom: aba === 'documentos' ? "none" : ""}}>Documento/Obs</div>
            </CC.Navegacao>
            {aba === "geral" ? (
                <CF.Geral>
                    <div className="geral">
                        <div>
                            <label>Nome: </label>
                            <input value={dadosFuncionario.nome} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, nome: e.target.value})}} style={{backgroundColor: cor}}/>
                        </div>
                        <div className="double-input">
                            <label>Endereço: </label>
                            <input value={dadosFuncionario.endereco} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, endereco: e.target.value})}}/>
                            <label>Nº: </label>
                            <input className="codigo" value={dadosFuncionario.numero_endereco} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, numero_endereco: e.target.value})}}/>
                        </div>
                        <div>
                            <label>Complemento: </label>
                            <input value={dadosFuncionario.complemento_endereco} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, complemento_endereco: e.target.value})}}/>
                        </div>
                        <div>
                            <label>Bairro: </label>
                            <input value={dadosFuncionario.bairro} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, bairro: e.target.value})}}/>
                        </div>
                        <div>
                            <label>Contato: </label>
                            <input value={dadosFuncionario.pessoa_contato} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, pessoa_contato: e.target.value})}}/>
                        </div>
                        <div className="municipio">
                            <label>Municipio: </label>
                            <input className="codigo" value={dadosFuncionario.codigo_municipio}/>
                            <img src="/images/add.png" onClick={municipios}/>
                            <input value={dadosFuncionario.municipio}/>
                            <input value={dadosFuncionario.uf}/>
                        </div>
                        <div className="telefone-comissao">
                            <label>Telefone: </label>
                            <input className="codigo" value={dadosFuncionario.telefone} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, telefone: e.target.value})}}/>
                            <label>CEP: </label>
                            <input className="codigo" value={dadosFuncionario.cep} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, cep: e.target.value})}}/>
                            <label>Celular: </label>
                            <input className="codigo" value={dadosFuncionario.celular} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, celular: e.target.value})}}/>
                        </div>
                        <div>
                            <label>Email: </label>
                            <input value={dadosFuncionario.email} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, email: e.target.value})}}/>
                        </div>
                        <div className="telefone-comissao">
                            <label>Comissão: </label>
                            <input className="codigo" value={dadosFuncionario.comissao} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, comissao: e.target.value})}}/><label style={{color: 'red', fontWeight: 'bold'}}>%</label>
                            <label>Meta: </label>
                            <input className="codigo" value={dadosFuncionario.meta} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, meta: e.target.value})}}/>
                            <label>Salario: </label>
                            <input className="codigo" value={dadosFuncionario.salario} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, salario: e.target.value})}}/><label style={{color: 'red', fontWeight: 'bold'}}>R$</label>
                        </div>
                        <div className="double-input">
                            <label>Setor: </label>
                            <input className="codigo" value={dadosFuncionario.setorFuncionario.id} onDoubleClick={()=> setIsModalSetor(true)} onKeyDown={setores} style={{backgroundColor: cor}} title='Aperte F2 para listar as opções'/>
                            <input value={dadosFuncionario.setorFuncionario.descricao}/>
                        </div>
                        <div className="double-input">
                            <label>Nível: </label>
                            <input className="codigo" value={dadosFuncionario.nivelAcesso.id} onKeyDown={niveis} onDoubleClick={()=> setIsModalNivel(true)} style={{backgroundColor: cor}} title='Aperte F2 para listar as opções'/>
                            <input value={dadosFuncionario.nivelAcesso.descricao}/>
                        </div>
                        <div className="double-input">
                            <label>Filial: </label>
                            <input className="codigo" value={dadosFuncionario.filial.id} onDoubleClick={()=> setIsModalFilial(true)} onKeyDown={filiais} style={{backgroundColor: cor}} title='Aperte F2 para listar as opções'/>
                            <input value={dadosFuncionario.filial.razaoSocial}/>
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
                                    <input value={dadosFuncionario.cpf} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, cpf: e.target.value})}}/>
                                </div>
                                <div>
                                    <label>RG: </label>
                                    <input value={dadosFuncionario.rg} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, rg: e.target.value})}}/>
                                </div>
                                <div>
                                    <label>RIC: </label>
                                    <input value={dadosFuncionario.ric} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, ric: e.target.value})}}/>
                                </div>
                            </div>
                            <div className="cpf-ctps">
                                <div>
                                    <label>CTPS: </label>
                                    <input value={dadosFuncionario.ctps} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, ctps: e.target.value})}}/>
                                </div>
                                <div>
                                    <label>CTPS Série: </label>
                                    <input value={dadosFuncionario.ctps_serie} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, ctps_serie: e.target.value})}}/>
                                </div>
                                <div>
                                    <label>Título de eleitor: </label>
                                    <input value={dadosFuncionario.titulo_eleitor} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, titulo_eleitor: e.target.value})}}/>
                                </div>
                                <div>
                                    <label>PIS: </label>
                                    <input value={dadosFuncionario.pis} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, pis: e.target.value})}}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Observação:</label>
                            <textarea value={dadosFuncionario.obs} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, obs: e.target.value})}}/>
                        </div>
                        <div>
                            <label>Data Nasc.: </label>
                            <input type="date" value={dadosFuncionario.dataNascimento} onChange={(e)=> setDadosFuncionario({...dadosFuncionario, dataNascimento: e.target.value})}/>
                        </div>
                    </div>
                </CF.Documentos>
            )}
            <CF.Fieldset>
                <fieldset>
                    <legend>Controle de Usuário</legend>
                    <div>
                        <input type="checkbox" className="checkbox" checked={dadosFuncionario.usuarioSistema ? true : false} onChange={()=> setDadosFuncionario({...dadosFuncionario, usuarioSistema: !dadosFuncionario.usuarioSistema})}/>
                        <label>Usuário do sistema</label>
                    </div>
                    <div>
                        <label>Matrícula: </label>
                        <input value={dadosFuncionario.matricula} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, matricula: e.target.value})}}/>
                        <label>Senha: </label>
                        <input type="password" value={dadosFuncionario.senha} onChange={(e)=> {setDadosFuncionario({...dadosFuncionario, senha: e.target.value})}}/>
                    </div>
                </fieldset>
            </CF.Fieldset>
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setIsModalMunicipio={setIsModalMunicipio} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario}/> : null}
            {isModalFilial ? <Emitente onClose={()=> setIsModalFilial(false)} setIsModalFilial={setIsModalFilial} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario}/> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} setDadosFuncionario={setDadosFuncionario} dadosFuncionario={dadosFuncionario}/> : null}
        </C.Container>
    )
}