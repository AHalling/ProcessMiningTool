import {Table, TableData, ColorDiv} from "../Styling/LeftBarStyling";
import {LegendColors} from "../Constants";

const Legends = () => {
    return(
        <Table style={{marginLeft:"auto", marginRight:"auto"}}>
            <tbody>
                {Object.keys(LegendColors).map((key => {
                    return(
                        <tr key={key}>
                        <TableData>
                            <ColorDiv backgroundColor={LegendColors[key]}>
                            </ColorDiv>
                        </TableData>
                        <TableData>
                            {key}
                        </TableData>
                    </tr>
                    )
                }))}
            </tbody>

        </Table>
    )
}

export default Legends