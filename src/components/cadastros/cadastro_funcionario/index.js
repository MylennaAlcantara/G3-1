import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modais/modal_emitente";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { Nivel } from "../../modais/modal_nivel";
import { Setor } from "../../modais/modal_setor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "./cadastroFuncionario";

export const CadastroFuncionario = () => {
    const navigate = useNavigate();

    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [isModalNivel, setIsModalNivel] = useState(false);

    // Dados da aba de geral
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [contato, setContato] = useState('');
    const [dadosCidades, setDadosCidades] = useState({
        codigo: "",
        nome: "",
        uf: ""
    });
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [comissao, setComissao] = useState('');
    const [meta, setMeta] = useState('');
    const [setor, setSetor] = useState({
        codigo: "",
        nome: ""
    });
    const [nivel, setNivel] = useState({
        codigo: "",
        nome: ""
    });
    const [dataSelectEmitente, setDataSelectEmitente] = useState();
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState();

    // Dados da aba de Documentos
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [ric, setRic] = useState('');
    const [ctps, setCtps] = useState('');
    const [serie, setSerie] = useState('');
    const [titulo, setTitulo] = useState('');
    const [pis, setPis] = useState('');
    const [obs, setObs] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    // Dados de acesso
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

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

    function voltar (){
        navigate('/funcionarios');
    }

    return(
        <C.Container>
            <C.NaviBar></C.NaviBar>
            <C.Header>
                <h3> Cadastrar Funcionário</h3>
            </C.Header>
            <CF.DadosFuncionario>
                <div>
                    <label>Código:</label>
                    <input readOnly/>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "start"}}>
                        <input className="checkbox" type="checkbox"/>
                        <label>Ativo</label>
                    </div>
                    <div style={{justifyContent: "start"}}>
                        <input className="checkbox" type="checkbox"/>
                        <label>Motorista</label>
                    </div>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "end"}}>
                        <label>Data Modificação: </label>
                        <input/>
                    </div>
                    <div style={{justifyContent: "end"}}>
                        <label>Data de Admissão: </label>
                        <input type="date"/>
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
                            <input value={nome} onChange={(e)=> {setNome(e.target.value)}}/>
                        </div>
                        <div className="double-input">
                            <label>Endereço: </label>
                            <input value={endereco} onChange={(e)=> {setEndereco(e.target.value)}}/>
                            <label>Nº: </label>
                            <input className="codigo" value={numero} onChange={(e)=> {setNumero(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Complemento: </label>
                            <input value={complemento} onChange={(e)=> {setComplemento(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Bairro: </label>
                            <input value={bairro} onChange={(e)=> {setBairro(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Contato: </label>
                            <input value={contato} onChange={(e)=> {setContato(e.target.value)}}/>
                        </div>
                        <div className="municipio">
                            <label>Municipio: </label>
                            <input className="codigo" value={dadosCidades.codigo}/>
                            <img src="/images/add.png" onClick={municipios}/>
                            <input value={dadosCidades.nome}/>
                            <input value={dadosCidades.uf}/>
                        </div>
                        <div className="telefone-comissao">
                            <label>Telefone: </label>
                            <input className="codigo" value={telefone} onChange={(e)=> {setTelefone(e.target.value)}}/>
                            <label>CEP: </label>
                            <input className="codigo" />
                            <label>Celular: </label>
                            <input className="codigo" value={celular} onChange={(e)=> {setCelular(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Email: </label>
                            <input value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                        </div>
                        <div className="telefone-comissao">
                            <label>Comissão: </label>
                            <input className="codigo" value={comissao} onChange={(e)=> {setComissao(e.target.value)}}/><label style={{color: 'red', fontWeight: 'bold'}}>%</label>
                            <label>Meta: </label>
                            <input className="codigo" value={meta} onChange={(e)=> {setMeta(e.target.value)}}/><label style={{color: 'red', fontWeight: 'bold'}}>R$</label>
                        </div>
                        <div className="double-input">
                            <label>Setor: </label>
                            <input className="codigo" value={setor.codigo} onKeyDown={setores}/>
                            <input value={setor.nome}/>
                        </div>
                        <div className="double-input">
                            <label>Nível: </label>
                            <input className="codigo" value={nivel.codigo} onKeyDown={niveis}/>
                            <input value={nivel.nome}/>
                        </div>
                        <div className="double-input">
                            <label>Filial: </label>
                            <input className="codigo" value={dataIdSelectEmitente} onKeyDown={filiais}/>
                            <input value={dataSelectEmitente}/>
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
                                    <input value={cpf} onChange={(e)=> {setCpf(e.target.value)}}/>
                                </div>
                                <div>
                                    <label>RG: </label>
                                    <input value={rg} onChange={(e)=> {setRg(e.target.value)}}/>
                                </div>
                                <div>
                                    <label>RIC: </label>
                                    <input value={ric} onChange={(e)=> {setRic(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="cpf-ctps">
                                <div>
                                    <label>CTPS: </label>
                                    <input value={ctps} onChange={(e)=> {setCtps(e.target.value)}}/>
                                </div>
                                <div>
                                    <label>CTPS Série: </label>
                                    <input value={serie} onChange={(e)=> {setSerie(e.target.value)}}/>
                                </div>
                                <div>
                                    <label>Título de eleitor: </label>
                                    <input value={titulo} onChange={(e)=> {setTitulo(e.target.value)}}/>
                                </div>
                                <div>
                                    <label>PIS: </label>
                                    <input value={pis} onChange={(e)=> {setPis(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Observação:</label>
                            <textarea value={obs} onChange={(e)=> {setObs(e.target.value)}}/>
                        </div>
                        <div>
                            <label>Data Nasc.: </label>
                            <input type="date" value={dataNascimento} onChange={(e)=> setDataNascimento(e.target.value)}/>
                        </div>
                    </div>
                </CF.Documentos>
            )}
            <CF.Fieldset>
                <fieldset>
                    <legend>Controle de Usuário</legend>
                    <div>
                        <input type="checkbox" className="checkbox"/>
                        <label>Usuário do sistema</label>
                    </div>
                    <div>
                        <label>Matrícula: </label>
                        <input value={matricula} onChange={(e)=> {setMatricula(e.target.value)}}/>
                        <label>Senha: </label>
                        <input value={senha} onChange={(e)=> {setSenha(e.target.value)}}/>
                    </div>
                </fieldset>
            </CF.Fieldset>
            <C.Footer>
                <div className="buttons">
                    <button><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCidades ={setDadosCidades} setIsModalMunicipio={setIsModalMunicipio}/> : null}
            {isModalFilial ? <Emitente onClose={()=> setIsModalFilial(false)} setDataIdSelectEmitente ={setDataIdSelectEmitente} setDataSelectEmitente={setDataSelectEmitente} setIsModalFilial={setIsModalFilial}/> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} setSetor={setSetor}/> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} setNivel={setNivel}/> : null}
        </C.Container>
    )
}