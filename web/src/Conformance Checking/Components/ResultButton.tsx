import {Button} from "../Styling/LeftBarStyling";
import {State} from "../../../../types/src/types";
import {Result, Results} from "../../../../types/src/conformanceCheckingTypes";

type resultButtonProps = {
    result: Result,
    results: Results,
    state: State,
    setState: (state: State, graphId?: string, results?:Results) => void,
}

const handleClick = (props: resultButtonProps) => {
    console.log("Result pressed.")
    props.setState(
        {
            pages:"ConformanceCheckingPage",
            log:props.state.log,
            result: props.result,
            workspacePath:props.state.workspacePath
        }, undefined, props.results)
}

const ResultButton = (props: resultButtonProps) => {
    // TODO: Use electron to update the page via the API. Do not just re-render
    return(
        <Button onClick={() => handleClick(props)}>
            {props.result?.name}
        </Button>
    )


}

export default ResultButton