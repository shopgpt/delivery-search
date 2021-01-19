import React, { useContext, useEffect, useReducer, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { fetchTracking } from "../../api";
import { StateContext, ActionContext } from "../../App";
import { BackButton, Table, NowBox } from "../../components";
import { data } from "./data";
import styles from "./Detail.module.scss";
import { Button } from "@material-ui/core";

export type Tracking = {
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

export type State = {
  loading: boolean;
  complete: string;
  itemName: string;
  trackingDetails: Tracking[];
  level: number;
  parcelNumber: string;
  code: string;
};

const INITIAL_STATE: State = {
  loading: false,
  complete: "",
  itemName: "",
  trackingDetails: [],
  level: 0,
  parcelNumber: "",
  code: "",
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
        parcelNumber: action.paylode.parcelNumber,
        code: action.paylode.code,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export default function Detail(): React.ReactElement {
  const state = useContext(StateContext);
  const dispatchs = useContext(ActionContext);
  const [item, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [name, setName] = useState("");

  const classes = useStyles();

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
    const result: State[] = JSON.parse(String(res));
    const newItem: State = {
      loading: item.loading,
      complete: item.complete,
      itemName: name,
      trackingDetails: item.trackingDetails,
      level: item.level,
      parcelNumber: state.parcelNumber,
      code: state.code,
    };
    const condition: boolean = result?.some(
      (item) => item?.parcelNumber === newItem.parcelNumber
    );
    if (condition) {
      alert("이미 등록된 배송정보 입니다.");
      return;
    }
    if (res) {
      const newArr = result.concat(newItem);
      localStorage.setItem("items", JSON.stringify(newArr));
      alert("배송정보가 리스트에 저장 되었습니다.");
      return;
    }
    const newArr = [newItem];
    localStorage.setItem("items", JSON.stringify(newArr));
    alert("배송정보가 리스트에 저장 되었습니다.");
  };

  // 랜더링시 state에 있는 값으로 API요청
  useEffect(() => {
    console.log(state);
    fetchTrankingData();
  }, []);

  //  API요청이 성공하면 state의 값이 변경되어 아래 useEffect 이벤트 실행
  useEffect(() => {
    if (!state.item) return;
    // dispatch({ type: "GET_ITEM", paylode: data });
    // 원래 요청해야하는 주소
    // 현재 페이지에서 관리할 state값 저장
    dispatch({ type: "GET_ITEM", paylode: state.item.data });
  }, [state]);

  if (item.loading) return <div>...로딩중</div>;
  return (
    <div className={styles.Container}>
      <BackButton title={"배송정보"} />
      <div className={styles.IntroCard}>
        <NowBox stateNumber={item?.level} />
      </div>
      <Table list={item.trackingDetails} />
      <div className={styles.BtnContainer}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="상품명을 작성해 주세요"
            variant="outlined"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={saveItem} variant="contained" color="primary">
            리스트에 저장하기
          </Button>
        </form>
      </div>
    </div>
  );
}
