import { StatisticsPart } from "../../Shared/Styling/LogPageStyling";
import {Statistics} from "types/src/statisticsTypes";
import StatisticsValue from "./StatisticsBox";

type StatisticsProps = {
    statistics: Statistics | undefined,
}

const Stats = ({statistics} : StatisticsProps) => {
    return (
        <div>
            <StatisticsPart>
                {statistics && Object.keys(statistics.ContentStatistics).map(item => {
                    return(
                        <StatisticsValue key={item} value={"test"} ></StatisticsValue>
                    )
                })}
            </StatisticsPart>
            <StatisticsPart>
                {statistics && Object.keys(statistics.TemporalStatistics).map(item => {
                    return(
                        <StatisticsValue key={item} value={"test"} ></StatisticsValue>
                    )
                })}
            </StatisticsPart>
        </div>
    )
}

export default Stats