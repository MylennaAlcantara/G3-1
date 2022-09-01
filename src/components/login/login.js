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
        width: 100%;
    }
    .slideshowSlider{
        white-space: nowrap;
        transition: ease 1000ms;
    }
    .slide{
        height: 600px;
        width: 100%;
        display: inline-block;
        border-radius: 40px;
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
    div{
        display: flex;
        justify-content: end;
    }
`