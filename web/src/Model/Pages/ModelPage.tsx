import { useEffect, useState } from 'react';
import {State} from 'types';
import { FlexBox, GraphList, GraphText, ListElem, StyledX } from '../../Shared/Styling/LandingPageStyling';
import { ModelWrapper } from '../../Shared/Styling/LogPageStyling';


type ModelPageProps = {
    setState: (state: State) => void;
    state: State,
  }

const ModelPage = ({setState, state} : ModelPageProps) => {
    const [graphs, setGraphs] = useState<Array<string>>([]);

    useEffect(() => {
        window.electron.listenToGraphFiles( (graphsFiles: Array<string>) => {
            setGraphs(graphsFiles);
        });
        window.electron.getGraphFiles();
        return () => {
          window.electron.clearGraphFilesListener();
        };
      }, []);

      const handleLoad = (fn: string) => {
        setState({pages:"Canvas", log: state.log, result: state.result, workspacePath: state.workspacePath});
        window.electron.loadGraph(fn);
      }
    
      const handleDelete = (fn: string) => {
        window.electron.deleteGraph(fn);
      }
      
    return (
             <ModelWrapper>
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
                </FlexBox>
            </ModelWrapper>
    )
}
export default ModelPage