import {State} from "./types";

export interface Workspace {
    directoryPath: string,
    sort: (files: WorkspaceFileCollection, searchTerm: string) => WorkspaceFileCollection,
    setState: (state: State, graphId?: string) => void,
}

export type WorkspaceFileCollection = Array<WorkspaceFile>;

export interface WorkspaceFile {
    name: string,
    size: string | null,
    directory: boolean,
    path: string,
}