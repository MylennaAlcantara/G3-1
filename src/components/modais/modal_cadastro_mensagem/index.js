import React from "react";
import * as M from "../modal/modal";
import { Content } from "./cadastroMensagem";

export const CadastroMensagem = ({close, minimizado, setMinimizado, minimizar, setMinimizar}) => {
    return(
        <M.SubModal>
            <M.Container>
                <M.Header>
                    <label>Cadastro Mensagem NFe</label>
                    <div className="buttons">
                        <button className="minimizar"><div className="linha"/></button>
                        <button className="close" onClick={close}>X</button>
                    </div>
                </M.Header>
                <Content>
                    <div>
                        <label>Código:</label>
                        <input/>
                    </div>
                    <div className="textarea">
                        <label>Mensagem: </label>
                        <textarea/>
                    </div>
                    <textarea readOnly disabled value="
                    Para uso em notas de devolução, onde é obrigatório a referência das nota(s) devolvida(s). É permitido o uso de parâmetros na mensagem que serão preenchidos automaticamente pelo sistema, são eles:
                    %numero = Será preenchido pelo número da(s) nota(s) referenciadas.
                    %serie = Será preenchido pela série da(s) nota(s) referenciadas.
                    %chave = Será preenchido pela chave da(s) nota(s) referenciadas.
                    "/>
                </Content>
                <M.Footer>
                    <div className="buttons">
                        <button><img src="/images/salvar.png"/>Salvar</button>
                        <button><img src="/images/lixeira.png"/>Excluir</button>
                        <button onClick={close}><img src="/images/voltar.png"/>Voltar</button>
                    </div>
                </M.Footer>
            </M.Container>
        </M.SubModal>
    )
}