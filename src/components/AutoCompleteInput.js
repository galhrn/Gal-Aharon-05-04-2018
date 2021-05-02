import React, { useState, useEffect } from "react";
import accuWeatherUrl from "../modules/accuWeatherUrl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import toast from "react-simple-toasts";
import validator from "validator";
import { TextField, CircularProgress, makeStyles } from "@material-ui/core";
import { SEARCH_IN_ENGLISH } from "../assets/consts";

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    marginBottom: "1em",
  },
});

const AutoComplete = ({ setLocation }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [term, setTerm] = useState("");

  const loading = open && options.length === 0;

  const onSearchSubmit = () => {
    setLocation(term.toLowerCase());
  };

  const onInputChange = (event) => {
    const searchTerm = event.target.value;

    if (textValidation(searchTerm)) {
      searchTerm ? setOpen(true) : setOpen(false);
      setTerm(searchTerm);
    } else {
      toast(SEARCH_IN_ENGLISH, 2000);
    }
  };

  const textValidation = (text) => {
    if (!text.length) return true;
    const trimmedText = text.replace(/\s/g, "");
    return validator.isAlpha(trimmedText);
  };

  useEffect(() => {
    if (term) {
      (async () => {
        const response = await fetch(accuWeatherUrl.autocomplete(term));

        const countries = await response.json();
        setOptions(Object.keys(countries).map((key) => countries[key]));
      })();
    }
  }, [term]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  const onClose = () => {
    setTerm("");
    setOpen(false);
  };

  return (
    <div className={classes.root} elevation={0}>
      <Autocomplete
        open={open}
        onClose={onClose}
        onChange={(event, value) => {
          setLocation(value.LocalizedName.toLowerCase());
        }}
        getOptionSelected={(option, value) =>
          option.LocalizedName === value.LocalizedName
        }
        getOptionLabel={(option) => option.LocalizedName}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <form onSubmit={onSearchSubmit}>
            <TextField
              className={classes.textField}
              onChange={onInputChange}
              {...params}
              label="Search for cities..."
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          </form>
        )}
      />
    </div>
  );
};

export default AutoComplete;
