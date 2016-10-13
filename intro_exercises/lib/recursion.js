function range(start, end) {
  if (start > end) return []
  return [start].concat(range(start+1, end))
}

console.log(range(1,100))

function exp(base, pow) {
  if (pow === 0) return 1;
  if (pow === 1) return base;
  if (pow % 2) {
    let root = exp(base,(pow-1)/2)
    return base * root * root
  } else {
    let root = exp(base, pow/2)
    return root*root
  }
}
console.log(exp(2,30))

function fib(n) {
  if (n === 0) return [];
  if (n === 1) return [1];
  if (n === 2) return [1,1];
  let prev = fib(n-1, a, b);
  prev.push(prev[prev.length-1]+prev[prev.length-2]);
  return prev;
}


function makeChange(val, coins) {
  let idx = coins.indexOf(val);
  if (idx > 0) return [coins[idx]];
  if (val < 0) return null;
  let results = coins.map(
    (coin) => [coin].concat(makeChange(val-coin, coins))
  ).filter((x)=>x.indexOf(null) === -1);
  let result = null
  results.forEach(
    function(cand) {
      if (!result || result.length > cand.length) {
        result = cand
      }
    }
  )
  return result
}
