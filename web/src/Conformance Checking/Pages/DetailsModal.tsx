import {ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalFooter, 
    ModalButton, ModalXButton, ModalXContainer, ModalHeaderH2} from '../../Shared/Styling/AlgorithmModalPageStyling';


type ModalProps = {
    setModalState: Function,
}

const Modal = ({setModalState}: ModalProps) => {

    const handleContinue = () => {
        setModalState(false)
    }

    return (
        <ModalBackground>
            <ModalContainer>
                    <ModalXContainer>
                        <ModalXButton onClick={() => setModalState(false)}> X</ModalXButton>
                    </ModalXContainer>
                    <ModalHeader>
                        <ModalHeaderH2> Header</ModalHeaderH2>
                    </ModalHeader>
                    <ModalBody>
                        <p> Hello World</p>
                    </ModalBody>
                    <ModalFooter>
                        
                        <div>
                            <ModalButton  onClick={() => setModalState(false)}>Cancel</ModalButton>
                            <ModalButton onClick={() => handleContinue() }> Continue </ModalButton>
                        </div>
                    </ModalFooter>
            </ModalContainer>
        </ModalBackground>

    );
}

export default Modal;