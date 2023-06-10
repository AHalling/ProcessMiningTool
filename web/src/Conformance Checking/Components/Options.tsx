import { useState } from "react";
import {defaultModelSkipCost, defaultLogSkipCost, defaultConsumeCost} from "../Constants";
import {Options} from "../../../../types/src/conformanceCheckingTypes"
import {OptionsWrapper, OptionsForm, OptionsLabel, OptionsInput, OptionLine, InputButton } from "../Styling/OptionsStyling";

const OptionsContent = () => {
    const [options, setOptions] = useState<Options>({
        ConsumeCost: defaultConsumeCost,
        ModelSkipCost: defaultModelSkipCost,
        LogSkipCost: defaultLogSkipCost
    })

    const Reset = () : void => {
        setOptions({
            ConsumeCost: defaultConsumeCost,
            ModelSkipCost: defaultModelSkipCost,
            LogSkipCost: defaultLogSkipCost
        })
        window.electron.sumbitOptions(options);
    }

    const handleChange = (number : any, type : string) => {
        var value: number = + number;
        switch (type) {
            case "CC":
                setOptions({
                    ConsumeCost: value,
                    ModelSkipCost: options.ModelSkipCost,
                    LogSkipCost: options.LogSkipCost
                });
                break;
            case "MSC":
                setOptions({
                    ConsumeCost: options.ConsumeCost,
                    ModelSkipCost: value,
                    LogSkipCost: options.LogSkipCost
                });
                break;
            case "LSC":
                setOptions({
                    ConsumeCost: options.ConsumeCost,
                    ModelSkipCost: options.ModelSkipCost,
                    LogSkipCost: value
                });
                break;
            default:
                break;
        }
      }
    const handleSubmit = () => {
        window.electron.sumbitOptions(options);
    }

    return (
        <OptionsWrapper>
            <OptionsForm>
                <OptionLine>
                    <OptionsLabel>
                    Consume Cost:
                    </OptionsLabel>
                    <OptionsInput type="number" name="CC" value={options.ConsumeCost} onChange={event => handleChange(event.target.value, "CC")} />
                </OptionLine>
                <OptionLine>
                    <OptionsLabel>
                    Model Skip Cost:
                    </OptionsLabel>
                    <OptionsInput type="number" name="MSC" value={options.ModelSkipCost} onChange={event => handleChange(event.target.value, "MSC")} />
                </OptionLine>
                <OptionLine>
                    <OptionsLabel>
                    Log Skip Cost:
                    </OptionsLabel>
                    <OptionsInput type="number" name="LSC" value={options.LogSkipCost} onChange={event => handleChange(event.target.value, "LSC")} />
                </OptionLine>
            </OptionsForm>
            <form onReset={(() => Reset())}>
                <InputButton type="reset" value="Reset"/>
                <InputButton type="button" value="Submit" onClick={(() => handleSubmit())}/>
            </form>
        </OptionsWrapper>

    )

}

export default OptionsContent;