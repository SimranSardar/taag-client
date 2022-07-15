import logo from "../../assets/icons/logo.svg";
import styles from "./Logo.module.scss";

const Logo = ({ withText = false }) => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
      {withText && <h1 style={{ marginLeft: "0", color: "white" }}>BIAS</h1>}
    </div>
  );
};

export default Logo;
