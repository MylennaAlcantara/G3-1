import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modais/modal_emitente/index";
import { ListaMunicipio } from "../../modais/modal_municipio/index";
import { PerfilCliente } from "../../modais/modal_perfil_cliente/index";
import { RamoAtividade } from "../../modais/modal_ramo_atividade/index";
import * as CC from "../cadastro_cliente/cadastroCliente";

export const CadastroCliente = ({ minimizado, setMinimizado}) => {
    const navigate = useNavigate();
    const {user, empresa, cnpjMask} = useContext(AuthContext);
    const idFuncionario = Array.isArray(user) && user.map((user) => user.id)
    
    //Pegar hora do computador

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    useEffect(()=>{
        async function setarHoraData(){
            setDadosCliente({
                ...dadosCliente,
                data_cadastro: String(dataAtual),
                data_insercao: String(dataAtual)
            });
        } 
        setarHoraData();
    },[])

    const [funcionario, setFuncionario] = useState([]);
    const [estados, setEstados] = useState([]);

    //Dados da parte de documentos
    const selectFuncionario = document.getElementById('option-funcionario');
    function handleDocumentoChange(event) {
        setDadosCliente({...dadosCliente, tipo_pessoa: event.target.value});
    }

    const [dadosCliente, setDadosCliente] = useState(JSON.parse(localStorage.getItem('dadosCliente')) || {
        municipal: "",
        rg: "",
        orgao_rg: "",
        inscricao_estadual: "",
        tipo_pessoa: "J",
        cpf_cnpj: "",
        endereco: "",
        cep: "",
        nome: "",
        nome_fantasia: "",
        complemento: "",
        numero: "",
        bairro: "",
        telefone: "",
        celular: "",
        email: "",
        observacao: '',
        limite: 0.0,
        limite_total: 200000.0,
        id_tipo_pagamento: null,
        data_nasc: "",
        id_funcionario: selectFuncionario,
        id_usuario_insercao: parseFloat(idFuncionario),
        perfilRegra: {},
        ramoAtividade: {},
        filial: {},
        inscricao_municipal: "",
        data_cadastro: "",
        data_insercao: "",
        municipio: "",
        estado: "",
        cod_municipio: "",
    })

    //estados dos modais
    const [isModalPerfil, setIsModalPerfil] = useState(false);
    const [isModalRamo, setIsModalRamo] = useState(false);
    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalEmpresa, setIsModalEmpresa] = useState(false);

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
        if(e.keyCode === 113){
            setIsModalMunicipio(true);
        }else if(e.keyCode != 113){
            e.preventDefault();
        }
    }
    function keyEmpresa (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalEmpresa(true);
        }
    }

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        async function fetchDataFuncionario (){
            const response = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/user/all");
            const data = await response.json();
            setFuncionario(data);
        }
            fetchDataFuncionario();
            fetchData();
            validarDocumento();
    }, []);

    function pesquisarMuni(){
        setIsModalMunicipio(true);
    }
    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${dadosCliente.cep}/json/`);
        const data = await response.json();
        setDadosCliente({
            ...dadosCliente, 
            endereco: data.logradouro,
            bairro: data.bairro,
            cod_municipio: data.ibge,
            municipio: data.localidade
        });
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckSimplificado = () => {
        setIsChecked(!isChecked);
    }

    const [cor, setCor] = useState('');
    const [corFisica, setCorFisica] = useState('');
    const [corObrigatorios, setCorObrigatorios] = useState('');
    const [corSimplificado, setCorSimplificado] = useState('');

    const validarDocumento = () => {
        if(dadosCliente.tipo_pessoa === 'J'){
            setCorFisica('#F0F0F0');
        }else if (dadosCliente.tipo_pessoa === 'F'){
            setCor('#F0F0F0');
        }
    }

    async function pesquisarCnpj (){
        const response = await fetch(`https://publica.cnpj.ws/cnpj/${dadosCliente.cpf_cnpj}`)
        const data = await response.json();
        data.estabelecimento.inscricoes_estaduais.map((dado)=> setDadosCliente({...dadosCliente, inscricao_estadual: dado.inscricao_estadual}))        
        setDadosCliente({
            ...dadosCliente,
            nome: data.razao_social,
            fantasia: data.estabelecimento.nome_fantasia,
            bairro: data.estabelecimento.bairro,
            telefone: data.estabelecimento.telefone1,
            cep: data.estabelecimento.cep,
            complemento: data.estabelecimento.complemento,
            endereco: data.estabelecimento.logradouro,
            numero: data.estabelecimento.numero,
            email: data.estabelecimento.email,
            cod_municipio: data.estabelecimento.cidade.ibge_id,
            municipio: data.estabelecimento.cidade.nome
        })
    }

    const salvar = async () => {
        if(dadosCliente.cod_municipio && dadosCliente.nome && dadosCliente.cep && dadosCliente.endereco && dadosCliente.bairro && dadosCliente.filial){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/clientes",{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(dadosCliente)
                });
                if(res.status === 201){
                    alert('salvo com sucesso');
                    navigate('/clientes');
                }
            }catch(err){
                console.log(err);
            }
        }else if(dadosCliente.nome && dadosCliente.cod_municipio && isChecked){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_LOGIN_USUARIO_CLIENTE_PERFIL_REGRA_RAMO_ATIVIDADE_SETOR_NIVEL+"/clientes",{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(dadosCliente)
                });
                if(res.status === 201){
                    alert('salvo com sucesso');
                    navigate('/clientes');
                }
            }catch(err){
                console.log(err);
            }
        }else if(isChecked){
            setCorSimplificado('yellow');
            alert('Preencha os campos a cima!');
        }else{
            setCorObrigatorios('yellow');
            alert('Preencha os campos a cima!');
        }
    }
    
    const [aba, setAba] = useState('dados-gerais');

    function dadosGerais (){
        setAba('dados-gerais');
    }
    function dadosAdicionais (){
        setAba('dados-adicionais');
    }
    function foto (){
        setAba('foto');
    }
    function historico (){
        setAba('historico');
    }

    const [abaHistorico, setAbaHistorico] = useState('limite');

    function limite (){
        setAbaHistorico('limite');
    }
    function cupom (){
        setAbaHistorico('cupom');
    }
    function vendas (){
        setAbaHistorico('vendas');
    }

    const [abaVendas, setAbaVendas] = useState('nfe');

    function nfe (){
        setAbaVendas('nfe');
    }
    function pgto (){
        setAbaVendas('pgto');
    }

    const cancelar = () => {
        navigate('/clientes');
        localStorage.removeItem("dadosCliente");
    }
    const comparar = (a, b) => {
        if(a.sigla < b.sigla ){
            return -1;
        }else if(a.sigla > b.sigla){
            return 1;
        }else{
            return 0;
        }
    }

    function minimizar (){
        setMinimizado({...minimizado, cadastroCliente: true})
        navigate("/home");
        localStorage.setItem("dadosCliente", JSON.stringify(dadosCliente));
    }

    return (
        <C.Container>
            <C.NaviBar>Usuário: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Cadastrar Cliente</h3>
                <div className="buttons">
                    <button className="minimizar" onClick={minimizar}><div className="linha"/></button>
                    <button className="close" onClick={cancelar}>X</button>
                </div>
            </C.Header>
            <CC.Navegacao>
                <div onClick={dadosGerais} style={{backgroundColor: aba === "dados-gerais" ? "white" : "", borderBottom: aba === "dados-gerais" ? "0" : ""}}>Dados Gerais</div>
                <div onClick={dadosAdicionais} style={{backgroundColor: aba === "dados-adicionais" ? "white" : "", borderBottom: aba === "dados-adicionais" ? "0" : ""}}>Dados Adicionais</div>
                {/*<div onClick={foto} style={{backgroundColor: aba === "foto" ? "white" : "", borderBottom: aba === "foto" ? "0" : ""}}>Fotos</div>*/}
                <div onClick={historico} style={{backgroundColor: aba === "historico" ? "white" : "", borderBottom: aba === "historico" ? "0" : ""}}>Historico</div>
            </CC.Navegacao>
            {aba === 'dados-gerais' ? (
                <CC.DadosGerais>
                    <CC.DadosCliente>
                        <div>
                            <label>Código: </label>
                            <input readOnly/>
                        </div>
                        <div>
                            <label>Data: </label>
                            <input readOnly/>
                        </div>
                        <div className="checkbox">
                            <div>
                                <input className="checkbox" type='checkbox'/>
                                <label>SPC</label>
                            </div>
                            <div>
                                <input className="checkbox" type='checkbox'/>
                                <label>DESATIVADO</label>
                            </div>
                            <div>
                                <input className="checkbox" type='checkbox' checked={isChecked} onChange={handleCheckSimplificado}/>
                                <label>Cliente Simplificado</label>
                            </div>
                        </div>
                    </CC.DadosCliente>
                    <CC.Documentos>
                        <fieldset className="informacao">
                            <legend>Documentos</legend>
                            <div className="cnpj-cpf">
                                <div>
                                    <input name="documento" type='radio' value="J" id="juridica"  checked={dadosCliente.tipo_pessoa === 'J'} onChange={handleDocumentoChange} onClick={validarDocumento}/>
                                    <label>Pessoa Jurídica</label>
                                </div>
                                <div>
                                    <label>CNPJ: </label>
                                    {dadosCliente.tipo_pessoa === "J" ? (
                                        <input className="input-documentos" value={dadosCliente.cpf_cnpj} onChange={(e)=> setDadosCliente({...dadosCliente, cpf_cnpj: e.target.value})}  style={{backgroundColor: isChecked ? "" : corObrigatorios}}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: cor}} readOnly/>
                                    )}
                                    <img src="/images/LUPA.png" onClick={pesquisarCnpj}/>
                                </div>
                                <div>
                                    <label>Inscr. Municipal: </label>
                                    {dadosCliente.tipo_pessoa === "J" ? (
                                        <input className="input-documentos" value={dadosCliente.municipal} onChange={(e)=> setDadosCliente({...dadosCliente, municipal: e.target.value})}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: cor}} readOnly/>
                                    )}
                                </div>
                            </div>
                            <div className="cnpj-cpf">
                                <div>
                                    {dadosCliente.tipo_pessoa === "F" ? (
                                        <input name="documento" type='radio' value="F" id="fisica"  checked={dadosCliente.tipo_pessoa === 'F'} onChange={handleDocumentoChange} onClick={validarDocumento} />
                                    ) : (
                                        <input name="documento" type='radio' value="F" id="fisica"  checked={dadosCliente.tipo_pessoa === 'F'} onChange={handleDocumentoChange} onClick={validarDocumento}/>
                                    )}
                                    <label>Pessoa Física</label>
                                </div>
                                <div>
                                    <label>CPF: </label>
                                    {dadosCliente.tipo_pessoa === "F" ? (
                                        <input className="input-documentos" value={dadosCliente.cpf_cnpj} onChange={(e)=> setDadosCliente({...dadosCliente, cpf_cnpj: e.target.value})}  style={{backgroundColor: isChecked ? "" : corObrigatorios}}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                                <div>
                                    <label>RG: </label>
                                    {dadosCliente.tipo_pessoa === "F" ? (
                                        <input className="input-documentos" value={dadosCliente.rg} onChange={(e)=> setDadosCliente({...dadosCliente, rg: e.target.value})}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                                <div>
                                    <label>Orgão: </label>
                                    {dadosCliente.tipo_pessoa === "F" ? (
                                        <input className="input-documentos" value={dadosCliente.orgao} onChange={(e)=> setDadosCliente({...dadosCliente, orgao: e.target.value})}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                            </div>
                            <div className="cnpj-cpf">
                                <div>
                                    <label>Ins. Estadual: </label>
                                    <input className="input-documentos" value={dadosCliente.estadual} onChange={(e)=> setDadosCliente({...dadosCliente, estadual: e.target.value})}/>
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
                                <input className="input-unico" value={dadosCliente.nome} onChange={(e)=> setDadosCliente({...dadosCliente, nome: e.target.value})} style={{backgroundColor: isChecked ? corSimplificado : corObrigatorios}}/>
                            </div>
                            <div>
                                <label>Fantasia/Apelido: </label>
                                <input className="input-unico" value={dadosCliente.fantasia} onChange={(e)=> setDadosCliente({...dadosCliente, fantasia: e.target.value})}/>
                            </div>
                            <div className="div-input">
                                <label>CEP: </label>
                                <input className="codigo" value={dadosCliente.cep} onChange={(e) => setDadosCliente({...dadosCliente, cep: e.target.value})} style={{backgroundColor: isChecked ? "" : corObrigatorios}}/>
                                <img src="/images/LUPA.png" onClick={pesquisarCep}/>
                                <label>Complemento: </label>
                                <input className="complemento" value={dadosCliente.complemento} onChange={(e)=> setDadosCliente({...dadosCliente, complemento: e.target.value})}/>
                            </div>
                            <div className="div-input">
                                <label>Logradouro: </label>
                                <input value={dadosCliente.endereco} id="endereco" onChange={(e)=> setDadosCliente({...dadosCliente, endereco: e.target.value})} style={{backgroundColor: isChecked ? "" : corObrigatorios}}/>
                                <input className="codigo" value={dadosCliente.numero} onChange={(e)=> setDadosCliente({...dadosCliente, numero: e.target.value})}/>
                            </div>
                            <div>
                                <label>Bairro: </label>
                                <input className="input-unico" id="bairro" value={dadosCliente.bairro} onChange={(e)=> setDadosCliente({...dadosCliente, bairro: e.target.value})} style={{backgroundColor: isChecked ? "" : corObrigatorios}}/>
                            </div>
                            <div className="div-input">
                                <label>Municipio: </label>
                                <input className="codigo" id="codigoMunicipio" value={dadosCliente.cod_municipio} onDoubleClick={pesquisarMuni} onKeyDown={keyMunicipio} readOnly style={{backgroundColor: isChecked ? corSimplificado : corObrigatorios}}/>
                                <img src="/images/add.png" onClick={pesquisarMuni}/>
                                <input className="municipio" id="municipio" value={dadosCliente.municipio} readOnly/>
                                <label>UF: </label>
                                <select className="codigo" id="option" onChange={(e)=> setDadosCliente({...dadosCliente, estado: e.target.value})}>
                                    <option value={dadosCliente.estado}>{dadosCliente.estado}</option>
                                    {estados.sort(comparar).map((estado)=> {
                                        return <option value={estado.sigla}>{estado.sigla}</option>
                                    })}
                                </select>
                            </div>
                            <div className="div-telefone">
                                <label>Telefone: </label>
                                <input className="codigo" value={dadosCliente.telefone} onChange={(e)=> setDadosCliente({...dadosCliente, telefone: e.target.value})}/>
                                <label>Celular: </label>
                                <input className="codigo" value={dadosCliente.celular} onChange={(e)=> setDadosCliente({...dadosCliente, celular: e.target.value})}/>
                                <label>Data Nasc: </label>
                                <input className="codigo" id="dataNascimento" type="date" value={dadosCliente.data_nasc} onChange={(e)=> setDadosCliente({...dadosCliente, data_nasc: e.target.value})}/>
                            </div>
                            <div>
                                <label>Email: </label>
                                <input type="email" className="input-unico" value={dadosCliente.email} onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}/>
                            </div>
                            <div className="div-input">
                                <label>Perfil Tributá.: </label>
                                <input className="codigo" value={dadosCliente.perfilRegra.id} onDoubleClick={()=> setIsModalPerfil(true)} onKeyDown={keyPerfil} title='Aperte F2 para listar as opções'/>
                                <input value={dadosCliente.perfilRegra.descricao} readOnly/>
                            </div>
                            <div className="div-input">
                                <label>Ramo de Ativ.: </label>
                                <input className="codigo" value={dadosCliente.ramoAtividade.id} onDoubleClick={()=> setIsModalRamo(true)} onKeyDown={keyRamo} title='Aperte F2 para listar as opções'/>
                                <input value={dadosCliente.ramoAtividade.descricao} readOnly/>
                            </div>
                            <div>
                                <label>Última Alter.: </label>
                                <input className="input-unico"/>
                            </div>
                            <div>
                                <label>Filial: </label>
                                <input className="codigo" value={dadosCliente.filial.id} onDoubleClick={()=> setIsModalEmpresa(true)} onKeyDown={keyEmpresa} title='Aperte F2 para listar as opções'/>
                                <input value={dadosCliente.filial.razaoSocial} readOnly/>
                            </div>
                        </fieldset>
                    </CC.Informacao>
                </CC.DadosGerais>
            ) : aba === 'dados-adicionais' ? (
                <CC.DadosAdicionais>
                <div>
                    <label>Vendedor: </label>
                        <select id="option-funcionario">
                            <option>0 - SEM VENDEDOR</option>
                            {funcionario.map((funcionario) => {
                                return(
                                    <option value={funcionario.id} key={funcionario.id}>{funcionario.id} - {funcionario.nome}</option>
                                )
                            })}
                        </select>
                </div>
                <div>
                    <label>Tipo pgt.: </label>
                    <fieldset>
                        <div>
                            <label>Tabela Vinculada: </label>
                            <select>
                                <option>0 - Escolha uma tabela</option>
                            </select>
                        </div>
                        <div>
                            <label>N. Parcelas</label>
                            <input/>
                        </div>
                        <div>
                            <label>Prazo</label>
                            <input/>
                        </div>
                        <div className="table-resp">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Ativo</th>
                                        <th>Descrição</th>
                                        <th>Raiz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <label>Desconto (%) :</label>
                    <input placeholder="0,000000"/>
                </div>
                <div>
                    <label>obs.: </label>
                    <textarea>

                    </textarea>
                </div>
                </CC.DadosAdicionais>
            ) :(
                <CC.Historico>
                    <CC.NavegacaoLimites>
                        <div >Contas Vencidas/NF-es</div>
                        <div>Pagamentos</div>
                        <div>Controle de Cheques</div>
                        <div onClick={limite} style={{backgroundColor: abaHistorico === "limite" ? "white" : "", borderBottom: abaHistorico === "limite" ? "0" : ""}}>Limite / Contas em Aberto</div>
                        <div onClick={cupom} style={{backgroundColor: abaHistorico === "cupom" ? "white" : "", borderBottom: abaHistorico === "cupom" ? "0" : ""}}>Cupom de Crédito</div>
                        <div onClick={vendas} style={{backgroundColor: abaHistorico === "vendas" ? "white" : "", borderBottom: abaHistorico === "vendas" ? "0" : ""}}>Vendas</div>
                    </CC.NavegacaoLimites>
                    {abaHistorico === "limite" ? (
                        <div className="limite">
                            <div className="limites">
                                <div>
                                    <label>Limite Total: </label>
                                    <input/>
                                </div>
                                <div>
                                    <label>Saldo Devedor: </label>
                                    <input/>
                                </div>
                                <div>
                                    <label>Limite disponível: </label>
                                    <input/>
                                </div>
                            </div>
                            <div>
                                <fieldset>
                                    <legend>Contas Abertas</legend>
                                    <div className="table-resp">
                                        <table id="table">
                                            <thead>
                                                <tr>
                                                    <th>Empresa</th>
                                                    <th>Data</th>
                                                    <th>Data Venc.</th>
                                                    <th>Referente</th>
                                                    <th>Valor Total</th>
                                                    <th>Valor Pago</th>
                                                    <th>Restante</th>
                                                    <th>N. Nota</th>
                                                    <th>Nosso Número</th>
                                                    <th>Parcela</th>
                                                    <th>Documento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <td>asdsad</td>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="total">
                                        <label>Total: </label>
                                        <label>0,00</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    ) : abaHistorico === 'cupom' ? (
                        <div className="cupom-credito">
                            <fieldset>
                                <div className="table-resp">
                                    <table id="table">
                                        <thead>
                                            <th>Código</th>
                                            <th>Filial</th>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th>Dt. Emissão</th>
                                            <th>Dt. Validade</th>
                                            <th>Status</th>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="total">
                                    <label>Total de cupons de crédito: </label>
                                    <label>0,00</label>
                                </div>
                            </fieldset>
                        </div>
                    ): (
                        <div className="vendas">
                            <CC.NavegacaoLimites>
                                <div onClick={nfe} style={{backgroundColor: abaVendas === "nfe" ? "white" : "", borderBottom: abaVendas === "nfe" ? "0" : ""}}>NF-e e NFC-e</div>
                                <div onClick={pgto} style={{backgroundColor: abaVendas === "pgto" ? "white" : "", borderBottom: abaVendas === "pgto" ? "0" : ""}}>Tipos de Pagamento</div>
                            </CC.NavegacaoLimites>
                            {abaVendas === 'nfe' ? (
                                <div>
                                    <div className="table-responsive">
                                        <table id="table">
                                            <thead>
                                                <th>Filial</th>
                                                <th>NumeroNota</th>
                                                <th>Serie</th>
                                                <th>Status</th>
                                                <th>Top</th>
                                                <th>cfop_descricao</th>
                                                <th>data_emissao</th>
                                                <th>data_saida</th>
                                                <th>hora_saida</th>
                                                <th>chave</th>
                                                <th>idCliente</th>
                                                <th>nomCliente</th>
                                                <th>desc_operacao</th>
                                                <th>finalidade_emissao_desc</th>
                                                <th>tipo_mov_fiscal_descri</th>
                                                <th>total_produto</th>
                                                <th>total_icms</th>
                                                <th>total_icms_st</th>
                                                <th>total_pis</th>
                                                <th>total_cofins</th>
                                                <th>total_ipi</th>
                                                <th>total_desconto</th>
                                                <th>total_frete</th>
                                                <th>total_nota</th>
                                            </thead>
                                            <tbody>
                                                <td>teste</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="total">
                                        <label>Total: </label>
                                        <label>0,00</label>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="table-responsive">
                                        <table id="table">
                                            <thead>
                                                <th>Código</th>
                                                <th>Descricao</th>
                                                <th>Total</th>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CC.Historico>
            )} {/*aba === 'foto' ? (
                <CC.Foto>
                    <div></div>
                    <input/>
                </CC.Foto>*/} 
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={cancelar}><img src="/images/voltar.png"/>Cancelar</button>
                </div>
            </C.Footer>
            {isModalPerfil ? <PerfilCliente close={()=> setIsModalPerfil(false)} setDadosCliente={setDadosCliente} dadosCliente={dadosCliente}/> : null}
            {isModalRamo ? <RamoAtividade close={()=> setIsModalRamo(false)} setDadosCliente={setDadosCliente} dadosCliente={dadosCliente}/> : null}
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCliente={setDadosCliente} dadosCliente={dadosCliente}/> : null}
            {isModalEmpresa ? <Emitente onClose={()=> setIsModalEmpresa(false)} dadosCliente={dadosCliente} setDadosCliente={setDadosCliente}/> : null}
        </C.Container>
    )
}