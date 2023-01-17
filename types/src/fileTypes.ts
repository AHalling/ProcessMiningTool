export interface FileResult {
    name: string,
    path: string,
    Type: FileType,
}

export type FileType = "Log" | "Model"

export const isFileType = (obj: any) : obj is FileType => {
    return true
}

export const isFileResult = (obj: any) : obj is FileResult => {
    return true
}