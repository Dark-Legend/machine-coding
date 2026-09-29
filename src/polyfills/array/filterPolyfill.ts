Array.prototype.customFilter = function (callback, thisArgs) {
  const arr = this;
  const result = [];

  if (!Array.isArray(arr)) return;

  for (let i = 0; i < arr.length; i++) {
    const val = callback.call(thisArgs, arr[i], i, arr);
    if (val) {
      result.push(arr[i]);
    }
  }
  return result;
};
