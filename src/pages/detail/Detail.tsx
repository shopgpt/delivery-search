import React, { useContext, useEffect, useReducer } from "react";
import { fetchTracking } from "../../api";
import { StateContext, ActionContext } from "../../App";
import { BackButton, Table, NowBox, Modal } from "../../components";
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
        dispatchs({ type: "GET_STATUS", paylode: res });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveItem = (): void => {
    if (state.parcelNumber === "") return alert("배송정보를 찾을 수 없습니다.");
    const res = localStorage.getItem("items");
    const result: { code: string; parcelNumber: string }[] = JSON.parse(
      String(res)
    );
    const newItem = {
      code: state.code,
      parcelNumber: state.parcelNumber,
    };
    const condition: boolean = result?.some(
      (item) => item.parcelNumber === newItem.parcelNumber
    );
    if (condition) {
      alert("이미 등록된 배송정보 입니다.");
      return;
    }
    if (res) {
      const newArr = result.concat(newItem);
      localStorage.setItem("items", JSON.stringify(newArr));
      return;
    }
    const newArr = [newItem];
    localStorage.setItem("items", JSON.stringify(newArr));
  };

  useEffect(() => {
    console.log(state);
    fetchTrankingData();
  }, []);
  useEffect(() => {
    if (!state.item) return;
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
      <button onClick={saveItem}>내 배송리스트에 저장하기</button>
      <div className={styles.ModalContainer}>
        <Modal item={item} />
      </div>
    </div>
  );
}
