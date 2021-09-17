import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import { LocationOn, Phone } from "@material-ui/icons/";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";

const PlaceDetails = ({ place, selectedPlace, ref }) => {
  // console.log('hey', place.name);
  const classes = useStyles();
 //console.log(place.name);
 // console.log({ place, selectedPlace, ref });
  if(selectedPlace) ref?.current?.scrollIntoView({
    behavior:'smooth',
    block:'start'
  })

  const getAwards = (place) =>
    place &&
    place.awards?.map((award) => (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <img src={award.images.small} alt={award.display_name} />
        <Typography variant="subtitle2" color="textSecondary">
          {award.display_name}
        </Typography>
      </Box>
    ));
   
    const getAddress = (place) => (
      <Typography variant ='body2' color = 'subtitle2' gutterBottom className = {classes.subtitle}>
      <LocationOn/> {place.location_string && place.location_string.split(",")[0]} 
      </Typography>
    )

    const getPhone = (place) => (
      place.phone && 
      <Typography variant ='body2' color = 'subtitle2' gutterBottom className = {classes.subtitle}>
      <Phone/> {place.phone} 
      {//console.log('phone = ', place.phone)
      }
      </Typography>
    )
  return (
    <Card elevation={6 /* shadow effect */}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stockfreeimages.com%2Fp1%2Fhotel-vector.html&psig=AOvVaw1uv6QI6X_bYwpdLhoIS3ml&ust=1631348301694000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNDQ-5v88_ICFQAAAAAdAAAAABAJ"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.ranking && place.ranking.split(" ")[0]}
          </Typography>
        </Box>
        
        {getAwards(place)}
        {getAddress(place)}
        {getPhone(place)}
        <CardActions>
          <Button size = 'small' color = 'primary' onClick = {()=> window.open(place.web_url, '_blank')}>Trip Advisor</Button>
          <Button size = 'small' color = 'primary' onClick = {()=> window.open(place.website, '_blank')}>Website</Button>
        </CardActions>

      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
