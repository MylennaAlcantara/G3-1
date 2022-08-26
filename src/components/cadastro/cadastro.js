import styled from 'styled-components'; 

export const Container = styled.div`
    background-color: white;
    height: 70vh;
    width: 70vw;
    border: 1px solid black;
    overflow-y: auto;
`;
export const Header = styled.div`
    border: 1.5px;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 5vh;
    width: 100%;
    background-color: #f0f0f0;
    button{
        margin: 0 5px;
        position: relative;
    }
`;
export const Info = styled.div`
    height: 20vh;
    display: block;
    flex-wrap: wrap;
    align-content: center;
    padding-left: 10px;
   
    form{
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px 0;
        
    }
    .checkbox{
        margin: 0 15px;
        background-color: #339afe;
        align-content: center;
    }
    .radio{
        margin: 0 10px;
    }
    .cod{
        margin-right: 30%;
        margin-left: 15px;
        width: 60px;
    }
    #line{
        margin-left: 20px;
        height: 20px;
        width: 0;
        border-right: 1px solid #000;
    }
    .information{
        
        width: calc(100% - 1em);
        display: inline-block;
        margin: 5px 0;
        align-content: center;
        
    }
    div{
        display:flex;
        justify-content: end;
    }
    .f1{
        width: 60px;
    }
    .option{
        background-color: #f0f0f0;
        width: 55vw;
        margin-right: 10px;
    }
    .partner{
        background-color: #f0f0f0;
        width: 39vw;
    }
    input{
        margin-right: 10px;
    }
    fieldset{
       margin: 0 10px ;
    }
    
`;
export const Add = styled.div`
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form{
        
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px 0; 
    }
    .descrição{
        width: 60vw;
    }
    .add-item{
        width: 70px;
    }
    label{
        margin: 0 5px;
    }
`
export const Display = styled.div`
    margin: 5px 0;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    height: 20vh;
    width: 99%;
    
`
export const Footer = styled.div`
    margin-top: 0px;
    height: 10vh;
    width: 100%;
    display: flex;
    display-flex: wrapper;
    flex-direction: column;
    justify-content: flex-end;
    form{
        
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px 0;
        
    }
   .buttons{
        height: 5vh;
        display: flex;
        background-color: #8ac2df;
        aling-itens: center;
        justify-content: space-around;
   }
`