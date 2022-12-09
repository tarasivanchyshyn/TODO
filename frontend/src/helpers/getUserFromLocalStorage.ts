export const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '');
  } catch (error) {
    return null;
  }
};
