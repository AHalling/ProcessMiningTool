import { useEffect, useState } from "react";

import Designer from "../../Model/Components/Designer";
import LandingPage from "../Pages/LandingPage";
import LogPage from "../../Log/Pages/LogPage";
import ModelPage from "../../Model/Pages/ModelPage";
import FooterLayout from "../../Shared/Components/Footer"
import HeaderLayout from "../../Shared/Components/Header";
import { Main } from "../../Shared/Styling/SharedStyling";

import { State } from "types";


const StateMachine = () => {
    const [graphId, setGraphId] = useState<string | null>(null);
    const [reactState, setReactState] = useState<State>({pages: "LandingPage", log:null, workspacePath:""});

    // Sets electron state upon starting up
    useEffect( () => {
        window.electron.setState("LandingPage");
    }, [])

    const setState = (state: State, graphId: string | null = null) => {
        setReactState(state);
        setGraphId(graphId);
        // Notifies electron of the changed state
        window.electron.setState(state);
    }


    const component = getComponent(reactState, setState, graphId)
    return component;
}

const getComponent = (state : State, setState:any, graphId: any) : any =>{
    switch(state.pages){
        case "LandingPage":
            return (
                <Main>
                    <HeaderLayout setState={setState} state={state}></HeaderLayout>
                    <LandingPage setState={setState} state={state} />
                    <FooterLayout></FooterLayout>
                </Main>
            ) 
        case "Canvas":
            return (
                <Main>
                    <HeaderLayout setState={setState} state={state}></HeaderLayout>
                    <Designer setState={setState} id={graphId} DesignerHeight={window.innerHeight} state={state}/>
                    <FooterLayout></FooterLayout>
                </Main>
            ) 
        case "LogPage":
            if(state.log !== null) {
                return (
                    <Main>
                        <HeaderLayout setState={setState} state={state}></HeaderLayout>
                        <LogPage setState={setState} state={state}/>
                        <FooterLayout></FooterLayout>
                    </Main>
                ) 
            }
            else{
                alert("Please select a log on the main page before accessing this page.")
                return getComponent({pages:"LandingPage", log: state.log, workspacePath: state.workspacePath}, setState, graphId)
            }
        case "ModelPage":
            return(
                <Main>
                    <HeaderLayout setState={setState} state={state}></HeaderLayout>
                    <ModelPage setState={setState} state={state}></ModelPage>
                    <FooterLayout></FooterLayout>
                </Main>
            )
        default:
            return <LandingPage setState={setState} state={state}/>
    }
}

export default StateMachine;