import { TraceIdsWrapper } from "../Styling/TraceIdsStyling"

type TraceIdsProps = {
    keys: Array<string>
}

const TraceIds = (props: TraceIdsProps) => {
    return(
        <TraceIdsWrapper>
            {props.keys.map(key => {
                return (<div key={key}>{key}</div>)
            })}
        </TraceIdsWrapper>
    )
}

export default TraceIds