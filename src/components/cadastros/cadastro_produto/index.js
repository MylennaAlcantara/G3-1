import React, { useContext, useState } from "react";
import * as C from "../../cadastro/cadastro";
import * as CP from "./cadastroProduto";
import * as CC from "../cadastro_cliente/cadastroCliente"
import { useNavigate } from "react-router";
import { Familia } from "../../modais/modais_tela_produtos/modal_familia";
import { Fornecedor } from "../../modais/modais_tela_produtos/modal_fornecedor";
import { AuthContext } from "../../../contexts/Auth/authContext";
import { Ipi } from "../../modais/modais_tela_produtos/modal_ipi";
import { PisCofins } from "../../modais/modais_tela_produtos/modal_pis_cofins";
import { Ncm } from "../../modais/modais_tela_produtos/modal_ncm";
import { Cest } from "../../modais/modais_tela_produtos/modal_cest";
import { Grupo } from "../../modais/modais_tela_produtos/modal_icms";

export const CadastroProduto = () => {
    const navigate = useNavigate();
    const {empresa, user, cnpjMask} = useContext(AuthContext);

    // Dados da area de informações
    const [codigo1, setCodigo1] = useState('');
    const [codigo2, setCodigo2] = useState('');
    const [codigoRef, setCodigoRef] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ncm, setNcm] = useState('');
    const [cest, setCest] = useState('');
    const [tribNac, setTribNac] = useState('');
    const [tribImport, setTribImport] = useState('');
    const [tribEstad, setTribEstad] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [ultimaModi, setUltimaModi] = useState('');

    // Dados aba de Geral do item
    const [qtdCaixa, setQtdCaixa] = useState('');
    const [descontoMax, setDescontoMax] = useState('');
    const [dadosFornecedor, setDadosFornecedor] = useState({
        codigo: "",
        descricao: ""
    });
    const [dadosGrupo, setDadosGrupo] = useState({
        codigo: "",
        descricao: ""
    });

    // Dados aba de Tributações para emissão
    const [codigoEcf, setCodigoEfc] = useState();
    const [totalizadorEcf, setTotalizadorEcf] = useState();
    const [dadosRegraIcms, setDadosRegraIcms] = useState({
        codigo: "",
        descricao: ""
    });
    const [dadosRegraPis, setDadosRegraPis] = useState({
        codigo: "",
        descricao: ""
    });
    const [dadosRegraCofins, setDadosRegraCofins] = useState({
        codigo: "",
        descricao: ""
    });
    const [dadosNatuRec, setDadosNatuRec] = useState({
        codigo: "",
        descricao: ""
    });
    const [dadosAnp, setDadosAnp] = useState({
        codigo: "",
        descricao: ""
    });
    const [valorPartida, setValorPartida] = useState();
    const [codigoIpi, setCodigoIpi] = useState();
    const [bcMontante, setBcMontante] = useState("0,000000");
    const [valorMontante, setValorMontante] = useState("0,000000");
    const [bcUnid, setBcUnid] = useState("0,000000");
    const [valorUnid, setValorUnid] = useState("0,000000");

    // Dados aba Movimentação
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();


    //modais de fornecedor e grupo
    const [isModalFornecedor, setIsModalFornecedor] = useState(false);
    const [isModalGrupo, setIsModalGrupo] = useState(false);
    const [isModalFamilia, setIsModalFamilia] = useState(false);
    const [isModalNcm, setIsModalNcm] = useState(false);
    const [isModalCest, setIsModalCest] = useState(false);
    const [isModalIpi, setIsModalIpi] = useState(false);
    const [isModalPis, setIsModalPis] = useState(false);
    const [isModalCofins, setIsModalCofins] = useState(false);

    function modalFornecedor (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalFornecedor(true);
        }
    }
    function modalIPI (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalIpi(true);
        }
    }
    function modalPis (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalPis(true);
        }
    }    
    function modalCofins (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalCofins(true);
        }
    }    
    function modalGrupo (e){
        e.preventDefault();
        if(e.keyCode === 113){
            setIsModalGrupo(true);
        }
    }

    function modalFamilia () {
        setIsModalFamilia(true);
    }

    const [empresas, setEmpresas] = useState([]);
    const [aba, setAba] = useState('geral');

    async function validade (){
        setAba('validade');
        const response = await fetch(process.env.REACT_APP_LINK_PRODUTO_EMITENTE_FORNECEDOR+"/emitente/all");
        const data = await response.json();
        setEmpresas(data);
    }

    const voltar = () => {
        navigate('/produtos')
    }

    return(
        <C.Container>
            <C.NaviBar>Usuario: {Array.isArray(user) && user.map(user => user.id + " - " + user.nome )} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) =>dadosEmpresa.nome_fantasia)} - {Array.isArray(empresa) && empresa.map((dadosEmpresa) => cnpjMask(dadosEmpresa.cnpj))}</C.NaviBar>
            <C.Header>
                <h3>Cadastro de Produto</h3>
            </C.Header>
            <CC.DadosCliente>
                <div>
                    <label>Código Interno:</label>
                    <input/>
                </div>
                <div>
                    <input className="checkbox" type="checkbox" />
                    <label>Desativado</label>
                </div>
            </CC.DadosCliente>
            <CP.InfoItem>
                <div className="div-info">
                    <div className="campos">
                        <div>
                            <label>Código: </label>
                            <input/>
                        </div>
                        <div>
                            <label>Cód. 2: </label>
                            <input/>
                        </div>
                        <div>
                            <label>Código Ref.: </label>
                            <input/>
                        </div>
                    </div>
                    <div>
                        <label>Descrição: </label>
                        <input/>
                    </div>
                    <div className="campos">
                        <div>
                            <label>NCM / SH:</label>
                            <input/>
                            <img alt="lupa" src="/images/LUPA.png" onClick={()=> setIsModalNcm(true)}/>
                        </div>
                        <div>
                            <label>CEST:</label>
                            <input/>
                            <img alt="lupa" src="/images/LUPA.png" onClick={()=> setIsModalCest(true)}/>
                        </div>
                    </div>
                    <div className="campos">
                        <div>
                            <label>Trib. Nac.:</label>
                            <input readOnly/>
                        </div>
                        <div>
                            <label>Trib. Import.:</label>
                            <input readOnly/>
                        </div>
                        <div>
                            <label>Trib. Estad.:</label>
                            <input readOnly/>
                        </div>
                    </div>
                    <div className="campos">
                        <div>
                            <label>Família: </label>
                            <input/>
                            <img alt="lupa" src="/images/LUPA.png" onClick={modalFamilia}/>
                        </div>
                        <div>
                            <label>Perfil: </label>
                            <input className="checkbox" type="checkbox"/>
                            <label>Logística</label>
                        </div>
                        <div>
                            <input className="checkbox" type="checkbox"/>
                            <label>Revenda</label>
                        </div>
                    </div>
                </div>
                <div id="checkbox">
                    <div>
                        <label>Data Cadastro: </label>
                        <input readOnly/>
                    </div>
                    <div>
                        <label>Últ. Modificação: </label>
                        <input readOnly/>
                    </div>
                    <div>
                        <div className="checkbox">
                            <div className="check">
                                <input className="input-check" type="checkbox"/>
                                <label>Pesagem no Caixa</label> 
                            </div>
                            <div className="check">
                                <input className="input-check" type="checkbox"/>
                                <label>Produto de Balança</label>
                            </div>
                        </div>
                        <div className="checkbox">
                            <div className="check">
                                <input className="input-check" type="checkbox"/>
                                <label>Venda PDV</label>
                            </div>
                            <div className="check">
                                <input className="input-check" type="checkbox"/>
                                <label>Sazonal</label>
                            </div>
                        </div>
                    </div>
                </div>
            </CP.InfoItem>
            <CC.Navegacao>
                <div onClick={()=> setAba('geral')} style={{backgroundColor: aba === "geral" ? "white" : "", borderBottom: aba === "geral" ? "0" : ""}}>Geral</div>
                <div onClick={()=> setAba('tributacao')} style={{backgroundColor: aba === "tributacao" ? "white" : "", borderBottom: aba === "tributacao" ? "0" : ""}}>Tributações para Emissão</div>
                <div onClick={()=> setAba('info-custo')} style={{backgroundColor: aba === "info-custo" ? "white" : "", borderBottom: aba === "info-custo" ? "0" : ""}}>Informações de Custo</div>
                <div onClick={()=> setAba('estoque')} style={{backgroundColor: aba === "estoque" ? "white" : "", borderBottom: aba === "estoque" ? "0" : ""}}>Estoque</div>
                <div onClick={()=> setAba('movimentacao')} style={{backgroundColor: aba === "movimentacao" ? "white" : "", borderBottom: aba === "movimentacao" ? "0" : ""}}>Movimentação</div>
                <div onClick={()=> setAba('fornecedores')} style={{backgroundColor: aba === "fornecedores" ? "white" : "", borderBottom: aba === "fornecedores" ? "0" : ""}}>Fornecedores / +</div>
                <div onClick={()=> setAba('promocao')} style={{backgroundColor: aba === "promocao" ? "white" : "", borderBottom: aba === "promocao" ? "0" : ""}}>Promoção</div>
                <div onClick={validade} style={{backgroundColor: aba === "validade" ? "white" : "", borderBottom: aba === "validade" ? "0" : ""}}>Validade Est.</div>
            </CC.Navegacao>
            {aba === "geral"? (
                <CP.Geral>
                    <div className="geral">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Filial</th>
                                        <th>Tipo Pgto.</th>
                                        <th>PréDsc(%)</th>
                                        <th>Markup %</th>
                                        <th>MArgem %</th>
                                        <th>Valor Venda</th>
                                        <th>Markup At. %</th>
                                        <th>Margem At. %</th>
                                        <th>Qtd. Atac.</th>
                                        <th>Valor Atac.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>3</td>
                                        <td>A VISTA</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>3</td>
                                        <td>CREDITO</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>DEBITO</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                        <td>0,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="unid-fornecedor">
                            <div>
                                <label>Unid. de Venda: </label>
                                <select>
                                    <option>0 - Escolha</option>
                                    <option>1 - CX</option>
                                    <option>2 - UN</option>
                                    <option>3 - PC</option>
                                </select>
                                <img alt="adicionar" src="/images/add.png"/>
                                <label>Qtd. p/ caixa: </label>
                                <input/>
                            </div>
                            <div>
                                <label>Desconto Max.(%): </label>
                                <input/>
                            </div>
                            <fieldset>
                                <legend>Fornecedor</legend>
                                <input className="codigo" onKeyDown={modalFornecedor} onDoubleClick={()=> setIsModalFornecedor(true)} title='Aperte F2 para listar as opções'/><input/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend>Grupo</legend>
                                <div>
                                    <input className="codigo" onKeyDown={modalGrupo} onDoubleClick={()=> setIsModalGrupo(true)} title='Aperte F2 para listar as opções'/><input/>
                                </div>
                                <textarea readOnly/>
                            </fieldset>
                            <div>
                                <label>Tipo de Item (SPED): </label>
                                <select></select>
                                <label> *Na visão da Empresa</label>
                            </div>
                        </div>
                    </div>
                </CP.Geral>
            ) : aba === "tributacao" ? (
                <CP.Tributacao>
                    <div className="tributacao">
                        <div className="icms">
                            <fieldset>
                                <legend>ICMS</legend>
                                <div>
                                    <label>Aliquota no ECF (Imp. Fiscal)</label>
                                    <input className="codigo"/>
                                </div>
                                <div>
                                    <label>Totalizador Parcial no ECF:</label>
                                    <select></select>
                                </div>
                                <div>
                                    <label>Grupo de Regra ICMS:</label>
                                    <input className="codigo"/>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>--</legend>
                                <div>
                                    <div>
                                        <label style={{color: "red"}}>Grupo de Regra para IPI: </label>
                                        <input className="codigo" onKeyDown={modalIPI} onDoubleClick={()=> setIsModalIpi(true)} title='Aperte F2 para listar as opções'/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "blue"}}>Grupo de Regra para PIS: </label>
                                        <input className="codigo" onKeyDown={modalPis} onDoubleClick={()=> setIsModalPis(true)} title='Aperte F2 para listar as opções'/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "blue"}}>Grupo de Regra para COFINS: </label>
                                        <input className="codigo" onKeyDown={modalCofins} onDoubleClick={()=> setIsModalCofins(true)} title='Aperte F2 para listar as opções'/>
                                        <input/>
                                    </div>
                                    <div>
                                        <label style={{color: "green"}}>Natureza da Receita: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="mva">
                                <button>Visualizar Árvore MVA ST</button>
                                <fieldset>
                                    <div>
                                        <input className="input-check" type='checkbox'/>
                                        <label>Produto Regulamentado pela ANP</label>
                                    </div>
                                    <div>
                                        <label>Valor de PArtida: </label>
                                        <input value="0,00"/>
                                    </div>
                                    <div>
                                        <label>Identificação ANP: </label>
                                        <input className="codigo"/>
                                        <input/>
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset>
                                <legend>Origem do Produto</legend>
                                <div className="origem">
                                    <select>
                                        <option>0 - Nacional</option>
                                        <option>1 - ESTRANGEIRA - IMPORTAÇÃO DIRETA</option>
                                        <option>2 - ESTRANGEIRA - ADQUIRIDA NO MERCADO INTERNO</option>
                                        <option>3 - NACIONAL</option>
                                        <option>4 - NACIONAL</option>
                                        <option>5 - NACIONAL</option>
                                        <option>6 - ESTRANGEIRA</option>
                                        <option>7 - ESTRANGEIRA</option>
                                    </select>
                                    <textarea readOnly/>
                                </div>
                            </fieldset>
                        </div>
                        <div className="ippt">
                            <div>
                                <label>IPPT: </label>
                                <div className="opcao">
                                    <div>
                                        <input type="radio" className="input-check" name="ippt"/>
                                        <label>Próprio</label>
                                    </div>
                                    <div>
                                        <input type="radio" className="input-check" name="ippt"/>
                                        <label>Terceiros</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>IAT: </label>
                                <div className="opcao">
                                    <div>
                                        <input type="radio" className="input-check" name="iat"/>
                                        <label>Arredondamento</label>
                                    </div>
                                    <div>
                                        <input type="radio" className="input-check" name="iat"/>
                                        <label>Truncamento</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Cód. Enquadramento IPI: </label>
                                <input className="codigo"/>
                                <img alt="lupa" src="/images/LUPA.png"/>
                            </div>
                            <div className="bc-icms">
                                <div>
                                    <label>BC do ICMS ST Retido Montante: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>Valor ICMS ST Retido Montante: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>BC do ICMS ST Retido por Unid: </label>
                                    <input value="0,000000"/>
                                </div>
                                <div>
                                    <label>Valor ICMS ST Retido por Unid: </label>
                                    <input value="0,000000"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CP.Tributacao>
            ) : aba === "info-custo" ? (
                <CP.Custo>
                    <div>
                        <input type="checkbox"/>
                        <label>Listar de Todas Filiais</label>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Filial</th>
                                    <th>V. Compra</th>
                                    <th>Desconto</th>
                                    <th>Frete</th>
                                    <th>Seguro</th>
                                    <th>Desp. Adu.</th>
                                    <th>Encargos C.</th>
                                    <th>IPI Compra</th>
                                    <th>ICMS Compra</th>
                                    <th>ICMS Antecip.</th>
                                    <th>ST Compra</th>
                                    <th>ST Retiro C.</th>
                                    <th>PIS Compra</th>
                                    <th>COFINS C.</th>
                                    <th>Bonificação C.</th>
                                    <th>Out. Incentivos</th>
                                    <th>Desconto Dup.</th>
                                    <th>Outras Desp.</th>
                                    <th>Verba Compra</th>
                                    <th>IPI</th>
                                    <th>ICMS</th>
                                    <th>PIS</th>
                                    <th>COFINS</th>
                                    <th>Outros C. Venda</th>
                                    <th>Comissão</th>
                                    <th>Divulgação</th>
                                    <th>Outros Cust. V.</th>
                                    <th>Custo Venda Variav. </th>
                                    <th>Custo Venda Fixo</th>
                                    <th>Custo Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CP.Custo>
            ) : aba === "estoque" ? (
                <CP.Estoque>
                    <div>
                        <input type="checkbox"/>
                        <label>Listar de Todas Filiais</label>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ativo?</th>
                                    <th>Filial</th>
                                    <th>Nome</th>
                                    <th>Est. Inicial</th>
                                    <th>Mín.</th>
                                    <th>Máx.</th>
                                    <th>Real</th>
                                    <th>Res. Faturar</th>
                                    <th>Dep. Interno</th>
                                    <th>Disponivel</th>
                                    <th>Ajuste</th>
                                    <th>Tipo Ajuste</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox"/></td>
                                    <td>1</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                    <td>0,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CP.Estoque>
            ) : aba === "movimentacao" ? (
                <CP.Movimentação>
                    <div id="data">
                        <div>
                            <div className="data">
                                <div >
                                    <input type="date"/>
                                    <label>à</label>
                                    <input type="date"/>
                                </div>
                                <button className="gerar-mov"><img alt="adicionar" src="/images/add.png"/>Gerar Mov.</button>
                            </div>
                            <label> * Tipo Mov.: (E: Entrada / S: Saída / R-E: Remessa-Entrada / R-S: Remessa-Saída)</label>
                        </div>
                        <div className="ultima">
                            <div>
                                <label>Última Venda:</label>
                                <input/>
                            </div>
                            <div>
                                <label>Última Compra:</label>
                                <input/>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Código PV</th>
                                    <th>Código Nota</th>
                                    <th>Tipo Mov. *</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th>Emitente</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </CP.Movimentação>
            ) : aba === "fornecedores" ? (
                <CP.Fornecedores>
                    <div className="fornecedores">
                        {/*<div className="foto">
                            <div id="foto"></div>
                            <div>
                                <input placeholder="Selecione uma foto"/>
                                <img alt="" src="/images/LUPA.png"/>
                            </div>
                        </div>*/}
                        <div className="div-fornecedor">
                            <fieldset>
                                <legend>Fornecedor</legend>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Fornecedor</th>
                                                <th>Último Preço</th>
                                                <th>Última Compra</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </fieldset>
                            <div className="pesos">
                                <div>
                                    <label>Peso Líquido: </label>
                                    <input value="0,0000"/>
                                </div>
                                <div>
                                    <label>Peso Bruto: </label>
                                    <input value="0,0000"/>
                                </div>
                                <div>
                                    <label>Volume: </label>
                                    <input value="0,0000"/>
                                </div>
                            </div>
                            <fieldset>
                                <legend>Observações: </legend>
                                <textarea/>
                            </fieldset>
                        </div>
                    </div>
                </CP.Fornecedores>
            ) : aba === "promocao" ? (
                <CP.Promocao>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Promoção</th>
                                    <th>Ativa</th>
                                    <th>Filial</th>
                                    <th>Aplicar Região</th>
                                    <th>Data Cadastro</th>
                                    <th>Descrição da Promoção</th>
                                    <th>Produto</th>
                                    <th>Principal</th>
                                    <th>Preço (R$)</th>
                                    <th>Período</th>
                                    <th>Aplicar Família</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </CP.Promocao>
            ) : (
                <CP.Validade>
                    <select>
                        {empresas.map((empresa)=> {
                            return(
                                <option value={empresa.id}>{empresa.id} - {empresa.razao_social} - {empresa.cnpj}</option>
                            )
                        })}
                    </select>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Filial</th>
                                    <th>Qtd.</th>
                                    <th>Dt. Fabricação</th>
                                    <th>Dt. Validade</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </CP.Validade>
            )}
            <C.Footer>
                <div className="buttons">
                    <button><img alt="salvar" src="/images/salvar.png"/>Salvar</button>
                    <button onClick={voltar}><img alt="voltar" src="/images/voltar.png"/>Voltar</button>
                </div>
            </C.Footer>
            {isModalFamilia ? <Familia close={()=> setIsModalFamilia(false)}/> : null}
            {isModalFornecedor ? <Fornecedor close={()=> setIsModalFornecedor(false)}/> : null}
            {isModalIpi ? <Ipi close={()=> setIsModalIpi(false)}/> : null}
            {isModalPis ? <PisCofins close={()=> setIsModalPis(false)}/> : null}
            {isModalNcm ? <Ncm close={()=> setIsModalNcm(false)}/> : null}
            {isModalCest ? <Cest close={()=> setIsModalCest(false)}/> : null}
            {isModalGrupo ? <Grupo close={()=> setIsModalGrupo(false)}/> : null}
        </C.Container>
    )
}