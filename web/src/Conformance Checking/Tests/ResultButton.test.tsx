import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultButton from '../Components/ResultButton';
import { Result, Results } from 'types/build/conformanceCheckingTypes';
import { State } from 'types/src/types';

// Mock electron object with setResult function
window.electron = {
  setResult: jest.fn(),
};

// Mock data for testing
const mockResult : Result = {
  name: 'Mock Result',
  logName: 'Mock Log',
  modelName: 'Mock Model',
  logPath: '/path/to/mock/log',
  modelPath: '/path/to/mock/model',
  statistics: {},
  alignmentgroups: [],
};

const mockResults : Results = {
    results: [mockResult, mockResult]
}

const mockState : State = {log: null, pages: "ConformanceCheckingPage", result: mockResult, workspacePath: ""};

const mockSetState = jest.fn();

describe('ResultButton Component', () => {
  test('renders the result name correctly', () => {
    render(
      <ResultButton result={mockResult} results={mockResults} state={mockState} setState={mockSetState} />
    );
    const resultNameElement = screen.getByText(/Mock Result/i);
    expect(resultNameElement).toBeInTheDocument();
  });

  test('calls the handleClick function when the button is clicked', () => {
    render(
      <ResultButton result={mockResult} results={mockResults} state={mockState} setState={mockSetState} />
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    // Expect the handleClick function to be called with the correct props
    expect(window.electron.setResult).toHaveBeenCalledWith({ result: mockResult });
  });
});
