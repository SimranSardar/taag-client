import styles from "./InputField.module.scss";

const InputField = ({ type, label, placeholder, variant, value, onChange }) => {
  return (
    <div
      style={variant !== "large" ? {} : { width: "650px" }}
      className={styles.inputField}
    >
      {variant !== "large" ? (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <textarea
          type={type}
          value={value}
          placeholder={placeholder}
          rows={10}
          onChange={onChange}
        ></textarea>
      )}
      <label htmlFor="">{label}</label>
    </div>
  );
};

export default InputField;
