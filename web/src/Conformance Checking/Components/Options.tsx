import { useState } from "react";
import {defaultModelSkipCost, defaultLogSkipCost, defaultConsumeCost} from "../Constants";
import {Options} from "../../../../types/src/conformanceCheckingTypes"

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
        <div>
            <form>
                <label>
                Consume Cost:
                <input type="number" name="CC" value={options.ConsumeCost} onChange={event => handleChange(event.target.value, "CC")} />
                </label>
                <label>
                Model Skip Cost:
                <input type="number" name="MSC" value={options.ModelSkipCost} onChange={event => handleChange(event.target.value, "MSC")} />
                </label>
                <label>
                Log Skip Cost:
                <input type="number" name="LSC" value={options.LogSkipCost} onChange={event => handleChange(event.target.value, "LSC")} />
                </label>
            </form>
            <form onReset={(() => Reset())}>
                <input type="reset" value="Reset"/>
                <input type="button" value="Submit" onClick={(() => handleSubmit())}/>
            </form>
        </div>

    )

}

export default OptionsContent;