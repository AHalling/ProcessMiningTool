import {ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalFooter, 
    ModalButton, ModalXButton, ModalHeaderH2} from '../../Shared/Styling/AlgorithmModalPageStyling';
import { Modals } from "types/src/conformanceCheckingTypes";

type ModalProps = {
    setModalState: Function,
    modalType: Modals,
    continueFunction: Function | null,
    content: JSX.Element,
    title: string,
    data: any,
}

const Modal = ({setModalState, content, title, continueFunction, modalType}: ModalProps) => {

    return (
        <ModalBackground>
            <ModalContainer>
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
                            {continueFunction != null && <ModalButton onClick={() => continueFunction()}> Continue </ModalButton> }
                        </div>
                    </ModalFooter>
            </ModalContainer>
        </ModalBackground>

    );
}

export default Modal;