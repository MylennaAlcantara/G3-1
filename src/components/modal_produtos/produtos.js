import styled from "styled-components";

export const Filtro = styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    div{
        display: flex;
        flex-direction: column;
    }
    .search{
        width: 50%;
    }
    input{
        height: 24px;
    }
`;

export const ListItems = styled.div`
    margin: 5px 0;
    div{
        display: flex;
        flex-grow: 1;
        border: solid 1px gray
    }
`;