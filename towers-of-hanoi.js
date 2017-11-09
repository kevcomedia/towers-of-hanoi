class TowersOfHanoi {
  constructor() {
    this.reset();
  }

  reset() {
    const left = {values: [], name: 'left'};
    const middle = {values: [], name: 'middle'};
    const right = {values: [], name: 'right'};
    this.pegs = {left, middle, right};
    this.disks = 0;
  }

  initialize(n) {
    this.pegs.left.values = Array.from({length: n}, (_, i) => n - i);
    this.pegs.middle.values.length = 0;
    this.pegs.right.values.length = 0;
    this.disks = n;
  }

  move(from, to) {
    const fromPeg = this.pegs[from].values;
    const toPeg = this.pegs[to].values;
    const diskOnFromPeg = fromPeg[fromPeg.length - 1];
    const diskOnToPeg = toPeg[toPeg.length - 1];

    if (diskOnFromPeg > diskOnToPeg) {
      throw new Error('Can\'t put disk on top of larger disk');
    }

    fromPeg.pop();
    toPeg.push(diskOnFromPeg);
    return {disk: diskOnFromPeg, from, to};
  }
}

function* solve(toh) {
  function* s(n, from, middle, to) {
    if (n === 0) return;

    yield* s(n - 1, from, to, middle);
    yield toh.move(from, to);
    yield* s(n - 1, middle, from, to);
  }

  yield* s(toh.disks, 'left', 'middle', 'right');
}
