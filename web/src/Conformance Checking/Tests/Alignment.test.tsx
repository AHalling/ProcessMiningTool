// Import necessary dependencies and components for testing
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlignmentBlock from '../Components/Alignment';
import { colors } from '../Constants';
import { Alignment } from '../../../../DCR-Alignment/types';

// Mock Alignment data for testing
const mockAlignment : Alignment = {
  cost: 10,
  trace: [
    ['event1', 'consume'],
    ['event2', 'model-skip'],
    ['event3', 'trace-skip'],
  ],
  keys: ['event1', 'event2', 'event3'],
};

// Mock function to pass as a prop
const mockSetState = jest.fn();

describe('AlignmentBlock Component', () => {
  test('renders alignment cost correctly', () => {
    render(<AlignmentBlock alignment={mockAlignment} setState={mockSetState} />);
    const costElement = screen.getByText(/Cost : 10/i);
    expect(costElement).toBeInTheDocument();
  });

  test('opens and closes modal when Trace keys button is clicked', () => {
    render(<AlignmentBlock alignment={mockAlignment} setState={mockSetState} />);

    const traceKeysButton = screen.getByText(/Trace keys/i);
    fireEvent.click(traceKeysButton);

    // Modal should be open after click
    const modalTitle = screen.getByText(/Trace ids/i);
    expect(modalTitle).toBeInTheDocument();

    // Close modal
    fireEvent.click(traceKeysButton);

    // Modal should be closed after click
    const modalTitleAfterClose = screen.queryByText(/Trace ids/i);
    expect(modalTitleAfterClose).not.toBeInTheDocument();
  });

  test('renders activity icons with correct colors', () => {
    render(<AlignmentBlock alignment={mockAlignment} setState={mockSetState} />);

    const activityIcons = screen.getAllByTestId('activity-icon');
    expect(activityIcons).toHaveLength(3);

    activityIcons.forEach((icon, index) => {
      const activityName = mockAlignment.trace[index][0];
      const backgroundColor = colors[mockAlignment.trace[index][1]];

      expect(icon).toHaveStyle(`background-color: ${backgroundColor}`);
      expect(icon).toHaveTextContent(activityName);
    });
  });

  test('renders null for skip activities', () => {
    const mockAlignmentWithSkip : Alignment = {
      ...mockAlignment,
      trace: [
        ...mockAlignment.trace,
        ['event4', 'skip'],
      ],
    };

    render(<AlignmentBlock alignment={mockAlignmentWithSkip} setState={mockSetState} />);

    const activityIcons = screen.getAllByTestId('activity-icon');
    expect(activityIcons).toHaveLength(3);
  });
});
