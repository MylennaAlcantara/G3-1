import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/Auth/authContext";
import * as C from "../../cadastro/cadastro";
import { ListaMunicipio } from "../../modais/modal_municipio";
import { ListaPais } from "../../modais/modal_pais";
import { Saler } from "../../modais/modal_vendedor";
import * as CC from "../cadastro_cliente/cadastroCliente";
import * as CF from "../cadastro_fornecedor/cadastroFornecedor";

export const EditarFornecedor = ({minimizado, setMinimizado}) => {
    const navigate = useNavigate();
    const {user, empresa, cnpjMask} = useContext(AuthContext);
    const idFuncionario = Array.isArray(user) && user.map((user) => user.id)
    const [estados, setEstados] = useState([]);

    const codigoFornecedor = localStorage.getItem('idFornecedor')
    useEffect(() => {
        async function fetchData (){
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const data = await response.json();
            setEstados(data);
        }
        async function fetchDataFornecedor (){
            const response = await fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+`/fornecedor/${codigoFornecedor}`);
            const data = await response.json();
            setDadosFornecedor({
                id: data.id,
                razao_social: data.razao_social,
                contato: data.contato,
                endereco: data.endereco,
                numero: data.numero,
                complemento: data.complemento,
                municipio: data.municipio,
                codigo_municipio: data.codigo_municipio,
                codigo_pais: data.codigo_pais,
                pais: data.pais,
                bairro: data.bairro,
                uf: data.uf,
                cep: data.cep,
                tipo_documento: data.tipo_documento,
                ie: data.ie,
                telefone: data.telefone,
                fax: data.fax,
                email: data.email,
                data_cadastro: data.data_cadastro,
                ativo: data.ativo,
                numero_documento: data.numero_documento,
                nome_fantasia: data.nome_fantasia,
                excluido: data.excluido,
                id_usuario_insercao: data.id_usuario_insercao,
                idRegimeTributario: data.idRegimeTributario,
                id_comprador: data.id_comprador,
                nome_comprador: data.nome_comprador,
                senha_cotacao: data.senha_cotacao
            })
        }
        fetchData();
        fetchDataFornecedor();
    }, []);

    const [dadosFornecedor, setDadosFornecedor] = useState((JSON.parse(localStorage.getItem("dadosFornecedor"))) || {
        id: "",
        razao_social: "",
        contato: "",
        endereco: "",
        numero: "",
        complemento: "",
        municipio: "",
        codigo_municipio: "",
        codigo_pais: "",
        pais: "",
        bairro: "",
        uf: "",
        cep: "",
        tipo_documento: "",
        ie: "",
        telefone: "",
        fax: "",
        email: "",
        data_cadastro: "",
        data_edicao: "",
        ativo: "",
        numero_documento: "",
        nome_fantasia: "",
        excluido: "",
        id_usuario_insercao: parseInt(idFuncionario),
        idRegimeTributario: "",
        id_comprador: "",
        nome_comprador: "",
        senha_cotacao: "",
        ativo: true
    })

    const [corObrigatorios, setCorObrigatorios] = useState('');

    async function pesquisarCep () {
        const response = await fetch(`https://viacep.com.br/ws/${dadosFornecedor.cep}/json/`);
        const data = await response.json();
        setDadosFornecedor({...dadosFornecedor, 
            endereco: data.logradouro,
            bairro: data.bairro,
            municipio: data.localidade,
            uf: data.uf,
            codigo_municipio: data.ibge
        });
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
        }else if(e.keyCode !== 113){
            e.preventDefault();
        }
    }
    function keyPaises (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPaises(true);
        }else if(e.keyCode !== 113){
            e.preventDefault();
        }
    }
    function keyComprador (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalFuncionario(true);
        }else if(e.keyCode !== 113){
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
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+ 1).padStart(2, '0') ;
    const ano = data.getFullYear();
    const dataAtual = String(ano + '-' + mes + '-' + dia);

    useEffect(()=>{
        async function setarHoraData(){
            setDadosFornecedor({...dadosFornecedor, data_edicao: String(dataAtual)});
        } 
        setarHoraData();
    },[])
    
    const salvar = async () => {
        if(dadosFornecedor.numero_documento && dadosFornecedor.razao_social && dadosFornecedor.cep && dadosFornecedor.endereco && dadosFornecedor.bairro && dadosFornecedor.numero && dadosFornecedor.codigo_municipio && dadosFornecedor.municipio && dadosFornecedor.id_comprador){
            try{
                const res = await fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+"/fornecedor/edit", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dadosFornecedor)
                });
                if(res.status === 200 || res.status === 201){
                    navigate('/fornecedores');
                    localStorage.removeItem('idFornecedor');
                    localStorage.removeItem('dadosFornecedor');
                    alert("Alterado com sucesso!");
                }
            }catch (err){
                console.log(err);
            }
        }else{
            setCorObrigatorios('yellow');
            alert("Preencha os campos acima!")
        }
    }

    function minimizar (){
        setDadosFornecedor({...dadosFornecedor, id_usuario_insercao: parseInt([0].idFuncionario)})
        setMinimizado({...minimizado, editarFornecedor: true})
        navigate("/home");
        localStorage.setItem("dadosFornecedor", JSON.stringify(dadosFornecedor));
    }
    const voltar = () => {
        localStorage.removeItem('dadosFornecedor');
        localStorage.removeItem('idFornecedor');
        navigate('/fornecedores');
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
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))} </C.NaviBar>
            <C.Header>
                <h3>Editar Fornecedor</h3>
                <div className="buttons">
                    <button className="minimizar" onClick={minimizar}><div className="linha"/></button>
                    <button className="close" onClick={voltar}>X</button>
                </div>
            </C.Header>
            <CC.DadosCliente>
                    <div>
                        <label>Fornecedor: </label>
                        <input value={dadosFornecedor.id} readOnly/>
                    </div>
                    <div className="checkbox">
                        <div>
                            <input className="checkbox" type='checkbox' checked={dadosFornecedor.ativo ? true : false} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, ativo: !dadosFornecedor.ativo})}/>
                            <label>Ativo</label>
                    </div>
                    <div>
                        <label>Data: </label>
                        <input value={dadosFornecedor.data_cadastro} readOnly/>
                    </div>
                    </div>
            </CC.DadosCliente>
            <CC.Navegacao>
                <div onClick={dadosGerais} style={{backgroundColor: aba === "dados-gerais" ? "white" : "", borderBottom: aba === "dados-gerais" ? "0" : ""}}>Dados Gerais</div>
                <div onClick={outrosDados} style={{backgroundColor: aba === "outros-dados" ? "white" : "", borderBottom: aba === "outros-dados" ? "0" : ""}}>Outros Dados</div>
                <div onClick={historico} style={{backgroundColor: aba === "historico" ? "white" : "", borderBottom: aba === "historico" ? "0" : ""}}>Histórico</div>
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
                                    <select id="optionTipoDoc" value={dadosFornecedor.tipo_documento} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, tipo_documento: e.target.value})}>
                                        <option value="CNPJ">CNPJ</option>
                                        <option value="CPF">CPF</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Nº: </label>
                                    <input className="input-documentos" value={dadosFornecedor.numero_documento} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, numero_documento: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                    <img src="/images/LUPA.png"/>
                                </div>
                                <div>
                                    <label>IE.: </label>
                                    <input className="input-documentos" value={dadosFornecedor.ie} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, ie: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                </div>
                                <select id="optionRegi" value={dadosFornecedor.idRegimeTributario} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, idRegimeTributario: e.target.value})}>
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
                                    <input className="input-unico" value={dadosFornecedor.razao_social} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, razao_social: e.target.value})} style={{backgroundColor: corObrigatorios}} />
                                </div>
                                <div>
                                    <label>Nome Fantasia: </label>
                                    <input className="input-unico" value={dadosFornecedor.nome_fantasia} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, nome_fantasia: e.target.value})}/>
                                </div>
                                <div>
                                    <label>Contato: </label>
                                    <input className="input-unico" value={dadosFornecedor.contato} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, contato: e.target.value})}/>
                                </div>
                                <div className="div-input">
                                    <label>CEP: </label>
                                    <input className="codigo" value={dadosFornecedor.cep} onChange={(e) => setDadosFornecedor({...dadosFornecedor, cep: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                    <img src="/images/LUPA.png" onClick={pesquisarCep}/>
                                </div>
                                <div className="div-input">
                                    <label>Endereço/Nº: </label>
                                    <input value={dadosFornecedor.endereco} id="endereco" onChange={(e)=> setDadosFornecedor({...dadosFornecedor, endereco: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                    <input className="codigo" value={dadosFornecedor.numero} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, numero: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                </div>
                                <div className="div-input">
                                    <label>Bairro: </label>
                                    <input className="bairro" id="bairro" value={dadosFornecedor.bairro} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, bairro: e.target.value})} style={{backgroundColor: corObrigatorios}}/>
                                    <label>Complemento: </label>
                                    <input className="complemento" value={dadosFornecedor.complemento} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, complemento: e.target.value})}/>
                                </div>
                                <div className="div-input">
                                    <label>Municipio: </label>
                                    <input className="codigo" id="codigoMunicipio" value={dadosFornecedor.codigo_municipio} onDoubleClick={()=> setIsModalMunicipio(true)} onKeyDown={keyMunicipio} style={{backgroundColor: corObrigatorios}} title='Aperte F2 para listar as opções' readOnly/>
                                    <img src="/images/add.png" onClick={pesquisarMuni}/>
                                    <input className="municipio" id="municipio" value={dadosFornecedor.municipio} style={{backgroundColor: corObrigatorios}} readOnly/>
                                    <label>UF: </label>
                                    <select className="codigo" id="option" value={dadosFornecedor.uf} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, uf: e.target.value})}>
                                        {estados.sort(comparar).map((estado)=> {
                                            return <option value={estado.sigla}>{estado.sigla}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label>País:</label>
                                    <input className="codigo" value={dadosFornecedor.codigo_pais} onKeyDown={keyPaises} onDoubleClick={()=> setIsModalPaises(true)} title='Aperte F2 para listar as opções'/>
                                    <img src="/images/LUPA.png" onClick={pesquisarPais}/>
                                    <label style={{color: "red"}}>{dadosFornecedor.pais}</label>
                                </div>
                                <div>
                                    <label>Telefone: </label>
                                    <input className="codigo" value={dadosFornecedor.telefone} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, telefone: e.target.value})}/>
                                    <label>Senha Cotação</label>
                                    <input className="codigo" type="password" value={dadosFornecedor.senha_cotacao} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, senha_cotacao: e.target.value})}/>
                                </div>
                                <div className="div-input">
                                    <label>Comprador: </label>
                                    <input className="codigo" value={dadosFornecedor.id_comprador} onKeyDown={keyComprador} onDoubleClick={()=> setIsModalFuncionario(true)} style={{backgroundColor: corObrigatorios}} title='Aperte F2 para listar as opções'/>
                                    <input value={dadosFornecedor.nome_comprador} readOnly/>
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
                        <input value={dadosFornecedor.fax} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, fax: e.target.value})}/>
                    </div>
                    <div>
                        <label>e-mail: </label>
                        <input value={dadosFornecedor.email} onChange={(e)=> setDadosFornecedor({...dadosFornecedor, email: e.target.value})}/>
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
            {isModalMunicipio ? <ListaMunicipio close={()=> setIsModalMunicipio(false)}setDadosFornecedor={setDadosFornecedor} dadosFornecedor={dadosFornecedor}/> : null}
            {isModalPaises ? <ListaPais close={()=> setIsModalPaises(false)} setDadosFornecedor={setDadosFornecedor} dadosFornecedor={dadosFornecedor}/> : null}
            {isModalFuncionario ? <Saler close={()=> setIsModalFuncionario(false)} setIsModalFuncionario={setIsModalFuncionario} setDadosFornecedor={setDadosFornecedor} dadosFornecedor={dadosFornecedor}/> : null}
        </C.Container>
    )
}