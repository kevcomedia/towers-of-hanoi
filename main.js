const $towers = document.querySelector('#towers');
const $diskCount = document.querySelector('#disks');

let isRunning = false;

const pegs = {
  start: pegComponent(),
  middle: pegComponent(),
  end: pegComponent(),
};

for (const p in pegs) {
  pegs[p].attachTo($towers);
}

pegs.start.initialize(5);

$diskCount.addEventListener('change', function() {
  if (isRunning) return;

  pegs.start.initialize(this.value);
});
