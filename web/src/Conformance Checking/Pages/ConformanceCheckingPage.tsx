import {State} from 'types';
import Layout from '../Components/Layout';
import {ContentWrapper} from "../../Shared/Styling/SharedStyling"
import dummyResults from "../dummyResults"

type ConformanceCheckingProps = {
    state: State,
    setState: (state: State, graphId?: string) => void,
}

const ConformanceCheckingPage = (props: ConformanceCheckingProps) => {


    return(
        <ContentWrapper>
            <Layout LogName={"LogNamePlaceholder"} ModelName={"ModelNamePlaceholder"} state={props.state} setState={props.setState} Results={dummyResults()} />
        </ContentWrapper>
    )
}

export default ConformanceCheckingPage