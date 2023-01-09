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
    return(
        <ListWrapper>
            <ListOfResults>
                {props.Results.results.map((item) => {
                    return(
                    <ResultListItem key={item.name}>
                        <ResultButton result={item} state={props.state} setState={props.setState}/>
                    </ResultListItem>
                    )
                })}
            </ListOfResults>
        </ListWrapper>
    )
}

export default ResultList