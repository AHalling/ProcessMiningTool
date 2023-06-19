import { Alignment } from "../../../../DCR-Alignment/types"
import { colors } from "../Constants";
import SmallModal from "../../Shared/Components/SmallModal";
import { Actionable, AlignmentWrapper, Container } from "../Styling/AlignmentStyling";
import { GroupButton } from "../Styling/MainContentStyling";
import ActivityIcon from "./ActivityIcon";
import Dots from "./DotsIcon";
import { useState } from "react";
import TraceIds from "./TraceIds";

type AlignmentProps = {
    alignment: Alignment,
    setState: Function,
}

const AlignmentBlock = (props : AlignmentProps) => {
    const [openModal, setOpenModal] = useState<boolean>()
    const ShiftLeft = (i: number) : string => {
        return (i*2.05).toString();
    }
    const handleTraceKeysClick = (open:boolean) => {
        setOpenModal(open)
    }
    var i = 0;
    return(
        <Container>
            {openModal && <SmallModal setModalState={(() =>handleTraceKeysClick(false))} modalType="Details" content={TraceIds({keys:props.alignment.keys})} title="Trace ids"></SmallModal>}
            <Actionable> 
            Cost : {props.alignment.cost}
            <GroupButton onClick={() => handleTraceKeysClick(true)}>
                            Trace keys
                        </GroupButton>
            </Actionable>
            <AlignmentWrapper key={(i*i).toString()}>
                        {props.alignment && props.alignment.trace.map((activity) => {
                            i++;
                            if (activity[1] === "skip"){
                                return (
                                    <Dots/>
                                )
                            }

                            return(
                                <ActivityIcon backgroundColor={colors[activity[1]]} left={ShiftLeft(i)} top="20" activityName={activity[0]} key={i}/>
                )
            })}
            </AlignmentWrapper>
        </Container>
    )
}

export default AlignmentBlock