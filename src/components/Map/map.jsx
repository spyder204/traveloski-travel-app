import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import {LocationCityRounded, } from '@material-ui/icons';
import {Rating} from '@material-ui/lab';
import useStyles from './mapStyles';
import mapStyles from './googleMapStyles'

const Map = ({coordinates, setCoordinates, setBounds, places, setChildClicked}) =>{
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  
  // true if width < 600
  //const coordinates = {lat : 30.3, lng : 70.0};
  
  return(
    <div className={classes.mapContainer}>
        <GoogleMapReact
         // mapId = "62f0ce0e8969e91b"
          bootstrapURLKeys={{key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter = {coordinates}
          center = {coordinates}
          defaultZoom = {14}
          margin ={[50, 50, 50, 50]}
          options = {{disableDefaultUI : true, zoomControl : true, style : mapStyles}}
          onChange = {
            (e)=>{
              setCoordinates({lat : e.center.lat, lng : e.center.lng});
              setBounds({ne : e.marginBounds.ne, sw : e.marginBounds.sw});
            }
          }
          onChildClick = {(child) => setChildClicked(child)}
        >
          {
          places?.map((place, i) => (
            <div
              className = {classes.markerContainer}
              lat = {Number(place.latitude)}
              lng = {Number(place.longitude)}
              key = {i}
            >
              {
                !isDesktop ? 
                (<LocationCityRounded  color='primary' fontSize = 'large'/>) 
                :
                ( place.photo  && place.photo.images.large.url &&
                  <Paper elevation = {3} className = {classes.paper}>
                    <Typography className = {classes.typography} variant = 'subtitle2' gutterBottom>{place.name}</Typography>
                  <img 
                    src = {place.photo.images.large.url}
                    alt={place.name} 
                    className = {classes.pointer}/>
                    <Rating size = 'small' value = {Number(place.rating)} readOnly />
                  </Paper>
                )
              }
            </div>
          ))
        }
        </GoogleMapReact>
    </div>
    
  )
}


export default Map;
