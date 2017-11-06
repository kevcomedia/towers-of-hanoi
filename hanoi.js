function move(disk, from, to) {
  if (disk != from[from.length - 1]) {
    throw new Error('Disk is not on top');
  }
  if (disk > to[to.length - 1]) {
    throw new Error('Can\'t put disk on top of smaller disk');
  }

  to.push(from.pop());
}

/* To solve a set of n disks, we solve for the set of n - 1 disks (with the
 * intermediate peg as its end peg), move the remaining (largest) disk to the
 * end peg, then solve the n - 1 set from the intermediate to the end peg.
 *
 * If there are no disks, there's nothing to do.
 */
function solve(n, from, middle, to) {
  if (n === 0) return;

  solve(n - 1, from, to, middle);
  move(n, from, to);
  solve(n - 1, middle, from, to);
}