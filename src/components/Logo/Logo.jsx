import { icons } from "../../assets";
import styles from "./Logo.module.scss";

const Logo = ({ withText = false }) => {
  const { logo } = icons;
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
      {withText && <h3 style={{ marginLeft: "0", color: "white" }}>BIAS</h3>}
    </div>
  );
};

export default Logo;
