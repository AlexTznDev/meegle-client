import { createSlice } from "@reduxjs/toolkit";


//initialisation etat
const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null,
    isFindNavigate:false
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
        setIsFindNavigate:(state, action)=>{
            state.isFindNavigate = action.payload
        }
    }
})

//destructuration
export const {setOrigin, setDestination, setTravelTimeInformation, setIsFindNavigate} =  navSlice.actions

//selector pour recupere la data 
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectIsFindNavigate = (state) => state.nav.isFindNavigate



export default navSlice.reducer