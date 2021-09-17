import axios from "axios";

const host = "travel-advisor.p.rapidapi.com";
const apiKey = process.env.REACT_APP_RAPIDAPI_API_KEY;
console.log(apiKey);

export const getPlacesData = async (type, southwest, northeast) => {
  try {
    console.log(apiKey);
    // list in-boundary api endpoint
    // here we pass the lat and long of the bottom-left and top-right corner of the map
    const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    const {
      data: { data },
    } = await axios.get(url, {
      //options
      params: {
        // list in-boundary api endpoint
        // here we pass the lat and long of the bottom-left and top-right corner of the map
        bl_latitude: southwest.lat,
        bl_longitude: southwest.lng,
        tr_longitude: northeast.lng,
        tr_latitude: northeast.lat,
      },
      headers: {
        "x-rapidapi-host": host,
        "x-rapidapi-key": apiKey,
      },
    });
    //destructuring twice
    return data;
  } catch (error) {
    console.log(error);
  }
};

