import React from "react";
import { GlobalStateContextType } from "../utils";

export const GlobalStateContext =
  React.createContext<GlobalStateContextType | null>(null);
