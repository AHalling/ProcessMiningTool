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
    window.electron.setResult(props.result);
}

const ResultButton = (props: resultButtonProps) => {
    return(
        <Button onClick={() => handleClick(props)}>
            {props.result?.name}
        </Button>
    )


}

export default ResultButton