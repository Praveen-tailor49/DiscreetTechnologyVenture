import {
    Vehicle_Data, Error_Status, Vehicle_State_Emty, Vehicle_Status, Vehicle_Filter_Data
} from "../actionType"
import * as api from '../api'


export const get_Vehicle = () => async (dispatch) => {
    try {
        const { data } = await api.get_Vehicle();
        dispatch({ type: Vehicle_Data, payload: data })
        dispatch({ type: Vehicle_Filter_Data, payload: data })
      } catch (error) {
        dispatch({ type: Vehicle_Data, payload: [] })
      }
};

export const save_Vehicle = (formData, type, len) => async (dispatch) => { 
  
  dispatch({ type: Vehicle_State_Emty, payload: false }); 
    dispatch({ type: Error_Status, payload: false })
    try {
        const { data } = await api.save_Vehicle(formData);
        if(type === 'Off'){
          if(JSON.parse(localStorage.getItem("vehicle_data")).length === len){
            localStorage.removeItem("vehicle_data")
            dispatch({ type: Error_Status, payload: false })
          } 
        } else {
          alert('Successfuly Add Vehicle')
          dispatch(get_Vehicle());
          dispatch({ type: Error_Status, payload: false })
          dispatch({ type: Vehicle_State_Emty, payload: true }); 
        }
      } catch (error) {
        alert('Not Add Vehicle')
        dispatch({ type: Vehicle_State_Emty, payload: false }); 
      }
};

export const update_Vehicle = (formData) => async (dispatch) => {
  dispatch({ type: Vehicle_State_Emty, payload: false }); 
    dispatch({ type: Error_Status, payload: false })
    try {
        const { data } = await api.update_Vehicle(formData);
        alert('Update Vehicle'); dispatch(get_Vehicle());
         dispatch({ type: Error_Status, payload: false })
         dispatch({ type: Vehicle_Status, payload: false })
         dispatch({ type: Vehicle_State_Emty, payload: true }); 
      } catch (error) {
        alert('Not Update Vehicle')
        dispatch({ type: Vehicle_State_Emty, payload: false }); 
      }
};

export const delete_Vehicle = (formData) => async (dispatch) => {
    try {
        const { data } = await api.delete_Vehicle(formData);
        alert('Delete Vehicle'); dispatch(get_Vehicle());
      } catch (error) {
        alert('Not Delete Vehicle')
      }
};