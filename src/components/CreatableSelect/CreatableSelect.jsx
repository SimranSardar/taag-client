import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Autocomplete,
  styled,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import InputField from "../InputField/InputField";

const filter = createFilterOptions();

//If You are using this as multiple select then provide initial value of of the useState as an empty array "[]" and if single select then "null" is fine

const CreatableSelect = ({
  options,
  value,
  id,
  setValue,
  onAddOptionSubmit,
  label,
  isMultiple = true,
}) => {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: "",
      Value: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
    value: "",
  });

  const handleSubmit = async (event) => {
    //The modal will be submitted here so call the api here
    // {
    //       name: dialogValue.name,
    //       Value: parseInt(dialogValue.Value, 10),
    // } This is the new value
    event.preventDefault();
    await onAddOptionSubmit(dialogValue);
    //And temporarily this setValue function will add that value to the autocomplete so in mean time add that value to the database
    setValue((prev) => {
      return [
        ...prev,
        {
          name: dialogValue.name,
          value: dialogValue.value,
        },
      ];
    });

    handleClose();
  };
  return (
    <StyledDiv>
      <StyledAutocomplete
        multiple={isMultiple}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.

            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                value: "",
              });
            });
          } else if (newValue && newValue[newValue.length - 1]?.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue[newValue.length - 1].inputValue,
              value: "",
            });
          } else if (typeof newValue[newValue.length - 1] !== "string") {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id={id}
        options={options}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li
            style={{
              color: "black",
              fontWeight: "0.9rem",
            }}
            {...props}
          >
            {option.name}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} />}
      />
      <Styledlabel style={{}}>{label}</Styledlabel>
      <StyledDialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add new {label}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any {label} in our list? Please, add it!
            </DialogContentText>
            <InputsContainerDiv>
              <InputField
                required
                style={{ margin: "0" }}
                id="name"
                value={dialogValue.name}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    name: event.target.value,
                  })
                }
                label="Name"
              />
              <InputField
                required
                id="name"
                value={dialogValue.value}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    value: event.target.value,
                  })
                }
                label="Value"
                type="text"
              />
            </InputsContainerDiv>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </StyledDiv>
  );
};

const StyledDialog = styled(Dialog)(() => {
  return {
    ".MuiPaper-root": {
      backgroundColor: "#1f2226",
      h2: {
        color: "white",
      },
      p: {
        color: "white",
      },
    },
  };
});

const StyledAutocomplete = styled(Autocomplete)(() => {
  return {
    label: {
      color: "white",
    },
    "&.MuiOutlinedInput-notchedOutline.Mui-focused": {
      borderColor: "rgba(255, 255, 255, 0.1)",
      background: "red",
    },
    fieldset: {
      border: "2px solid rgba(255, 255, 255, 0.1)",

      "& :hover": {
        border: "2px solid rgba(255, 255, 255, 0.1)",
      },
      legend: {
        display: "none",
      },
    },
    ".MuiAutocomplete-endAdornment": {
      svg: {
        fill: "rgba(255, 255, 255, 0.5)",
      },
    },
    ".MuiFormControl-root": {
      width: "300px",
    },
    ".MuiAutocomplete-input": {
      padding: "2rem",
    },
    input: {
      color: "white",
    },
    ".MuiChip-root": {
      color: "white",
      backgroundColor: " #643ad9",
      path: {
        fill: "white",
      },
    },
    ".MuiInputLabel-root.Mui-focused": {
      color: "white",
    },

    ".MuiOutlinedInput-root": {},
  };
});

const Styledlabel = styled("label")(() => {
  return {
    color: "#898989",
    fontSize: "0.8rem",
    position: "absolute",
    top: "-2rem",
  };
});

const StyledDiv = styled("div")(() => {
  return {
    position: "relative",
    marginTop: "3rem",
    marginBottom: "1rem",
  };
});

const InputsContainerDiv = styled("div")(() => {
  return {
    display: "flex",
    ">div:first-of-type": {
      marginRight: "2rem",
    },
  };
});

export default CreatableSelect;
