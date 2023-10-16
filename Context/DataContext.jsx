import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = {
  theme: localStorage.getItem("myTheme") === null ? "Light" : localStorage.getItem("myTheme") === "Light" ? "Light" : "Dark",
};



const reducer = (state, action) => {
  switch (action.type) {

      case "CHANGE_THEME":
        return {...state,theme: action.newTheme }

    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  
  const changeTheme = (newLocalTheme /*theme === "Light" ? "Dark" : "Light"*/)=>{
    localStorage.setItem("myTheme", newLocalTheme  /*theme === "Light" ? "Dark" : "Light"*/)

    dispatch({type:"CHANGE_THEME", newTheme: newLocalTheme  /*theme === "Light" ? "Dark" : "Light"*/})
  }
  return (
    <ThemeContexttt.Provider value={{ ...firstState, changeTheme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
