import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultList from '../Components/ResultList';
import { State } from 'types';
import { Result } from 'types/build/conformanceCheckingTypes';

// Mock the ResultButton component
jest.mock('./ResultButton', () => {
  return jest.fn((props) => <div>{props.result?.name}</div>);
});

// Mock data for testing
const mockResult1 : Result = {
  name: 'Mock Result 1',
  logName: 'Mock Log 1',
  modelName: 'Mock Model 1',
  logPath: '/path/to/mock/log1',
  modelPath: '/path/to/mock/model1',
  statistics: {},
  alignmentgroups: [],
};

const mockResult2 : Result = {
  name: 'Mock Result 2',
  logName: 'Mock Log 2',
  modelName: 'Mock Model 2',
  logPath: '/path/to/mock/log2',
  modelPath: '/path/to/mock/model2',
  statistics: {},
  alignmentgroups: [],
};

const mockResults = {
  results: [mockResult1, mockResult2],
};

const mockState : State = {log: null, pages: "ConformanceCheckingPage", result: mockResult1, workspacePath: ""};

const mockSetState = jest.fn();

describe('ResultList Component', () => {
  test('renders a list of ResultButtons', () => {
    render(<ResultList Results={mockResults} state={mockState} setState={mockSetState} />);

    // Check if both mock results are rendered as ResultButtons
    const resultNameElement1 = screen.getByText(/Mock Result 1/i);
    const resultNameElement2 = screen.getByText(/Mock Result 2/i);

    expect(resultNameElement1).toBeInTheDocument();
    expect(resultNameElement2).toBeInTheDocument();
  });
});
