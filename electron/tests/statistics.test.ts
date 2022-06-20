import fs from "fs";
import { EventLog, Event, Trace } from "types/src/miningTypes";
import { Statistics } from "types/src/statisticsTypes";

const { calculateStatistics } = require("../src/statistics");


describe('getStatistics', () => {
  test('Returns right statistics when no temporal', async () => {
    let log : EventLog = {
      events: new Set<Event>(['1', '2', '3', '4']),
      traces: {
      }
    }
    let trace1 : Trace ={
      trace: ['2', '1', '3'],
      traceTimeStamps:[],
    } 
    let trace2 : Trace ={
      trace: ['1', '2', '3'],
      traceTimeStamps:[],
    } 
    log.traces[1] = trace1
    log.traces[2] = trace2

    let result : Statistics  = calculateStatistics(log)

    expect(result.ContentStatistics.NumberOfEvents).toBe(6);
    expect(result.ContentStatistics.NumberOfTraces).toBe(2);
    expect(result.ContentStatistics.NumberOfUniqueEvents).toBe(4);
    expect(result.ContentStatistics.NumberOfUniqueTraces).toBe(2);
    expect(result.TemporalStatistics.MaximumTraceDuration.minutes).toBe(0);
    expect(result.TemporalStatistics.MaximumTraceDuration.hours).toBe(0);
    expect(result.TemporalStatistics.MaximumTraceDuration.seconds).toBe(0);
  });
  test('Statistics with Temporal', async () => {
    let log : EventLog = {
      events: new Set<Event>(['1', '2', '3', '4']),
      traces: {
      }
    }
    let trace1 : Trace ={
      trace: ['2', '1', '3'],
      traceTimeStamps:['2011-06-18T07:33:29.000+02:00', '2011-06-18T07:33:30.000+02:00', '2011-06-18T07:33:31.000+02:00'],
    } 
    let trace2 : Trace ={
      trace: ['1', '2', '3'],
      traceTimeStamps:['2011-06-18T07:33:29.000+02:00', '2011-06-19T07:33:30.000+02:00', '2011-06-19T07:32:31.000+02:00'],
    } 
    log.traces[1] = trace1
    log.traces[2] = trace2

    let result : Statistics  = calculateStatistics(log)

    expect(result.ContentStatistics.NumberOfEvents).toBe(6);
    expect(result.ContentStatistics.NumberOfTraces).toBe(2);
    expect(result.ContentStatistics.NumberOfUniqueEvents).toBe(4);
    expect(result.ContentStatistics.NumberOfUniqueTraces).toBe(2);
    expect(result.TemporalStatistics.MaximumTraceDuration.days).toBe(0);
    expect(result.TemporalStatistics.MaximumTraceDuration.hours).toBe(23);
    expect(result.TemporalStatistics.MaximumTraceDuration.minutes).toBe(59);
    expect(result.TemporalStatistics.MaximumTraceDuration.seconds).toBe(2);

    expect(result.TemporalStatistics.AverageTraceDuration.days).toBe(0);
    expect(result.TemporalStatistics.AverageTraceDuration.hours).toBe(11);
    expect(result.TemporalStatistics.AverageTraceDuration.minutes).toBe(59);
    expect(result.TemporalStatistics.AverageTraceDuration.seconds).toBe(32);
  })
});