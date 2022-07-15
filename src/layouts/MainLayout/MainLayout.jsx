import { Navbar } from "../../components";
import styles from "./MainLayout.module.scss";

const defaultNavbarProps = {
  titleProps: {
    title: "",
    isEditIconVisible: false,
    isBackIconVisible: false,
    brandName: "",
  },
  progress: 0,
};

const MainLayout = ({ children, navbarProps = defaultNavbarProps }) => {
  return (
    <section className={styles.container}>
      <Navbar {...navbarProps} />
      <main>{children}</main>
    </section>
  );
};

export default MainLayout;
