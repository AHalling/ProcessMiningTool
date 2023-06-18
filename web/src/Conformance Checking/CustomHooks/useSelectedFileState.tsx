import { useEffect, useState } from "react";
import { FileResult } from "types/src/fileTypes";

const useSelectedFileState = () => {
    const [Log, setLog] = useState<FileResult>()
    const [Model, setModel] = useState<FileResult>()
    
    useEffect(() => {
        window.electron.listenToSelectFile( (fileResult: FileResult) => {
            // Discard result do to null selection
            if (fileResult.path === "")
                return;

            if(fileResult.Type === "Log"){
                setLog(fileResult)
                window.electron.clearSelectFile();
            }
    
            if( fileResult.Type === "Model"){
                setModel(fileResult)
                window.electron.clearSelectFile();
            }
            });
    }, [Log, Model])

    return {Log, Model}
}

export default useSelectedFileState;