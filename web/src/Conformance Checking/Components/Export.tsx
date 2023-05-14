import {Button, ExportWrapper} from "../Styling/StatisticsBarStyling";

const Export = () =>{
    const handleModalOpen = (type: String) =>{
        window.electron.openModal(type);
    }

    return(
        <ExportWrapper>
            <Button onClick={() => handleModalOpen("Export")}>
                Export
            </Button>
            <Button onClick={() => handleModalOpen("ExportFig")}>
                Export figure
            </Button>
        </ExportWrapper>
    )
}

export default Export