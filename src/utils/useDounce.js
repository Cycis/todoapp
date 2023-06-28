const useDebounce = (func, delay) => {
   let timeoutId;

   return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
         func.apply(this, args);
      }, delay);
   };
}

// // Example state change function
// function handleStateChange(newState) {
//    // Your state change logic here
//    console.log("State changed:", newState);
// }

// // Debounce the state change function with a delay of 500ms
// const debouncedStateChange = debounce(handleStateChange, 500);

// This change will also replace the previous one and trigger after 500ms
export default useDebounce;