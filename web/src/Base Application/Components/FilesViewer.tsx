import { WorkspaceFileCollection } from 'types/src/WorkspaceTypes'
import { IconFolder, IconFile, IconFolderOpen } from '../Styling/Icons'
import {TableData, TableRow, FilesViewerTable} from "../Styling/WorkspaceStyle"
import {State} from "../../../../types/src/types";

type FileViewerProps = {
    files: WorkspaceFileCollection,
    state: State,
    onBack: () => void,
    onOpen: (name: string) => void,
    setState: (state: State, graphId?: string) => void,
}

const handleSelect = (directory : boolean, name : string, path:string, props: FileViewerProps) => {
  if(!directory){
    props.setState({pages: "LandingPage", log:{name:name, path:path}, workspacePath:props.state.workspacePath})
  }else{
    directory && props.onOpen(name) 
  }
}

export const FilesViewer = (props : FileViewerProps) => {
  return (
    <FilesViewerTable className="table">
    <tbody>
      <TableRow>
        <TableData>
          <b> Type: </b>
        </TableData>
        <TableData>
          <b> Name: </b>
        </TableData>
        <TableData>
          <b> Size: </b>
        </TableData>
      </TableRow>
      <TableRow className="clickable" onClick={props.onBack}>
        <TableData className="icon-row">
          <IconFolderOpen />
        </TableData>
        <TableData>...</TableData>
        <TableData></TableData>
      </TableRow>

      {props.files.map(({ name, directory, size, path }) => {
        return (
          <TableRow className="clickable" onClick={ () => handleSelect(directory, name, path, props)} key={name}>
            <TableData className="icon-row">
              {directory ? <IconFolder /> : <IconFile />}
            </TableData>
            <TableData>{name}</TableData>
            <TableData>
              <span className="float-end">{size}</span>
            </TableData>
          </TableRow>
        )
      })}
    </tbody>
  </FilesViewerTable>
  )
}
