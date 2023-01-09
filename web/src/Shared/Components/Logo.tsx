import {LogoStyle} from "../Styling/LogoStyling";
import {State} from 'types';

type LogoProps = {
    setState: (state: State) => void,
    state: State,
}

const Logo = ({setState, state}:LogoProps) => {
    let LogoPath = process.env.PUBLIC_URL+"/logo.png";
    return (
        <LogoStyle src={LogoPath} alt="My logo" onClick={() => setState({pages:"LandingPage", log: state.log, result: state.result, workspacePath: state.workspacePath})} />
    )
}

export default Logo