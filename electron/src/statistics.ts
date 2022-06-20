import { EventLog } from "types/src/miningTypes";
import {ContentStatistics, FormattedTraceDurations, Statistics, TemporalStatistics, TraceDurations} from "../../types/src/statisticsTypes";
import {parseLog} from "./logInteraction";

export const getStatistics = (logPath: string) : Statistics | void => {
    let log : EventLog = parseLog(logPath);

    return calculateStatistics(log)
}

export const calculateStatistics = (log: EventLog) : Statistics | void => {
    try{
        let CS : ContentStatistics = calculateContentStatistics(log);
        let TS : TemporalStatistics = calculateTemporalStatistics(log);
        return {ContentStatistics: CS,
            TemporalStatistics: TS}
    }catch(e){
        console.log(e)
        return
    }
}

const calculateContentStatistics = (log: EventLog) : ContentStatistics => {
    let ContentStatistics : ContentStatistics = {
     NumberOfEvents: getNumberOfEvents(log),
     NumberOfTraces: getNumberOfTraces(log),
     NumberOfUniqueEvents: getNumberOfUniqueEvents(log),
     NumberOfUniqueTraces: getNumberOfUniqueTraces(log),
    }

    return ContentStatistics
}

const getNumberOfEvents = (log: EventLog) : number => {
    let numberOfEvents = 0;

    Object.keys(log.traces).forEach(key => {
        numberOfEvents = numberOfEvents + log.traces[key].trace.length;
    });

    return numberOfEvents;
}

const getNumberOfTraces = (log: EventLog) : number => {
    return Object.keys(log.traces).length;
}

const getNumberOfUniqueEvents = (log: EventLog) : number => {
    return log.events.size
}

const getNumberOfUniqueTraces = (log: EventLog) : number => {
    let uniqueTraces = 0;
    
    let keys = Object.keys(log.traces);

    keys.forEach(key => {
        let asString = JSON.stringify(log.traces[key]);
        let FoundMatch = false;
        keys.forEach(secondKey => {
            if (key !== secondKey){
                let secondString = JSON.stringify(log.traces[secondKey])
                if(asString === secondString){
                    FoundMatch = true;
                }
            }
        });
        if (!FoundMatch) uniqueTraces = uniqueTraces + 1;
    });

    return uniqueTraces;
}

const calculateTemporalStatistics = (log: EventLog) : TemporalStatistics => {
    let TraceDurations = calculateTraceDurations(log);

    let TemporalStatistics : TemporalStatistics = {
        MaximumTraceDuration: formatTraceDifferences(getMaximumTraceDuration(TraceDurations)),
        MinimumTraceDuration: formatTraceDifferences(getMinimumTraceDuration(TraceDurations)),
        AverageTraceDuration: formatTraceDifferences(getAverageTraceDuration(TraceDurations)),
        MedianTraceDuration: formatTraceDifferences(getMedianTraceDuration(TraceDurations)),
       }
    return TemporalStatistics
}

const calculateTraceDurations = (log: EventLog) : Array<TraceDurations> => {
    let durations : Array<TraceDurations> = [];

    let keys = Object.keys(log.traces);
    if (log.traces[keys[0]].traceTimeStamps[0]){
        Object.keys(log.traces).forEach(item => {
            let firstTimeStamp = new Date(Date.parse(log.traces[item].traceTimeStamps[0]));
            let lastTimeStamp = new Date(Date.parse(log.traces[item].traceTimeStamps[log.traces[item].traceTimeStamps.length -1]))
    
            let difference = lastTimeStamp.getTime() - firstTimeStamp.getTime()
    
            durations.push(
                difference
               )
        })
    }
    return durations;
}

const getMaximumTraceDuration = (durations: Array<TraceDurations>) : number => {
    if(durations.length === 0) return 0
    return Math.max(...durations);
}

const getMinimumTraceDuration = (durations: Array<TraceDurations>) : number => {
    if(durations.length === 0) return 0
    return Math.min(...durations);
}

const getAverageTraceDuration = (durations: Array<TraceDurations>) : number => {
    if(durations.length === 0) return 0
    return durations.reduce((acc, num) => acc + num, 0) / durations.length;
}

const getMedianTraceDuration = (durations: Array<TraceDurations>) : number => {
    if(durations.length === 0) return 0
    let durationsSorted = durations.sort((a,b) => { return a-b});
    let index = durationsSorted.length / 2;

    return index % 1 == 0 ? (durationsSorted[index - 1] + durationsSorted[index]) / 2 : durationsSorted[Math.floor(index)];
}

const formatTraceDifferences = (difference: number) : FormattedTraceDurations => {
    if(difference === 0){
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);

    return {
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
    }
}