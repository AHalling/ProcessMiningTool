import { Trace, Traces } from "types/build/DCR-Alignment/types";
import { groupTraces } from "../../src/ConformanceChecking/TraceGroup";
import { TraceGroup } from "types/src/conformanceCheckingTypes";

describe('groupTraces', () => {
    test('should group traces correctly', () => {
      // Arrange
        // Mock trace data
        const mockTrace1: Trace = ['event1', 'event2', 'event3'];
        const mockTrace2: Trace = ['event4', 'event5', 'event6'];
        const mockTrace3: Trace = ['event7', 'event8', 'event9'];
        const mockTrace4: Trace = ['event1', 'event2', 'event3']; // Identical to mockTrace1
        const mockTrace5: Trace = ['event10', 'event11', 'event12'];

        // Mock Traces object
        const mockTraces: Traces = {
        trace1: mockTrace1,
        trace2: mockTrace2,
        trace3: mockTrace3,
        trace4: mockTrace4,
        trace5: mockTrace5,
        };
  
      // Act
      const result = groupTraces(mockTraces);
  
      // The expected result with grouped traces
      const expectedGroupedTraces: TraceGroup[] = [
        { keys: ['trace1', 'trace4'], Trace: mockTrace1 },
        { keys: ['trace2'], Trace: mockTrace2 },
        { keys: ['trace3'], Trace: mockTrace3 },
        { keys: ['trace5'], Trace: mockTrace5 },
      ];
  
      expect(result).toEqual(expectedGroupedTraces);
    });
  });