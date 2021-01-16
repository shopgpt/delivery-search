import { StylesProvider } from "@material-ui/core";
import { title } from "process";
import React from "react";

import styles from "./Table.module.scss";

type LIST = {
  code?: boolean;
  kind?: string;
  level?: number;
  manName?: string;
  manPic?: string;
  remark?: boolean;
  telno?: string;
  telno2?: string;
  time?: number;
  timeString?: string;
  where?: string;
};

type THEAD = {
  name: string;
};

interface BaseProps {
  thead: THEAD[];
  list: LIST[];
}

export default function Table({ thead, list }: BaseProps): React.ReactElement {
  return (
    <div className={styles.Container}>
      <div className={styles.THeadContainer}>
        {thead.map((item) => {
          return (
            <div key={item.name} className={styles.TItem}>
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
      <div className={styles.TBodyContainer}>
        {list.length >= 1 ? (
          list
            .map((item) => {
              return (
                <div className={styles.TBodyItem}>
                  <h4>{item.timeString}</h4>
                  <h4>{item.where}</h4>
                  <h4>{item.kind}</h4>
                </div>
              );
            })
            .reverse()
        ) : (
          <div className={styles.Less}>
            <h4>배송정보를 찾지 못했습니다.</h4>
          </div>
        )}
      </div>
    </div>
  );
}
