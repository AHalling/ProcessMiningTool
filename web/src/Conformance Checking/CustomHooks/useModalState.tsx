import { useLayoutEffect, useState } from "react";
import { Modals } from "types/src/conformanceCheckingTypes";

const useModalState = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [openGroupsModal, setOpenGroupsModal] = useState<boolean>(false);
    const [openExportModal, setExportModal] = useState<boolean>(false);
    const [openExportFigModal, setExportFigModal] = useState<boolean>(false);

    const setModalState = (modal: Modals, state: boolean) : void => {
        if(modal === "Details")
            setOpenDetailsModal(state)
    
        if(modal === "TraceGroups")
            setOpenGroupsModal(state);
    
        if(modal === "Export")
            setExportModal(state);
    
        if(modal === "ExportFig")
            setExportFigModal(state);
    }

    useLayoutEffect(() => {
        window.electron.listenForModalOpen((modal: Modals) => {
            if(modal === "Details")
                setOpenDetailsModal(true)

            if(modal === "TraceGroups")
                setOpenGroupsModal(true);

            if(modal === "Export")
                setExportModal(true);

            if(modal === "ExportFig")
                setExportFigModal(true);
        })
        
    }, []);

    return {openDetailsModal, openGroupsModal, openExportModal, openExportFigModal, setModalState}
}

export default useModalState;

