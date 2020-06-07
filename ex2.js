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

function getLowestCostKnownNode(costs, processedNodes) {
  const knownNodes = Object.keys(costs);

  return knownNodes.reduce((lowest, node) => {
    if (!processedNodes.includes(node)) {
      if (lowest === null || costs[node] < costs[lowest]) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
}

function shortestPath(graph, start, target) {
  if (start === +target) return { cost: 0, path: [start] };

  const calculatedCosts = Object.assign({ [target]: Infinity }, graph[start]);
  const parents = { [target]: null };
  Object.keys(graph[start]).forEach((n) => {
    parents[n] = start;
  });
  const processedNodes = [];

  let node = getLowestCostKnownNode(calculatedCosts, processedNodes);
  while (node) {
    const cost = calculatedCosts[node];
    const neighbors = graph[node];

    Object.entries(neighbors).forEach(([n, value]) => {
      const newCost = cost + value;
      if (!calculatedCosts[n]) {
        calculatedCosts[n] = newCost;
        parents[n] = node;
      }
      if (calculatedCosts[n] > newCost) {
        calculatedCosts[n] = newCost;
        parents[n] = node;
      }
    });

    processedNodes.push(node);
    node = getLowestCostKnownNode(calculatedCosts, processedNodes);
  }

  const path = [target];
  let parent = parents[target];
  while (parent !== start) {
    path.unshift(parent);
    parent = parents[parent];
  }
  path.unshift(start);

  return { cost: calculatedCosts[target], path };
}

Object.keys(graph).forEach((node) => {
  const { cost, path } = shortestPath(graph, 0, node);
  console.log(`Vertex, Cost, Path -> ${node}, ${cost}, ${path.join('-')}`);
});
