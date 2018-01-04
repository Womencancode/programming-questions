/**
 * DP solution to compute the number of ways to make change
 * given a value and a collection of available coins
 * 
 * @author Janicklas Ralph
 * @param {Number} n - The change to make
 * @param {Number[]} coins - The coins available
 * @return {Number} - Number of ways to make change
 */
function main(n, coins) {
  // Initialize an array of size the value of n
  // This is used to compute the output bottom up
  const initArr = Array(n + 1).fill(0);
  initArr[0] = 1;

  const result = coins.reduce((res, coin) => {
    res.forEach((_, i) => {
      res[i] = coin > i ? res[i] : res[i] + res[i - coin];
    });

    return res;
  }, initArr);

  return result[n];
}
