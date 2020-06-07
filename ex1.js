const dependencyGraph = [
  [],
  [],
  [1],
  [0],
  [],
  [3],
  [2, 4, 5],
  [5, 6]
];

function resolveGraph(graph) {
  let order = [];

  while (graph.some(v => !!v)) {
    for (let i = 0; i < graph.length; i++) {
      if (graph[i] === null) continue;
  
      if (graph[i].length === 0) {
        order.push(i);
        graph[i] = null;
      } else {
        graph[i] = graph[i].filter(dependency => !order.includes(dependency));
      }
    }
  }

  return order;
}

const dependencyOrder = resolveGraph(dependencyGraph);

console.log('correct order: ', dependencyOrder);