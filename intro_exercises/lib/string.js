String.prototype.substrings = function () {
  let subs = [];
  for (let left = 0; left < this.length; left++) {
    for (let right = left + 1; right <= this.length; right++) {
      subs.push(this.slice(left, right))
    }
  }
  return subs;
}
