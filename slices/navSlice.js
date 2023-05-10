import { createSlice } from "@reduxjs/toolkit";
import PadleHortaNord from "../assets/padelHortaNord.jpeg";
import TerrainBeterro from "../assets/terrainBetero.jpeg";
import TuPadel from "../assets/TuPadel.jpg";
import SevenPadel from "../assets/7padel.jpg";
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
  ImageAppli: [
    {name:PadleHortaNord,
    origin:{
      location: {
        lat: 39.4999571,
        lng: -0.339315,
      },
    }},
    {name:TerrainBeterro,
    origin:{
      location: {
        lat: 39.4699075,
        lng: -0.3762881,
      },
    }},
    {name:TuPadel,
    origin:{
      location: {
        lat: 39.4699075,
        lng: -0.3762881,
      },
    }},
    {name:SevenPadel,
    origin:{
      location: {
        lat: 39.4699075,
        lng: -0.3762881,
      },
    }},
    {name:TerrainMarxa,
    origin:{
      location: {
        lat: 39.4699075,
        lng: -0.3762881,
      },
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
  Gender: null
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
    }
  
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
  SetGender
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

export default navSlice.reducer;
