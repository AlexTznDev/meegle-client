import { createSlice } from "@reduxjs/toolkit";


//initialisation etat
const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null
}


//preparation du reducer grace a action
export const navSlice = createSlice({
    name:"nav",
    initialState,
    reducer:{
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.origin = action.payload
        }
    }
})

//destructuration
export const {setOrigin, setDestination, setTravelTimeInformation} =  navSlice.actions

//selector pour recupere la data 
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation


export default navSlice.reducer