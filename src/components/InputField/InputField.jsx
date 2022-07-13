import styles from "./InputField.module.scss";

const InputField = ({ type, label, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
