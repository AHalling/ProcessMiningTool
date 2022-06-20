import React, { useEffect } from 'react';
import {ModalBackground, ModalContainer, ModalHeader, ModalBody, ModalFooter, 
    ModalButton, ModalXButton, ModalXContainer, ModalHeaderH2, ModalListBody, ModalListItem, SelectedAlgorithmWrapper,
     ModalForm, ModalLabel, ModalInput} from '../../Shared/Styling/AlgorithmModalPageStyling';
import {AlgorithmCollection, ImportedAlgorithm} from "../../../../types/src/miningTypes"
import { ILog } from 'types/build/LogTypes';
import { useState } from 'react';
import { handleMiningEvent } from '../Components/MiningHandler';
import { useToasts } from 'react-toast-notifications'


type ModalProps = {
    setModalState: Function,
    algorithms: AlgorithmCollection,
    log: ILog,
    numberOfModels: number,
}

const Modal = ({setModalState, algorithms, log, numberOfModels}: ModalProps) => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<ImportedAlgorithm>();
    const [modelName, setModelName] = useState<string>("");
    const { addToast } = useToasts();

    useEffect(() => {
        setModelName(log.name.split(".")[0]+ "_model_"+ numberOfModels)
        window.electron.listenToToast((msg: { msg: string, appearance: "success" | "error" }) => {
          const content = msg.msg;
          const appearance = msg.appearance;
          addToast(content, {
            appearance,
            autoDismiss: true
          });
        });
        return () => {
          window.electron.clearToastListener();
        }
      }, [addToast, log.name, numberOfModels])

    const handleItemClick = (algorithm: ImportedAlgorithm) =>{
        setSelectedAlgorithm(algorithm);
    }

    const handleContinue = () => {
        selectedAlgorithm ? handleMiningEvent(selectedAlgorithm, log, modelName) : alert("Please select an algorithm first.")
        addToast("Mining begone for log: " + log.name +" with algorithm: " + selectedAlgorithm?.name, {appearance:"success", autoDismiss:true})
        setModalState(false)
    }

    const handleNameChange = (value: string) => {
        setModelName(value)
    }

    return (
        <ModalBackground>
            <ModalContainer>
                    <ModalXContainer>
                        <ModalXButton onClick={() => setModalState(false)}> X</ModalXButton>
                    </ModalXContainer>
                    <ModalHeader>
                        <ModalHeaderH2> Choose from the available algorithms ({algorithms.length}):</ModalHeaderH2>
                    </ModalHeader>
                    <ModalBody>
                        <ModalListBody>
                            {algorithms.map(alg => {
                                return (
                                    <ModalListItem key={alg.name} onClick={() => handleItemClick(alg)}>
                                        {alg.name}
                                    </ModalListItem>
                                )
                            })}
                        </ModalListBody>
                    </ModalBody>
                    <ModalFooter>
                        <SelectedAlgorithmWrapper>
                            {selectedAlgorithm && <h4> Selected algorithm : {selectedAlgorithm.name}</h4>}
                            <ModalForm>
                                <ModalLabel>
                                    Model Name:
                                </ModalLabel>
                                <ModalInput type="text" defaultValue={modelName} onChange= {(e) => handleNameChange(e.target.value)} />

                            </ModalForm>
                        </SelectedAlgorithmWrapper>
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