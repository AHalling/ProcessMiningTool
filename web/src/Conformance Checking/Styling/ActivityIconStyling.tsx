import styled from "styled-components";

type IconProps ={
    left: string,
    top: string,
}

export const Icon = styled.div<IconProps>`
    width: 4vw;
    position:absolute;
    z-index: 0;
    ${(p) =>
        p.top ? "top: " + p.top + "px;" : "top:0px;"}
    ${(p) =>
        p.left ? "left: " + p.left + "vw;" : "left: 0vw;"}
`