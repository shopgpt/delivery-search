import React from "react";

import classNames from "classnames";

import styles from "./NowBox.module.scss";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import ChatIcon from "@material-ui/icons/Chat"; // 집화완료
import LocalShippingIcon from "@material-ui/icons/LocalShipping"; //배송중
import StoreIcon from "@material-ui/icons/Store"; //지점도착
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"; //배송완료

interface BaseProps {
  stateNumber: number;
  onlyOne?: boolean;
}

export default function NowBox({
  stateNumber,
  onlyOne = false,
}: BaseProps): React.ReactElement {
  const list = [
    {
      id: 1,
      icon: <AlarmOnIcon />,
      state: "준비중",
    },
    {
      id: 2,
      icon: <ChatIcon />,
      state: "집화완료",
    },
    {
      id: 3,
      icon: <LocalShippingIcon />,
      state: "배송중",
    },
    {
      id: 4,
      icon: <StoreIcon />,
      state: "지점 도착",
    },
    {
      id: 5,
      icon: <LocalShippingIcon />,
      state: "배송출발",
    },
    {
      id: 6,
      icon: <AssignmentTurnedInIcon />,
      state: "배송완료",
    },
  ];

  return (
    <div className={styles.Container}>
      <div className={styles.TextContainer}>
        {!onlyOne ? (
          list.map((item) => {
            return (
              <ItemCard
                // onlyOne={onlyOne}
                key={item.id}
                item={item}
                stateNumber={stateNumber}
              />
            );
          })
        ) : (
          <ItemCard item={list[stateNumber - 1]} stateNumber={stateNumber} />
        )}
      </div>
    </div>
  );
}

type Item = {
  id: number;
  icon: JSX.Element;
  state: string;
};

interface Props {
  item: Item;
  stateNumber: number;
}
function ItemCard({ item, stateNumber }: Props): React.ReactElement {
  const test = "ItemContainerActive";
  const ItemClass = classNames(styles.ItemContainer, {
    [styles[test]]: item.id === stateNumber,
  });
  return (
    <div key={item.id} className={ItemClass}>
      {item.icon}
      <p>{item.state}</p>
    </div>
  );
}
