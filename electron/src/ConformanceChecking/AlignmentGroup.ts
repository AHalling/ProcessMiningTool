import { AlignmentTrace } from "types/build/DCR-Alignment/types";
import { AlignmentGroup, LogAlignments } from "types/src/conformanceCheckingTypes";
import {computeGroupStatistics} from "./GroupStatistics"
import { Guid } from "guid-typescript";
import { Alignment } from "../../../DCR-Alignment/types";

export const groupAlignment = (Lalignments: LogAlignments) : Array<AlignmentGroup> => {
    //[number: Array<Alignment>]
        var alignmentsGroupedByCost = Lalignments.alignments.reduce(function (r : {[key: number] : Array<Alignment>}, alignment) {
          r[alignment.cost] = r[alignment.cost] || [];
          r[alignment.cost].push(alignment);
          return r;
        }, Object.create(null));
    
        var res : Array<AlignmentGroup> = []
        Object.keys(alignmentsGroupedByCost).forEach(key => {
          var keyAsNumber: number = +key;
          if (keyAsNumber === 0){
            // Handle synchronious moves
            res = res.concat(handleCostGroup(alignmentsGroupedByCost[keyAsNumber], keyAsNumber));
          }
          var result = handleCostGroup(filterGroupMoves(alignmentsGroupedByCost[keyAsNumber]), keyAsNumber)
          res = res.concat(result);
      });
      return res;
    }
    
    const handleCostGroup = (filteredGroup : Array<Alignment>, cost: number) : Array<AlignmentGroup> => {
      if (filteredGroup.length === 0)
        return []
    
      if (filteredGroup.length == 1)
        return [createAlignmentGroup(filteredGroup[0], cost)]
    
        var alignmentGroups : Array<AlignmentGroup> = []
    
        filteredGroup.forEach(group => {
          var currgroup = groupContains(group.trace, alignmentGroups)
          if (currgroup !== null){
            currgroup.GroupAlignemnts.push(group);
          }else{
            alignmentGroups.push(createAlignmentGroup(group, cost))
          }
      });
      return alignmentGroups
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
    
    const createAlignmentGroup = (alignment: Alignment, cost: number) : AlignmentGroup => {
      return (
        {
          GroupAlignemnts: [alignment],
          Alignment: alignment.trace,
          GroupStatistics: computeGroupStatistics(alignment.trace),
          color:"",
          id: Guid.create().toString(),
          otherGroupsIDInResult: [],
          cost: cost
        }
      )
    }
    const filterGroupMoves = (group : Array<Alignment>) : Array<Alignment> => {
      let filteredGroup : Array<Alignment> = [];
      group.forEach(alignment => {
        alignment.trace = alignment.trace.filter(a => a[1] !== "consume")
        filteredGroup.push(alignment);
      });
    
      return filteredGroup.filter(t => t.trace.length > 0)
    }