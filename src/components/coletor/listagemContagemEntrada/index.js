import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/authContext";
import { Loading } from "../../loading";
import * as L from "../listaContagem/listaContagem";

export const ListaContagemEntrada = ({ setCabecalho, abrir }) => {
    const { dataMask } = useContext(AuthContext);
    const [cabecalhos, setCabecalhos] = useState([]);

    const [itemSelecionado, setItemSelecionado] = useState(null);

    async function fetchContagensPendentes() {
        setCabecalho([]);
        fetch("http://10.0.1.107:8091/contagemEntrada/cabecalho")
            .then((resp) => resp.json())
            .then((data) => {
                setCabecalhos(data);
            })
    }

    useEffect(() => {
        fetchContagensPendentes();
    }, []);

    function selecionado(item, index) {
        setItemSelecionado(index);
        setCabecalho({
            id: item.id,
            descricao: item.descricao,
            data_contagem: item.data_contagem,
            aberto: item.aberto,
            id_usuario_insercao: item.id_usuario_insercao,
            id_usuario_edicao: item.id_usuario_edicao
        });
    }

    return (
        <L.Content>
            {!cabecalhos ? (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loading />
                </div>
            ) : (
                <>
                    <div style={{ width: "90%", display: "flex", flexDirection: "row-reverse", margin: "auto" }}>
                        <img style={{ marginRight: "0px" }} alt="lupa" src="/images/LUPA.png" onClick={fetchContagensPendentes} />
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Descrição</th>
                                    <th>Chave NFE</th>
                                    <th>Data Inicio</th>
                                    <th>Usuário Inserção</th>
                                    <th>Usuário Aberto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(cabecalhos) && cabecalhos.map((item, index) => {
                                    return (
                                        <tr key={item.id}
                                            onClick={selecionado.bind(this, item, index)}
                                            onDoubleClick={abrir.bind(this, item)}
                                            style={{ backgroundColor: itemSelecionado === index ? "#87CEFA" : "" }}>
                                            <td>{item.id}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.chave}</td>
                                            <td>{dataMask(item.data_conferencia)}</td>
                                            <td>{item.id_usuario_insercao}</td>
                                            <td>{item.aberto !== "null" ? item.aberto : ""}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </L.Content>
    )
}