import { FileResult } from "types/src/fileTypes";
import { computeAlignment } from "../../src/ConformanceChecking/Alignment";
import { Options, Result, TraceGroup } from "types/src/conformanceCheckingTypes";
import { Alignment, AlignmentTrace, DCRGraphPP, Traces } from "types/build/DCR-Alignment/types";
import { EventLog, EventMap, Marking } from "types/src/miningTypes";
import { Trace } from "types/build/miningTypes";

  // Mock event set
  const mockEventSet: Set<string> = new Set<string>(['event1', 'event2', 'event3']);

  // Mock traces
  const mockTrace1: Trace = {
    trace: ['event1', 'event2', 'event3'],
    traceTimeStamps: ['2023-07-24T12:00:00', '2023-07-24T12:01:00', '2023-07-24T12:02:00'],
  };

  const mockTrace2: Trace = {
    trace: ['event4', 'event5', 'event6'],
    traceTimeStamps: ['2023-07-24T12:10:00', '2023-07-24T12:11:00', '2023-07-24T12:12:00'],
  };

  // Mock EventLog
  const mockEventLog: EventLog = {
    events: mockEventSet,
    traces: {
      trace1: mockTrace1,
      trace2: mockTrace2,
    },
  };

// Mock TraceGroup array
const mockTraceGroupArray: TraceGroup[] = [
  { keys: ['trace1'], Trace: mockTrace1.trace },
  { keys: ['trace2'], Trace: mockTrace2.trace },
];


// Mock event maps
const mockEventMap: EventMap = {
  event1:  new Set<string>(['event2', 'event3']),
  event2:  new Set<string>(['event3']),
  event3:  new Set<string>([]),
};

// Mock marking
const mockMarking: Marking = {
  executed: new Set<string>([]),
  included: new Set<string>(['event1', 'event2', 'event3']),
  pending: new Set<string>([])
};

// Mock DCRGraphPP
const mockDCRGraphPP: DCRGraphPP = {
  events: mockEventSet,
  conditionsFor: mockEventMap,
  milestonesFor: mockEventMap,
  responseTo: mockEventMap,
  includesTo: mockEventMap,
  excludesTo: mockEventMap,
  marking: mockMarking,
  conditions: mockEventSet,
};

const mockAlignmentTrace1: AlignmentTrace = [
  ['event1', 'consume'],
  ['event2', 'model-skip'],
  ['event3', 'trace-skip'],
];

// Mock Alignment
const mockAlignment1: Alignment = {
  cost: 10,
  trace: mockAlignmentTrace1,
  keys: ['event1', 'event2', 'event3'],
};
// Mock AlignmentTrace
const mockAlignmentTrace2: AlignmentTrace = [
  ['event4', 'consume'],
  ['event5', 'model-skip'],
];
const mockAlignment2: Alignment = {
  cost: 5,
  trace: mockAlignmentTrace2,
  keys: ['event4', 'event5'],
};



  describe('computeAlignment', () => {
    test('should compute alignment and return the result', async () => {
      // Arrange
      const parseLogMock = jest.fn((logAlignments : Array<Alignment>) => mockEventLog);
      const groupTracesMock = jest.fn(() => mockTraceGroupArray);
      const GetGraphFromModelMock = jest.fn(() => mockDCRGraphPP);
      const alignMock = jest.fn(() => mockAlignment1);
      const ResultStatisticsMock = jest.fn(() => {});

      // File result for log
      const mockLog : FileResult = {
        name: 'log.txt',
        path: '/path/to/log.txt',
        Type: "Log"
      };
      // FileResult for model
      const mockModel : FileResult = {
        name: 'model.json',
        path: '/path/to/model.json',
        Type: "Model"
      };

      // Options
      const mockOptions : Options = {
        ConsumeCost: 1,
        ModelSkipCost: 2,
        LogSkipCost: 3,
      };
  
      // Define the expected result
      const expectedResult : Result = {
        logName: 'log.txt',
        logPath: '/path/to/log.txt',
        modelName: 'model.json',
        modelPath: '/path/to/model.json',
        name: 'log|model',
        statistics: {},
        alignmentgroups: [],
      };
  
      // Act
      const result = await computeAlignment(mockLog, mockModel, mockOptions);
  
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
