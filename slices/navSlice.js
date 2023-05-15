import { createSlice } from "@reduxjs/toolkit";
import PadleHortaNord from "../assets/padelHortaNord.jpeg";
import TerrainBeterro from "../assets/terrainBetero.jpeg";
import TuPadel from "../assets/TuPadel.jpg";
import SevenPadel from "../assets/7padel.jpg";
import CourtUnknown from "../assets/padelUnknown.jpg"
import TerrainMarxa from "../assets/terrainMarxa.jpeg";



//initialisation etat
const initialState = {
  origin: {
    location: {
      lat: 39.4699075,
      lng: -0.3762881,
    },
  },
  destination: null,
  travelTimeInformation: null,
  isActiveNavigate: "AuthMain",
  PadelCourtUnknown:{
    name: CourtUnknown,
    location:{
      lat: null,
      lng: null,
    },
    adress:""
  },
  ImageAppli: [
    {name:PadleHortaNord,
    origin:{
      location: {
        lat: 39.4999571,
        lng: -0.339315,
      },
      adress:"Carrer dels Palleters, 14, 46120 Alboraia, Valencia"
    }},
    {name:TerrainBeterro,
    origin:{
      location: {
        lat: 39.475,
        lng: -0.3370044,
      },
      adress:"Carrer de Campillo de Altobuey, 1, 46022 València, Valencia"
    }},
    {name:TuPadel,
    origin:{
      location: {
        lat: 39.4613918,
        lng: -0.4061311,
      },
      adress:"Carrer dels Fogainers, 5, 46014 València, Valencia"
    }},
    {name:SevenPadel,
    origin:{
      location: {
        lat: 39.46128879999999,
        lng: -0.4085225999999999,
      },
      adress:"Polígon Industrial de, Carrer dels Llanterners, 6, 46014 Valencia"
    }},
    {name:TerrainMarxa,
    origin:{
      location: {
        lat: 39.48872779999999,
        lng: -0.3811638,
      },
      adress:"C/ de Just Ramírez, s/n, 46009 València, Valencia"
    }},
    
    
    
    
    
  ],
  imageEvent: null,
  isImageFromAppli: true,
  eventStep: 0,
  selectImage: 0,
  isBtnAmisAndDateOn: false,
  timeEvent: null,
  dateEvent: null,
  ListFriendAdded: [],
  Username: "",
  Gender: null,
  eventListUserDB: []
};

//preparation du reducer grace a action
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    //! reducerS avec un s tres important
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setIsActiveNavigate: (state, action) => {
      state.isActiveNavigate = action.payload;
    },
    setImageEvent: (state, action) => {
      state.imageEvent = action.payload;
    },
    setImageAppli: (state, action) => {
      state.ImageAppli = action.payload;
    },
    setIsImageFromAppli: (state, action) => {
      state.isImageFromAppli = action.payload;
    },
    setEventStep: (state, action) => {
      state.eventStep = action.payload;
    },
    setSelectImage: (state, action) => {
      state.selectImage = action.payload;
    },
    setIsBtnAmisAndDateOn: (state, action) => {
      state.isBtnAmisAndDateOn = action.payload;
    },
    setTimeEvent: (state, action) => {
      state.timeEvent = action.payload;
    },
    setDateEvent: (state, action) => {
      state.dateEvent = action.payload;
    },
    addFriend: (state, action) => {
      state.ListFriendAdded.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.ListFriendAdded = state.ListFriendAdded.filter(
        (friend) => friend._id !== action.payload._id
      );
    },
    SetUsername: (state, action) => {
      state.Username = action.payload;
    },
    SetGender: (state, action) => {
      state.Gender = action.payload;
    },
    SetPadelCourtUnknown: (state, action) => {
      state.PadelCourtUnknown = action.payload;
    },
    resetPadelCourtUnknown: (state) => {
      state.PadelCourtUnknown = initialState.PadelCourtUnknown;
    },
    resetOrigin: (state) => {
      state.origin = initialState.origin;
    },
    setEventListUserDB: (state, action) => {
      state.eventListUserDB = action.payload;
    },
  
  },
});

//destructuration
export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setIsActiveNavigate,
  setImageEvent,
  setImageAppli,
  setIsImageFromAppli,
  setEventStep,
  setSelectImage,
  setIsBtnAmisAndDateOn,
  setTimeEvent,
  setDateEvent,
  addFriend,
  removeFriend,
  SetUsername,
  SetGender,
  SetPadelCourtUnknown,
  resetPadelCourtUnknown,
  resetOrigin,
  setEventListUserDB
} = navSlice.actions;

//selector pour recupere la data
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectIsActiveNavigate = (state) => state.nav.isActiveNavigate;
export const selectImageEvent = (state) => state.nav.imageEvent;
export const selectImageAppli = (state) => state.nav.ImageAppli;
export const selectIsImageFromAppli = (state) => state.nav.isImageFromAppli;
export const selectEventStep = (state) => state.nav.eventStep;
export const selectImage = (state) => state.nav.selectImage;
export const selectIsBtnAmisAndDateOn = (state) => state.nav.isBtnAmisAndDateOn;
export const selectTimeEvent = (state) => state.nav.timeEvent;
export const selectDateEvent = (state) => state.nav.dateEvent;
export const SelectListFriendAdded = (state) => state.nav.ListFriendAdded;
export const SelectUsername = (state) => state.nav.Username;
export const SelectGender = (state) => state.nav.Gender;
export const SelectPadelCourtUnknown = (state) => state.nav.PadelCourtUnknown;
export const SelecteventListUserDB = (state) => state.nav.eventListUserDB;

export default navSlice.reducer;
