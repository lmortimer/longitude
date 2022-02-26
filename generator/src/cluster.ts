import { readFileSync } from 'fs';
import { Cluster } from 'types';

const DEFAULT_CLUSTER_KEY = '0';

export const loadClusters = (fileName: string): Array<Cluster> => {
    const clusters = JSON.parse(readFileSync(fileName, 'utf-8')) as Array<Cluster>;

    if (!clusters.find( cluster => cluster.key === DEFAULT_CLUSTER_KEY)) {
        throw Error(`clusters.jsons requires a default cluster with key = '${DEFAULT_CLUSTER_KEY}'`);
    } 

    return clusters;
}

export const clusterForNodeName = (name: string, clusters: Array<Cluster>) => {
    // default to cluster 0
    let cluster = DEFAULT_CLUSTER_KEY;

    clusters.forEach((clusterItem: any) => {
        clusterItem.paths.forEach((clusterPath: string) => {
            if (name.startsWith(clusterPath)) {
                cluster = clusterItem.key;
            }
        })

    });

    return cluster;
}