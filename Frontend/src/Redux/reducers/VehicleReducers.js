import {
    Vehicle_Data,
    Vehicle_Single_Data,
    Vehicle_Status,
    Edit_Count,
    Error_Status,
    Vehicle_State_Emty,
    Vehicle_Filter_Data
} from "../actionType"

const initialState = {
    VehicleData: [], VehicleSingleData: [], VehicleStatus: false, editCount: 0, errorStatus: Boolean, vehicleStateEmty: Boolean, VehicleFilterData:[]
}

const VehicleReducers = (state = initialState, action) => {
    switch (action.type) {

        case Vehicle_Data:
            return {
                ...state,
                VehicleData: action.payload
            }
            case Vehicle_Filter_Data:
                return {
                    ...state,
                    VehicleFilterData: action.payload
                }
        case Vehicle_State_Emty:
            return {
                ...state,
                vehicleStateEmty: action.payload
            }
        case Vehicle_Single_Data:
            return {
                ...state,
                VehicleSingleData: action.payload
            }
        case Vehicle_Status:
            return {
                ...state,
                VehicleStatus: action.payload
            }
        case Edit_Count:
            return {
                ...state,
                editCount: action.payload
            }
        case Error_Status:
            return {
                ...state,
                errorStatus: action.payload
            }
        default:
            return state
    }
}

export default VehicleReducers