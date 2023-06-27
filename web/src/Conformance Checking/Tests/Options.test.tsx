import { render, fireEvent } from "@testing-library/react";
import OptionsContent from "../Components/Options";

describe("OptionsContent", () => {
  it("should update options when input values change", () => {
    const { getByLabelText } = render(<OptionsContent />);

    const consumeCostInput = getByLabelText("Consume Cost:") as HTMLInputElement;
    const modelSkipCostInput = getByLabelText("Model Skip Cost:")as HTMLInputElement;
    const logSkipCostInput = getByLabelText("Log Skip Cost:")as HTMLInputElement;

    fireEvent.change(consumeCostInput, { target: { value: "10" } });
    fireEvent.change(modelSkipCostInput, { target: { value: "5" } });
    fireEvent.change(logSkipCostInput, { target: { value: "2" } });

    expect(consumeCostInput.value).toBe("10");
    expect(modelSkipCostInput.value).toBe("5");
    expect(logSkipCostInput.value).toBe("2");
  });

  it("should reset options to default values when reset button is clicked", () => {
    const { getByLabelText, getByDisplayValue} = render(<OptionsContent />);

    const consumeCostInput = getByLabelText("Consume Cost:")as HTMLInputElement;
    const modelSkipCostInput = getByLabelText("Model Skip Cost:")as HTMLInputElement;
    const logSkipCostInput = getByLabelText("Log Skip Cost:")as HTMLInputElement;
    const resetButton = getByDisplayValue("Reset");

    fireEvent.change(consumeCostInput, { target: { value: "10" } });
    fireEvent.change(modelSkipCostInput, { target: { value: "5" } });
    fireEvent.change(logSkipCostInput, { target: { value: "2" } });

    fireEvent.click(resetButton);

    expect(consumeCostInput.value).toBe("0"); // Assuming defaultConsumeCost is 1
    expect(modelSkipCostInput.value).toBe("1"); // Assuming defaultModelSkipCost is 1
    expect(logSkipCostInput.value).toBe("1"); // Assuming defaultLogSkipCost is 1
  });

  it("should submit options when submit button is clicked", () => {
    const mockSubmitOptions = jest.fn();
    window.electron = {
      sumbitOptions: mockSubmitOptions,
    };

    const { getByDisplayValue } = render(<OptionsContent />);
    const submitButton = getByDisplayValue("Submit");

    fireEvent.click(submitButton);

    expect(mockSubmitOptions).toHaveBeenCalled();
  });
});