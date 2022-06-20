/**
 *   Created by: Axel Christfort <axel@christfort.dk>
 *   Can be found at: https://github.com/Axel0087/DisCoveR-TS
 */

import {
    EventLog,
    Trace,
    Event,
  } from "types/src/miningTypes";

import fs from "fs";  
import parser from "fast-xml-parser";
  
  const parserOptions = {
    attributeNamePrefix: "",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    parseTrueNumberOnly: false,
    arrayMode: true, //"strict"
    stopNodes: ["parse-me-as-string"],
  };

  export const getContentsOfLog = (filepath: string) : EventLog | undefined => {
    let fileExtension = filepath.split(".")[1];
    switch (fileExtension){
      case("xes"):
        return parseLog(filepath)
      default:
        return undefined;
    }
  }
  
  
  // Parse .xes file to an EventLog
  export const parseLog = (filepath: string): EventLog => {
    if (!filepath.endsWith(".xes")) {
      throw new Error("Invalid file extension");
    }
    const data = fs.readFileSync(filepath);
    const logJson = parser.parse(data.toString(), parserOptions);
    const log: EventLog = {
      events: new Set<Event>(),
      traces: {},
    };
  
    for (const i in logJson.log[0].trace) {
      const trace: Trace = {
        trace: [],
        traceTimeStamps: [],
      }
      let traceId: string = "";
      const xmlTrace = logJson.log[0].trace[i];
      for (const elem of xmlTrace.string) {
        if (elem.attr.key === "concept:name") {
          traceId = elem.attr.value;
        }
      }
      if (traceId === "") {
        throw new Error("No trace id found!");
      }
      const events = xmlTrace.event ? xmlTrace.event : [];
      for (const elem of events) {
        for (const event of elem.string) {
          if (event.attr.key === "concept:name") {
            trace.trace.push(event.attr.value);
            log.events.add(event.attr.value);
          }
        }
        if (elem.date){
          for (const timeEvent of elem.date) {
            if (timeEvent.attr.key === "time:timestamp") {
              trace.traceTimeStamps.push(timeEvent.attr.value)
            }
          }
        }

      }
      log.traces[traceId] = trace;
    }
    return log;
  };