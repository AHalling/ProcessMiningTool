/**
 *   Created by: Axel Christfort <axel@christfort.dk>
 *   Modified by: Andreas Nienstædt Halling Larsen
 *   Can be found at: https://github.com/Axel0087/DisCoveR-TS
 */


// -----------------------------------------------------------
// -------------------- Extended Set Type --------------------
// -----------------------------------------------------------

declare global {
  interface Set<T> {
    union(b: Set<T>): Set<T>;
    intersect(b: Set<T>): Set<T>;
    difference(b: Set<T>): Set<T>;
    [Key: string] : string,
  }
}

// -----------------------------------------------------------
// --------------------- DCR Graph Types ---------------------
// -----------------------------------------------------------

export type Event = string;

export interface Marking {
  executed: Set<Event>;
  included: Set<Event>;
  pending: Set<Event>;
}

// Map from event to a set of events
// Used to denote different relations between events
export interface EventMap {
  [startEventId: string]: Set<Event>;
}

export interface Model {
  type: keyof typeof __ModelType
  log: string | null,
}

export const isModel = (obj: any): obj is Model => {
  if (obj === undefined) return false
  return obj in __ModelType !== undefined
}

const __ModelType = {
  DCRGraph: "dcr-graph",
  UIDCRGraph: "ui-dcr-graph",
  DCRGraphPP: "dcr-graph-pp",
}

export const isDCRGraph = (obj: any) : obj is DCRGraph => {
  return (
    isEventSet(obj.events) &&
    isEventMap(obj.conditionsFor) &&
    isEventMap(obj.milestonesFor) &&
    isEventMap(obj.responseTo) &&
    isEventMap(obj.includesTo) &&
    isEventMap(obj.excludesTo) &&
    isMarking(obj.marking)
  )
}

export const isEventSet = (set: any): set is Set<Event> => {
  if(set.constructor === Set){
    let it = set.values();
    let firstValue = it.next().value;
    let firstValueAsString = firstValue !== undefined ? firstValue.toString() : firstValue
    return (!firstValueAsString || isEvent(firstValueAsString))
  }

  return false;
}

export const isEventMap = (map: any): map is EventMap => {
  if(map.constructor === Object){
    let keys = Object.keys(map);

    return keys.length >= 1 ? typeof keys[0] === ("string" || "number") && isEventSet(map[keys[0]]) :  true;
  }
  return false;
}

export const isMarking = (markings: any): markings is Marking => {
  return (
    isEventSet(markings.executed) &&
    isEventSet(markings.included) &&
    isEventSet(markings.pending)
  );
}

const isEvent = (event: any): event is Event => {
  return (typeof event == "string");
}

export interface DCRGraph extends Model {
  events: Set<Event>;
  conditionsFor: EventMap;
  milestonesFor: EventMap;
  responseTo: EventMap;
  includesTo: EventMap;
  excludesTo: EventMap;
  marking: Marking;
}

// -----------------------------------------------------------
// ------------------------ Log Types ------------------------
// -----------------------------------------------------------

export type Trace ={
  trace: Array<Event>,
  traceTimeStamps: Array<string>,
}

export interface EventLog {
  events: Set<Event>;
  traces: {
    [traceId: string]: Trace;
  };
}

export interface ClassifiedLog {
  [traceId: string]: {
    isPositive: boolean;
    trace: Trace;
  };
}

export interface ClassifiedTraces {
  [traceId: string]: boolean;
}

export interface XMLEvent {
  string: {
    "@key": "concept:name";
    "@value": string;
  };
}

export interface XMLTrace {
  string: {
    "@key": "concept:name";
    "@value": string;
  };
  boolean: {
    "@key": "pdc:isPos";
    "@value": boolean;
  };
  event: Array<XMLEvent>;
}

export interface XMLLog {
  log: {
    "@xes.version": "1.0";
    "@xes.features": "nested-attributes";
    "@openxes.version": "1.0RC7";
    global: {
      "@scope": "event";
      string: {
        "@key": "concept:name";
        "@value": "__INVALID__";
      };
    };
    classifier: {
      "@name": "Event Name";
      "@keys": "concept:name";
    };
    trace: Array<XMLTrace>;
  };
}


export type AlgorithmCollection = Array<ImportedAlgorithm>

export interface ImportedAlgorithm  {
  name: string,
  path: string
}