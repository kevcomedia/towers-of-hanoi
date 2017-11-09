const $towers = document.querySelector('#towers');
const $diskCount = document.querySelector('#disks');

let isRunning = false;

const pegs = {
  left: pegComponent(),
  middle: pegComponent(),
  right: pegComponent(),
};

for (const p in pegs) {
  pegs[p].attachTo($towers);
}

pegs.left.initialize(5);

$diskCount.addEventListener('change', function() {
  if (isRunning) return;

  pegs.left.initialize(this.value);
});
