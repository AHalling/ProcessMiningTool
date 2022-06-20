import Menu from "./Menu";
import {State} from 'types';
import {Header} from "../../Shared/Styling/SharedStyling";
import Logo from "./Logo";

type HeaderProps = {
    setState: (state: State) => void,
    state: State,
}

const HeaderLayout = ({setState, state}: HeaderProps) => {
    return (
        <Header>
            <Logo setState={setState} state={state}></Logo>
            <Menu setState={setState} state={state}></Menu>
        </Header>
    )
}

export default HeaderLayout