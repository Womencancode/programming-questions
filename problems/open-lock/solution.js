const modulo = (n, m) => (((n % m) + m) % m); // Modulo alternative to handle negatives 
const moduloLock = (n) => modulo(n, 10); // Bind the key size to modulo

const turn = (turnValue) => (slot, i, slots) => {
  return [
    ...slots.slice(0, i),
    moduloLock(slot + turnValue),
    ...slots.slice(i + 1),
  ].join('');
};

/**
 * Given a node, compute its children nodes
 * Each child node is a result of turning one of the circular wheels
 * clockwise or anticlockwise. Each node has 4 x 2 possible children
 * 
 * @param {String} root
 * @returns {String[]} Array of children nodes
 */
const getChildNodes = (root) => {
  const slots = root.split('').map(Number);
  const clockwiseTurns = slots.map(turn(1));
  const anticlockwiseTurns = slots.map(turn(-1));

  return [...clockwiseTurns, ...anticlockwiseTurns];
};

/**
 * Constructs a tree dynamically for each lock combination
 * Traverse the tree using BFS and look for the target
 * 
 * @author Janicklas Ralph
 * @param {String[]} deadends
 * @param {String} target
 * @return {Number}
 */
const main = function(deadends, target) {
  let deadendSet = new Set(deadends); // Convert to set for quicker lookup
  let visited = new Set(); // Visited set
  let queue = [{ node: '0000', level: 1 }]; // BFS queue
  let queueIndex = 0;

  while (queueIndex <= queue.length) {
    // Use index to iterate over the queue as Array.shift is computationally intensive
    const { node, level } = queue[queueIndex++];

    visited.add(node);

    for (let child of getChildNodes(node)) {
      if (child === target) return level;

      if (!visited.has(child) && !deadendSet.has(child)) {
        queue.push({ node: child, level: level + 1 });
      }
    }
  }

  return -1;
};
