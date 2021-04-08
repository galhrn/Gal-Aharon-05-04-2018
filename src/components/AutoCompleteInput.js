import React, { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API_KEY } from "../assets/consts";
import fetch from "cross-fetch";
import toast from "react-simple-toasts";
import validator from "validator";

const AutoComplete = ({ setLocation }) => {
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
      toast("Please search in English only", 2000);
    }
  };

  const textValidation = (text) => {
    if (!text.length) return true;
    const trimmedText = text.replace(/\s/g, "");
    return validator.isAlpha(trimmedText);
  };

  useEffect(() => {
    let active = true;
    if (!loading) return undefined;

    (async () => {
      const response = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`
      );
      const countries = await response.json();
      if (active)
        setOptions(Object.keys(countries).map((key) => countries[key]));
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  const onClose = () => {
    setTerm("");
    setOpen(false);
  };

  return (
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
            onChange={onInputChange}
            {...params}
            label="Search..."
            variant="outlined"
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
  );
};

export default AutoComplete;
