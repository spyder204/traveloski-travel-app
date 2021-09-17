import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
//cssbaseline -- fixes padding, bg color

import Header from "./components/Header/header";
import Map from "./components/Map/map";
import List from "./components/List/list";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  //child = hotels inside the map
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);


  useEffect(() => {
    //using built-in browser geolocation api
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  useEffect(()=>{
    const currentFilteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(currentFilteredPlaces);
  },[rating])

  useEffect(() => {
    bounds && setIsLoading(true);
    //getPlaces data is async -- so use then() with it
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
  //    console.log("Data = ", data);
      setPlaces(data);
      setIsLoading(false);
      setFilteredPlaces([]);
    });
  }, [type, coordinates, bounds]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates ={setCoordinates}/>

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places ={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type = {type}
            setType = {setType}
            rating = {rating}
            setRating = {setRating}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places ={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};
{
  /*
      xs = 12 => 12 spaces on small devices like phones
      md = 4 => 4 spaces on medium devices 
  */
}

export default App;
