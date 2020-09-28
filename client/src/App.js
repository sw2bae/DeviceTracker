import React, { Component } from 'react';
import API from "./utils/API";
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/footer";
import Main from "./pages/Main";
import Log from "./pages/Log";

class App extends Component {

  state = {
    currentUser: {},
    isAuthenticated: false
  };

  async componentDidMount() {
    const { user } = await API.checkAuth();
    if (user && user.userId) {
      this.setState({
        currentUser: user,
        isAuthenticated: true
      });
    };
  };

  //protected routes check to make sure user is logged in before allowing to continue to target, otherwise redirect to main page
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/signup/onlysangbaecansignup" component={SignUp} />
          <ProtectedRoute exact={true} path="/main/" component={Main} isAuthenticated={this.state.isAuthenticated} />
          <ProtectedRoute exact={true} path="/log/" component={Log} isAuthenticated={this.state.isAuthenticated} />
        </Switch>
        <Footer />
      </Router >

    );
  }
};

export default App;
