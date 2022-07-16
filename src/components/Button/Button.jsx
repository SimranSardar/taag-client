import styles from "./Button.module.scss";

const Button = ({ children, leftIcon, rightIcon, type }) => {
  return (
    <button type={type ? type : "button"} className={styles.btn}>
      <span>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </span>
    </button>
  );
};

export default Button;
