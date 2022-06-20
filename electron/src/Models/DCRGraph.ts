import { DCRGraph, Marking } from "../../../types/src/miningTypes";
import { UiDCRGraph, UiEvent, Relation, isRelationType } from "../../../types/src/types";
import {SPACE_BETWEEN_MINED_EVENTS_X, SPACE_BETWEEN_MINED_EVENTS_Y, SPACE_BETWEEN_MINED_EVENTS_X_START,
     SPACE_BETWEEN_MINED_EVENTS_Y_START, MINED_EVENT_HEIGHT, MINED_EVENT_WIDTH} from "./../constants";

export const convertDCRGraphToUIDCRGraph = (model: DCRGraph, logName: string) : UiDCRGraph => {
    let events : Array<UiEvent> = [];
    let relations : Array<Relation> = []
    let currId = 1;
    let currX = SPACE_BETWEEN_MINED_EVENTS_X_START;
    let currY = SPACE_BETWEEN_MINED_EVENTS_Y_START;

    // Set<string | number> is due to some logs use number as event names. 
    const getDCRGraphEvents = (events: Set<string | number>, markings: Marking) : Array<UiEvent> => {
        let UIEvents : Array<UiEvent> = []

        events.forEach(e => {
            let name = typeof e === "number" ? e.toString() : e.trim();
            
            let executed = checkMarking(markings.executed, name);
            let excluded = checkMarking(markings.included, name);
            UIEvents.push(
                {
                    id: currId.toString(),
                    name: name,
                    description: "",
                    show_in_graph: true,
                    position: {
                        x: currX,
                        y: currY,
                    },
                    size: {
                        height: MINED_EVENT_HEIGHT,
                        width: MINED_EVENT_WIDTH,
                    },
                    is_enabled: !executed && !excluded, 
                    is_executed: executed,
                    is_excluded: excluded, 
                    is_pending: checkMarking(markings.pending, name), 
                    isDragging: false,
                    relationStart:[],
                    relationEnd: [],
                }
            )
            currId += 1;
            currX += SPACE_BETWEEN_MINED_EVENTS_X
            currY += SPACE_BETWEEN_MINED_EVENTS_Y
        });


        return UIEvents;
    }

    const getDCRGraphRelations = (events : Array<UiEvent>, model: DCRGraph) : Array<Relation> => {
        let relations : Array<Relation> = [];
        events.forEach(e => {
            let conditionsFors = model.conditionsFor[e.name];
            relations = relations.concat(handleRelationType("conditionsFor", e, conditionsFors));

            let exCludesTos = model.excludesTo[e.name];
            relations = relations.concat(handleRelationType("excludesTo", e, exCludesTos));

            let includesTos = model.includesTo[e.name];
            relations = relations.concat(handleRelationType("includesTo", e, includesTos));

            let responseTos = model.responseTo[e.name];
            relations = relations.concat(handleRelationType("responseTo", e, responseTos));

            let milestonesFors = model.milestonesFor[e.name];
            relations = relations.concat(handleRelationType("milestonesFor", e, milestonesFors));
        });

        return relations;
    }

    const handleRelationType = (relationType: string, startEvent: UiEvent, toBeRelations: Set<string>) : Array<Relation> => {
        let newRelations : Array<Relation> = [];
            if (toBeRelations){
                toBeRelations.forEach(r => {
                    let endEvent = events.find(e => e.name === r);
                    if (endEvent) {
                        let relation : Relation = {
                            id: currId.toString(),
                            start_event_id: startEvent.id,
                            start_position: {
                                x: startEvent.position.x + MINED_EVENT_WIDTH,
                                y: startEvent.position.y 
                            },
                            start_angle: 90, // angle in degrees
                            end_event_id: endEvent.id,
                            end_position: endEvent.position,
                            end_angle: 90, // angle in degrees
                            type: isRelationType(relationType) ? relationType : "conditionsFor",
                        }
                    startEvent.relationStart.push(relation.id)
                    endEvent.relationEnd.push(relation.id);
                    newRelations.push(relation);
                    currId += 1
                };
            })
        }
        return newRelations;
    }

    events = getDCRGraphEvents(model.events, model.marking)

    relations = getDCRGraphRelations(events, model)

    let graph : UiDCRGraph = {
        events: events,
        relations: relations,
        dimensions: {
            height: 500,
            width: 500,
        },
        id: currId.toString() + 1,
        type: "DCRGraph",
        log: logName,
    }

    return graph
}

const checkMarking = (marking: Set<string | number>, target: string) : boolean => {
    marking.forEach(m => {
        let value = typeof m === "number" ? m.toString() : m
        if (value.includes(target)){
            return true;
        }
    });
    return false
}