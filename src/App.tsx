import { createContext, Dispatch, useReducer } from "react";
import "./App.scss";
import AppRouter from "./Router";

type State = {
  code: string;
  name: string;
  parcelNumber: string;
  item: any;
};

export const INITIAL_STATE = {
  code: "",
  name: "",
  parcelNumber: "",
  item: "",
};

type Action =
  | { type: "GET_CODE"; payload: string }
  | { type: "GET_NAME"; payload: string }
  | { type: "GET_NUMBER"; payload: string }
  | { type: "RESET_STATE" }
  | { type: "GET_STATUS"; payload: any };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "GET_CODE":
      return {
        ...state,
        code: action.payload,
      };
    case "GET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "GET_NUMBER":
      return {
        ...state,
        parcelNumber: action.payload,
      };
    case "GET_STATUS":
      return {
        ...state,
        item: action.payload,
      };
    case "RESET_STATE":
      return {
        ...state,
        code: "",
        name: "",
        parcelNumber: "",
      };
    default:
      return state;
  }
}

type ActionDispatch = Dispatch<Action>;

export const StateContext = createContext<State>(INITIAL_STATE);
export const ActionContext = createContext<ActionDispatch>(() => null);

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <StateContext.Provider value={state}>
      <ActionContext.Provider value={dispatch}>
        <AppRouter />
      </ActionContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
