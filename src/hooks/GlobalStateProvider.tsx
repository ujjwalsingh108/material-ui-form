import React from "react";
import { GlobalStateProviderProps } from "../utils";
import { GlobalStateContext } from "./GlobalStateContext";
import { initialState, reducer } from "./Reducer";

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
