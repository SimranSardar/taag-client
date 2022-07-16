import { useEffect } from "react";
import styles from "./InputField.module.scss";

const InputField = ({
  id,
  type,
  label,
  placeholder,
  variant,
  value,
  onChange,
  ...remaining
}) => {
  return (
    <div
      style={variant !== "large" ? {} : { width: "650px" }}
      className={styles.inputField}
    >
      {variant !== "large" ? (
        <input
          {...remaining}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <textarea
          {...remaining}
          id={id}
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
