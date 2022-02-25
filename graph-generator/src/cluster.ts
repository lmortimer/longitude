import { readFileSync } from 'fs';
import { Cluster } from 'types';

export const loadClusters = (fileName: string): Array<Cluster> => {
    return JSON.parse(readFileSync(fileName, 'utf-8'));
}

export const clusterForNodeName = (name: string, clusters: Array<Cluster>) => {
    // default to cluster 0
    let cluster = '0';

    clusters.forEach((clusterItem: any) => {
        clusterItem.paths.forEach((clusterPath: string) => {
            if (name.startsWith(clusterPath)) {
                cluster = clusterItem.key;
            }
        })

    });

    return cluster;
}