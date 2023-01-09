import {GeneralStatistics, TestStatistics} from "types/src/conformanceCheckingTypes";
import {StatisticNames} from "../Constants";

type StatisticsProps={
    Stats: TestStatistics | null, 
}

const ResultsStatistics = (props: StatisticsProps) => {
    return(
        <div>
            {props.Stats !== null && Object.keys(props.Stats).map(key => {
                return(
                    <div key={key}>
                        {StatisticNames[key]} ...... {props.Stats !== null && props.Stats[key]}
                    </div>
                )
            })}
        </div>
    )

}

export default ResultsStatistics