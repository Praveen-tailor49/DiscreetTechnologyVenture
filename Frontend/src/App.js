import React, { useEffect } from 'react';
import './App.css';
import ViewReport from "./pages/ViewReport"
import { HashRouter as Router, Route } from 'react-router-dom'
import VehicleDetails from './pages/VehicleDetails';
import { useDispatch } from 'react-redux';
import { Vehicle_Online_Status } from './Redux/actionType';

function App() {
  const dispatch = useDispatch()


  function updateOnlineStatus(){
    if(navigator.onLine)  dispatch({ type: Vehicle_Online_Status, payload: true });
    else  dispatch({ type: Vehicle_Online_Status, payload: false })
  }
  document.addEventListener("DOMContentLoaded", function () {
    updateOnlineStatus();
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });

  return (
    <Router>
      <div>
        <main>
          <Route exact path="/" component={VehicleDetails} />
          <Route exact path="/ViewReport" component={ViewReport} />
        </main>
      </div>
    </Router>
  );
}

export default App;
