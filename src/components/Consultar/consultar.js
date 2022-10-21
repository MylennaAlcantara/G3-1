import styled from 'styled-components'; 


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 90vh;
    width: 60vw;
    border: 1px solid black;
    border-radius: 12px;
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

export const Filtro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .div-checkbox{
        display: flex;
        flex-wrap: wrap;
    }
    .line{
        border-right: 1px solid #000;
        margin: 5px
    }
`;