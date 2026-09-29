Array.prototype.customMap = function (callback, args) {
  const arr = this;
  const result = [];
  if (!Array.isArray(arr)) return;

  for (let i = 0; i < arr.length; i++) {
    result.push(callback.call(args, arr[i], i, arr));
  }
  return result;
};
