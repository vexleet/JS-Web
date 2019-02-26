import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import WithWarning from './HOCWithWarning/WithWarning';
import ErrorBoundary from './ErrorNotification/ErrorNotification';
import ErrorComponent from './ErrorComponent/ErrorComponent'
import BindingForm from './BindingForm/BindingForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Link to="/withWarning">01. With Warning</Link>
          <Link to="/errorNotification">02. Error Notification</Link>

          <Route path="/withWarning" component={WithWarning} />
          <ErrorBoundary>
            <Route path="/errorNotification" component={ErrorComponent} />
          </ErrorBoundary> */}

          <BindingForm>
            <h1>Register</h1>
            <input name="username" type="text"></input>
            <input name="password" type="password"></input>
          </BindingForm>

          {/* <BindingForm>
            <h1>Create Movie</h1>
            <input name="title" type="text"></input>
            <input name="description" type="text"></input>
          </BindingForm> */}
        </div>
      </Router>

    );
  }
}

export default App;
