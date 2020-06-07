const graph = {
  0: { 1: 2, 4: 3 },
  1: { 0: 2, 3: 8, 5: 9, 6: 6 },
  2: { 5: 3, 6: 7 },
  3: { 1: 8, 7: 6 },
  4: { 0: 3, 6: 5, 7: 9 },
  5: { 1: 9, 2: 3, 6: 4, 7: 5 },
  6: { 1: 6, 2: 7, 4: 5, 5: 4 },
  7: { 3: 6, 4: 9, 5: 5 },
};

// 0: 0
// 1: 2
// 2: 15
// 3: 10
// 4: 3
// 5: 11
// 6: 8
// 7: 12

function shortestPath(graph, start, target) {
  let cost = 0;
  let path = [start];

  while (!path.includes(target)) {
    const currentNode = graph[path[path.length - 1]];

    const neighbors = Object.entries(currentNode)
      .map(([node, edgeValue]) => ({ node: +node, edgeValue }));
    
    const validNeighbors = neighbors.filter((n) => !path.includes(n.node));

    let nearestNeighbor = null;
    let finished = false;
    for (let i = 0; i < validNeighbors.length; i++) {
      if (validNeighbors[i].node === target) {
        cost += validNeighbors[i].edgeValue;
        path.push(validNeighbors[i].node);
        finished = true;
        break;
      }

      if (!nearestNeighbor) {
        nearestNeighbor = validNeighbors[i];
      } else if (nearestNeighbor.edgeValue > validNeighbors[i].edgeValue) {
        nearestNeighbor = validNeighbors[i];
      }
    }

    if (!finished) {
      cost += nearestNeighbor.edgeValue;
      path.push(nearestNeighbor.node);
    }
  }

  return { cost, path };
}

Object.keys(graph).forEach((node) => {
  const { cost, path } = shortestPath(graph, 0, +node);
  console.log(`Vertex, Cost, Path -> ${node}, ${cost}, ${path.join('-')}`)
})