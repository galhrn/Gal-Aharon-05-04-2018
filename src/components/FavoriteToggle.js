import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const FavoriteToggle = ({ isFavorite, onToggle }) => {
  const [selected, setSelected] = React.useState(isFavorite);

  useEffect(() => {
    setSelected(isFavorite);
  }, [isFavorite]);

  const onChange = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    onToggle(selected);
  };

  return (
    <Box style={{ marginLeft: 24 }}>
      <ToggleButton value="check" selected={selected} onChange={onChange}>
        {selected ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </ToggleButton>
    </Box>
  );
};
export default FavoriteToggle;
