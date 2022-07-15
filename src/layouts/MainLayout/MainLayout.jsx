import styles from "./MainLayout.module.scss";

const MainLayout = ({ component }) => {
  return <div className={styles.container}>{component}</div>;
};

export default MainLayout;
