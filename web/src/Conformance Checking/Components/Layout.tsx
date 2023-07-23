import ToggleButton from "../../Shared/Components/ToggleButton";
//import { useLayoutEffect, useRef, useState } from 'react';
import ResultsStatistics from "./ResultsStatistics";
import TopbarContent from "./TopbarContent";
import AlignmentGroups from "./AlignmentGroups";
import Legends from "./Legends";
import {LeftBar, MainContent, StatisticsBar, ContentWrapper} from "../Styling/ContentStyling";
import {MainContentWrapper, Groups} from "../Styling/MainContentStyling";
import ResultList from "./ResultList";
import {ResultsLabel, OptionsLabel, StatisticsLabel, HeatmapLabel, HeightDictionary, GroupStatisticsLabel, LegendsLabel} from "../Constants";
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
import OptionsContent from "./Options";
import useOptions from "../CustomHooks/useOptions";
import ConformanceCheckingCharts from "./Charts";
import useDetailsFigure from "../CustomHooks/useDetailsFigure";


type LayoutProps ={
    LogName: string,
    ModelName: string,
    state: State,
    setState: (state: State, graphId?: string) => void,
    Results: Results,
}

const Layout = (props:LayoutProps) => {
    const {parentRef} = useHeightState();
    const {Log, Model} = useSelectedFileState();
    const currOptions = useOptions();
    const {currResult} = useResultComputation(Log, Model, props.Results, currOptions);
    const {SelectedGroup} = useSelectedGroupState();
    const {openDetailsModal, openGroupsModal, openExportModal, openExportFigModal, setModalState} = useModalState();
    const currDetailsFig = useDetailsFigure();

    return(
        <ContentWrapper>
            {openDetailsModal && <Modal setModalState={setModalState} modalType="Details" content={DetailsContent({result: currResult, selectedGroup: SelectedGroup, figure: currDetailsFig})} title="Details"></Modal>}
            {openGroupsModal && <Modal setModalState={setModalState} modalType="TraceGroups" content={TraceGroups({group:SelectedGroup, setState: setModalState})} title="Alignments" ></Modal>}
            {openExportModal && <Modal setModalState={setModalState} modalType="Export" content={ExportContent()} title="Export" ></Modal>}
            {openExportFigModal && <Modal setModalState={setModalState} modalType="ExportFig" content={ExportFigureContent()} title="Export Figure"  ></Modal>}
            <LeftBar ref={parentRef}>
                <ToggleButton Title={currResult?.name ?? "No result"}  ComponentToRender={ResultList({Results:props.Results, state: props.state, setState:props.setState})} ComponentHeight={HeightDictionary[ResultsLabel]} CustomHeight={false}></ToggleButton> 
                <ToggleButton Title={OptionsLabel} ComponentToRender={OptionsContent()} ComponentHeight={HeightDictionary[OptionsLabel]}CustomHeight={false}></ToggleButton>
                <ToggleButton Title={StatisticsLabel} ComponentToRender={ResultsStatistics({Stats:currResult?.statistics})} ComponentHeight={HeightDictionary[StatisticsLabel]}CustomHeight={false}></ToggleButton> 
                <ToggleButton Title={HeatmapLabel} ComponentToRender={ConformanceCheckingCharts(currResult)} ComponentHeight={HeightDictionary[HeatmapLabel]}CustomHeight={false}></ToggleButton>
                <ToggleButton Title={LegendsLabel} ComponentToRender={Legends()} ComponentHeight={HeightDictionary[HeatmapLabel]}CustomHeight={false}></ToggleButton>  
            </LeftBar>
            <MainContent>
                <MainContentWrapper>
                    <TopbarContent LogName={Log?.name ?? "Choose Log"} ModelName={Model?.name ?? "Choose Model"} resultName={currResult?.name ?? ""}/>
                    <Groups>
                        {currResult && <AlignmentGroups Result={currResult} SetModalOpen={setModalState} modalType="Details" />}
                    </Groups>
                </MainContentWrapper>
            </MainContent>
            <StatisticsBar id="StatisticsBar" backgroundColor={SelectedGroup?.color ?? "none"}>
                <ToggleButton Title={GroupStatisticsLabel}  ComponentToRender={ResultsStatistics({Stats: SelectedGroup?.GroupStatistics})} ComponentHeight={83} CustomHeight={true}></ToggleButton>
            </StatisticsBar>
        </ContentWrapper>
    )
}

export default Layout;