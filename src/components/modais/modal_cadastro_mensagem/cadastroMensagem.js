import styled from "styled-components";

export const Content = styled.div`
    width: 90%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    div{
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: start;
    }
    .textarea{
        height: 100%;
        display: flex;
        align-items: center;
        textarea{
            width: 80%;
        }
    }
    textarea{
        margin-top: 10px;
        width: 100%;
        height: 100%;
        resize: none;
    }
`