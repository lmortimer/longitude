import { readFileSync } from 'fs';

// types of the output of `tree -fJ`
type TreeCommandNode = TreeCommandFileNode | TreeCommandDirectoryNode;

type TreeCommandFileNode = {
    type: "file";
    name: string;
}

export type TreeCommandDirectoryNode = {
    type: "directory";
    name: string;
    contents: Array<TreeCommandNode>;
}

export const loadTree = (fileName: string): Array<TreeCommandDirectoryNode> => {
    return JSON.parse(readFileSync(fileName, 'utf-8'));
}