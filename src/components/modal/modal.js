import styled from 'styled-components'; 

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.80);
    display: flex;
    justify-content: center;
    align-items: center;
    

`;

export const Container = styled.div`
    width: 60%;
    height: 60%;
    background-color: #fff;
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Header = styled.div`
    width: 100%;
    height: 10%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;