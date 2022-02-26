# Longitude
Graph and visualise git repositories.

The repository is split into two parts:

1. `graph-generator` - Generates the graph using [graphology](https://github.com/graphology/graphology) and writes it to `graph-generator/graph.json`.
1. `git-visualiser` - Renders the graph using [sigma.js](https://github.com/jacomyal/sigma.js).

## Installation

    cd graph-generator
    npm i

    cd git-visualiser
    npm i

## Usage

### Generate the graph
The graph is structured on directory and file directory structure of the git repository. This is generated using the tool `tree`.

    cd some/git/repository
    tree -fJ > tree.json
    cp tree.json graph-generator/

You can specify clusters in `clusters.json`. When the graph is generated the cluster will be added as an attribute to each node. `git-visualiser` will colour branches of the graph based on this cluster.

    cat clusters.json

    [
        { "key": "0", "color": "#666666", "clusterLabel": "Project", "paths": ["./"] },
        { "key": "1", "color": "#990000", "clusterLabel": "HTML", "paths": ["./src/Html"] },
        { "key": "2", "color": "#000099", "clusterLabel": "JSON", "paths": ["./src/Json"] }
    ]

With `tree.json` and `clusters.json` in place the graph can be generated with:

    npm run build && npm run run

This writes the file `graph.json`

### Visualising the graph
Copy the graph into the Visualiser

    cp graph-generator/graph.json ../git-visualiser/public/dataset.json

Run the visualiser

    cd git-visualiser
    npm run start

## Build & Deploy

    cd git-visualiser
    npm run build
    cp -r build/ some/other/path





