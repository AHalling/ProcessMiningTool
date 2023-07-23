import { Alignment } from "types/build/DCR-Alignment/types";
import { AlignmentGroup } from "types/src/conformanceCheckingTypes";
import { computeGroupStatistics } from "../../src/ConformanceChecking/GroupStatistics";
  
describe('computeGroupStatistics', () => {
    test('should compute group statistics correctly', () => {
      // Arrange
      const mockAlignment1: Alignment = {
        cost: 10,
        trace: [
          ['event1', 'consume'],
          ['event2', 'model-skip'],
          ['event3', 'trace-skip'],
        ],
        keys: ['event1', 'event2', 'event3'],
      };
  
      const mockAlignment2: Alignment = {
        cost: 5,
        trace: [
          ['event4', 'consume'],
          ['event5', 'model-skip'],
        ],
        keys: ['event4', 'event5'],
      };
  
      const mockAlignmentGroup: AlignmentGroup = {
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
  
      // Act
      const result = computeGroupStatistics(mockAlignmentGroup);
  
  
      // Assuming the computeSkips function returns [1, 2, 3, 'topLogEvent', 'topModelEvent', {}, {}]
      expect(result).toEqual({
        LogSkips: 1,
        ModelSkips: 2,
        Alignments: 3,
        TopLogSkip: 'topLogEvent',
        TopModelSkip: 'topModelEvent',
        totalModelSkipsKeys: [],
        totalLogSkipsKeys: [],
        totalModelSkipsValues: [],
        totalLogSkipsValues: [],
      });
    });
});
  
  