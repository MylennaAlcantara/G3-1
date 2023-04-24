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

export const EditarFuncionario = () => {
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);
    const codigoFuncionario = localStorage.getItem('idFuncionario');

    useEffect(() => {
        async function fetchDataFuncionario (){
            const response = await fetch(`http://8b38091fc43d.sn.mynetname.net:2003/user/${codigoFuncionario}`);
            const data = await response.json();
            setNivel({
                codigo: data.nivelAcesso.id,
                nome: data.nivelAcesso.descricao
            });
            setCodigo(data.id);
            setNome(data.nome);
            setEndereco(data.endereco);
            setNumero(data.numero_endereco);
            setComplemento(data.complemento_endereco);
            setBairro(data.bairro);
            setCep(data.cep);
            setContato(data.pessoa_contato);
            setDadosCidades({
                codigo: data.codigo_municipio,
                nome: data.municipio,
                uf: data.uf
            });
            setTelefone(data.telefone);
            setCelular(data.celular);
            setEmail(data.email);
            setComissao(data.comissao);
            setMeta(data.meta);
            setSalario(data.salario);
            setSetor({
                codigo: data.setorFuncionario.id,
                nome: data.setorFuncionario.descricao,
                operador: data.setorFuncionario.operadorDeCaixa
            });
            setDataIdSelectEmitente(data.filial.id);
            setDataSelectEmitente(data.filial.razaoSocial);
            setMotorista(data.motorista);
            setCpf(data.cpf);
            setRg(data.rg);
            setRic(data.ric);
            setCtps(data.ctps);
            setSerie(data.ctps_serie);
            setTitulo(data.titulo_eleitor);
            setPis(data.pis);
            setObs(data.obs)
            setDataNascimento(data.dataNascimento);
            setDataAdmissao(data.data_admissao);
            setDataCadastro(data.data_cadastro)
            setMatricula(data.matricula);
            setSenha(data.senha);
            setUsuarioSistema(data.usuarioSistema);
        }
        fetchDataFuncionario();
    }, []);

    // Estados dos modais
    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalFilial, setIsModalFilial] = useState(false);
    const [isModalSetor, setIsModalSetor] = useState(false);
    const [isModalNivel, setIsModalNivel] = useState(false);

    // Dados da aba de geral
    const [codigo, setCodigo] = useState();
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
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
    const [salario, setSalario] = useState('');
    const [setor, setSetor] = useState({
        codigo: "",
        nome: "",
        operador: false
    });
    const [nivel, setNivel] = useState({
        codigo: "",
        nome: ""
    });
    const [dataSelectEmitente, setDataSelectEmitente] = useState();
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState();
    const [motorista, setMotorista] = useState(false);

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
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');

    // Dados de acesso
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [usuarioSistema, setUsuarioSistema] = useState(false);
    const password = MD5(senha).toString();
    const [ativado, setAtivado] = useState(true);

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

    const salvar = async () => {
        try{
            const res = await fetch("http://8b38091fc43d.sn.mynetname.net:2003/user/edit",{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: codigo,
                    nome: nome,
                    matricula: matricula,
                    senha: password,
                    comissao: comissao,
                    cpf: cpf,
                    ctps: ctps,
                    ctps_serie: serie,
                    salario: salario,
                    cep: cep,
                    telefone: telefone,
                    celular:  celular,
                    email: email,
                    bairro: bairro,
                    codigo_municipio: dadosCidades.codigo,
                    complemento_endereco: complemento,
                    pessoa_contato: contato,
                    endereco: endereco,
                    uf: dadosCidades.uf,
                    municipio: dadosCidades.nome,
                    numero_endereco: numero,
                    obs: obs,
                    data_cadastro: dataCadastro,
                    data_admissao: dataAdmissao,
                    rg: rg,
                    titulo_eleitor: titulo,
                    ric: ric,
                    pis: pis,
                    setorFuncionario: {
                        id: setor.codigo,
                        descricao: setor.nome,
                        operadorDeCaixa: setor.operador
                    },
                    nivelAcesso: {
                        id: nivel.codigo,
                        descricao: nivel.nome
                    },
                    meta: meta,
                    senhaExpirada: false,
                    filial: {
                        id: dataIdSelectEmitente,
                        razaoSocial: dataSelectEmitente
                    },
                    usuarioSistema: usuarioSistema,
                    motorista: motorista,
                    dataNascimento: dataNascimento,
                    excluido: false,
                    ativo: ativado
                })
            });
            if(res.status === 201 || res.status === 200){
                alert('Editado com sucesso!');
                navigate('/funcionarios');
            }
        }catch(err){
            console.log(err);
        }
    }

    function voltar (){
        navigate('/funcionarios');
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}</C.NaviBar>
            <C.Header>
                <h3> Editar Funcionário</h3>
            </C.Header>
            <CF.DadosFuncionario>
                <div>
                    <label>Código:</label>
                    <input value={codigo} readOnly/>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "start", alignContent: "center", height: "100%"}}>
                        <input className="checkbox" type="checkbox" onChange={()=> setMotorista(true)} checked={motorista === true}/>
                        <label>Motorista</label>
                    </div>
                </div>
                <div className="campo">
                    <div style={{justifyContent: "end"}}>
                        <label>Data de Cadastro: </label>
                        <input value={dataCadastro} readOnly/>
                    </div>
                    <div style={{justifyContent: "end"}}>
                        <label>Data de Admissão: </label>
                        <input type="date" value={dataAdmissao} onChange={(e)=> setDataAdmissao(e.target.value)}/>
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
                            <input className="codigo" value={cep} onChange={(e)=> {setCep(e.target.value)}}/>
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
                            <input className="codigo" value={meta} onChange={(e)=> {setMeta(e.target.value)}}/>
                            <label>Salario: </label>
                            <input className="codigo" value={salario} onChange={(e)=> {setSalario(e.target.value)}}/><label style={{color: 'red', fontWeight: 'bold'}}>R$</label>
                        </div>
                        <div className="double-input">
                            <label>Setor: </label>
                            <input className="codigo" value={setor.codigo} onDoubleClick={()=> setIsModalSetor(true)} onKeyDown={setores} title='Aperte F2 para listar as opções'/>
                            <input value={setor.nome}/>
                        </div>
                        <div className="double-input">
                            <label>Nível: </label>
                            <input className="codigo" value={nivel.codigo} onDoubleClick={()=> setIsModalNivel(true)} onKeyDown={niveis} title='Aperte F2 para listar as opções'/>
                            <input value={nivel.nome}/>
                        </div>
                        <div className="double-input">
                            <label>Filial: </label>
                            <input className="codigo" value={dataIdSelectEmitente} onDoubleClick={()=> setIsModalFilial(true)} onKeyDown={filiais} title='Aperte F2 para listar as opções'/>
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
                        <input type="checkbox" className="checkbox" onChange={()=> setUsuarioSistema(true)} checked={usuarioSistema === true}/>
                        <label>Usuário do sistema</label>
                    </div>
                    <div>
                        <label>Matrícula: </label>
                        <input value={matricula} onChange={(e)=> {setMatricula(e.target.value)}}/>
                        <label>Senha: </label>
                        <input type="password" value={senha} onChange={(e)=> {setSenha(e.target.value)}}/>
                    </div>
                </fieldset>
            </CF.Fieldset>
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                    {ativado ? (
                        <button onClick={()=> setAtivado(false)}><img src="/images/off.png" className="ativo"/>Desativar</button>
                    ) : (
                        <button onClick={()=> setAtivado(true)}><img src="/images/on.png" className="ativo"/>Ativar</button>
                    )}
                    <button onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCidades ={setDadosCidades} setIsModalMunicipio={setIsModalMunicipio}/> : null}
            {isModalFilial ? <Emitente onClose={()=> setIsModalFilial(false)} setDataIdSelectEmitente ={setDataIdSelectEmitente} setDataSelectEmitente={setDataSelectEmitente} setIsModalFilial={setIsModalFilial} /> : null}
            {isModalSetor ? <Setor close={()=> setIsModalSetor(false)} setSetor={setSetor}/> : null}
            {isModalNivel ? <Nivel close={()=> setIsModalNivel(false)} setNivel={setNivel}/> : null}
        </C.Container>
    )
}