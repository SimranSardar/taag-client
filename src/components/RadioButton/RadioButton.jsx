import styles from "./RadioButton.module.scss";

const RadioButton = ({ label, group, value }) => {
  const randomId = Date.now() * (3 * Math.random() - 2 * Math.random()) * 1000;
  return (
    <label htmlFor={randomId} className={styles.container}>
      <input id={randomId} type="radio" name={group} value={value} />
      <div>
        <label htmlFor={randomId}>{label}</label>
        <div className={styles.background}></div>
      </div>
    </label>
  );
};

export default RadioButton;
