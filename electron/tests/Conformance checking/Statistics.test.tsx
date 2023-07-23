import { AlignmentGroup, Result } from "types/src/conformanceCheckingTypes";
import { ResultStatistics } from "../../src/ConformanceChecking/Statistics";
import { Alignment } from "types/build/DCR-Alignment/types";

describe('ResultStatistics', () => {
    test('should compute result statistics correctly', () => {
        const mockAlignment1 : Alignment = {
            cost: 10,
            trace: [
              ['event1', 'consume'],
              ['event2', 'model-skip'],
              ['event3', 'trace-skip'],
            ],
            keys: ['event1', 'event2', 'event3'],
          };
      
          const mockAlignment2 : Alignment = {
            cost: 5,
            trace: [
              ['event4', 'consume'],
              ['event5', 'model-skip'],
            ],
            keys: ['event4', 'event5'],
          };
      
          const mockAlignmentGroup : AlignmentGroup = {
            GroupAlignemnts: [mockAlignment1, mockAlignment2],
            Alignment: [
              ['event1', 'consume'],
              ['event2', 'model-skip'],
              ['event3', 'trace-skip'],
            ],
            GroupStatistics: {},
            color: 'red',
            id: 'group1',
            otherGroupsIDInResult: ['group2', 'group3'],
            cost: 10,
          };

        const mockResult : Result = {
            name: 'Mock Result',
            logName: 'Mock Log',
            modelName: 'Mock Model',
            logPath: '/path/to/mock/log',
            modelPath: '/path/to/mock/model',
            statistics: {}, 
            alignmentgroups: [mockAlignmentGroup], 
        };

        const result = ResultStatistics(mockResult, 0);

        // Assuming the computeScoreForGroup function returns 0.5 for all groups, and the average cost is 10 (as provided in mockAlignmentGroup).
        expect(result).toEqual({
        averageScore: '0.50',
        medianScore: '0.50',
        maxScore: '0.50',
        minScore: '0.50',
        scoreKeys: ['1', '2'],
        scoreValues: [0.5, 0.5],
        averageCost: '10.00',
        fitness: 0,
        });
    });
});
  
  