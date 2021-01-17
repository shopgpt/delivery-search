import React from "react";

import style from "./Card.module.scss";

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

interface BaseProps {
  item: ListType;
}

export default function Card({ item }: BaseProps): React.ReactElement {
  return (
    <div>
      <h1>{item.complete}</h1>
      <h1>{item.itemName}</h1>
      <h1>{item.level}</h1>
      {/* <h1>{item.trackingDetails.reverse()[0]}</h1> */}
    </div>
  );
}
