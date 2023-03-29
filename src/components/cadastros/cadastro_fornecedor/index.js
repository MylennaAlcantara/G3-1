import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { Saler } from "../../modais/modal_vendedor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "./cadastroFornecedor";

export const CadastrarFornecedor = () => {
    const {user, empresa} = useContext(AuthContext);
    const navigate = useNavigate();
    const [endereco, setEndereco] = useState([]);
    const [estados, setEstados] = useState([]);
    const [dadosCidades, setDadosCidades] = useState([]);
    const [selectIdSaler,setSelectIdSaler] = useState([]);
    const [selectSaler,setSelectSaler] = useState([]);

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
    const [complemento, setComplemento] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [telefone, setTelefone] = useState('');

    const[cnpj, setCnpj] = useState('');
    const[ie, setIe] = useState('');

    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setEndereco(data);
    }    
    function pesquisarMuni(){
        setIsModalMunicipio(true);
    }

    const [isModalFuncionario, setIsModalFuncionario] = useState(false);
    const [isModalMunicipio, setIsModalMunicipio] = useState(false);
    function keyMunicipio (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalMunicipio(true);
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
    
    const sair = () => {
        localStorage.clear();
        document.location.reload(true);
    }
    const voltar = () => {
        navigate('/fornecedores')
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.cnpj)}  <button onClick={sair}>Sair</button></C.NaviBar>
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
                            <input type='checkbox'/>
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
                                    <select>
                                        <option>CNPJ</option>
                                        <option>CPF</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Nº: </label>
                                    <input className="input-documentos" value={cnpj} onChange={(e)=> setCnpj(e.target.value)}/>
                                    <img src="/images/LUPA.png"/>
                                </div>
                                <div>
                                    <label>IE.: </label>
                                    <input className="input-documentos" value={ie} onChange={(e)=> setIe(e.target.value)}/>
                                </div>
                                <select>
                                    <option>0 - Escolha um regime...</option>
                                    <option>1 - SIMPLES NACIONAL</option>
                                    <option>2 - SIMPLES NACIONAL EXCESSO</option>
                                    <option>3 - REGIME NORMAL</option>
                                    <option>4 - PAT</option>
                                </select>
                            </div>
                        </fieldset>
                    </CF.Documentos>
                    <CF.Informacao>
                            <fieldset className="informacao">
                                <legend>Informações</legend>
                                <div>
                                    <label>Razão Social: </label>
                                    <input className="input-unico" value={nome} onChange={(e)=> setNome(e.target.value)} />
                                </div>
                                <div>
                                    <label>Nome Fantasia: </label>
                                    <input className="input-unico" value={fantasia} onChange={(e)=> setFantasia(e.target.value)}/>
                                </div>
                                <div className="div-input">
                                    <label>CEP: </label>
                                    <input className="codigo" value={cep} onChange={(e) => setCep(e.target.value)}/>
                                    <img src="/images/LUPA.png" onClick={pesquisarCep}/>
                                </div>
                                <div className="div-input">
                                    <label>Endereço/Nº: </label>
                                    {endereco != [] ? (
                                        <input value={endereco.logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)}/>
                                        ) : (
                                        <input value={logradouro} id="endereco" onChange={(e)=> setLogradouro(e.target.value)}/>
                                    )}
                                    <input className="codigo" value={numero} onChange={(e)=> setNumero(e.target.value)}/>
                                </div>
                                <div className="div-input">
                                    <label>Bairro: </label>
                                    {endereco != [] ? (
                                        <input className="bairro" id="bairro" value={endereco.bairro} onChange={(e)=> setBairro(e.target.value)}/>
                                    ) : (
                                        <input className="bairro" id="bairro" value={bairro} onChange={(e)=> setBairro(e.target.value)}/>
                                    )}
                                    <label>Complemento: </label>
                                    <input className="complemento" value={complemento} onChange={(e)=> setComplemento(e.target.value)}/>
                                </div>
                                <div className="div-input">
                                    <label>Municipio: </label>
                                    {endereco.ibge ? (
                                        <input className="codigo" id="codigoMunicipio" value={endereco.ibge} onKeyDown={keyMunicipio} readOnly/>
                                    ) : (
                                        <input className="codigo" id="codigoMunicipio" value={endereco.ibge} onKeyDown={keyMunicipio} readOnly/>
                                    )}
                                    <img src="/images/add.png" onClick={pesquisarMuni}/>
                                    {endereco.localidade ? (
                                        <input className="municipio" id="municipio" value={endereco.localidade} readOnly/>
                                    ) : (
                                        <input className="municipio" id="municipio" value={endereco.localidade} readOnly/>
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
                                    <label>Senha Cotação</label>
                                    <input className="codigo" type="password"/>
                                </div>
                                <div className="div-input">
                                    <label>Comprador: </label>
                                    <input className="codigo" value={selectIdSaler} onKeyDown={keyComprador}/>
                                    <input value={selectSaler} readOnly/>
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
                        <input/>
                    </div>
                    <div>
                        <label>e-mail: </label>
                        <input/>
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
                    <button><img src="/images/salvar.png"/>Salvar</button>
                    <button onClick={voltar}><img src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)} setDadosCidades={setDadosCidades}/> : null}
            {isModalFuncionario ? <Saler close={()=> setIsModalFuncionario(false)} setIsModalFuncionario={setIsModalFuncionario} setSelectIdSaler={setSelectIdSaler} setSelectSaler={setSelectSaler}/> : null}
        </C.Container>
    )
}