import styled from 'styled-components'; 

export const Container = styled.div`
    background-color: white;
    height: 90vh;
    width: 90%;
    border: 1px solid black;
`;
export const Header = styled.div`
    border: 1.5px;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 5%;
    width: 100%;
    background-color: #f0f0f0;
    button{
        margin: 0 5px;
        position: relative;
    }
`;
export const Info = styled.div`
    height: 40%;
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
    .f1{
        width: 60px;
    }
    .option{
        background-color: #f0f0f0;
        width: 75vw;
        margin: 0 10px;
    }
    .information{
        margin: 5px 0;
        align-content: center;
        justify-content: end;
    }
    .partner{
        background-color: #f0f0f0;
        width: 55vw;
        margin: 0 10px;
    }
    input{
        margin-right: 10px;
    }
    label{
        margin: 0 5px;
    }
    fieldset{
       margin: 0 10px ;
    }
    
`;
export const Add = styled.div`
    height: 15%;
    align-items: center;
`
export const Display = styled.div`
    background-color: #f0f0f0;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    height: 20vh;
    width: 80%;
`
export const Footer = styled.div`
    background-color: #339afe;
    width: 100%;
    height: 5%;
    
`