import {groupAlignment} from '../../src/ConformanceChecking/AlignmentGroup'; 
import {LogAlignments } from 'types/src/conformanceCheckingTypes';
  
  jest.mock('../../src/ConformanceChecking/GroupStatistics', () => ({
    groupAlignments: jest.fn(),
  }));
  
  describe('groupAlignment', () => {
    test('should group alignments and compute group statistics', () => {
      // Arrange
       const mockLogAlignments: LogAlignments = {
            alignments: [
              {
                trace: [
                  ['event1', 'consume'],
                  ['event2', 'model-skip'],
                  ['event3', 'trace-skip'],
                ],
                cost: 10,
                keys: ['event1', 'event2', 'event3'],
              },
              {
                trace: [
                  ['event4', 'consume'],
                  ['event5', 'model-skip'],
                ],
                cost: 5,
                keys: ['event4', 'event5'],
              },
            ],
          };
  
      // Act
      const result = groupAlignment(mockLogAlignments);
  
      // Assert
      expect(result).toHaveLength(2); // Assuming two alignments were grouped.
    });
  });

  