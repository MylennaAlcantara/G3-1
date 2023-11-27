import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/authContext";
import { Loading } from "../../loading";
import * as L from "./listaContagem";

export const ListaContagem = ({ setCabecalho, abrir }) => {
    const { dataMask } = useContext(AuthContext);
    const [cabecalhos, setCabecalhos] = useState([]);

    const [itemSelecionado, setItemSelecionado] = useState(null);

    async function fetchContagensPendentes() {
        setCabecalho([]);
        fetch("http://10.0.1.107:8091/coletor/cabecalho")
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
                <div style={{width: "90%", display: "flex", flexDirection: "row-reverse", margin: "auto"}}>
                    <img style={{marginRight: "0px"}} alt="lupa" src="/images/LUPA.png" onClick={fetchContagensPendentes}/>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descrição</th>
                                <th>Data Inicio</th>
                                <th>Usuário</th>
                                <th>Aberta</th>
                                <th>Finalizada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(cabecalhos) && cabecalhos.map((item, index) => {
                                return (
                                    <tr key={item.id}
                                        onClick={selecionado.bind(this, item, index)}
                                        onDoubleClick={abrir.bind(this, item)}
                                        style={{ backgroundColor: itemSelecionado === index ? "#87CEFA" : "", color: item.aberto === 1 ? "red" : "" }}>
                                        <td>{item.id}</td>
                                        <td>{item.descricao}</td>
                                        <td>{dataMask(item.data_contagem)}</td>
                                        <td>{item.id_usuario_insercao}</td>
                                        <td>{item.aberto === 0 ? "Não" : "Sim"}</td>
                                        <td>Não</td>
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