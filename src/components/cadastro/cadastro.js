import styled from 'styled-components'; 

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    height: 90vh;
    width: 60vw;
    border: 1px solid black;
    border-radius: 12px;
    overflow-y: auto;

`;
export const Header = styled.div`
    border: 1.5px;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 24px;
    width: 100%;
    background-color: #f0f0f0;
    button{
        margin: 0 5px;
        position: relative;
    }
`;
export const Info = styled.div`
    display: block;
    flex-wrap: wrap;
    align-content: center;
    padding-left: 10px;
   
    form{
        display: flex;
        width: 950px;
        align-content: center;
        margin: 5px 0;

        
    }
    .checkbox{
        margin: 0 15px;
        background-color: #339afe;
        align-content: center;
        
    }
    .checkbox-box{
        box-shadow: none;
    }
    .radio{
        margin: 0 10px;
        box-shadow: none;
    }
    .cod{
        margin-right: 20%;
        margin-left: 15px;
        width: 60px;
        height: 24px;
    }
    #line{
        margin-left: 20px;
        height: 20px;
        width: 0;
        border-right: 1px solid #000;
    }
    .information{
        
        width: 950px;
        display: inline-block;
        margin: 5px 0;
        align-content: center;
        overflow-x: auto;
    }
    div{
        
        display:flex;
        justify-content: end;
    }
    .f1{
        width: 120px;
        heigth: 24px;
        border: none;
        background-color: #D9D9D9;
        margin: 3px;
        box-shadow: 0 3px 5px gray;
    }
    .option{
        background-color: #D9D9D9;
        border: none;
        margin: 3px 10px 3px 3px;
        width: 700px;
        height: 24px;
        box-shadow: 0 3px 5px gray;
    }
    .partner{
        width: 445px;
        height: 24px;
        border: none;
        background-color: #D9D9D9;
        margin: 3px;
        box-shadow: 0 3px 5px gray;
    }
    label{
        font-size: 15px;
        font-weight: bold;
        color: #373435;
    }
    input{
        margin-right: 10px;
        height: 24px;
        border: none;
        background-color: #D9D9D9;
        box-shadow: 0 3px 5px gray;
        
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
    width: 950px;
    form{
        justify-content: end;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin: 5px; 
    }
    .descrição{
        width: 800px;
        height: 24px;
    }
    .add-item{
        width: 70px;
        height: 24px;
    }
    input{
        height: 24px;
        width: 70px;
        border: none;
        background-color: #D9D9D9;
        margin: 3px;
        box-shadow: 0 3px 5px gray;
    }
    label{
        margin: 0 5px;
        font-size: 15px;
        font-weight: bold;
        color: #373435;
    }
`
export const Display = styled.div`
    margin: 5px 0;
    background-color: #f0f0f0;
    display: flex;
    align-items: start;
    justify-content: center;
    border: 1px solid black;
    height: 20vh;
    width: 950px;
    overflow-x: auto;
    div{
        display: flex;
        flex-grow: 1;
        border: solid 1px gray;
    }
    
`
export const Footer = styled.div`
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
        input{
            width: 70px;
            height: 24px;
            border: none;
            background-color: #F0F0F0;
            margin: 3px;
            box-shadow: 0 5px 5px #ABADB3;
        }
        label{
            font-size: 15px;
            font-weight: bold;
            color: #373435;
        }
        
    }
   .buttons{
        height: 67px;
        display: flex;
        background-color: #F0F0F0;
        align-items: center;
        justify-content: center;
        button{
            width: 117px;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        button:hover{
            cursor: pointer;
        }
        img{
            height: 20px;
            width: 20px;
        }
   }
`