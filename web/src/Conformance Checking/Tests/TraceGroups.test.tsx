import React from 'react';
import { render, screen } from '@testing-library/react';
import TraceGroups from '../Components/TraceGroups';
import { AlignmentGroup } from 'types/build/conformanceCheckingTypes';
import { Alignment } from '../../../../DCR-Alignment/types';

// Mock the AlignmentBlock component
jest.mock('./Alignment', () => {
  return jest.fn((props) => <div>{props.alignment.cost}</div>);
});

// Mock data for testing
const mockAlignment1 : Alignment = {
  cost: 10,
  trace: [['event1', 'consume'], ['event2', 'model-skip'], ['event3', 'trace-skip']],
  keys: ['event1', 'event2', 'event3'],
};

const mockAlignment2 : Alignment = {
  cost: 5,
  trace: [['event4', 'consume'], ['event5', 'model-skip']],
  keys: ['event4', 'event5'],
};

const mockGroup : AlignmentGroup = {
  GroupAlignemnts: [mockAlignment1, mockAlignment2],
  Alignment: [['event1', 'consume'], ['event2', 'model-skip'], ['event3', 'trace-skip']],
  GroupStatistics: {},
  color: 'red',
  id: 'group1',
  otherGroupsIDInResult: ['group2', 'group3'],
  cost: 10,
};

const mockState = () => {}

describe('TraceGroups Component', () => {
  test('renders a list of AlignmentBlocks for the given group', () => {
    render(<TraceGroups group={mockGroup} setState={mockState} />);

    // Check if both mock alignments are rendered as AlignmentBlocks
    const alignmentCostElement1 = screen.getByText(/10/i);
    const alignmentCostElement2 = screen.getByText(/5/i);

    expect(alignmentCostElement1).toBeInTheDocument();
    expect(alignmentCostElement2).toBeInTheDocument();
  });

  test('renders "No Tracegroups" message when group is undefined', () => {
    render(<TraceGroups group={undefined} setState={mockState} />);

    const noTracegroupsElement = screen.getByText(/No Tracegroups for current content/i);
    expect(noTracegroupsElement).toBeInTheDocument();
  });

  test('renders "No Tracegroups" message when group is null', () => {
    render(<TraceGroups group={null} setState={mockState} />);

    const noTracegroupsElement = screen.getByText(/No Tracegroups for current content/i);
    expect(noTracegroupsElement).toBeInTheDocument();
  });
});
