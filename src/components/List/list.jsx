import React, { useState, createRef, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./listStyles";
import PlaceDetails from "../PlaceDetails/placeDetails";

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  //console.log({childClicked});


  //using this ref thing- if we click on any place in the map - list would automatically scroll to that place
  const [placeRefs, setPlaceRefs] = useState([]);
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => placeRefs[i] || createRef());
    // creating an empty array of length = places, using Array constructor
    // filling it
    // map(_, i) -- underscore means we don't want the first parameter, so we just put an underscore there
    // we want the index only

    setPlaceRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurant, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className="classes.loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>

            <Select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>

            <Select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={placeRefs[i]} item key={i} xs={12}>
                {/**will take the full width of the list container on all devices */}
                <PlaceDetails
                  place={place}
                  selectedPlace={Number(childClicked) === i}
                  ref={placeRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
