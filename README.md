# README

## Installation

    cd graph-generator
    npm i

    cd git-visualiser
    npm i

## Run

Generate a graph

    tree -fJ > tree.json
    cp tree.json graph-generator/
    npm run build && npm run run

Copy the graph into the Visualiser

    cp graph-generator/graph.json ../git-visualiser/public/dataset.json

Run the visualiser

    cd git-visualiser
    npm run start

## Build & Deploy

    cd git-visualiser
    npm run build
    cp -r build/ some/other/path





