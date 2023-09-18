export function useStorage() {
  function setItem(key, value) {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return value;
  }

  function getItem(key) {
    if (process.client) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }

    return null;
  }

  function removeItem(key) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  }

  function mergeItem(key, newData) {
    const existingData = getItem(key) || {};
    const mergedValue = { ...existingData, ...newData };
    setItem(key, mergedValue);
    return mergedValue;
  }

  return {
    setItem,
    getItem,
    mergeItem,
    removeItem,
  };
}
