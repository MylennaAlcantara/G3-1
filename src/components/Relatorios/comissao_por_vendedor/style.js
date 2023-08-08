import styled from "styled-components";

export const Filtros = styled.div`
    margin-left: 2%;
    margin-right: 2%;
    display: flex;
    flex-direction: column;
    div{
        display: flex;
    }
    .eName{
        background-color: #F0F0F0;
        border-style: groove;
        display: flex;
        justify-content: space-around;
    }
    img{
        height: 20px;
        width: 20px;
        margin: auto 0;
    }
    .periodo{
        font-weight: bold;
    }
`