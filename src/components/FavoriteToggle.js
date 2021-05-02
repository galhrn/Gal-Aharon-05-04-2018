import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  root: {
    border: "none",
    borderRadius: "50%",
  },
});

const FavoriteToggle = ({ isFavorite, onToggle }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(isFavorite);

  useEffect(() => {
    setSelected(isFavorite);
  }, [isFavorite]);

  const onChange = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    onToggle(selected);
  };

  return (
    <Box>
      <ToggleButton
        className={classes.root}
        value="check"
        selected={selected}
        onChange={onChange}
      >
        {selected ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </ToggleButton>
    </Box>
  );
};
export default FavoriteToggle;
