import {State} from 'types';
import Layout from '../Components/Layout';
import {ContentWrapper} from "../../Shared/Styling/SharedStyling"
import {Results} from "types/src/conformanceCheckingTypes"

type ConformanceCheckingProps = {
    state: State,
    results: Results,
    setState: (state: State, graphId?: string) => void,
}

const ConformanceCheckingPage = (props: ConformanceCheckingProps) => {
    return(
        <ContentWrapper>
            <Layout LogName={"LogNamePlaceholder"} ModelName={"ModelNamePlaceholder"} state={props.state} setState={props.setState} Results={props.results} />
        </ContentWrapper>
    )
}

export default ConformanceCheckingPage