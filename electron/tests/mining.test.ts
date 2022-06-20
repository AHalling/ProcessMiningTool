import { mineLog } from "../src/mining";
import {UiDCRGraph } from "../../types/src/types";
import { isModel} from "../../types/src/miningTypes"
import { dialog, BrowserWindow } from "electron";

import {APP_PUBLIC_DEFAULT_ALGORITHM, PUBLIC_TEST_LOG} from "../src/constants";


describe('Mining', () => {
    test('mine test log', async () => {
        let modelName = "someName"
        let window = new BrowserWindow();

        const dialogSpy = jest.spyOn(dialog, 'showMessageBoxSync')
        dialogSpy.mockReturnValue(0);

        let result : UiDCRGraph = mineLog(window, APP_PUBLIC_DEFAULT_ALGORITHM, PUBLIC_TEST_LOG, modelName);
        let isModelResult = isModel(result)

        expect(result.events.length).toBe(4)
        expect(result.events.length).toBe(6)
        expect(isModelResult).toBe(true);
    })
})