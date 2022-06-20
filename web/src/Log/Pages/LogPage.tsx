import {State} from 'types';
import { MenuWrapper, MenuPart, MenuColumn, MenuButton, MenuTitle, StatisticsPart, StatisticsBox, StatsHeader, ModelWrapperOnLogPage} from '../../Shared/Styling/LogPageStyling';
import { FlexBox, GraphList, GraphText, ListElem, StyledX } from '../../Shared/Styling/LandingPageStyling';
import {ContentWrapper} from "../../Shared/Styling/SharedStyling"
import Modal from './AlgorithmModal';
import { useEffect, useState } from 'react';
import { AlgorithmCollection } from '../../../../types/src/miningTypes';
import {FormattedTraceDurations, Statistics} from 'types/src/statisticsTypes';
import Designer from '../../Model/Components/Designer';

type LogPageProps = {
    setState: (state: State) => void;
    state: State
  }

const LogPage = ({setState, state} : LogPageProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [algortihms, setAlgorithms] = useState<AlgorithmCollection>([]);
    const [statistics, setStatistics] = useState<Statistics>();
    const [initalLoad, setInitialLoad] = useState<boolean>(true);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [models, setModels] = useState<Array<string>>([]);
    const [modelId, setModelId] = useState<string>("");
    const [numberOfLogModels, setNumberOfLogModels] = useState<number>(0);

    useEffect(
        () => {
            if(initalLoad){
                window.electron.listenToStatistics( (statistics : Statistics) =>{
                    setStatistics(statistics);
                    window.electron.clearStatisticsListener();
                    setInitialLoad(false);
                })
                window.electron.getStatistics(state.log?.path);

                window.electron.listenToLogModelFiles( (graphsFiles: Array<string>) => {
                    setModels(graphsFiles);
                    setNumberOfLogModels(graphsFiles.length)
                });
                window.electron.getGraphFilesForLog(state.log?.name);
            }
            return () => {
            window.electron.clearGraphFilesListener();
            window.electron.clearSpecificModelFilesListener();
            };
      });

    if (!state.log){
        return <ContentWrapper></ContentWrapper>
    }

    const handleModalOpen = () => {
        window.electron.listenToAlgorithms( (algorithms: AlgorithmCollection) => {
            setAlgorithms(algorithms)
            setOpenModal(true)
            window.electron.clearAlgorithmListener();
         })
    
        window.electron.getAlgorithms();
    }

    const formatTemporalStatistic = (object: FormattedTraceDurations) : string=> {
        let isEmpty = (object.days === 0 && object.hours === 0 && object.minutes === 0 && object.seconds === 0)

        if (isEmpty){
            return "No timestamp could be found in log. ";
        }else{
            return object.days +"d " + object.hours + "h " + object.minutes + "m " + object.seconds + "s" 
        }
    }

    const handleLoad = (fn: string) => {
        //Get graph
        window.electron.listenTospecificModelIdLoaded( (id : string) =>{
            if(id !== "-1"){
                setModelId(id)
            }else{
                console.log("Error in getting the model ID.")
            }
            window.electron.clearStatisticsListener();
        })
        window.electron.loadSpecificModelWithReturn(fn);

        window.electron.loadGraph(fn);
        setShowModel(true)
    }

    const handleDelete = (fn: string) => {

    }


    return (
        <ContentWrapper>
            {openModal && <Modal setModalState={setOpenModal} algorithms={algortihms} log={state.log} numberOfModels={numberOfLogModels}></Modal>}
            <h3>Viewing: {state.log.name}</h3>
            <MenuWrapper>
                <MenuPart>
                    <MenuColumn>
                    <MenuTitle>Actions:</MenuTitle>
                        <MenuButton onClick={() =>handleModalOpen()}> Mine Log</MenuButton>
                    </MenuColumn>
                    <MenuColumn>
                    <MenuTitle>Conformance checking:</MenuTitle>
                        <MenuButton onClick={() => console.log("Not implemented yet.")}> Choose model and log</MenuButton>
                    </MenuColumn>
                </MenuPart>
                <StatisticsPart>
                    <StatisticsBox> 
                    <StatsHeader>Number of Events:</StatsHeader>
                        {statistics ? statistics?.ContentStatistics.NumberOfEvents : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox>
                        <StatsHeader>Number of Traces:</StatsHeader>
                        {statistics ? statistics?.ContentStatistics.NumberOfTraces : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox> 
                    <StatsHeader>Number of unique Events:</StatsHeader>
                        {statistics ? statistics?.ContentStatistics.NumberOfUniqueEvents : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox> 
                        <StatsHeader>Number of unique Traces:</StatsHeader>
                        {statistics ? statistics?.ContentStatistics.NumberOfUniqueTraces  : "Loading..."} 
                    </StatisticsBox>
                </StatisticsPart>
                <StatisticsPart>
                    <StatisticsBox> 
                    <StatsHeader>Maximum Trace duration: </StatsHeader>
                        {statistics ? formatTemporalStatistic(statistics?.TemporalStatistics.MaximumTraceDuration) : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox>
                        <StatsHeader>Minimum Trace duration:</StatsHeader>
                        {statistics ? formatTemporalStatistic(statistics?.TemporalStatistics.MinimumTraceDuration) : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox> 
                    <StatsHeader>Average Trace duration:</StatsHeader>
                        {statistics ? formatTemporalStatistic(statistics?.TemporalStatistics.AverageTraceDuration) : "Loading..."} 
                    </StatisticsBox>
                    <StatisticsBox> 
                        <StatsHeader>Median trace duration:</StatsHeader>
                        {statistics ? formatTemporalStatistic(statistics?.TemporalStatistics.MedianTraceDuration) : "Loading..."} 
                    </StatisticsBox>
                </StatisticsPart>
            </MenuWrapper>
            <ModelWrapperOnLogPage>
                {!showModel && 
                <FlexBox>
                    <h2 style={{marginLeft: "1rem", textAlign: "left"}}>Models:</h2>
                    <GraphList>
                        {models.map( (fn) => {
                        return (
                        <ListElem key={fn}>
                            <GraphText onClick={() => handleLoad(fn)}>{fn.slice(0, -5)}</GraphText>
                            <StyledX onClick={() => handleDelete(fn)}/>
                        </ListElem>
                        )
                        } )}
                    </GraphList>
            </FlexBox>}
            {showModel && 
                <Designer id={modelId} setState={setState} DesignerHeight={window.visualViewport.height-(window.visualViewport.height*0.5)} state={state} />
            }

            </ModelWrapperOnLogPage>

        </ContentWrapper>
    )
}

export default LogPage