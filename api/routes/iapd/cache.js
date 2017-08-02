const iapds = [];

module.exports = {
  all() {
    return iapds;
  },

  get(id) {
    return iapds.find(iapd => iapd.id === id);
  },

  update(iapd) {
    const indexOfExisting = iapds.findIndex(existing => existing.id === iapd.id);
    if (indexOfExisting > -1) {
      iapds[indexOfExisting] = iapd;
    } else {
      iapds.push(iapd);
    }
  }
};
