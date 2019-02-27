import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import WithWarning from './components/HOCWithWarning/WithWarning';
import ErrorNotification from './components/ErrorNotification/ErrorNotification'
import ManagedForms from './components/ManagedForms/ManagedForms';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/withWarning" className="redirect">01. With Warning</Link>
          <Link to="/errorNotification" className="redirect">02. Error Notification</Link>
          <Link to="/managedForms" className="redirect">03. Managed Forms</Link>

          <Route path="/withWarning" component={WithWarning} />
          <Route path="/managedForms" component={ManagedForms} />
          <ErrorBoundary>
            <Route path="/errorNotification" component={ErrorNotification} />
          </ErrorBoundary>
        </div>
      </Router>

    );
  }
}

export default App;
