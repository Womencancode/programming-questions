/**
 * Builds a nxn matrix using a bottom-up approach
 * 
 * @author Janicklas Ralph
 * @param {string} str - Input string
 * @return {Array} The dp matrix
 */
const longestPalindromeSubseq = (str) => {
  // Initialize a nxn matrix with diagonal set to 1
  // Pad the lower diagonal values with 0 as we don't use them
  const result = [...str].map(
    (_, i) => Array.from('1'.padStart(i + 1, 0)).map(Number)
  );

  for (let i = 1; i < str.length; i++) {
    for (let j = 0; j < str.length - i; j++) {
      const row = j;
      const col = j + i;
      result[row][col] = str[row] === str[col] ?
        2 + result[row + 1][col - 1] :
        Math.max(result[row][col - 1], result[row + 1][col]);
    }
  }

  return result;
};

/**
 * Traverse a bottom-up matrix to find the longest palindrome
 * 
 * @param {string} str - Input string
 * @param {Array} dpMatrix - The bottom-up matrix
 * @return {Array} The dp matrix
 */
const getSubseq = (str, dpMatrix) => {
  let row = 0;
  let col = dpMatrix.length - 1;
  const lp = [];

  while (dpMatrix[row][col] !== 0) {
    if (dpMatrix[row][col - 1] === dpMatrix[row][col]) {
      col -= 1;
    } else if (dpMatrix[row + 1][col] === dpMatrix[row][col]) {
      row += 1;
    } else {
      lp.push(str[row]);
      row += 1;
      col -= 1;
    }
  }

  // We get half of the longest palindrome from the dpMatrix
  // Generate the other half
  return [
    ...lp,
    ...lp.slice(0, lp.length - lp.length % 2).reverse(),
  ];
};

const main = (str) => {
  const dpMatrix = longestPalindromeSubseq(str);
  const longestPalindrome = getSubseq(str, dpMatrix);

  console.log(longestPalindrome);
};
