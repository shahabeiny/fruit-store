export const  getTokenStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const storage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '')
      ;
      return storage?.token; 
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
      return null;
    }
  }
  return null;
}