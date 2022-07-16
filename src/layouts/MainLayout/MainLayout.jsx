import { Navbar, SideMenu } from "../../components";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";

const defaultNavbarProps = {
  titleProps: {
    title: "",
    isEditIconVisible: false,
    isBackIconVisible: false,
    brandName: "",
  },
  progress: 0,
};

const MainLayout = ({
  children,
  navbarProps = defaultNavbarProps,
  classes = [],
}) => {
  return (
    <section className={styles.container}>
      <Navbar {...navbarProps} />
      <SideMenu />
      <main className={clsx(classes)}>{children}</main>
    </section>
  );
};

export default MainLayout;
