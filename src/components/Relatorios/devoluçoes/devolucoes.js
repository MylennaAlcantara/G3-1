import React, { useState } from "react";
import * as M from "../../modais/modal/modal";
import * as C from "../../cadastro/cadastro";
import * as CV from "../comissao_por_vendedor/style"

export const Devolucao = () => {

    const [aba, setAba] = useState('Produto')

    return (
        <M.Modal>
            <C.Container>
                <C.Header><h3>Relatórios de Devoluções</h3></C.Header>

                <CV.Filtros>
                    <fieldset>
                        <div>
                            <input type="radio" />
                            <label>Produto</label>

                            <input type="radio" />
                            <label>Documento</label>
                        </div>
                    </fieldset>

                    {aba === 'Produto' ? (
                        <>
                            <div>
                                <input  /> <img src="/images/LUPA.png" />
                            </div>
                        </>
                    ) : null}
                </CV.Filtros>
            </C.Container>
        </M.Modal>
    )

}

export default Devolucao;