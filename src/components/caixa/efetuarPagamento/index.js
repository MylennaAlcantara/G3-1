import React from "react";
import * as E from "./efetuarPgto";

export const EfetuarPagamento = ({setAtalho}) => {
    
    function fechar(e) {
        if(e.keyCode === 27){
            setAtalho();
        }
    }
    document.onkeydown = fechar;

    return (
        <E.Container>
            <div style={{display: "flex", width: "100%", height: "80%"}}>
            <E.Pagamento>
                <div className="formas-valor">
                    <div className="formas">
                        <span>Formas de Pagamento</span>
                    </div>
                    <div className="valor">
                        <div className="campo">
                            <span>TOTAL</span>
                            <label style={{color: "#0033ff"}}>R$ 0,00</label>
                        </div>
                        <p>[PAGE UP] e [PAGE DOWN]</p>
                        <p>Para navegar entre os tipos de pagamento e os pagamentos recebidos.</p>
                        <p>[ENTER] Para inserir o pagamento ou finalizar.</p>
                        <p>[ESPAÇO] para pegar todo valor "A RECEBER".</p>
                        <p>[DELETE] Para remover um pagamento recebido.</p>
                        <p>[ESC] Voltar para a Venda. </p>
                    </div>
                </div>
                <div className="recebido">
                    <span>RECEBIDO</span>

                </div>
            </E.Pagamento>
            <E.Valores>
                <div className="campo">
                    <span>SUBTOTAL</span>
                    <label style={{color: "#000033"}}>R$ 0,00</label>
                </div>
                <div className="campo">
                    <span>DESCONTO (-)</span>
                    <label style={{color: "#006633"}}>R$ 0,00</label>
                </div>
                <div className="campo">
                    <span>ACRÉSCIMO (+)</span>
                    <label style={{color: "#990000"}}>R$ 0,00</label>
                </div>
                <div className="campo">
                    <span>TOTAL</span>
                    <label style={{color: "#000033"}}>R$ 0,00</label>
                </div>
                <div className="campo">
                    <span>A RECEBER</span>
                    <label style={{color: "#0033ff"}}>R$ 0,00</label>
                </div>
                <div className="campo">
                    <span>RECEBIDO</span>
                    <label style={{color: "#000033"}}>R$ 0,00</label>
                </div>
            </E.Valores>
            </div>
            <E.Troco>
                <div className="mensagem">
                    <div className="campo" style={{height: "40%"}}>
                        <span>MENSAGEM</span>
                    </div>
                    <div className="dados-caixa">
                        <div>
                            <label style={{fontWeight: "bold", fontSize: "12px"}}>Terminal:</label>
                            <label style={{fontWeight: "bold"}}>CAIXA01</label>
                        </div>
                        <div>
                            <label style={{fontWeight: "bold", fontSize: "12px"}}>Operador:</label>
                            <label style={{fontWeight: "bold"}}>Fulano</label>
                        </div>
                        <div>
                            <label style={{fontWeight: "bold", fontSize: "12px"}}>Vendedor:</label>
                            <label style={{fontWeight: "bold"}}>Fulano</label>
                        </div>
                        <div>
                            <label style={{fontWeight: "bold", fontSize: "12px"}}>Dados do Cliente:</label>
                            <label style={{fontWeight: "bold"}}>nome doc</label>
                        </div>
                    </div>
                </div>
                <div className="campo" style={{width: "40%", height: "auto"}}>
                    <span>TROCO</span>
                    <label style={{color: "#000033", fontSize: "55px"}}>R$ 0,00</label>
                </div>
            </E.Troco>
        </E.Container>
    )
}