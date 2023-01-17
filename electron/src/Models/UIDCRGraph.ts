import { UiDCRGraph, UiEvent, Relation } from "../../../types/src/types";
import { DCRGraph, EventMap, Event, Marking } from "types/src/miningTypes";

export const convertUIDCRGraphToDCRGraph = (model: UiDCRGraph, logName: string) : DCRGraph => {
    var Markings : Marking = {
        pending: new Set<Event>(),
        included: new Set<Event>(),
        executed: new Set<Event>(),
    }

    var conditions : EventMap ={}
    var exclutions : EventMap = {}
    var inclutions : EventMap = {}
    var responses : EventMap = {}
    var milestones : EventMap = {}



    const GetEvents = (events: UiEvent[]) : Set<Event> => {
        var result = new Set<Event>();
    
        events.forEach(event => {
            result.add(event.id)

            if(event.is_pending){
                Markings.pending.add(event.id)
            }

            if(!event.is_excluded){
                Markings.included.add(event.id)
            }

            if(event.is_executed){
                Markings.executed.add(event.id)
            }


        });
    
        return result
    }

    const handleRelations = (relations : Array<Relation>, events : Set<Event>) : void => {
        events.forEach(element => {
            conditions[element] = new Set<string>()
            exclutions[element] = new Set<string>()
            inclutions[element] = new Set<string>()
            milestones[element] = new Set<string>()
            responses[element] = new Set<string>()
        });
        relations.forEach(relation => {
            if(relation.type === "conditionsFor")
                conditions[relation.start_event_id].add(relation.end_event_id)

            if(relation.type === "excludesTo")
                exclutions[relation.start_event_id].add(relation.end_event_id)

            if(relation.type === "includesTo")
                inclutions[relation.start_event_id].add(relation.end_event_id)

            if(relation.type === "milestonesFor")
                milestones[relation.start_event_id].add(relation.end_event_id)

            if(relation.type === "responseTo")
                responses[relation.start_event_id].add(relation.end_event_id)
        });
    }
    var events = GetEvents(model.events)
    handleRelations(model.relations, events);
    
    var graph : DCRGraph = {
        log: logName,
        type: "DCRGraph",
        events: events,
        marking: Markings,
        conditionsFor: conditions,
        excludesTo: exclutions,
        includesTo: inclutions,
        milestonesFor: milestones,
        responseTo: responses,
    }

    return graph
}

