import React, { useState } from "react";
import * as C from "../../../cadastro/cadastro";
import * as M from "../../modal/modal";
import { Produtos } from "../../modal_produtos";
import { Grupo } from "../modal_icms";
import * as CF from "./cadastroFamilia";

export const CadastrarFamilia = ({ close, minimizado, setMinimizado, minimizar, setMinimizar }) => {
    const [modalProduto, setModalProduto] = useState(false);
    const [modalGrupo, setModalGrupo] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [grupo, setGrupo] = useState({
        codigo: "",
        descricao: ""
    })

    return (
        <M.SubModal style={{ zIndex: minimizado.familia === true ? minimizar : "1" }}>
            <C.Container>
                <C.Header>
                    <h3>Cadastrar Familia</h3>
                    <div className="buttons">
                        <button className="minimizar" onClick={() => { setMinimizar("-5"); setMinimizado({ ...minimizado, familia: true }) }}><div className="linha" /></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </C.Header>
                <CF.DadosFamilia>
                    <div className="dados-familia">
                        <div>
                            <label>Código</label>
                            <input />
                        </div>
                        <div>
                            <label>Data de Cadastro</label>
                            <input />
                        </div>
                        <input type="checkbox" />
                        <label>Ativo</label>
                    </div>
                    <div className="dados-familia">
                        <div id="descricao">
                            <label>Descrição</label>
                            <input className="descricao" />
                        </div>
                    </div>
                </CF.DadosFamilia>
                <CF.DadosProduto>
                    <div className="dados-produto" style={{ borderTop: "1px solid grey" }}>
                        <div>
                            <label>Código</label>
                            <input />
                        </div>
                        <div id="descricao">
                            <label>Descrição</label>
                            <input className="descricao" />
                        </div>
                        <div >
                            <label>Referência</label>
                            <input />
                        </div>
                    </div>
                    <div className="dados-produto">
                        <div className="grupo">
                            <div>
                                <label>Grupo</label>
                                <input value={grupo.codigo} />
                            </div>
                            <button onClick={() => setModalGrupo(true)}>...</button>
                            <select disabled>
                                <option>{grupo.descricao}</option>
                            </select>
                        </div>
                    </div>
                    <div className="dados-produto">
                        <div className="grupo">
                            <div id="descricao">
                                <label>Produtos</label>
                                <input className="descricao" />
                            </div>
                            <img alt="" src="/images/add.png" onClick={() => setModalProduto(true)} />
                        </div>
                    </div>
                </CF.DadosProduto>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>GTIN</th>
                                <th>Referência</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems.map((item) => {
                                return (
                                    <tr key={item.id_produto}>
                                        <td>{item.id_produto}</td>
                                        <td>{item.gtin_produto}</td>
                                        <td>{item.referencia}</td>
                                        <td>{item.descricao_produto}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <C.Footer>
                    <div className="buttons">
                        <button><img alt="" src="/images/salvar.png" />Salvar</button>
                        <button onClick={close}><img alt="" src="/images/voltar.png" />Fechar</button>
                    </div>
                </C.Footer>
                {modalProduto ? <Produtos onClose={() => setModalProduto(false)} listItems={listItems} setListItems={setListItems} /> : null}
                {modalGrupo ? <Grupo close={() => setModalGrupo(false)} setGrupo={setGrupo} /> : null}
            </C.Container>
        </M.SubModal>
    )
}