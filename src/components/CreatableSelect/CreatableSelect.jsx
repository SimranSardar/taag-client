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

export const CreatableMultipleSelect = ({
  options,
  value,
  id,
  setValue,
  onAddModalSubmit,
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
    await onAddModalSubmit(dialogValue);
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
        sx={{ width: 655 }}
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
                id="value"
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

export const CreatableSingleSelect = ({
  options,
  value,
  id,
  setValue,
  onAddModalSubmit,
  label,
  children,
}) => {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: "",
      sector: "",
      website: "",
      picName: "",
      position: "",
      email: "",
      contact: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
    sector: "",
    website: "",
    picName: "",
    position: "",
    email: "",
    contact: "",
  });

  const handleSubmit = async (event) => {
    //The modal will be submitted here so call the api here
    // {
    //       name: dialogValue.name,
    //       Value: parseInt(dialogValue.Value, 10),
    // } This is the new value
    event.preventDefault();
    await onAddModalSubmit(dialogValue);
    //And temporarily this setValue function will add that value to the autocomplete so in mean time add that value to the database
    setValue((prev) => {
      return dialogValue;
    });

    handleClose();
  };
  return (
    <StyledDiv>
      <StyledAutocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue((prev) => {
                return { name: newValue, year: "" };
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue((prev) => {
              return { name: newValue.inputValue, year: "" };
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          console.log(params.inputValue);
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
          <DialogTitle>Add new Brand</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any Brand in our list? Please, add it!
            </DialogContentText>
            <InputsContainerDivForSS>
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
                style={{ margin: "0" }}
                id="sector"
                value={dialogValue.sector}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    sector: event.target.value,
                  })
                }
                label="Sector"
              />
              <InputField
                required
                style={{ margin: "0" }}
                id="website"
                value={dialogValue.website}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    website: event.target.value,
                  })
                }
                label="Website"
              />
              <InputField
                required
                style={{ margin: "0" }}
                id="picName"
                value={dialogValue.picName}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    picName: event.target.value,
                  })
                }
                label="Person in Contact Id"
              />
              <InputField
                required
                style={{ margin: "0" }}
                id="position"
                value={dialogValue.position}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    position: event.target.value,
                  })
                }
                label="Position"
              />
              <InputField
                required
                style={{ margin: "0" }}
                id="email"
                type="email"
                value={dialogValue.email}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    email: event.target.value,
                  })
                }
                label="Email"
              />
              <InputField
                required
                style={{ margin: "0" }}
                id="contact"
                value={dialogValue.contact}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    contact: event.target.value,
                  })
                }
                label="Contact"
              />
            </InputsContainerDivForSS>
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
      maxWidth: "700px",

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
    "&.Mui-focused": {
      fieldset: {
        borderColor: "var(--clr-primary) !important",
      },
    },
    "& :hover": {
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: "green !important",
      },
    },
    fieldset: {
      border: "2px solid rgba(255, 255, 255, 0.1)",
      top: "0",
      legend: {
        display: "none",
      },
    },
    ".MuiAutocomplete-endAdornment": {
      svg: {
        fill: "rgba(255, 255, 255, 0.5)",
      },
    },
    ".MuiFormControl-root": {},
    ".MuiAutocomplete-input": {
      padding: "2rem",
    },
    input: {
      color: "white",
      padding: "calc(0.7rem + 1px)  !important",
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
    margin: "0.5rem 0",
    fontSize: "0.8rem",
  };
});

const StyledDiv = styled("div")(() => {
  return {
    position: "relative",
    display: "flex",
    flexDirection: "column-reverse",
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

const InputsContainerDivForSS = styled("div")(() => {
  return {
    display: "flex",
    flexWrap: "wrap",
    ">div:nth-child(odd)": {
      marginRight: "2rem",
    },
  };
});
