import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./BackButton.module.scss";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

interface BaseProps {
  title?: string;
}
export default function BackButton({ title }: BaseProps): React.ReactElement {
  const history = useHistory();
  return (
    <div className={styles.Container}>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        <KeyboardBackspaceIcon />
      </button>
      {title && <h2>{title}</h2>}
    </div>
  );
}
