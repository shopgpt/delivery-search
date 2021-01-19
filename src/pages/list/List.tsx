import React, { useEffect, useReducer, Dispatch, createContext } from "react";
import { fetchTracking } from "../../api";
import { ActionContext } from "../../App";
import { Card } from "../../components";

import styles from "./List.module.scss";

type Tracking = {
  code: boolean;
  kind: string;
  level: number;
  manName: string;
  manPic: string;
  remark: boolean;
  telno: string;
  telno2: string;
  time: number;
  timeString: string;
  where: string;
};

type ListType = {
  code: string;
  parcelNumber: string;
  complete: string;
  itemName: string;
  trackingDetails: Tracking[];
  level: number;
};

interface State {
  loading: boolean;
  list: ListType[];
}

const INITIAL_STATE: State = {
  list: [],
  loading: false,
};

type Actions = { type: "GET_LIST"; paylode: ListType[] } | { type: "LOADING" };

type ActionDispatchs = Dispatch<Actions>;

export const ListContext = createContext<State>(INITIAL_STATE);
export const ListActionContext = createContext<ActionDispatchs>(() => null);

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "GET_LIST":
      return {
        ...state,
        list: action.paylode,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default function List(): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const res = localStorage.getItem("items");
    const list: ListType[] = JSON.parse(String(res));
    dispatch({ type: "GET_LIST", paylode: list });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  // if (!state.loading) return <div>...로딩중</div>;
  return (
    <ListContext.Provider value={state}>
      <ListActionContext.Provider value={dispatch}>
        <div className={styles.Container}>
          {state.list.map((item) => {
            return <Card key={parseInt(item.parcelNumber)} item={item} />;
          })}
        </div>
      </ListActionContext.Provider>
    </ListContext.Provider>
  );
}

// const fetchTrankingData = async (code: string, parcelNumber: string) => {
//   try {
//     const res = await fetchTracking(code, parcelNumber);
//     console.log(res);
//     if (res) {
//       dispatch({ type: "GET_LIST", paylode: res.data });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
