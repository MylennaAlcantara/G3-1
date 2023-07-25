import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function picoDeFaturamentoMesPDF (dataFinal, dataInicial, NFE, NFCE, valorFilial, valorIdTop, mes, empresa, user){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const nfe = () => {
        if (NFE === true) {
            return (
                "SIM"
            )
        } else if (NFE === false) {
            return (
                "NÃO"
            )
        }
    }

    const nfce = () => {
        if(NFCE === true){
            return (
                "SIM"
            )
        } else if (NFCE === false){
            return (
                "NÃO"
            )
        }
    }

    const Filial = () => {
        if (valorFilial.length === 0) {
            return (
                "TODAS"
            )
        } else {
            return valorFilial
        }
    }

    const Top = () => {
        if (valorIdTop.length === 0) {
            return (
                "TODAS"
            )
        } else {
            return valorIdTop
        }
    }

    const dataAtual = new Date().toLocaleString();

}