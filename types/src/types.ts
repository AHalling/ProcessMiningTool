// ----------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- TYPE GUARDS --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

import { Model } from "./miningTypes"
import { ILog } from "./LogTypes"

export const isStringArray = (obj: any): obj is Array<string> => {
    return obj.constructor === Array && (!obj[0] || typeof obj[0] === "string")
}

export const isCoords = (obj: any): obj is Coords => {
    return typeof obj.x === "number" && typeof obj.y === "number"
}

export const isDimensions = (obj: any): obj is Dimensions => {
    return typeof obj.height === "number" && typeof obj.width === "number"
}

export const isRelationType = (obj: any): obj is RelationType => {
    const relationSet = new Set(["conditionsFor", "milestonesFor", "responseTo", "includesTo", "excludesTo"]);
    return typeof obj === "string" && relationSet.has(obj);
}

export const isEvent = (obj: any): obj is Event => {
    return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.show_in_graph === "boolean" &&
        isCoords(obj.position) &&
        isDimensions(obj.size) &&
        typeof obj.is_enabled === "boolean" &&
        typeof obj.is_excluded === "boolean" &&
        typeof obj.is_executed === "boolean" &&
        typeof obj.is_pending === "boolean" &&
        typeof obj.isDragging === "boolean" &&
        isStringArray(obj.relationStart) &&
        isStringArray(obj.relationEnd)
    )
}

export const isRelation = (obj: any): obj is Relation => {
    return (
        typeof obj.id === "string" &&
        typeof obj.start_event_id === "string" &&
        isCoords(obj.start_position) &&
        typeof obj.end_event_id === "string" &&
        isCoords(obj.end_position) &&
        isRelationType(obj.type)
    )
}

export const isRelationArray = (obj: any): obj is Array<Relation> => {
    return obj.constructor === Array && (!obj[0] || isRelation(obj[0]))
}

export const isEventArray = (obj: any): obj is Array<Event> => {
    return obj.constructor === Array && (!obj[0] || isEvent(obj[0]))
}

export const isUiDCRGraph = (obj: any): obj is UiDCRGraph => {
    return (
        typeof obj.id === "string" &&
        isRelationArray(obj.relations) &&
        isEventArray(obj.events)
    )
}

// Looks weird, for reasoning see comment at '__StateHelper'
export const isState = (obj: any): obj is State => {
    return obj.pages in __StateHelper;
}

export function isPrimitive(obj: unknown): obj is number | string | boolean | null | undefined | bigint | symbol {
    return obj !== Object(obj);
}

export function isIterable(obj: any): obj is Iterable<unknown> {
        // checks for null and undefined
        if (!obj) {
          return false;
        }
        return typeof obj?.[Symbol.iterator] === 'function';
}


// ----------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ CONTROL TYPES -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

// Dirty hack to make guard work. Other options were enums or composite types.
// Enums are weird, in that you get both objects and keys from either Object.keys or Object.values
//      this makes guards weird.
// Composite types can't be generically checked at runtime, making a non-hardcoded guard imposible.
const __StateHelper = {
    LandingPage: "landing-page",
    Canvas: "canvas",
    LogPage: "log-page",
    ModelPage: "model-page",
    Designer: "designer",
}
export type State = {
    pages: keyof typeof __StateHelper,
    log: ILog | null,
    workspacePath: string,
}

// ----------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ UTILITY TYPES -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

export interface Coords {
    x: number;
    y: number;
}

export interface Dimensions {
    height: number;
    width: number;
}

export interface Identifiable {
    readonly id: string;
}

// ----------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- GRAPH TYPES --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

export interface UiEvent {
    readonly id: string;
    name: string;
    description: string;
    show_in_graph: boolean;
    position: Coords;
    size: Dimensions;
    is_enabled: boolean;
    is_executed: boolean;
    is_excluded: boolean;
    is_pending: boolean;
    isDragging: boolean;
    relationStart: string[];
    relationEnd: string[];
}

export type RelationType = "conditionsFor" | "milestonesFor" | "responseTo" | "includesTo" | "excludesTo";

export interface Relation {
    readonly id: string;
    start_event_id: string;
    start_position: Coords;
    start_angle: number; // angle in degrees
    end_event_id: string;
    end_position: Coords;
    end_angle: number; // angle in degrees
    type: RelationType;

}

export interface UiDCRGraph extends Model {
    readonly id: string;
    dimensions: Dimensions;
    events: Array<UiEvent>;
    relations: Array<Relation>;
}


