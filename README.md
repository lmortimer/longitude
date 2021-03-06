# Longitude
Graph and visualise git repositories. View the [live demo](https://lmortimer.github.io/longitude/demo/index.html).

The repository is split into two parts:

1. `generator` - Generates the graph using [graphology](https://github.com/graphology/graphology) and writes it to `generator/graph.json`.
2. `visualiser` - Renders the graph using [sigma.js](https://github.com/jacomyal/sigma.js).

![Longitude](./docs/visualiser.png)

## Installation

    cd generator
    npm i

    cd visualiser
    npm i

## Usage

### Generate the graph
The graph is structured on directory and file directory structure of the git repository. This is generated using the tool `tree`.

    cd some/git/repository
    tree -fJ > tree.json
    cp tree.json generator/

You can specify clusters in `clusters.json`. When the graph is generated the cluster will be added as an attribute to each node. `visualiser` will colour branches of the graph based on this cluster.

    cat clusters.json

    [
        { "key": "0", "color": "#666666", "clusterLabel": "Project", "paths": ["./"] },
        { "key": "1", "color": "#990000", "clusterLabel": "HTML", "paths": ["./src/Html"] },
        { "key": "2", "color": "#000099", "clusterLabel": "JSON", "paths": ["./src/Json"] }
    ]

With `tree.json` and `clusters.json` in place the graph can be generated with:

    npm run build && npm run run

This writes the file `graph.json`

### Render the graph
Copy the graph into the Visualiser

    cp generator/graph.json ../visualiser/public/dataset.json

Run the visualiser

    cd visualiser
    npm run start

## Build & Deploy

    cd visualiser
    npm run build
    cp -r build/ some/other/path





