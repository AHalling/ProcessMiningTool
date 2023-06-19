import {ModalBackground, ModalHeader, ModalBody, ModalFooter, 
    ModalButton, ModalXButton, ModalHeaderH2, SmallModalContainer} from '../../Shared/Styling/AlgorithmModalPageStyling';
import { Modals } from "types/src/conformanceCheckingTypes";

type SmallModalProps = {
    setModalState: Function,
    modalType: Modals,
    content: JSX.Element,
    title: string,
}

const SmallModal = ({setModalState, content, title, modalType}: SmallModalProps) => {

    return (
        <ModalBackground>
            <SmallModalContainer>
                    <ModalHeader>
                    <ModalXButton onClick={() => setModalState(modalType, false)}> X</ModalXButton>
                        <ModalHeaderH2> {title}</ModalHeaderH2>
                    </ModalHeader>
                    <ModalBody>
                    {content}
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <ModalButton  onClick={() => setModalState(modalType, false)}>Close</ModalButton>
                        </div>
                    </ModalFooter>
            </SmallModalContainer>
        </ModalBackground>

    );
}

export default SmallModal;