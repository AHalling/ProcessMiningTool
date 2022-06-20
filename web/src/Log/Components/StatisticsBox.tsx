import { StatisticsBox, StatsHeader } from "../../Shared/Styling/LogPageStyling"

type BoxProps = {
    key: string,
    value: string,
}

const StatisticsValue = ({key, value} : BoxProps) => {
    return (
        <StatisticsBox>
            <StatsHeader>{key}</StatsHeader>
            {value} 
        </StatisticsBox>
    )
}

export default StatisticsValue