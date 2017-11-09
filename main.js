const $towers = document.querySelector('#towers');
const $diskCount = document.querySelector('#disks');
const $start = document.querySelector('#start');

let isRunning = false;

const store = new DiskComponentStore();
store.initialize(10);

const pegs = {
  left: pegComponent(),
  middle: pegComponent(),
  right: pegComponent(),
};

for (const p in pegs) {
  pegs[p].attachTo($towers);
}

pegs.left.initialize(store.getDiskComponents(5));

$diskCount.addEventListener('change', function() {
  if (isRunning) return;

  pegs.left.initialize(store.getDiskComponents(this.value));
  pegs.middle.reset();
  pegs.right.reset();
});

$start.addEventListener('click', function() {
  if (isRunning) return;
  isRunning = true;

  pegs.left.initialize(store.getDiskComponents($diskCount.value));
  pegs.middle.reset();
  pegs.right.reset();

  const it = hanoi($diskCount.value);
  const intervalId = setInterval(function() {
    const step = it.next();
    if (step.done) {
      clearInterval(intervalId);
      isRunning = false;
      return;
    }

    const disk = store.getDiskComponent(step.value.disk);
    pegs[step.value.from].popDisk();
    pegs[step.value.to].pushDisk(disk);
  }, 300);
});
