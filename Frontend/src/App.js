import React from 'react';
import './App.css';
import VehicleDetails from './pages/VehicleDetails';
import { Link } from 'react-router-dom';

function App() {
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
          <VehicleDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
