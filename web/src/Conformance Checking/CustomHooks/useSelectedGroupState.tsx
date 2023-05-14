import { useEffect, useState } from "react";
import { AlignmentGroup, EventResult } from "../../../../types/src/conformanceCheckingTypes";

const useSelectedGroupState = () => {
    const [SelectedGroup, setSelectedGroup] = useState<AlignmentGroup | null>();

    useEffect(() => {
        window.electron.listenToAlignmentGroupActivation( (result: EventResult) => {
            setSelectedGroup(result.group);
          });

          return function cleanup() {
            window.electron.clearAlignmentGroupActivation();
          };
          
    }, [SelectedGroup])

    return {SelectedGroup};
}

export default useSelectedGroupState;