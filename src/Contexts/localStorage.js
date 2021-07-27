

/**
 * get data from local storage
 * @param {String} stateName 
 * @returns Object {}
 */
export const loadState = (stateName) => {
    try {
      const serializedState = localStorage.getItem(stateName);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 

/**
 * Store data in local storage
 * @param {String} stateName  key
 * @param {Object} state  value
 */
export const saveState = (stateName, state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(stateName, serializedState);
      } catch {
        // ignore write errors
      }
};