import styles from "./Button.module.scss";

const Button = ({ children, leftIcon, rightIcon }) => {
  return (
    <button className={styles.btn}>
      <span>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </span>
    </button>
  );
};

export default Button;
