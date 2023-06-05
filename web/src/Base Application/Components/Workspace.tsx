import { useState, useMemo } from 'react';
import {Workspace, WorkspaceFileCollection} from "../../../../types/src/WorkspaceTypes";
import {WorkspaceWrapper} from '../../Shared/Styling/LandingPageStyling';
import { InputWrapper, InputText, PathField, WorkspaceClearButton, PathWrapper, SearchWrapper, SearchField, TableWrapper} from '../Styling/WorkspaceStyle';
import { FilesViewer } from './FilesViewer';
import pathModule from "path";


const WorkspaceComponent = (props: Workspace) => {
    const [workspaceFiles, setWorkspaceFiles] = useState<WorkspaceFileCollection>([]);
    const [searchString, setSearchString] = useState('')
    const [path, setPath] = useState<string>(props.directoryPath)
    const [inputPath, setInputPath] = useState("");

    useMemo(() => {
        if (path === null){
            return (
                <h3> path is null</h3>
            )
        }
        window.electron.listenToWorkspaceFiles( (files: WorkspaceFileCollection) => {
            setWorkspaceFiles(files);
            window.electron.clearWorkspaceFilesListener();
          });
        window.electron.readWorkspaceFiles(path)
    }, [path]);

    const onBack = () => {
        if (path){
            setPath(pathModule.dirname(path))
        }

    }

    const onOpen = (target: string) => {
        if (path){
            setPath(pathModule.join(path, target))
            props.setState({pages:"LandingPage", log:null, result: null, workspacePath:path})
        }
    }

    const handleSubmit = () => {
        setPath(inputPath);
        props.setState({pages:"LandingPage", log:null, result: null, workspacePath:inputPath})
        console.log("Test")
    }

    const handleChange = (event: any) => {
        setInputPath(event.target.value)
    }

    const resetPath = () => {
        setInputPath("")
        setPath("")
    }

    const renderComponent = () => {
        if(path){
            return (
                <TableWrapper className="container mt-2">
                    <PathWrapper>
                        <h4>{path}</h4>
                    </PathWrapper>
                    <SearchWrapper>
                        <WorkspaceClearButton onClick={resetPath}>Clear</WorkspaceClearButton>
                            <SearchField
                            value={searchString}
                            onChange={event => setSearchString(event.target.value)}
                            className="form-control form-control-sm"
                            placeholder="File search"
                            />
                        </SearchWrapper>
                    <FilesViewer files={props.sort(workspaceFiles, searchString)} onBack={onBack} onOpen={onOpen} setState={props.setState} state={{pages:"LandingPage", log:null, result: null, workspacePath: props.directoryPath}} />
                </TableWrapper>
            )
        }else{
            // Select a path for the workspace
            return (
                <InputWrapper>
                    <InputText> Insert the path to the desired workspace below:</InputText>
                    <form onSubmit={handleSubmit}>
                        <PathField
                        type='text'
                        value={inputPath}
                        onChange={event => handleChange(event)}
                        placeholder="Enter path" />
                        <input type="submit" value="Load"></input>
                    </form>

                </InputWrapper>
            )
        }
        
    }

    return (
    <WorkspaceWrapper>
        <h3>Workspace</h3>
        {renderComponent()}
    </WorkspaceWrapper>
    );

}

export default WorkspaceComponent