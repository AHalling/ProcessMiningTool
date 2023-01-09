import {GeneralStatistics, TestStatistics} from "types/src/conformanceCheckingTypes";
import {StatisticNames} from "../Constants";

import {StatisticsTableRow, StatisticsTableDataKey, StatisticsTableDataValue, StatisticsTable} from "../Styling/StatisticsBarStyling";

type StatisticsProps={
    Stats: TestStatistics | null, 
}

const ResultsStatistics = (props: StatisticsProps) => {
    return(
        <div>
            <StatisticsTable>
                <tbody>
                    <tr>
                        <th>Statistic </th>
                        <th>Value </th>
                    </tr>
                    {props.Stats !== null && Object.keys(props.Stats).map(key => {
                        return(
                            <StatisticsTableRow key={key}>
                                <StatisticsTableDataKey>
                                    {StatisticNames[key]}
                                </StatisticsTableDataKey>
                                <StatisticsTableDataValue>
                                    {props.Stats !== null && props.Stats[key]}
                                </StatisticsTableDataValue>
                            </StatisticsTableRow>
                            )})}
                </tbody>
            </StatisticsTable>
        </div>
    )

}

export default ResultsStatistics