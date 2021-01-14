import React from "react";
import { Link } from "react-router-dom";

import styles from "./Nav.module.scss";

export default function Nav(): React.ReactElement {
  return (
    <div className={styles.Container}>
      <nav className={styles.NavContainer}>
        <ul>
          <li>
            <Link to="/">
              <a>HOME</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
