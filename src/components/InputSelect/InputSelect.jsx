import {
  Select as MUISelect,
  MenuItem,
  FormControl as MUIFormControl,
  FormHelperText as MUIFormHelperText,
  styled,
} from "@mui/material";

const InputSelect = ({ value, setValue, options, label }) => {
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <StyledMUIFormControl sx={{ minWidth: 120 }}>
      <StyledFormHelperText sx={{ color: "white" }}>
        {label}
      </StyledFormHelperText>
      <StyledMUISelect
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => {
          return <MenuItem value={option?.value}>{option?.name}</MenuItem>;
        })}
      </StyledMUISelect>
    </StyledMUIFormControl>
  );
};

const StyledMUIFormControl = styled(MUIFormControl)(() => ({
  margin: "0 !important",
}));

const StyledFormHelperText = styled(MUIFormHelperText)(() => {
  return {
    fontFamily: "Gilroy-300 ",
    margin: "0.5rem 0 ",
    fontSize: "0.8rem",
    "&.MuiFormHelperText-root.MuiFormHelperText-sizeMedium.MuiFormHelperText-contained":
      {
        color: "#898989",
        "&.Mui-focused": {
          color: "white",
        },
      },
  };
});

const StyledMUISelect = styled(MUISelect)(() => {
  return {
    minWidth: "300px",
    fontFamily: "Gilroy-500 ",
    border: " 2px solid rgba(255, 255, 255, 0.06)",
    color: "white",
    ".MuiOutlinedInput-notchedOutline": {
      display: "none",
    },
    "&.Mui-focused": {
      border: "2px solid var(--clr-primary)",
    },
    svg: {
      fill: "white",
    },
    // "&:hover": {
    //   border: "2px solid blue",
    // },
  };
});

export default InputSelect;
