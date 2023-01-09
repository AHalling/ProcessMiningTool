import {Button} from "../Styling/LeftBarStyling";
import {State} from "../../../../types/src/types";
import {Result} from "../../../../types/src/conformanceCheckingTypes";

type resultButtonProps = {
    result: Result,
    state: State,
    setState: (state: State, graphId?: string) => void,
}

const ResultButton = (props: resultButtonProps) => {

    return(
        <Button onClick={() => props.setState({pages:"ConformanceCheckingPage",
         log:props.state.log,
         result: props.result,
         workspacePath:props.state.workspacePath})}>
            {props.result?.name}
        </Button>
    )


}

export default ResultButton