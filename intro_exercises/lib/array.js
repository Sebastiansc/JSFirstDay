Array.prototype.myUniq = function () {
  let uniq = [];
  this.forEach(
    function(el) {
      if (uniq.indexOf(el) < 0) {
        uniq.push(el);
      }
    }
  )
  return uniq;
}

Array.prototype.twoSum = function(sum = 0) {
  let indices = [];
  for (let left = 0; left < this.length; left++) {
    for (let right = left + 1; right < this.length; right++) {
      if (this[left] + this[right] === sum) {
        indices.push([left, right]);
      }
    }
  }
  return indices;
}

mu = [1,2,3,2,4,5,1,9,8,9].myUniq()

if (mu === [1,2,3,4,5,9,8]) {
  console.log("myUniq passed.")
} else {
  console.log(`myUniq failed: ${mu}`)
}

ts = [0, 0, 3, -4, 2, 1, -3].twoSum()
if (ts === [[0,1], [2,6]]) {
  console.log("twoSum passed.")
} else {

  console.log(`twoSum failed: ${ts}`)
}

Array.prototype.myTranspose = function () {
  let transposed = []
  for(let i = 0; i < this.length; i++) {
    for(j = 0; j < this[i].length; j++) {
      if (transposed.length <= j) {
        transposed.push([]);
      }
      transposed[j].push(this[i][j]);
    }
  }
  return transposed;
}

Array.prototype.myEach = function (cb) {
  for (let idx = 0; idx < this.length; idx++) {
    cb(this[idx])
  }
  return this
}

Array.prototype.myMap = function (cb) {
  mapped = []
  this.myEach((el) => mapped.push(cb(el)))
  return mapped
}

Array.prototype.myInject = function (cb) {
  // if (arguments.length === 1) {
  //   var cb = arguments[0]
  //   var base = this[0]
  //   var idx = 1
  // } else {
  //   var cb = arguments[1]
  //   var base = arguments[0]
  //   var idx = 0
  // }
  let accum;
  this.myEach(
    function (el) {
      if (accum === undefined) {
        accum = el
      } else {
        accum = cb(accum, el);
      }
    }
  )
  return accum;
}

console.log(['four', 'letter', 'word'].myInject((a,b) => `${a} ${b}`))

console.log(['foo', 'bar', 'baz'].myEach((el) => console.log(el)))
console.log(['Conklin', 'Cruz'].myMap((name)=>`Mr. ${name}`))

let arr = [[1,2,3],[4,5,6],[7,8,9],[1,2,6]]
console.log(arr.myTranspose());

Array.prototype.bubbleSort = function () {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for(let idx = 0; idx < this.length; idx++){
      if (this[idx] > this[idx+1]) {
        let right = this[idx+1];
        this[idx+1] = this[idx];
        this[idx] = right;
        sorted = false
      }
    }
  }
  return this
}

console.log([1,8,3,7,6].bubbleSort())

Array.prototype.bsearch = function (targ) {
  let mid = Math.floor(this.length/2);
  let val = this[mid];
  if (this.length === 0) return NaN
  if (val === targ) {
    return mid;
  } else if (val > targ) {
    return this.slice(0, mid).bsearch(targ);
  } else {
    return mid + 1 + this.slice(mid+1).bsearch(targ)
  }
}


Array.prototype.mergeSort = function() {
  if (this.length <= 1) return this;
  let left = this.slice(0,this.length/2).mergeSort();
  let right = this.slice(this.length/2).mergeSort();

  let merged = []
  while (left.length * right.length) {
    if (left[0] <= right[0]) {
      merged.push(left.shift())
    } else {
      merged.push(right.shift())
    }
  }
  return merged.concat(left.concat(right))
}

function subsets(array) {
  if (!array.length) return [array];
  let val = array[0];
  let prev = subsets(array.slice(1));
  return map_sets(prev, val);
}

function map_sets(arr, val) {
  let withSets = arr.map(el => el.concat(val))
  return withSets.concat(arr)
}
