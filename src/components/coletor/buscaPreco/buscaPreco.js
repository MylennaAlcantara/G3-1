import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 80%;
    border-top: 1px solid grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;

    img{
        height: 20px;
        width: 20px;
    }
    img:hover{
        cursor: pointer;
    }
    h1{
        font-size: 40px;
        color: white;
        margin: 15px 0;
    }
    h3{
        font-size: 30px;
        color: #064a8b;
    }
    h4{
        font-size: 30px;
        color: #064a8b;
    }
    @media(max-width: 460px){
        h1{
            font-size: 30px;
            margin: 15px 0;
        }
        h3{
            font-size: 30px;
        }
        h4{
            font-size: 20px;
            color: white;
        }
    }
`