"use strict";

module.exports = {
  add: function (strList) {
    var delimiter = strList.substr(0, 2) === '//' ? strList.substr(2, 1) : ',';
    return
    strList.replace('//', '')
      .replace(/\n/g, delimiter)
      .split(delimiter)
      .map(Number)
      .reduce((sum, value) => sum + value);
  }
}