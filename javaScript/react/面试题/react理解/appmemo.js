function memoizedSquare(a) {
  let memoizedResults = {
    10: 100
  };

  return function sq(a) {
    if (a in memoizedResults) {
      return memoizedResults[a];
    } else {
      console.log('calculating square...')
      let result = a * a;
      memoizedResults[a] = result;
      return result;
    }
  }
}

const memoSq = memoizedSquare();

console.log(memoSq(2))
console.log(memoSq(3))
console.log(memoSq(100))
console.log(memoSq(2))
