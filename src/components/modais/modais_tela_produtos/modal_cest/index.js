import React, {useState} from "react";
import * as M from "../../modal/modal";
import cest from "../../../../cest/cest.json";

export const Cest = ({close}) => {
    const [filtro, setFiltro] = useState('cest');
    const [busca, setBusca] = useState('');

    function changeFiltro (e){
        setFiltro(e.target.value);
    }

    const resultado = Array.isArray(cest) && cest.filter((cest)=> {
        if(filtro === "cest"){
            return String(cest.CEST).toLowerCase().includes(busca);
        }else if(filtro === "desc"){
            return cest.DESCRICAO.toLowerCase().includes(busca);
        }else if(filtro === "ncm"){
            return String(cest.NCM).toLowerCase().includes(busca);
        }
    })

    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Consulta Código CEST</h3>
                    <button className="close" onClick={close}>X</button>
                </M.Header>
                <M.Filtro>
                    <div>
                        <input type="radio" value="cest" name="filtro" checked={filtro === 'cest'} onChange={changeFiltro}/>
                        <label>CEST</label>
                        <input type="radio" value="desc" name="filtro" checked={filtro === 'desc'} onChange={changeFiltro}/>
                        <label>Desc.</label>
                        <input type="radio" value="ncm" name="filtro" checked={filtro === 'ncm'} onChange={changeFiltro}/>
                        <label>NCM</label>
                    </div>
                    <div className="div-search">
                        <input className="search" placeholder="Buscar..." value={busca} onChange={(e)=> setBusca(e.target.value)}/>
                    </div>
                </M.Filtro>
                <div className="table-responsive">
                    <table id="table">
                        <thead>
                            <tr>
                                <th>CEST</th>
                                <th>NCM</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((cest)=> {
                                return (
                                    <tr key={cest.ID}>
                                        <td>{cest.CEST}</td>
                                        <td>{cest.NCM}</td>
                                        <td>{cest.DESCRICAO}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </M.Container>
        </M.Modal>
    )
}