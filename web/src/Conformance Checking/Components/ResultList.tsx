import {ListOfResults, ResultListItem, ListWrapper} from '../Styling/LeftBarStyling';
import {Results} from "../../../../types/src/conformanceCheckingTypes";
import ResultButton from "./ResultButton";
import {State} from "../../../../types/src/types";

type ResultListProps = {
    Results: Results,
    state: State,
    setState: (state: State, graphId?: string) => void,
}

const ResultList = (props: ResultListProps) => {
    let i = 0;
    return(
        <ListWrapper>
            <ListOfResults>
                {props.Results.results.map((item) => {
                    i = i + 1;
                    return(
                    <ResultListItem key={i}>
                        <ResultButton result={item} state={props.state} setState={props.setState}/>
                    </ResultListItem>
                    )
                })}
            </ListOfResults>
        </ListWrapper>
    )
}

export default ResultList