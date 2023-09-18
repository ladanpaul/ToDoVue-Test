export function useStorage() {
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  function removeItem(key) {
    localStorage.removeItem(key);
  }

  function mergeItem(key, newData) {
    const existingData = getItem(key) || {};
    const mergedValue = { ...existingData, ...newData };
    console.log('mergedValue -> ', mergedValue);
    setItem(key, mergedValue);
  }

  // function mergeItem(key, newData) {
  //   const existingData = getItem(key) || [];
  //   console.log('newData -> ', newData);
  //   const mergedValue = [...new Set([...existingData, ...newData])];
  //   setItem(key, mergedValue);
  // }

  return {
    setItem,
    getItem,
    mergeItem,
    removeItem,
  };
}
