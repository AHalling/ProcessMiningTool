import ToggleButton from "../../Shared/Components/ToggleButton";
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
import {Results, TestStatistics, Result, EventResult} from "../../../../types/src/conformanceCheckingTypes";
import {FileResult} from "../../../../types/src/fileTypes";

type LayoutProps ={
    LogName: string,
    ModelName: string,
    state: State,
    setState: (state: State, graphId?: string) => void,
    Results: Results,
}

const Layout = (props:LayoutProps) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [GroupStatisticsHeight, setGroupStatisticsHeight] = useState(175) // TODO: Fix height to be dynamic
    const [ExportHeight, setExportHeight] = useState(100)
    const [SelectedGroup, setSelectedGroup] = useState<Result>(props.Results?.results[0]);
    const [SelectedGroupColor, setSelectedGroupColor] = useState("");
    const [Log, setLog] = useState<FileResult>()
    const [Model, setModel] = useState<FileResult>()

    const GeneralStatistics : TestStatistics= {
        maxScore: 0.95,
        minScore: 0.10,
        averageScore: 0.45,
        medianScore: 0.51,
    }

    const SetHeightForToggle = (node: any) =>{
        for (let key in HeightDictionary) {
            if(node.childNodes[0].childNodes[0].innerHTML.includes(key))
            {
                HeightDictionary[key] = node.clientHeight
                setGroupStatisticsHeight(window.innerHeight * 0.67);
                setExportHeight(157.5);
            }
        }
    }

    // Change color on clicks
    useEffect(() => {
        window.electron.listenToAlignmentGroupActivation( (result: EventResult) => {
            setSelectedGroup(result.result);
            setSelectedGroupColor(result.color)
          });

          return function cleanup() {
            window.electron.clearAlignmentGroupActivation();
          };
    }, [props.state.result, SelectedGroup])

    //Compute results on model and log change
    useEffect(() => {
        window.electron.listenToSelectFile( (fileResult: FileResult) => {
            console.log(fileResult)
    
            if(fileResult.Type === "Log"){
                setLog(fileResult)
            }
    
            if( fileResult.Type === "Model"){
                setModel(fileResult)
            }
    
            window.electron.clearSelectFile();
            });
    }, [Log, Model])


    useEffect(() => {
        if(Log && Model){
            window.electron.listenToAlignmentResult((result: any) => {
                console.log(result)

                window.electron.clearAlignmentResult();
            })

            window.electron.computeAlignment(Log, Model);

        }
    }, [Log, Model])

    useLayoutEffect(() => {
        parentRef.current?.childNodes.forEach((node: any) => {
            SetHeightForToggle(node);
        });
    }, []);

    return(
        <ContentWrapper>
            <LeftBar ref={parentRef}>
                <ToggleButton Title={ResultsLabel + ': ' + props.state.result?.name}  ComponentToRender={ResultList({Results:props.Results, state: props.state, setState:props.setState})} ComponentHeight={HeightDictionary[ResultsLabel]}></ToggleButton> 
                <ToggleButton Title={OptionsLabel} ComponentToRender={Test({Name:"Options"})} ComponentHeight={HeightDictionary[OptionsLabel]}></ToggleButton>
                <ToggleButton Title={StatisticsLabel} ComponentToRender={ResultsStatistics({Stats:GeneralStatistics})} ComponentHeight={HeightDictionary[StatisticsLabel]}></ToggleButton> 
                <ToggleButton Title={HeatmapLabel} ComponentToRender={Test({Name:"Figure placeholder"})} ComponentHeight={HeightDictionary[HeatmapLabel]}></ToggleButton>
                <ToggleButton Title={LegendsLabel} ComponentToRender={Legends()} ComponentHeight={HeightDictionary[HeatmapLabel]}></ToggleButton>  
            </LeftBar>
            <MainContent>
                <MainContentWrapper>
                    <TopbarContent LogName={Log?.name ?? "Choose Log"} ModelName={Model?.name ?? "Choose Model"} resultName={props.state.result == null ? "" : props.state.result.name}/>
                    <Groups>
                        <AlignmentGroups Results={props.Results} />
                    </Groups>
                </MainContentWrapper>
            </MainContent>
            <StatisticsBar id="StatisticsBar" backgroundColor={SelectedGroupColor}>
                <ToggleButton Title={GroupStatisticsLabel}  ComponentToRender={ResultsStatistics({Stats: SelectedGroup.statistics})} ComponentHeight={GroupStatisticsHeight}></ToggleButton>
                <ToggleButton Title={ExportLabel}  ComponentToRender={Export()} ComponentHeight={ExportHeight}></ToggleButton> 
            </StatisticsBar>
        </ContentWrapper>
    )
}

export default Layout;