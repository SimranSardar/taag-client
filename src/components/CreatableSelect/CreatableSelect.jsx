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

const filter = createFilterOptions();

const top100Films = [
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

const StyledAutocomplete = styled(Autocomplete)(() => {
  return {
    label: {
      color: "white",
    },
    fieldset: {
      border: "2px solid white",
      "& MuiOutlineInput-notchedOutline.Mui-focused": {
        borderColor: "#643ad9",
      },
    },
    ".MuiFormControl-root": {
      width: "700px",
    },
    input: {
      width: "700px",
      color: "white",
    },
    ".MuiChip-root": {
      color: "white",
    },
    ".MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    ".MuiOutlinedInput-root": {},
  };
});

const data = [
  {
    id: 1,
    name: "Tag1",
  },
  {
    id: 2,
    name: "Tag2",
  },
  {
    id: 3,
    name: "Tag3",
  },
  {
    id: 4,
    name: "Tag4",
  },
];

const CreatableSelect = () => {
  //   const [value, setValue] = useState([]);
  //   const [open, toggleOpen] = useState(false);

  //   useEffect(() => {
  //     console.log(value);
  //   });

  //   const handleClose = () => {
  //     setDialogValue({
  //       title: "",
  //       year: "",
  //     });

  //     toggleOpen(false);
  //   };

  //   const [dialogValue, setDialogValue] = useState({
  //     title: "",
  //     year: "",
  //   });

  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(data);
  }, []);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     setValue({
  //       title: dialogValue.title,
  //       year: parseInt(dialogValue.year, 10),
  //     });

  //     handleClose();
  //   };
  return (
    <div>
      <StyledAutocomplete
        value={selected}
        multiple
        onChange={(event, newValue, reason, details) => {
          let valueList = selected;
          if (details.option.create && reason !== "removeOption") {
            valueList.push({
              id: undefined,
              name: details.option.name,
              create: details.option.create,
            });
            setSelected(valueList);
          } else {
            setSelected(newValue);
          }
        }}
        filterSelectedOptions
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              name: inputValue,
              label: `Add "${inputValue}"`,
              create: true,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="tags-Create"
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.label) {
            return option.name;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.create ? option.label : option.name}</li>
        )}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Tags" />}
      />
      );
      {/* <StyledAutocomplete
        // multiple
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                year: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              year: "",
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={top100Films}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Free solo dialog" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value,
                })
              }
              label="year"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog> */}
    </div>
  );
};

export default CreatableSelect;
