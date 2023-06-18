import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./Redux/reducers";
import thunk from "redux-thunk";

import Home from "./App"
import ViewReport from "./pages/ViewReport"
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/ViewReport" component={ViewReport} />
                </main>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")

)
