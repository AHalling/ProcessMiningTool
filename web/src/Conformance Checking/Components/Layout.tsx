import ToggleButton from "../../Shared/Components/ToggleButton";
//import { useLayoutEffect, useRef, useState } from 'react';
import Test from "./Test";
import ResultsStatistics from "./ResultsStatistics";
import Export from "./Export";
import TopbarContent from "./TopbarContent";
import AlignmentGroups from "./AlignmentGroups";
import Legends from "./Legends";
import {LeftBar, MainContent, StatisticsBar, ContentWrapper} from "../Styling/ContentStyling";
import {MainContentWrapper, Groups} from "../Styling/MainContentStyling";
import ResultList from "./ResultList";
import {ResultsLabel, OptionsLabel, StatisticsLabel, HeatmapLabel, HeightDictionary, GroupStatisticsLabel, ExportLabel, LegendsLabel} from "../Constants";
import {State} from "../../../../types/src/types";
import {Results} from "../../../../types/src/conformanceCheckingTypes";
import Modal from "../../Shared/Components/Modal";
import DetailsContent from "../Components/DetailsContent";
import TraceGroups from "./TraceGroups";
import ExportContent from "./ExportContent";
import ExportFigureContent from "./ExportFigureContent";
import useModalState from "../CustomHooks/useModalState";
import useSelectedGroupState from "../CustomHooks/useSelectedGroupState";
import useSelectedFileState from "../CustomHooks/useSelectedFileState";
import useResultComputation from "../CustomHooks/useResultComputation";
import useHeightState from "../CustomHooks/useHeightState";


type LayoutProps ={
    LogName: string,
    ModelName: string,
    state: State,
    setState: (state: State, graphId?: string) => void,
    Results: Results,
}

const Layout = (props:LayoutProps) => {

    const {GroupStatisticsHeight, ExportHeight, parentRef} = useHeightState();
    const {Log, Model} = useSelectedFileState();
    const {currResult} = useResultComputation(Log, Model, props.Results);
    const {SelectedGroup} = useSelectedGroupState();
    const {openDetailsModal, openGroupsModal, openExportModal, openExportFigModal, setModalState} = useModalState();

    return(
        <ContentWrapper>
            {openDetailsModal && <Modal setModalState={setModalState} modalType="Details" content={DetailsContent({result: currResult})} title="Details" continueFunction={ null} data={null} ></Modal>}
            {openGroupsModal && <Modal setModalState={setModalState} modalType="TraceGroups" content={TraceGroups()} title="Trace Groups" continueFunction={ null} data={null} ></Modal>}
            {openExportModal && <Modal setModalState={setModalState} modalType="Export" content={ExportContent()} title="Export" continueFunction={ null} data={props.Results} ></Modal>}
            {openExportFigModal && <Modal setModalState={setModalState} modalType="ExportFig" content={ExportFigureContent()} title="Export Figure" continueFunction={ null} data={null} ></Modal>}
            <LeftBar ref={parentRef}>
                <ToggleButton Title={ResultsLabel + ': ' + props.state.result?.name}  ComponentToRender={ResultList({Results:props.Results, state: props.state, setState:props.setState})} ComponentHeight={HeightDictionary[ResultsLabel]}></ToggleButton> 
                <ToggleButton Title={OptionsLabel} ComponentToRender={Test({Name:"Options"})} ComponentHeight={HeightDictionary[OptionsLabel]}></ToggleButton>
                <ToggleButton Title={StatisticsLabel} ComponentToRender={ResultsStatistics({Stats:currResult?.statistics})} ComponentHeight={HeightDictionary[StatisticsLabel]}></ToggleButton> 
                <ToggleButton Title={HeatmapLabel} ComponentToRender={Test({Name:"Figure placeholder"})} ComponentHeight={HeightDictionary[HeatmapLabel]}></ToggleButton>
                <ToggleButton Title={LegendsLabel} ComponentToRender={Legends()} ComponentHeight={HeightDictionary[HeatmapLabel]}></ToggleButton>  
            </LeftBar>
            <MainContent>
                <MainContentWrapper>
                    <TopbarContent LogName={Log?.name ?? "Choose Log"} ModelName={Model?.name ?? "Choose Model"} resultName={props.state.result == null ? "" : props.state.result.name}/>
                    <Groups>
                        {currResult && <AlignmentGroups Result={currResult} SetModalOpen={setModalState} modalType="Details" />}
                    </Groups>
                </MainContentWrapper>
            </MainContent>
            <StatisticsBar id="StatisticsBar" backgroundColor={SelectedGroup?.color ?? "none"}>
                <ToggleButton Title={GroupStatisticsLabel}  ComponentToRender={ResultsStatistics({Stats: SelectedGroup?.GroupStatistics})} ComponentHeight={GroupStatisticsHeight}></ToggleButton>
                <ToggleButton Title={ExportLabel}  ComponentToRender={Export()} ComponentHeight={ExportHeight}></ToggleButton> 
            </StatisticsBar>
        </ContentWrapper>
    )
}

export default Layout;