const $towers = document.querySelector('#towers');

const pegs = {
  start: pegComponent(),
  middle: pegComponent(),
  end: pegComponent(),
};

for (const p in pegs) {
  pegs[p].attachTo($towers);
}

pegs.start.initialize(5);
