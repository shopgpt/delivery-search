import Nav from "../Nav";
import styles from "./Layout.module.scss";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): React.ReactElement {
  return (
    <div className={styles.Container}>
      <Nav />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
