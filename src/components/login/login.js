import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;

    grid-template-columns: 50% 50%;
    grid-template-rows: 100vh;
    grid-template-areas:
        "image acessar"
    ;

`
export const Image = styled.div`
    height: 100vh;
    width: 50vw;
    grid-area: image;
    display: flex;
    justify-content: center;
    align-items: center;

    .slideShow{
        margin: 0 auto;
        overflow: hidden;
        width: 80%;
    }
    .slideshowSlider{
        white-space: nowrap;
        transition: ease 1000ms;
    }
    .slide{
        height: 600px;
        width: 100%;
        display: inline-block;
        border-radius: 0px;
    }
    .slideshowDots{
        text-align: center;
    }
    .slideshowDot{
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        cursor: pointer;
        margin: 15px 7px 0px;
        background-color: #c4c4c4;
    }
    .slideshowDot.active{
        background-color: #0088FE;
    }
`
export const Acessar = styled.div`
    height: 100vh;
    width: 50vw;
   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-area: acessar;

    .login{
        height: 343px;
        width: 630px;
        background-color: #303136; 
        border-radius: 34px 34px 0 0;
        border: solid 10px #919597;
    }
    .auth{
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        label{
            font-size: 38px;
            font-weight: semi-bold;
            color: white;
        }
    }
    .user{
        height: 80%;
        width: 630px;
        border-top: solid 10px #919597;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .company{
            width: 466px;
            height: 33px;
            border-radius: 4px;
        }
        div{
            width: 466px;
            display: flex;
            justify-content: space-between;
            .matricula-senha{
                display: flex;
                align-items: start;
                align-self: flex-start;
                flex-direction: column;
                input{
                    height: 33px;
                    width: 223px;
                    border-radius: 4px;
                }
            }
        }
        label{
            font-size: 20px;
            font-weight: semi-bold;
            color: white;
        }
    }
`