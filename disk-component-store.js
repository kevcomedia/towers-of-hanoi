class DiskComponentStore {
  constructor() {
    this._diskComponents = [];
  }

  initialize(count) {
    for (let i = 1; i <= count; i++) {
      const diskComponent = document.createElement('div');
      diskComponent.classList.add('disk');
      diskComponent.id = `disk-${i}`;
      this._diskComponents[i] = diskComponent;
    }
  }

  getDiskComponent(n) {
    return this._diskComponents[n];
  }

  getDiskComponents(count) {
    return this._diskComponents.slice(1, +count + 1);
  }
}
