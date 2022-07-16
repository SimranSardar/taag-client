import styles from "./RadioButton.module.scss";

const RadioButton = ({ label, group, value, setValue }) => {
  const randomId = Date.now() * (3 * Math.random() - 2 * Math.random()) * 1000;

  function handleChange(e) {
    if (e.target.checked) setValue(e.target.value);
  }

  return (
    <label htmlFor={randomId} className={styles.container}>
      <input
        onChange={handleChange}
        id={randomId}
        type="radio"
        name={group}
        value={value}
      />
      <div>
        <label htmlFor={randomId}>{label}</label>
        <div className={styles.background}></div>
      </div>
    </label>
  );
};

export default RadioButton;
