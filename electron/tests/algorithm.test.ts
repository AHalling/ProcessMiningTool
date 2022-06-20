import { AlgorithmCollection } from "types/src/miningTypes";
import {readAlgorithms} from "../src/algorithms";

jest.mock("electron", () => ({
    getPath: jest.fn( (path, content, callback) => callback() ),
  }));

describe('getAlgorithms', () => {
    test('Read default algorithm.', async () => {
        let result : AlgorithmCollection = readAlgorithms("");
        
        expect(result.length).toBe(1);
    }),
    test('Read no algorithms', async () => {
        let result : AlgorithmCollection = readAlgorithms("" + "/algorithmNotThere")

        expect(result.length).toBe(0);
    })
})