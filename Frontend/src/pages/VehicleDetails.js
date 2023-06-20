import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { save_Vehicle, update_Vehicle } from '../Redux/action/Vehicle'
import { Error_Status, Vehicle_Single_Data, Vehicle_Status } from '../Redux/actionType'
import DatePicker from "react-datepicker";
import { RequiredFieldSpaceNotAllow } from '../Filter/Filter';
import { Link } from 'react-router-dom';

const VehicleDetails = () => {

    const dispatch = useDispatch()
    const VehicleSingleData = useSelector((state) => state.Vehicle.VehicleSingleData)
    const VehicleStatus = useSelector((state) => state.Vehicle.VehicleStatus)
    const vehicleStateEmty = useSelector((state) => state.Vehicle.vehicleStateEmty)
    const errorStatus = useSelector((state) => state.Vehicle.errorStatus)
    const vehicleOnlineStatus = useSelector((state) => state.Vehicle.vehicleOnlineStatus)

    const [serviceDate, setServiceDate] = useState('')
    const [offlineData, setOfflineData] = useState(JSON.parse(localStorage.getItem("vehicle_data") || "[]"))

    useEffect(() => {
        if(vehicleOnlineStatus){
            if( JSON.parse(localStorage.getItem("vehicle_data")))
            for(let i=0; i < JSON.parse(localStorage.getItem("vehicle_data")).length; i++ ){
                dispatch(save_Vehicle(JSON.parse(localStorage.getItem("vehicle_data"))[i], 'Off', i+1))
            } 
        }
    }, [vehicleOnlineStatus])

    useEffect(() => {
        if (vehicleStateEmty) {
            resetState()
        }
    }, [vehicleStateEmty])

    useEffect(() => {
        if (VehicleSingleData._id) {
            setvalue({
                ...value,
                'slipNo': VehicleSingleData.slipNo, 'secondWeightManual': VehicleSingleData.secondWeightManual, 'vehNo': VehicleSingleData.vehNo, 'dateTime': VehicleSingleData.dateTime ? new Date(VehicleSingleData.dateTime) : '', 'item': VehicleSingleData.item, 'vehType': VehicleSingleData.vehType, 'weight': VehicleSingleData.weight, 'charge': VehicleSingleData.charge, 'consignor': VehicleSingleData.consignor, id: VehicleSingleData._id
            })
            setServiceDate(new Date(VehicleSingleData.dateTime))
        }
    }, [VehicleSingleData])


    const [value, setvalue] = useState({
        slipNo: '', secondWeightManual: false, vehNo: '', dateTime: '', item: '', vehType: '', weight: '', charge: '', consignor: '', id: ''
    })

    const handlChange = (event) => {
        const { name, value, checked } = event.target
        if (name === 'secondWeightManual') {
            setvalue(pre => { return { ...pre, [name]: checked } })
        } else {
            setvalue(pre => { return { ...pre, [name]: value } })
        }
    }
    const dateChange = (date) => {
        // if (date != null) {
        setServiceDate(date);
        setvalue({ ...value, ['dateTime']: date })
        // } 
    }

    const [errors, setErrors] = useState({
        vehNo: '', slipNo: '',
    })

    // Check validation on Field
    const check_Validation_Error = (e) => {
        e.preventDefault()
        if (RequiredFieldSpaceNotAllow(value.slipNo)) {
            setErrors(prevValues => { return { ...prevValues, ['slipNo']: RequiredFieldSpaceNotAllow(value.slipNo) } })
            dispatch({ type: Error_Status, payload: true });
        }
        if (RequiredFieldSpaceNotAllow(value.vehNo)) {
            setErrors(prevValues => { return { ...prevValues, ['vehNo']: RequiredFieldSpaceNotAllow(value.vehNo) } })
        }
    }

    // Check All Field Format is True Then Submit 
    const { slipNo, vehNo } = errors

    useEffect(() => {
        if (slipNo === 'true' && vehNo === 'true' && errorStatus) {
            if (vehicleOnlineStatus) {
                if (VehicleStatus) dispatch(update_Vehicle(value))
                else dispatch(save_Vehicle(value, 'Onl'))
            } else {
                if (VehicleStatus) dispatch(update_Vehicle(value))
                else {
                    const newArray = [...offlineData]
                    newArray.push(value)
                    dispatch({ type: Error_Status, payload: false });
                    localStorage.setItem("vehicle_data", JSON.stringify(newArray)); setOfflineData(JSON.parse(localStorage.getItem("vehicle_data")))
                    alert('Successfully Add Vehicle'); resetState()
                }
            }
        }
    }, [slipNo, vehNo, errorStatus])

    const resetState = () => {
        setvalue({
            slipNo: '', secondWeightManual: false, vehNo: '', dateTime: '', item: '', vehType: '', weight: '', charge: '', consignor: '', id: ''
        }); setServiceDate('')
    }

    return (
        <div className='m-3'>
            <div classname="card" style={{ height: '90vh', background: '#c2d8f7' }}>
                <div className="card-body">
                    <div>
                        <Link to='/'>
                            <button type="button" className="btn btn-info mt-4 " style={{ marginLeft: '30px' }}>Veh Details</button>
                        </Link>
                        <Link to='/ViewReport'>
                            <button type="button" className="btn btn-info mt-4" style={{ marginLeft: '20px' }}>View Report</button>
                        </Link>
                    </div>
                    <div>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', marginTop: '-30px' }}>Discreet Technology Venture</h5>
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>Vehicle Details</h5>
                    </div>
                    <div>
                        <form>
                            <div className="mb-3 mt-5">
                                <div className='row mt-4'>
                                    <div className='col-1' style={{ marginLeft: '30px' }}>
                                        <label className="form-label">Slip No</label>
                                        {errors.slipNo !== 'true' ? (
                                            <span style={{ color: 'red', fontSize: '13px', margin: '0px', padding: '0px' }}>{errors.slipNo}</span>
                                        ) : null}
                                    </div>
                                    <div className='col-3'>
                                        <input type="text" name='slipNo' value={value.slipNo} className="form-control" onChange={handlChange} />
                                    </div>
                                    <div className="col-1 form-check" style={{ marginLeft: '100px' }}>
                                        <input type="checkbox" name='secondWeightManual' value={value.secondWeightManual} checked={value.secondWeightManual} className="form-check-input" onChange={handlChange} />
                                    </div>
                                    <div className='col-4'>
                                        <label class="form-label">2nd Weight Manual</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <hr />
                            </div>

                            <div className="mb-3 mt-5">
                                <div className='row mt-4'>
                                    <div className='col-1' style={{ marginLeft: '30px' }}>
                                        <label className="form-label">Veh No</label>
                                        {errors.vehNo !== 'true' ? (
                                            <span style={{ color: 'red', fontSize: '13px', margin: '0px', padding: '0px' }}>{errors.vehNo}</span>
                                        ) : null}
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '10px' }}>
                                        <input type="text" className="form-control" name='vehNo' value={value.vehNo} onChange={handlChange} />
                                    </div>
                                    <div className='col-2' style={{ marginLeft: '50px' }}>
                                        <label className="form-label">Veh Type</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '-40px' }}>
                                        <input type="text" className="form-control" name='vehType' value={value.vehType} onChange={handlChange} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-1' style={{ marginLeft: '30px' }}>
                                        <label className="form-label">Consignor</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '10px' }}>
                                        <input type="text" className="form-control" name='consignor' value={value.consignor} onChange={handlChange} />
                                    </div>
                                    <div className='col-2' style={{ marginLeft: '50px' }}>
                                        <label className="form-label">Item</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '-40px' }}>
                                        <input type="text" className="form-control" name='item' value={value.item} onChange={handlChange} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-1' style={{ marginLeft: '30px' }}>
                                        <label className="form-label">Charge</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '10px' }}>
                                        <input type="text" className="form-control" name='charge' value={value.charge} onChange={handlChange} />
                                    </div>
                                    <div className='col-2' style={{ marginLeft: '50px' }}>
                                        <label className="form-label">Date/Time</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '-40px' }}>
                                        {/* <input type="date" className="form-control" name='dateTime' value={value.dateTime} data-date-format="DD-MM-YYYY" onChange={handlChange} /> */}
                                        <DatePicker
                                            className='form-control'
                                            dateFormat="dd-MM-yyyy"
                                            timeInputLabel
                                            name='ServiceDate'
                                            isClearable={true}
                                            onChange={date => dateChange(date)}
                                            selected={serviceDate}
                                            placeholderText={'Select ..'}

                                        />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-1' style={{ marginLeft: '30px' }}>
                                        <label className="form-label">Weight</label>
                                    </div>
                                    <div className='col-4' style={{ marginLeft: '10px' }}>
                                        <input type="text" className="form-control" name='weight' value={value.weight} onChange={handlChange} />
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    {
                                        VehicleStatus ?
                                            <div className='col-2' style={{ marginLeft: '100px' }}>
                                                <button type="button" class="btn btn-light" onClick={check_Validation_Error}>Update</button>
                                            </div>
                                            :
                                            <div className='col-2' style={{ marginLeft: '100px' }}>
                                                <button type="button" class="btn btn-light" onClick={check_Validation_Error}>Submit</button>
                                            </div>
                                    }
                                    <div className='col-2' style={{ marginLeft: '-100px' }}>
                                        <button type="button" class="btn btn-light" onClick={() => {
                                            dispatch({ type: Vehicle_Single_Data, payload: [] }); dispatch({ type: Vehicle_Status, payload: false }); resetState()
                                        }}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VehicleDetails