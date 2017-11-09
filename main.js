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
  reset(diskStore, count) {
    this.left.initialize(diskStore.getDiskComponents(count));
    this.middle.reset();
    this.right.reset();
  },
  attachTo($towers) {
    this.left.attachTo($towers);
    this.middle.attachTo($towers);
    this.right.attachTo($towers);
  }
};

pegs.attachTo($towers);
pegs.reset(store, $diskCount.value);

$diskCount.addEventListener('change', function() {
  if (isRunning) return;
  pegs.reset(store, $diskCount.value);
});

$start.addEventListener('click', function() {
  if (isRunning) return;
  isRunning = true;

  pegs.reset(store, $diskCount.value);

  const toh = new TowersOfHanoi();
  toh.initialize($diskCount.value);
  const it = solve(toh);
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
