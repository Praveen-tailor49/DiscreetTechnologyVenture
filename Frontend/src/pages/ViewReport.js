import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker";
import "../App.css"
import DataTable from "react-data-table-component"
import { useDispatch, useSelector } from "react-redux"
import { delete_Vehicle, get_Vehicle } from "../Redux/action/Vehicle"
import { Vehicle_Data, Vehicle_Filter_Data, Vehicle_Single_Data, Vehicle_Status } from "../Redux/actionType"
import { Filter } from "../Filter/Filter";

const ViewReport = () => {

    const dispatch = useDispatch()
    const VehicleData = useSelector((state) => state.Vehicle.VehicleData)
    const VehicleFilterData = useSelector((state) => state.Vehicle.VehicleFilterData)
    const vehicleOnlineStatus = useSelector((state) => state.Vehicle.vehicleOnlineStatus)
    console.log(vehicleOnlineStatus);

    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    useEffect(() => {
        if (vehicleOnlineStatus) {
            dispatch(get_Vehicle())
        } else {
            dispatch({ type: Vehicle_Data, payload: JSON.parse(localStorage.getItem("vehicle_data"))?JSON.parse(localStorage.getItem("vehicle_data")):[] })
            dispatch({ type: Vehicle_Filter_Data, payload: JSON.parse(localStorage.getItem("vehicle_data"))?JSON.parse(localStorage.getItem("vehicle_data")):[] })
        }
    }, [vehicleOnlineStatus])

    const columns = [
        {
            name: 'Slip No.',
            selector: (row) => row.slipNo,
            sortable: true
        },
        {
            name: 'Veh No.',
            selector: (row) => row.vehNo
        },
        {
            name: 'Consignor',
            selector: (row) => row.consignor,
            sortable: true
        },
        {
            name: 'Veh Type',
            selector: (row) => row.vehType,
            sortable: true
        },
        {
            name: 'Item',
            selector: (row) => row.item,
            sortable: true
        },
        {
            name: 'Charge',
            selector: (row) => row.charge,
            sortable: true
        },
        {
            name: 'Weight',
            selector: (row) => row.weight,
            sortable: true
        },
        {
            name: 'Is Sync',
            selector: (row) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
            </svg>,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => <>
                <div>
                    <Link to={`/`}
                        className="btn btn-sm bg-green text-white px-1 py-0 mr-5" onClick={() => setEditValue(row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="blue" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </Link>
                    <Link to={`#`} className="btn btn-sm bg-green text-white px-1 py-0 mr-1" onClick={() => dispatch(delete_Vehicle({ id: row._id }))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="red" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                        </svg>
                    </Link>

                </div>
            </>,
            sortable: true
        }
    ]

    const setEditValue = (row) => {
        dispatch({ type: Vehicle_Single_Data, payload: row })
        dispatch({ type: Vehicle_Status, payload: true })
    }

    const searchData = () => {
        const res = Filter(dateFrom, dateTo, VehicleData)
        dispatch({ type: Vehicle_Filter_Data, payload: res })
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
                        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>View Report</h5>
                    </div>
                    <div className="container mt-5">
                        <DataTable
                            columns={columns}
                            dense
                            data={VehicleFilterData}
                            pagination
                            paginationPerPage={'10'}
                            paginationRowsPerPageOptions={[10, 15, 20]}
                            highlightOnHover
                            subHeader
                            showPaginationBottom={10}
                            subHeaderComponent={
                                <>
                                    <div className="col-12 pl-0 ml-0">
                                        <div className="row col-12">
                                            <div className='col-2' >
                                                <label className="form-label">From Date</label>
                                            </div>
                                            <div className='col-3' style={{ marginLeft: '-40px' }}>
                                                <DatePicker
                                                    className='form-control'
                                                    dateFormat="dd-MM-yyyy"
                                                    timeInputLabel
                                                    name='Date'
                                                    isClearable={true}
                                                    onChange={date => setDateFrom(date)}
                                                    selected={dateFrom}
                                                    placeholderText={'Select ..'}

                                                />
                                            </div>
                                            <div className='col-2' >
                                                <label className="form-label">To Date</label>
                                            </div>
                                            <div className='col-3'>
                                                <DatePicker
                                                    className='form-control'
                                                    dateFormat="dd-MM-yyyy"
                                                    timeInputLabel
                                                    name='Date'
                                                    isClearable={true}
                                                    onChange={date => setDateTo(date)}
                                                    selected={dateTo}
                                                    placeholderText={'Select ..'}

                                                />
                                            </div>
                                            <div className='col-2' >
                                                <button type="button" class="btn btn-light" onClick={() => searchData()}>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            subHeaderAlign='left'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewReport