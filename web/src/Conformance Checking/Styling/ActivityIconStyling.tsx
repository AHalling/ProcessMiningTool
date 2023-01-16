import styled from "styled-components";

type IconProps ={
    left: string,
}

export const Icon = styled.div<IconProps>`
    width: 4vw;
    position:absolute;
    top:0px;
    ${(p) =>
        p.left ? "left: " + p.left + "vw;" : "left: 0vw;"}
`