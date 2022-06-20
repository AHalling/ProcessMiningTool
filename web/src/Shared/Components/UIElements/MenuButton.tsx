import styled from "styled-components";

interface Props {
  color?: string;
  height?: string;
  width?: string;
}

export default styled.button<Props>`
  ${(p) =>
  p.width ? "height: " + p.width + ";" : ""}
  border-radius: 10px;
  border: none;
  background-color: ${(p) => p.color ? p.color+";" : "#0373fc;"}
  ${(p) =>
    p.height ? "height: " + p.height + "; lineheight: " + p.height + ";" : ""}
  color: white;
  padding: 0.2rem 1rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &[disabled] {
    opacity: 0.5;
  }
  margin-left: 5px;
  margin-right: 5px;
`;
