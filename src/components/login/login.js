import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Image = styled.div`
    height: 100vh;
    width: 50vw;
    justify-content: center;
    align-items: center;
    .slideShow{
        margin: 0 auto;
        overflow: hidden;
        max-width: 500px;
    }
    .slideshowSlider{
        white-space: nowrap;
        transition: ease 1000ms;
    }
    .slide{
        height: 400px;
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
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
        display: flex;
        justify-content: end;
    }
`