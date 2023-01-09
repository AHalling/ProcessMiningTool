import {useState, useEffect} from 'react';
import {Wrapper, Button, HeaderWrapper, Title, ComponentWrapper} from '../Styling/ToggleButtonStyling';
import { ToogleIcon } from './ToogleIcon';

type ToggleButtonProps = {
    Title: String,
    ComponentToRender: JSX.Element,
    ComponentHeight: number,
}

const ToggleButton = (props : ToggleButtonProps) => {
    const [visible, setvisible] = useState(true)
    const [height, setHeight] = useState('15vh')

    useEffect(() => {
        if(props.ComponentHeight > 0){
            setHeight(props.ComponentHeight+'px');
        }
      },[props.ComponentHeight]);

    return(
         visible ?
         <Wrapper height={height}>
            <HeaderWrapper>
                <Title>{props.Title}</Title>
                <Button 
                    onClick={() => setvisible(!visible)}>
                <ToogleIcon visible={visible}></ToogleIcon>
                </Button>
            </HeaderWrapper>
                <ComponentWrapper>

                {visible && props.ComponentToRender}
                </ComponentWrapper>

        </Wrapper> :
        <Wrapper>
        <HeaderWrapper>
            <Title>{props.Title}</Title>
            <Button 
                onClick={() => setvisible(!visible)}>
            <ToogleIcon visible={visible}></ToogleIcon>
            </Button>
        </HeaderWrapper>
            {visible && props.ComponentToRender}
        </Wrapper>
    )
}

export default ToggleButton;