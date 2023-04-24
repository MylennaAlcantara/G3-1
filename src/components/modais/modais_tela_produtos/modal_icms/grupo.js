import styled from "styled-components";

export const Lista = styled.div`
    height: 70%;
    width: 90%;
    margin: auto;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow: auto;
    img{
        margin-left: 5px;
        height: 20px;
        width: 20px;
    }
    .grupo{
        border-radius: 5px;

    }
    .filho:hover,
    .grupo:hover{
        cursor: pointer;
        border-bottom: 1px solid #064a8b;
    }
    .filho{
        background-color: #00a5dd;
        color: white;
        border-radius: 5px;
        width: 50%;
        text-align: start;
        margin-left: 20px;
    }
`