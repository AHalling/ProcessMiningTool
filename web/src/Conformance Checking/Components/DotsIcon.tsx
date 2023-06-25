import { Icon } from "../Styling/ActivityIconStyling";
type DotsProps= {
  left: string,
  top: string,
  i: number,
}

const Dots = (props: DotsProps) => {
  // TODO: Fix this mess
    return(
        <Icon left={props.left} top={props.top} key={(props.i*2,75)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 14 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        </Icon>

    )
}

export default Dots;