//defalt delay 1000 ms
const debounce = (func, delay = 1000) => {
  let timeOut;
  return (...args) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      func.apply(null, args); //this mean apply all args above to func
    }, delay);
  };
};
