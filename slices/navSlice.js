import { createSlice } from "@reduxjs/toolkit";


//initialisation etat
const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null,
    isActiveNavigate:"Profil"
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
        }
    }
})

//destructuration
export const {setOrigin, setDestination, setTravelTimeInformation, setIsActiveNavigate} =  navSlice.actions

//selector pour recupere la data 
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectIsActiveNavigate = (state) => state.nav.isActiveNavigate



export default navSlice.reducer