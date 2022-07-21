import { Navbar, SideMenu } from "../../components";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";
import MoreInformation from "../../components/MoreInformation/MoreInformation";

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
  moreInformationProps,
}) => {
  return (
    <section className={styles.container}>
      <Navbar {...navbarProps} />
      <SideMenu isSideMenuVisible={isSideMenuVisible} />
      <MoreInformation moreInformationProps={moreInformationProps} />
      <main className={clsx(classes)}>{children}</main>
    </section>
  );
};

export default MainLayout;
