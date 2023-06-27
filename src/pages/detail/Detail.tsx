import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import { ActionContext, StateContext } from "../../App";
import { fetchTracking } from "../../api";
import { BackButton, NowBox, Table } from "../../components";
import { useSearchQuery } from "../../util/useSearchQuery";
import styles from "./Detail.module.scss";

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

export type Param = {
  company: string;
  id: string;
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

type Actions = { type: "GET_ITEM"; payload: any } | { type: "LOADING_START" };

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "GET_ITEM":
      return {
        loading: false,
        complete: action.payload.complete,
        itemName: action.payload.itemName,
        trackingDetails: action.payload.trackingDetails,
        level: action.payload.level,
        parcelNumber: action.payload.parcelNumber,
        code: action.payload.code,
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
  const query = useSearchQuery();
  const company = query.get("company") || "";
  const id = query.get("id") || "";

  const fetchTrackingData = useCallback(async () => {
    dispatch({ type: "LOADING_START" });
    try {
      const res = await fetchTracking(company, id);
      if (res) {
        dispatchs({ type: "GET_STATUS", payload: res });
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispatchs, company, id]);

  // 랜더링시 state에 있는 값으로 API요청
  useEffect(() => {
    fetchTrackingData();
  }, [fetchTrackingData]);

  //  API요청이 성공하면 state의 값이 변경되어 아래 useEffect 이벤트 실행
  useEffect(() => {
    if (!state.item) return;
    dispatch({ type: "GET_ITEM", payload: state.item.data });
  }, [state]);

  if (item.loading) return <div>...로딩중</div>;
  return (
    <div className={styles.Container}>
      <BackButton title={"배송정보"} />
      <div className={styles.IntroCard}>
        <NowBox stateNumber={item?.level} />
      </div>
      <Table list={item.trackingDetails} />
    </div>
  );
}
