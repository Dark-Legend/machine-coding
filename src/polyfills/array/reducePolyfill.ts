Array.prototype.customReduce = function (callback, initialValue) {
  const arr = this;

  if (!Array.isArray(arr)) return;

  for (let i = 0; i < arr.length; i++) {
    callback.call(initialValue, initialValue, arr[i], i, arr);
  }
  return initialValue;
};
