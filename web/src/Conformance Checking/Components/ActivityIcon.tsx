import {Icon} from "../Styling/ActivityIconStyling";

type ActivityIconProps= {
    backgroundColor: string,
    left: string,
    activityName: string, 
}

const ActivityIcon = (props: ActivityIconProps) => {
    return(
        <Icon left={props.left}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="51px" height="36px" viewBox="0 0 51 36" style={{backgroundColor:"inherit" }}>
                <path d="M 0 0 L 30 0 L 50 17.5 L 30 35 L 0 35 L 20 17.5 Z" fill={props.backgroundColor} stroke="rgb(0, 0, 0)" strokeMiterlimit="10"/>
                <text x="1.7vw" y="1.5vw">{props.activityName}</text>
            </svg>
        </Icon>

    )
}

export default ActivityIcon

