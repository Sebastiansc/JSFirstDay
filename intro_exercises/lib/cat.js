`function Cat (name, owner) {
  this.owner = owner;
  this.name = name;

}

Cat.prototype.cuteStatement = function () {
  return `${this.owner} loves ${this.name}`;
}

Cat.prototype.meow = function () {
  console.log(`${this.name} is meowing`);
}
`
