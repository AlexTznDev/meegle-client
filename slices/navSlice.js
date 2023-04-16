import { createSlice } from "@reduxjs/toolkit";
import BarCocktail from "../assets/BarCocktail.jpg"
import rando from "../assets/rando.jpg"


//initialisation etat
const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null,
    isActiveNavigate:"Profil",
    // imageEvent: BarCocktail
    imageEvent: null
}






//preparation du reducer grace a action
export const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{  //! reducerS avec un s tres important
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
        setIsActiveNavigate:(state, action)=>{
            state.isActiveNavigate = action.payload
        },
        setImageEvent:(state, action)=>{
            state.imageEvent = action.payload
        }
    }
})

//destructuration
export const {setOrigin, setDestination, setTravelTimeInformation, setIsActiveNavigate, setImageEvent} =  navSlice.actions

//selector pour recupere la data 
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectIsActiveNavigate = (state) => state.nav.isActiveNavigate
export const selectImageEvent = (state) => state.nav.imageEvent



export default navSlice.reducer