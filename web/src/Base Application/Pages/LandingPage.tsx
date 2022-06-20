import { WorkspaceFileCollection} from "../../../../types/src/WorkspaceTypes";

import { State} from "../../../../types/src/types";
import { Wrapper, ContentWrapper  } from '../../Shared/Styling/SharedStyling';
import WorkspaceComponent from '../Components/Workspace';
import LogPreview from '../Components/LogPreview';


type LandingPageProps = {
  setState: (state: State, graphId?: string) => void,
  state: State,
}

const LandingPage = ({ setState, state }: LandingPageProps) => {

  const filteredFiles = (files: WorkspaceFileCollection, searchString: string) => {
    return files.filter(s => s.name.startsWith(searchString))
}

  return (
    <Wrapper>
      <WorkspaceComponent directoryPath={state.workspacePath} sort={filteredFiles} setState={setState}/>
      <ContentWrapper>
      <LogPreview state={state} setState={setState}/>
      </ContentWrapper>
    </Wrapper>

  )
}

export default LandingPage

/*
<FlexBox>
          <h2 style={{marginLeft: "1rem", textAlign: "left"}}>Models:</h2>
          <GraphList>
            {graphs.map( (fn) => {
              return (
                <ListElem key={fn}>
                  <GraphText onClick={() => handleLoad(fn)}>{fn.slice(0, -5)}</GraphText>
                  <StyledX onClick={() => handleDelete(fn)}/>
                </ListElem>
              )
            } )}
          </GraphList>
        </FlexBox>*/