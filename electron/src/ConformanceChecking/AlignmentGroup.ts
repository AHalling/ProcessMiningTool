import { AlignmentTrace } from "types/build/DCR-Alignment/types";
import { AlignmentGroup, LogAlignments } from "types/src/conformanceCheckingTypes";
import {computeGroupStatistics} from "./GroupStatistics"
import { Guid } from "guid-typescript";
import { Alignment } from "../../../DCR-Alignment/types";

export const groupAlignment = (Lalignments: LogAlignments) : Array<AlignmentGroup> => {
        var res : Array<AlignmentGroup> = []
        Lalignments.alignments.forEach(alignment => {

            var test = groupAlignments(alignment, alignment.cost, res)

            if (test !== null)
                res.push(test);
      });
      return res;
    }
    
    const groupAlignments = (alignment : Alignment, cost: number, currGroups: Array<AlignmentGroup>) : AlignmentGroup | null => {
        var filteredAlignment = filterGroupMoves(alignment);

        if (filteredAlignment.trace.length === 0){
          return createAlignmentGroup(filteredAlignment, alignment.trace, cost);
        }

        var group = groupContains(filteredAlignment.trace, currGroups)
        if (group !== null){
            group.GroupAlignemnts.push(alignment);
        }else{
            return createAlignmentGroup(filteredAlignment, alignment.trace, cost);
        }
      return null
    }
    
    const groupContains = (trace : AlignmentTrace, currGroups : Array<AlignmentGroup>) : AlignmentGroup |null => {
      var res : AlignmentGroup | null = null;
    
      currGroups.forEach(group => {
        if (group.Alignment.length === trace.length){
            for (let i = 0; i < trace.length; i++) {
              if ((group.Alignment[i][0] !== trace[i][0]) || (group.Alignment[i][1] !== trace[i][1])){
                res = null
                return
              }
            }
            res = group
        }
      });
    
      return res;
    }
    
    const createAlignmentGroup = (alignment: Alignment, originalAlignmentTrace: AlignmentTrace, cost: number) : AlignmentGroup => {
        var temp : Alignment = {
            trace: originalAlignmentTrace,
            cost: alignment.cost,
            keys: alignment.keys
        }

      return (
        {
          GroupAlignemnts: [temp],
          Alignment: (alignment.trace.length > 0) ? alignment.trace : [...originalAlignmentTrace],
          GroupStatistics: computeGroupStatistics(alignment.trace),
          color:"",
          id: Guid.create().toString(),
          otherGroupsIDInResult: [],
          cost: cost
        }
      )
    }
    const filterGroupMoves = (group : Alignment) : Alignment => {
        return (
            {
                trace: group.trace.filter(a => a[1] !== "consume").filter(t => t.length > 0),
                cost: group.cost,
                keys: group.keys

            }
        );
    }