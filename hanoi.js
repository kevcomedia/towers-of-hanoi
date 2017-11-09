function move(disk, from, to) {
  if (disk != from.values[from.values.length - 1]) {
    throw new Error('Disk is not on top');
  }
  if (disk > to.values[to.values.length - 1]) {
    throw new Error('Can\'t put disk on top of smaller disk');
  }

  to.values.push(from.values.pop());
  return {disk, from: from.name, to: to.name};
}

/* To solve a set of n disks, we solve for the set of n - 1 disks (with the
 * intermediate peg as its end peg), move the remaining (largest) disk to the
 * end peg, then solve the n - 1 set from the intermediate to the end peg.
 *
 * If there are no disks, there's nothing to do.
 */
function* solve(n, from, middle, to) {
  if (n === 0) return;

  yield* solve(n - 1, from, to, middle);
  yield move(n, from, to);
  yield* solve(n - 1, middle, from, to);
}

function* hanoi(n) {
  const left = {values: [], name: 'left'};
  const middle = {values: [], name: 'middle'};
  const right = {values: [], name: 'right'};

  for (let i = n; i > 0; i--) {
    left.values.push(i);
  }

  yield* solve(n, left, middle, right);
}
