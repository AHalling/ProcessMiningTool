import React, { useRef} from "react";

type TestProps = {
    Name: String,
}

const Test = (props: TestProps) => {
    const textInput = useRef(null);


    return(
        <div ref={textInput}>
            <h4>{props.Name}</h4>
        </div>

    )
}

export default Test;