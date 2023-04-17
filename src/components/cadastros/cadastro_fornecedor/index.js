import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { ListaPais } from "../../modais/modal_pais";
import { Saler } from "../../modais/modal_vendedor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "./cadastroFornecedor";

export const CadastrarFornecedor = () => {
    const navigate = useNavigate();
    const {user, empresa} = useContext(AuthContext);
    const idFuncionario = Array.isArray(user) && user.map((user) => user.id)
    const [endereco, setEndereco] = useState([]);
    const [estados, setEstados] = useState([]);
    const [dadosCidades, setDadosCidades] = useState([]);
    const [dadosPaises, setDadosPaises] = useState([]);
    const [dataIdSelectSaler,setDataIdSelectSaler] = useState([]);
    const [dataSelectSaler,setDataSelectSaler] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
            fetchData();
    }, []);

    //dados da parte de informações
    const [cep, setCep] = useState('');
    const [nome, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [contato, setContato] = useState('');
    const [complemento, setComplemento] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [fax, setFax] = useState('');
    const selectUf = document.getElementById('option');
    const selectRegi = document.getElementById('optionRegi');
    const selectTipoDoc = document.getElementById('optionTipoDoc');


    const[cnpj, setCnpj] = useState('');
    const[ie, setIe] = useState('');

    const [corObrigatorios, setCorObrigatorios] = useState('');

    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setEndereco(data);
    }    
    function pesquisarMuni(){
        setIsModalMunicipio(true);
    }
    function pesquisarPais(){
        setIsModalPaises(true);
    }

    const [isModalFuncionario, setIsModalFuncionario] = useState(false);
    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    const [isModalPaises, setIsModalPaises] = useState(false);
    function keyMunicipio (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalMunicipio(true);
        }else if(e.keyCode != 113){
            e.preventDefault();
        }
    }
    function keyPaises (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPaises(true);
        }else if(e.keyCode != 113){
            e.preventDefault();
        }
    }
    function keyComprador (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalFuncionario(true);
        }else if(e.keyCode != 113){
            e.preventDefault();
        }
    }

    const [aba, setAba] = useState('dados-gerais');

    function dadosGerais (){
        setAba('dados-gerais');
    }
    function outrosDados (){
        setAba('outros-dados');
    }
    function historico (){
        setAba('historico');
    }
    function controleCheques (){
        setAba('controle-Cheques');
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
    
    const salvar = async () => {
        const enderecoRua = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        if(cnpj && nome && cep && enderecoRua && bairro && numero && endereco.ibge && endereco.localidade && dataIdSelectSaler){
            try{
                const res = await fetch("http://10.0.1.10:8092/fornecedor/save", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        razao_social: nome,
                        contato: contato,
                        endereco: enderecoRua,
                        numero: numero,
                        complemento: complemento,
                        municipio: endereco.localidade,
                        codigo_municipio: endereco.ibge,
                        codigo_pais: dadosPaises.codigo,
                        pais: dadosPaises.nome,
                        bairro: bairro,
                        uf: selectUf.value,
                        cep: cep,
                        tipo_documento: selectTipoDoc.value,
                        ie: ie,
                        telefone: telefone,
                        fax: fax,
                        email: email,
                        data_cadastro: dataCadastro,
                        ativo:true,
                        numero_documento: parseFloat(cnpj),
                        nome_fantasia: fantasia,
                        excluido:false,
                        id_usuario_insercao: parseFloat(idFuncionario),
                        idRegimeTributario: parseFloat(selectRegi.value),
                        id_comprador: dataIdSelectSaler,
                        nome_comprador: dataSelectSaler,
                        senha_cotacao:null
                    })
                });
                if(res.status === 201){
                    navigate('/fornecedores');
                    alert("Salvo com sucesso!");
                }
            }catch (err){
                console.log(err);
            }
        }else{
            setCorObrigatorios('yellow');
            alert("Preencha os campos acima!")
        }
    }
    const voltar = () => {
        navigate('/fornecedores')
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

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)} </C.NaviBar>
            <C.Header>
                <h3>Cadastrar Fornecedor</h3>
            </C.Header>
            <CC.DadosCliente>
                    <div>
                        <label>Fornecedor: </label>
                        <input readOnly/>
                    </div>
                    <div className="checkbox">
                        <div>
                            <input className="checkbox" type='checkbox'/>
                            <label>Ativo</label>
                    </div>
                    <div>
                        <label>Data: </label>
                        <input readOnly/>
                    </div>
                    </div>
            </CC.DadosCliente>
            <CC.Navegacao>
                <div onClick={dadosGerais} style={{backgroundColor: aba === "dados-gerais" ? "white" : "", borderBottom: aba === "dados-gerais" ? "0" : ""}}>Dados Gerais</div>
                <div onClick={outrosDados} style={{backgroundColor: aba === "outros-dados" ? "white" : "", borderBottom: aba === "outros-dados" ? "0" : ""}}>Outros Dados</div>
                <div onClick={controleCheques} style={{backgroundColor: aba === "controle-Cheques" ? "white" : "", borderBottom: aba === "controle-Cheques" ? "0" : ""}}>Histórico</div>
                <div onClick={controleCheques} style={{backgroundColor: aba === "controle-Cheques" ? "white" : "", borderBottom: aba === "controle-Cheques" ? "0" : ""}}>Controle de Cheques</div>
            </CC.Navegacao>
            {aba === "dados-gerais" ? 
            (   <CC.DadosGerais>
                    <CF.Documentos>
                        <fieldset className="informacao">
                            <legend>Documento</legend>
                            <div className="cnpj-cpf">
                                <div>
                                    <label>Tipo</label>
                                    <select id="optionTipoDoc">
                                        <option value="CNPJ">CNPJ</option>
                                        <option value="CPF">CPF</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Nº: </label>
                                    <input className="input-documentos" value={cnpj} onChange={(e)=> setCnpj(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                    <img src="/images/LUPA.png"/>
                                </div>
                                <div>
                                    <label>IE.: </label>
                                    <input className="input-documentos" value={ie} onChange={(e)=> setIe(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                </div>
                                <select id="optionRegi">
                                    <option value="0">0 - Escolha um regime...</option>
                                    <option value="1">1 - SIMPLES NACIONAL</option>
                                    <option value="2">2 - SIMPLES NACIONAL EXCESSO</option>
                                    <option value="3">3 - REGIME NORMAL</option>
                                    <option value="4">4 - PAT</option>
                                </select>
                            </div>
                        </fieldset>
                    </CF.Documentos>
                    <CF.Informacao>
                            <fieldset className="informacao">
                                <legend>Informações</legend>
                                <div>
                                    <label>Razão Social: </label>
                                    <input className="input-unico" value={nome} onChange={(e)=> setNome(e.target.value)} style={{backgroundColor: corObrigatorios}} />
                                </div>
                                <div>
                                    <label>Nome Fantasia: </label>
                                    <input className="input-unico" value={fantasia} onChange={(e)=> setFantasia(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Contato: </label>
                                    <input className="input-unico" value={contato} onChange={(e)=> setContato(e.target.value)}/>
                                </div>
                                <div className="div-input">
                                    <label>CEP: </label>
                                    <input className="codigo" value={cep} onChange={(e) => setCep(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                    <img src="/images/LUPA.png" onClick={pesquisarCep}/>
                                </div>
                                <div className="div-input">
                                    <label>Endereço/Nº: </label>
                                    {endereco != [] ? (
                                        <input value={endereco.logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                        ) : (
                                        <input value={logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                    )}
                                    <input className="codigo" value={numero} onChange={(e)=> setNumero(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                </div>
                                <div className="div-input">
                                    <label>Bairro: </label>
                                    {endereco != [] ? (
                                        <input className="bairro" id="bairro" value={endereco.bairro} onChange={(e)=> setBairro(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                    ) : (
                                        <input className="bairro" id="bairro" value={bairro} onChange={(e)=> setBairro(e.target.value)} style={{backgroundColor: corObrigatorios}}/>
                                    )}
                                    <label>Complemento: </label>
                                    <input className="complemento" value={complemento} onChange={(e)=> setComplemento(e.target.value)}/>
                                </div>
                                <div className="div-input">
                                    <label>Municipio: </label>
                                    {endereco.ibge ? (
                                        <input className="codigo" id="codigoMunicipio" value={endereco.ibge} onKeyDown={keyMunicipio} style={{backgroundColor: corObrigatorios}} readOnly/>
                                    ) : (
                                        <input className="codigo" id="codigoMunicipio" value={endereco.ibge} onKeyDown={keyMunicipio} style={{backgroundColor: corObrigatorios}} readOnly/>
                                    )}
                                    <img src="/images/add.png" onClick={pesquisarMuni}/>
                                    {endereco.localidade ? (
                                        <input className="municipio" id="municipio" value={endereco.localidade} style={{backgroundColor: corObrigatorios}} readOnly/>
                                    ) : (
                                        <input className="municipio" id="municipio" value={endereco.localidade} style={{backgroundColor: corObrigatorios}} readOnly/>
                                    )}
                                    <label>UF: </label>
                                    <select className="codigo" id="option">
                                        <option>UF</option>
                                        {estados. sort(comparar).map((estado)=> {
                                            return <option value={estado.sigla}>{estado.sigla}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label>País:</label>
                                    <input className="codigo" value={dadosPaises.codigo} onKeyDown={keyPaises}/>
                                    <img src="/images/LUPA.png" onClick={pesquisarPais}/>
                                    <label style={{color: "red"}}>{dadosPaises.nome}</label>
                                </div>
                                <div>
                                    <label>Telefone: </label>
                                    <input className="codigo" value={telefone} onChange={(e)=> setTelefone(e.target.value)}/>
                                    <label>Senha Cotação</label>
                                    <input className="codigo" type="password"/>
                                </div>
                                <div className="div-input">
                                    <label>Comprador: </label>
                                    <input className="codigo" value={dataIdSelectSaler} onKeyDown={keyComprador} style={{backgroundColor: corObrigatorios}}/>
                                    <input value={dataSelectSaler} readOnly/>
                                </div>
                                <div>
                                    <label>Última Alter.: </label>
                                    <input className="input-unico"/>
                                </div>
                            </fieldset>
                    </CF.Informacao>
                </CC.DadosGerais>
            ) : aba === "outros-dados" ? (
                <CF.OutrosDados>
                    <div>
                        <label>fax: </label>
                        <input value={fax} onChange={(e)=> setFax(e.target.value)}/>
                    </div>
                    <div>
                        <label>e-mail: </label>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                </CF.OutrosDados>
            ) : (
                <CF.Historico>
                    <fieldset>
                        <label>Histórico de Notas de entrada</label>
                        <div className="table-responsive">
                            <table id="table" >
                                <thead>
                                    <tr>
                                        <th>Modelo</th>
                                        <th>Chave</th>
                                        <th>Número</th>
                                        <th>Série</th>
                                        <th>Data Emissão</th>
                                        <th>Data Entrada</th>
                                        <th>Nat. Operação</th>
                                        <th>T.OP.</th>
                                        <th>Loja</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0,0121</td>
                                    </tr> 
                                    <tr>
                                        <td>0,0121</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label>Histórico de Contas Pagar em aberto</label>
                        <div className="table-responsive">
                            <table id="table" >
                                <thead>
                                    <tr>
                                        <th>CodigoConta</th>
                                        <th>Filial</th>
                                        <th>DataEmissao</th>
                                        <th>DataVencimento</th>
                                        <th>Referente</th>
                                        <th>Parcela</th>
                                        <th>NumeroNota</th>
                                        <th>Status</th>
                                        <th>ValorPago</th>
                                        <th>Valor</th>
                                        <th>ValorPagar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <div>
                        <label>Total parcelas abertas: </label>
                        <input placeholder="0,00"/>
                    </div>
                </CF.Historico>
            )
            }
            <C.Footer>
                <div className="buttons">
                    <button onClick={salvar}><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCidades={setDadosCidades}/> : null}
            {isModalPaises ? <ListaPais close={()=> setIsModalPaises(false)} setDadosPaises={setDadosPaises}/> : null}
            {isModalFuncionario ? <Saler close={()=> setIsModalFuncionario(false)} setIsModalFuncionario={setIsModalFuncionario} setDataIdSelectSaler={setDataIdSelectSaler} setDataSelectSaler={setDataSelectSaler}/> : null}
        </C.Container>
    )
}