import {ILog} from "types/src/LogTypes"
import {EventLog, ImportedAlgorithm} from "../../../../types/src/miningTypes"


 export const handleMiningEvent = (algorithm: ImportedAlgorithm, log: ILog, algorithmName: string) => {
     window.electron.listenForMiningResult((result: EventLog) => {
        window.electron.clearMiningListener();
     })

    window.electron.mineLog(algorithm.path, log.path, algorithmName);

    }