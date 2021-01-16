import React, { useContext, useEffect, useReducer, useState } from "react";
import { fetchTracking } from "../../api";
import { StateContext, ActionContext } from "../../App";
import { BackButton, Table, NowBox } from "../../components";
import { data } from "./data";
import styles from "./Detail.module.scss";

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

type State = {
  loading: boolean;
  complete: string;
  itemName: string;
  trackingDetails: Tracking[];
  level: number;
};
const INITIAL_STATE: State = {
  loading: false,
  complete: "",
  itemName: "",
  trackingDetails: [],
  level: 0,
};

type Actions = { type: "GET_ITEM"; paylode: any } | { type: "LOADING_START" };

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "GET_ITEM":
      return {
        loading: false,
        complete: action.paylode.complete,
        itemName: action.paylode.itemName,
        trackingDetails: action.paylode.trackingDetails,
        level: action.paylode.level,
      };
    case "LOADING_START":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

const THead = [
  { name: "배송시간" },
  { name: "현재위치" },
  { name: "배송상태" },
];

export default function Detail(): React.ReactElement {
  const state = useContext(StateContext);
  const dispatchs = useContext(ActionContext);

  const [item, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchTrankingData = async () => {
    dispatch({ type: "LOADING_START" });
    try {
      const res = await fetchTracking(state.code, state.parcelNumber);
      if (res) {
        console.log("API 요청", res);
        dispatchs({ type: "GET_STATUS", paylode: res });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(state.item);
    fetchTrankingData();
    // dispatch({ type: "GET_ITEM", paylode: state.item.data });
  }, []);
  useEffect(() => {
    if (!state.item) return;
    console.log("oh start");
    // dispatch({ type: "GET_ITEM", paylode: data });
    // 원래 요청해야하는 주소
    dispatch({ type: "GET_ITEM", paylode: state.item.data });
  }, [state]);

  if (item.loading) return <div>...로딩중</div>;
  return (
    <div className={styles.Container}>
      <BackButton title={"배송정보"} />
      <div className={styles.IntroCard}>
        <NowBox stateNumber={item?.level} />
      </div>
      <Table thead={THead} list={item?.trackingDetails} />
    </div>
  );
}
