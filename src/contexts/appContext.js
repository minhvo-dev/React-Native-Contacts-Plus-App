import React from "react";
import { initialState, reducer } from "../reducers/reducer";

export const StateContext = React.createContext({});
export const DispatchContext = React.createContext({});

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default AppContextProvider;