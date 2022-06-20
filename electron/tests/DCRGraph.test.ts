import { convertDCRGraphToUIDCRGraph } from "../src/Models/DCRGraph";
import {UiDCRGraph } from "../../types/src/types";
import { Event, DCRGraph} from "../../types/src/miningTypes"

jest.mock("electron", () => ({
    getPath: jest.fn( (path, content, callback) => callback() ),
  }));

describe('getAlgorithms', () => {
    test('convert DCRGraph with string events', async () => {

        let graph : DCRGraph = {
            events: new Set<Event>(['1', '2', '3', '4']),
            conditionsFor: {},
            excludesTo: {},
            includesTo: {},
            milestonesFor: {},
            responseTo: {},
            marking: {
                executed: new Set<string>(),
                included: new Set<string>(['1', '2', '3', '4']),
                pending: new Set<string>(),
            },
            log: "",
            type: "DCRGraph"
        }
        graph.conditionsFor['1'] = new Set<Event>(['2']);
        graph.includesTo['2'] = new Set<Event>(['3']);
        let logName = "";
        let result : UiDCRGraph = convertDCRGraphToUIDCRGraph(graph, logName);
        
        expect(result.events.length).toBe(4);
        expect(result.relations.length).toBe(2);
    })
})