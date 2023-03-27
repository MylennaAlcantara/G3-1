import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../cadastro/cadastro";
import { Emitente } from "../../modais/modal_emitente/index";
import { ListaMunicipio } from "../../modais/modal_municipio/index";
import { PerfilCliente } from "../../modais/modal_perfil_cliente/index";
import { RamoAtividade } from "../../modais/modal_ramo_atividade/index";
import * as CC from "../cadastro_cliente/cadastroCliente";

export const CadastroCliente = () => {
    const navigate = useNavigate();
    const [endereco, setEndereco] = useState([]);
    const [estados, setEstados] = useState([]);
    const [dadosCidades, setDadosCidades] = useState({
        codigo: "",
        nome: ""
    });
    const [dadosPerfil, setDadosPerfil] = useState({
        id: "",
        descricao: ""
    });
    const [dadosRamo, setDadosRamo] = useState({
        id: "",
        descricao: ""
    });
    const [dataSelectEmitente, setDataSelectEmitente] = useState();
    const [dataIdSelectEmitente, setDataIdSelectEmitente] = useState();
    
    //Dados da parte de documentos
    const [cnpj, setCnpj] = useState('');
    const [municipal, setMunicipal] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [orgao, setOrgao] = useState('');
    const [estadual, setEstadual] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState('J');
    const select = document.getElementById('option');
    const dataNascimento = document.getElementById("dataNascimento");

    //dados da parte de informações
    const [cep, setCep] = useState('');
    const [nome, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [complemento, setComplemento] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');

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
            fetchData();
            validarDocumento();
    }, []);

    function pesquisarMuni(){
        setIsModalMunicipio(true);
    }
    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setEndereco(data);
    }

    const [documentoSelecionado, setDocumentoSelecionado] = useState('juridica');
    const [cor, setCor] = useState('');
    const [corFisica, setCorFisica] = useState('');

    function handleDocumentoChange(event) {
        setDocumentoSelecionado(event.target.value);
    }
    const documento =()=>{
        if(documentoSelecionado === 'juridica'){
            setCpfCnpj(cnpj);
            setTipoPessoa("J");
        }else if (documentoSelecionado === 'fisica'){
            setCpfCnpj(cpf);
            setTipoPessoa("F");
        }
    }
    const validarDocumento = () => {
        if(documentoSelecionado === 'juridica'){
            setCorFisica('#F0F0F0');
        }else if (documentoSelecionado === 'fisica'){
            setCor('#F0F0F0');
        }
    }
    
    //Pegar hora do computador
    const [dataCadastro, setDataCadastro] = useState('');

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    useEffect(()=>{
        async function setarHoraData(){
            setDataCadastro(String(dataAtual));
        } 
        setarHoraData();
    },[])

    const salvar = () => {
        const endereco = document.getElementById("endereco").value;
        const municipio = document.getElementById("municipio").value;
        const bairro = document.getElementById("bairro").value;
        const codigoMunicipio = document.getElementById("codigoMunicipio").value;
        try{
            const response = fetch("http://8b38091fc43d.sn.mynetname.net:2003/clientes",{
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    nome: nome,
                    nome_fantasia: fantasia,
                    tipo_pessoa: tipoPessoa,
                    cpf_cnpj: cpfCnpj,
                    endereco: endereco,
                    numero: numero,
                    bairro: bairro,
                    municipio: municipio,
                    estado: select.value,
                    complemento: complemento,
                    cep: cep,
                    inscricao_estadual: estadual,
                    cod_municipio: codigoMunicipio,
                    rg: rg,
                    orgao_rg: orgao,
                    inscricao_municipal: municipal,
                    data_cadastro: dataCadastro,
                    celular: celular,
                    data_nasc: dataNascimento.value,
                    observacao: '',
                    limite: 0.0,
                    limite_total: 200000.0,
                    id_tipo_pagamento: null,
                    id_funcionario: 1,
                    id_perfil_regra: dadosPerfil.id,
                    email: "",
                    telefone: telefone
                })
            });
            if(response.status === 201){
                alert("Salvo com sucesso!");
                navigate("/clientes");
            }
        }catch(err){
            console.log(err);
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
    }

    return (
        <C.Container>
            <C.Header>
                <h3>Cadastrar Cliente</h3>
            </C.Header>
            <CC.Navegacao>
                <div onClick={dadosGerais} style={{backgroundColor: aba === "dados-gerais" ? "white" : "", borderBottom: aba === "dados-gerais" ? "0" : ""}}>Dados Gerais</div>
                <div onClick={dadosAdicionais} style={{backgroundColor: aba === "dados-adicionais" ? "white" : "", borderBottom: aba === "dados-adicionais" ? "0" : ""}}>Dados Adicionais</div>
                <div onClick={foto} style={{backgroundColor: aba === "foto" ? "white" : "", borderBottom: aba === "foto" ? "0" : ""}}>Fotos</div>
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
                                    <input name="documento" type='radio' value="juridica" id="juridica"  checked={documentoSelecionado === 'juridica'} onChange={handleDocumentoChange} onClick={validarDocumento}/>
                                    <label>Pessoa Jurídica</label>
                                </div>
                                <div>
                                    <label>CNPJ: </label>
                                    {documentoSelecionado === "juridica" ? (
                                        <input className="input-documentos" value={cnpj} onChange={(e)=> setCnpj(e.target.value)} onBlur={documento}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: cor}} readOnly/>
                                    )}
                                    <img src="/images/LUPA.png"/>
                                </div>
                                <div>
                                    <label>Inscr. Municipal: </label>
                                    {documentoSelecionado === "juridica" ? (
                                        <input className="input-documentos" value={municipal} onChange={(e)=> setMunicipal(e.target.value)}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: cor}} readOnly/>
                                    )}
                                </div>
                            </div>
                            <div className="cnpj-cpf">
                                <div>
                                    {documentoSelecionado === "fisica" ? (
                                        <input name="documento" type='radio' value="fisica" id="fisica"  checked={documentoSelecionado === 'fisica'} onChange={handleDocumentoChange} onClick={validarDocumento}/>
                                    ) : (
                                        <input name="documento" type='radio' value="fisica" id="fisica"  checked={documentoSelecionado === 'fisica'} onChange={handleDocumentoChange} onClick={validarDocumento}/>
                                    )}
                                    <label>Pessoa Física</label>
                                </div>
                                <div>
                                    <label>CPF: </label>
                                    {documentoSelecionado === "fisica" ? (
                                        <input className="input-documentos" value={cpf} onChange={(e)=> setCpf(e.target.value)} onBlur={documento}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                                <div>
                                    <label>RG: </label>
                                    {documentoSelecionado === "fisica" ? (
                                        <input className="input-documentos" value={rg} onChange={(e)=> setRg(e.target.value)}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                                <div>
                                    <label>Orgão: </label>
                                    {documentoSelecionado === "fisica" ? (
                                        <input className="input-documentos" value={orgao} onChange={(e)=> setOrgao(e.target.value)}/>
                                    ) : (
                                        <input className="input-documentos" style={{backgroundColor: corFisica}} readOnly/>
                                    )}
                                </div>
                            </div>
                            <div className="cnpj-cpf">
                                <div>
                                    <label>Ins. Estadual: </label>
                                    <input className="input-documentos" value={estadual} onChange={(e)=> setEstadual(e.target.value)}/>
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
                                <input className="input-unico" value={nome} onChange={(e)=> setNome(e.target.value)} />
                            </div>
                            <div>
                                <label>Fantasia/Apelido: </label>
                                <input className="input-unico" value={fantasia} onChange={(e)=> setFantasia(e.target.value)}/>
                            </div>
                            <div className="div-input">
                                <label>CEP: </label>
                                <input className="codigo" value={cep} onChange={(e) => setCep(e.target.value)}/>
                                <img src="/images/LUPA.png" onClick={pesquisarCep}/>
                                <label>Complemento: </label>
                                <input className="complemento" value={complemento} onChange={(e)=> setComplemento(e.target.value)}/>
                            </div>
                            <div className="div-input">
                                <label>Logradouro: </label>
                                {endereco != [] ? (
                                    <input value={endereco.logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)}/>
                                ) : (
                                    <input value={logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)}/>
                                )}
                                <input className="codigo" value={numero} onChange={(e)=> setNumero(e.target.value)}/>
                            </div>
                            <div>
                                <label>Bairro: </label>
                                {endereco != [] ? (
                                    <input className="input-unico" id="bairro" value={endereco.bairro} onChange={(e)=> setBairro(e.target.value)}/>
                                ) : (
                                    <input className="input-unico" id="bairro" value={bairro} onChange={(e)=> setBairro(e.target.value)}/>
                                )}
                            </div>
                            <div className="div-input">
                                <label>Municipio: </label>
                                {endereco.ibge ? (
                                    <input className="codigo" id="codigoMunicipio" value={endereco.ibge} onKeyDown={keyMunicipio} readOnly/>
                                ) : (
                                    <input className="codigo" id="codigoMunicipio" value={dadosCidades.codigo} onKeyDown={keyMunicipio} readOnly/>
                                )}
                                <img src="/images/add.png" onClick={pesquisarMuni}/>
                                {endereco.localidade ? (
                                    <input className="municipio" id="municipio" value={endereco.localidade} readOnly/>
                                ) : (
                                    <input className="municipio" id="municipio" value={dadosCidades.nome} readOnly/>
                                )}
                                <label>UF: </label>
                                <select className="codigo" id="option">
                                    <option>UF</option>
                                    {estados.map((estado)=> {
                                        return <option value={estado.sigla}>{estado.sigla}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label>Telefone: </label>
                                <input className="codigo" value={telefone} onChange={(e)=> setTelefone(e.target.value)}/>
                                <label>Celular: </label>
                                <input className="codigo" value={celular} onChange={(e)=> setCelular(e.target.value)}/>
                                <label>Data Nasc: </label>
                                <input className="codigo" id="dataNascimento" type="date" />
                            </div>
                            <div className="div-input">
                                <label>Perfil Tributá.: </label>
                                <input className="codigo" value={dadosPerfil.id} onKeyDown={keyPerfil}/>
                                <input value={dadosPerfil.descricao} readOnly/>
                            </div>
                            <div className="div-input">
                                <label>Ramo de Ativ.: </label>
                                <input className="codigo" value={dadosRamo.id} onKeyDown={keyRamo}/>
                                <input value={dadosRamo.descricao} readOnly/>
                            </div>
                            <div>
                                <label>Última Alter.: </label>
                                <input className="input-unico"/>
                            </div>
                            <div>
                                <label>Filial: </label>
                                <input className="codigo" value={dataIdSelectEmitente} onKeyDown={keyEmpresa}/>
                                <input value={dataSelectEmitente} readOnly/>
                            </div>
                        </fieldset>
                    </CC.Informacao>
                </CC.DadosGerais>
            ) : aba === 'dados-adicionais' ? (
                <CC.DadosAdicionais>
                <div>
                    <label>Vendedor: </label>
                    <select>
                        <option>id - vendedor</option>
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
            ) : aba === 'foto' ? (
                <CC.Foto>
                    <div></div>
                    <input/>
                </CC.Foto>
            ) : (
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
            )}
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={cancelar}><img src="/images/voltar.png"/>Cancelar</button>
                </div>
            </C.Footer>
            {isModalPerfil ? <PerfilCliente close={()=> setIsModalPerfil(false)} setDadosPerfil={setDadosPerfil} /> : null}
            {isModalRamo ? <RamoAtividade close={()=> setIsModalRamo(false)} setDadosRamo={setDadosRamo}/> : null}
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCidades={setDadosCidades}/> : null}
            {isModalEmpresa ? <Emitente setIsModalEmpresa = {setIsModalEmpresa} setDataSelectEmitente={setDataSelectEmitente} setDataIdSelectEmitente={setDataIdSelectEmitente}/> : null}
        </C.Container>
    )
}