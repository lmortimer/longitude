import { Cluster, Dataset, NodeData } from 'types';
import Graph from 'graphology';
import { clusterForNodeName } from './cluster';
import { TreeCommandDirectoryNode } from './tree';
import forceAtlas2 from 'graphology-layout-forceatlas2';

const recursivelyAddNodeToGraph = (parentDirectoryNode: TreeCommandDirectoryNode, graph: Graph, clusters: Array<Cluster>) => {
    parentDirectoryNode.contents.map((childNode) => {
        if (childNode.type === 'file') {
            graph.addNode(childNode.name, {
                label: childNode.name,
                key: childNode.name,
                tag: 'List',
                URL: '',
                cluster: clusterForNodeName(childNode.name, clusters),
                score: graph.getNodeAttribute(parentDirectoryNode.name, 'score') - 0.1,
                fileType: 'file',
            });
            graph.addEdge(parentDirectoryNode.name, childNode.name);
        }

        if (childNode.type === 'directory') {
            graph.addNode(childNode.name, {
                label: childNode.name,
                key: childNode.name,
                fileType: 'directory',
                tag: 'List',
                URL: '',
                cluster: clusterForNodeName(childNode.name, clusters),
                score: graph.getNodeAttribute(parentDirectoryNode.name, 'score') - 0.1,
            });
            graph.addEdge(parentDirectoryNode.name, childNode.name);

            recursivelyAddNodeToGraph(childNode, graph, clusters);
        }
    });
}


export const parseTreeCommandOutputToGraph = (rootDirectoryNode: TreeCommandDirectoryNode, clusters: Array<Cluster>) => {

    const graph = new Graph();

    // manually add the root node
    graph.addNode('.', {
        label: '.',
        key: '.',
        fileType: 'directory',
        tag: 'List',
        URL: '',
        cluster: 0,
        score: 10,
    });

    // populate the graph based on the tree
    recursivelyAddNodeToGraph(rootDirectoryNode, graph, clusters);
    
    return graph;
}

export const mutateGraphLayout = (graph: Graph): void => {

    // first spread the nodes out in a circle
    graph.nodes().forEach((node, i) => {
        const angle = (i * 2 * Math.PI) / graph.order;
        graph.setNodeAttribute(node, 'x', 100 * Math.cos(angle));
        graph.setNodeAttribute(node, 'y', 100 * Math.sin(angle));
    });

    // then run the forcing algorithm
    forceAtlas2.assign(graph, 50);
}

export const exportForVisualisation = (graph: Graph, clusters: Array<Cluster>): Dataset => {
    const serialisedGraph = graph.export();

    return {
        nodes: serialisedGraph.nodes.map((node) => {
            return node.attributes as NodeData; // we generate the graph so know the type matches
        }),
        edges: serialisedGraph.edges.map((edge) => {
            return [edge.source, edge.target];
        }),
        clusters: clusters,
        tags: [
            { key: 'Chart type', image: 'charttype.svg' },
            { key: 'Company', image: 'company.svg' },
            { key: 'Concept', image: 'concept.svg' },
            { key: 'Field', image: 'field.svg' },
            { key: 'List', image: 'list.svg' },
            { key: 'Method', image: 'method.svg' },
            { key: 'Organization', image: 'organization.svg' },
            { key: 'Person', image: 'person.svg' },
            { key: 'Technology', image: 'technology.svg' },
            { key: 'Tool', image: 'tool.svg' },
            { key: 'unknown', image: 'unknown.svg' },
        ],
    };
};