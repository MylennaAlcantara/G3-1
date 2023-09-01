import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 85%;
    margin-top: 10px;
    .table-responsive{
        width: 95%;
        height: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: start;
        img{
            width: 20px;
            height: 20px;
            margin-bottom: 5px;
        }
        img:hover{
            cursor: pointer;
        }
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