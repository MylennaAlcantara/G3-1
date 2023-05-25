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

    @media (max-width: 1146px) {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50vh 50vh;
        grid-template-areas:
          "acessar"
          "image"
        ;
    }

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

    @media(max-width: 1146px){
        width: 100%;
        height: 100%;
        grid-area: image;
        .slideShow{
            height: 100%;
            width: 80%;
        }
        .slideshowSlider{
            height: auto;
        }
        .slide{
            width: 100%;
            height: 300px;
        }
        .slideshowDots{
            display: flex;
            align-items: start;
            justify-content: center;
        }
        .slideshowDot{
            margin: 0 3px;
        }
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
        height: 40%;
        width: 85%;
        background-color: #303136; 
        border-radius: 34px 34px 0 0;
        border: solid 10px #919597;
        select{
            height: 33px;
            width: 95%;
        }
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
        width: 100%;
        border-top: solid 10px #919597;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
            width: 95%;
            display: flex;
            justify-content: space-between;
            .matricula-senha{
                display: flex;
                align-items: start;
                align-self: flex-start;
                flex-direction: column;
                input{
                    height: 33px;
                    width: 95%;
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
    button{
        font-size: 15px;
        font-weight: semi-bold;
        margin-top: 10px;
        width: 100px;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media(max-width: 1146px){
        width: 100%;
        margin-top: 25px;
        align-items: center;
        justify-content: start;
        grid-area: acessar;
        .login{
            width: 80%;
        }
        .auth{
            label{
                font-size: 25px; 
            }   
        }
    }
`