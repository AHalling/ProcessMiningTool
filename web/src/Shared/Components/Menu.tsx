import { Menu, Paragraph  } from "../Styling/MenuStyling";
import MenuButton from "./UIElements/MenuButton";
import {State} from 'types';

type MenuLayoutProps = {
  setState: (state: State) => void;
  state: State,
}

const MenuLayout = ({setState, state} : MenuLayoutProps) => {
    return (
        <Menu>
        <Paragraph>Menu:</Paragraph>
        <MenuButton 
            height={"2rem"} 
            color={'black'}
            width={'20px'} 
            onClick={() => setState({pages:"LandingPage", log:state.log,  result: state.result, workspacePath:state.workspacePath})}>
              Main
        </MenuButton>
        <MenuButton 
          height={"2rem"} 
          color={'black'}
          width={'20px'} 
          onClick={() => setState({pages:"LogPage", log:state.log,  result: state.result, workspacePath:state.workspacePath})}>
            Logs
        </MenuButton>
        <MenuButton 
          height={"2rem"} 
          color={'black'}
          width={'20px'} 
          onClick={() => setState({pages:"ModelPage", log:state.log,  result: state.result, workspacePath:state.workspacePath})}>
            Models
        </MenuButton>
        <MenuButton 
          height={"2rem"} 
          color={'black'}
          width={'20px'} 
          onClick={() => setState({pages:"ConformanceCheckingPage", log:state.log,  result: state.result, workspacePath:state.workspacePath})}>
            Conformance Checking
        </MenuButton>
        </Menu>
    )
}

export default MenuLayout