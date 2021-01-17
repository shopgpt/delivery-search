import React, { useEffect, useReducer, useState } from "react";
import { fetchTracking } from "../../api";
import { ActionContext } from "../../App";
import { Card } from "../../components";

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
  complete: string;
  itemName: string;
  trackingDetails: Tracking[];
  level: number;
};

interface State {
  list: ListType[];
}

const INITIAL_STATE = {
  list: [],
};

type Actions = { type: "GET_LIST"; paylode: any };

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "GET_LIST":
      return {
        ...state,
        list: [
          ...state.list,
          {
            complete: action.paylode.complete,
            itemName: action.paylode.itemName,
            trackingDetails: action.paylode.trackingDetails,
            level: action.paylode.level,
          },
        ],
      };
    default:
      return state;
  }
}

export default function List(): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchTrankingData = async (code: string, parcelNumber: string) => {
    try {
      const res = await fetchTracking(code, parcelNumber);
      console.log(res);
      if (res) {
        dispatch({ type: "GET_LIST", paylode: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const res = localStorage.getItem("items");
    const list: { code: string; parcelNumber: string }[] = JSON.parse(
      String(res)
    );
    for (let item of list) {
      fetchTrankingData(item.code, item.parcelNumber);
    }
  }, []);
  return (
    <div>
      {state?.list?.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
}
