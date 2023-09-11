import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 80%;
    border-top: 1px solid grey;
    img{
        width: 20px;
        height: 20px;
        margin: 5px auto 5px 0;
    }
    img:hover{
        cursor: pointer;
    }
    .table-responsive{
        width: 90%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        overflow: auto;

        table{
            border-collapse: collapse;
            width: 100%;
            border: 1px solid grey;
        }
        thead{
            position: sticky;
            top: 0;
        }
        th{
            font-size: 15px;
            font-weight: bold;
            color: #373435;    
            background-color: #ffffff;
            border: 1px solid grey;
            white-space: nowrap;
        }
        td{
            white-space: nowrap;
            border: 1px solid grey;
        }
        table tr td{
            cursor: pointer;
        }
        table tr:hover td{
            background-color: #87CEFA;
        }
    }
`