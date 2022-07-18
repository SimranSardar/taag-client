import { Navbar, SideMenu } from "../../components";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";

const defaultNavbarProps = {
  titleProps: {
    name: "",
    isEditIconVisible: false,
    isBackIconVisible: false,
    brandName: "",
    disabled: false,
  },
  progress: 0,
};

const MainLayout = ({
  children,
  navbarProps = defaultNavbarProps,
  classes = [],
  isSideMenuVisible = false,
}) => {
  return (
    <section className={styles.container}>
      <Navbar {...navbarProps} />
      <SideMenu isSideMenuVisible={isSideMenuVisible} />
      <main className={clsx(classes)}>{children}</main>
    </section>
  );
};

export default MainLayout;
