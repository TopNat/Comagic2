export const setSessionData = (name: string, id: string) => {
  localStorage.setItem("name", name);
  localStorage.setItem("id", id);
};

export const getSessionData = () => {
  const data = {
    name: localStorage.getItem("name"),
    id: localStorage.getItem("id"),
  };
  return data;
};

export const clearSessionData = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("id");
};
