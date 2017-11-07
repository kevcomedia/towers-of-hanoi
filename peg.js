function pegComponent() {
  const peg = document.createElement('div');
  peg.classList.add('peg');

  return {
    initialize(diskCount) {
      peg.innerHTML = '';
      for (let i = 0; i < diskCount; i++) {
        const disk = document.createElement('div');
        disk.classList.add('disk', `disk-${i}`);
        peg.appendChild(disk);
      }
    },
    pushDisk(disk) {
      peg.insertBefore(disk, peg.firstChild);
    },
    popDisk() {
      if (!peg.firstChild) throw new Error('No more disks');
      return peg.removeChild(peg.firstChild);
    },
    attachTo(el) {
      el.appendChild(peg);
    },
  };
}
