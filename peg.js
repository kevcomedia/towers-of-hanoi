function pegComponent() {
  const peg = document.createElement('div');
  peg.classList.add('peg');

  return {
    initialize(diskComponents) {
      peg.innerHTML = '';
      for (let i = 0; i < diskComponents.length; i++) {
        peg.appendChild(diskComponents[i]);
      }
    },
    reset() {
      peg.innerHTML = '';
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
