import {ToogleIconDown,ToogleIconUp} from "./ToogleIconVariations";

type ToogleIconProps = {
    visible: boolean,
}

export const ToogleIcon = (props: ToogleIconProps) => {
    return(
        <div>
            {props.visible ? <ToogleIconUp/> : <ToogleIconDown/>}
        </div>
    )
}