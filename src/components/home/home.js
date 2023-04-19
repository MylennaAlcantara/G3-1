import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        height: 40%;
        widht: 40%;
    }
    @media (max-width: 700px){
        img{
            height: 20%;
        }
    }
`