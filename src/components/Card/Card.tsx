import React, { useContext, useEffect, useState } from "react";
import { NowBox, Table } from "../index";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { ListContext, ListActionContext } from "../../pages/list/List";
import styles from "./Card.module.scss";

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

interface BaseProps {
  item: ListType;
}

export default function Card({ item }: BaseProps): React.ReactElement {
  const state = useContext(ListContext);
  const dispatchs = useContext(ListActionContext);

  const [oneList, setOneList] = useState<Tracking[]>([]);

  const onDelete = () => {
    const res = localStorage.getItem("items");
    const list: ListType[] = JSON.parse(String(res));
    const newArr = list.filter((v) => v.parcelNumber !== item.parcelNumber);
    localStorage.setItem("items", JSON.stringify(newArr));
    dispatchs({ type: "GET_LIST", paylode: newArr });
  };

  useEffect(() => {
    let arr = [];
    arr.push(item.trackingDetails.reverse()[0]);
    setOneList(arr);
    // console.log(arr);
  }, []);
  return (
    <div className={styles.Container}>
      <div className={styles.ButtonContainer}>
        <button onClick={onDelete}>
          <HighlightOffIcon fontSize="large" />
        </button>
      </div>
      <div className={styles.Content}>
        <div className={styles.IntroContainer}>
          <div className={styles.NowContainer}>
            <NowBox onlyOne={true} stateNumber={item.level} />
          </div>
          <div className={styles.TableContainer}>
            <Table list={oneList} />
          </div>
        </div>
        <div className={styles.TextContainer}>
          <h4>상품명: {item.itemName}</h4>
        </div>
      </div>
    </div>
  );
}
