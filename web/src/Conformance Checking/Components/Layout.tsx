import ToggleButton from "../../Shared/Components/ToggleButton";
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Test from "./Test";
import ResultsStatistics from "./ResultsStatistics";
import Export from "./Export";
import {LeftBar, MainContent, StatisticsBar, ContentWrapper} from "../Styling/ContentStyling";
import {MainContentWrapper, TopBar, TopBarBox, Groups, Legends} from "../Styling/MainContentStyling";
import ResultList from "./ResultList";
import {ResultsLabel, OptionsLabel, StatisticsLabel, HeatmapLabel, HeightDictionary, GroupStatisticsLabel, ExportLabel} from "../Constants";
import {State} from "../../../../types/src/types";
import {Results, TestStatistics} from "../../../../types/src/conformanceCheckingTypes";

type LayoutProps ={
    LogName: string,
    ModelName: string,
    state: State,
    setState: (state: State, graphId?: string) => void,
    Results: Results,
}

const Layout = (props:LayoutProps) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [GroupStatisticsHeight, setGroupStatisticsHeight] = useState(175)
    const [ExportHeight, setExportHeight] = useState(100)
    const [ChosenGroup, setChosenGroup] = useState("")
    const GeneralStatistics : TestStatistics= {
        maxScore: 0.95,
        minScore: 0.10,
        averageScore: 0.45,
        medianScore: 0.51,
    }

    const GroupStatistics: TestStatistics = {
        numberOfTraces: 40,
        groupScore: 0.92,
        Activations: 40,
        Fulfillments: 30,
        Violations: 10,
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

    useEffect(() => {
        props.state.result !== null ? setChosenGroup(props.state.result.name) : setChosenGroup("")
    }, [props.state.result])

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
            </LeftBar>
            <MainContent>
                <MainContentWrapper>
                    <TopBar>
                        <TopBarBox>
                            Log: {props.LogName}
                        </TopBarBox>
                        <TopBarBox>
                            Model: {props.ModelName}
                        </TopBarBox>
                        <TopBarBox>
                            Selected group: {ChosenGroup}
                        </TopBarBox>
                    </TopBar>
                    <Groups>
                        Groups
                    </Groups>
                    <Legends>

                    </Legends>
                </MainContentWrapper>
            </MainContent>
            <StatisticsBar>
                <ToggleButton Title={GroupStatisticsLabel}  ComponentToRender={ResultsStatistics({Stats:GroupStatistics})} ComponentHeight={GroupStatisticsHeight}></ToggleButton>
                <ToggleButton Title={ExportLabel}  ComponentToRender={Export()} ComponentHeight={ExportHeight}></ToggleButton> 
            </StatisticsBar>
        </ContentWrapper>
    )
}

export default Layout;