import { exportForVisualisation } from './src/graph';
import { writeFileSync } from 'fs';
import { loadTree } from 'src/tree';
import { loadClusters } from 'src/cluster';
import { parseTreeCommandOutputToGraph, mutateGraphLayout } from 'src/graph';


/*
 * Clusters match on string startswith with the path
 * Clusters paths must be more specific later in the list so that the "last one wins".
 */
const clusters = loadClusters('clusters.json');
const inputTree = loadTree('tree.json');

const graph = parseTreeCommandOutputToGraph(inputTree[0], clusters);

mutateGraphLayout(graph);

const exportGraph = exportForVisualisation(graph, clusters);

writeFileSync('graph.json', JSON.stringify(exportGraph));
