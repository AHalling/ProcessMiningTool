import {DynamicStatistics} from "types/src/conformanceCheckingTypes";
import {StatisticNames} from "../Constants";

import {StatisticsTableRow, StatisticsTableDataKey, StatisticsTableDataValue, StatisticsTable} from "../Styling/StatisticsBarStyling";

type StatisticsProps={
    Stats: DynamicStatistics | undefined, 
}

const ResultsStatistics = (props: StatisticsProps) => {
    return(
        <div>
            {props.Stats && <StatisticsTable>
                <tbody>
                    <tr>
                        <th>Statistic </th>
                        <th>Value </th>
                    </tr>
                    {(props.Stats !== undefined || props.Stats !== null) && Object.keys(props.Stats).map(key => {
                        return(
                            <StatisticsTableRow key={key}>
                                <StatisticsTableDataKey>
                                    {StatisticNames[key]}
                                </StatisticsTableDataKey>
                                <StatisticsTableDataValue>
                                    {props.Stats && props.Stats[key]}
                                </StatisticsTableDataValue>
                            </StatisticsTableRow>
                            )})}
                </tbody>
            </StatisticsTable>}
        </div>
    )

}

export default ResultsStatistics