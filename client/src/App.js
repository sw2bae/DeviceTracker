import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/footer";
import API from "./utils/API";

class App extends Component {
  // const [user, setUser] = useState();
  state = {
    currentUser: {},
    isAuthenticated: false
  };

  //verify login 
  // async componentDidMount() {
  //   const { user } = await API.checkAuth();
  //   if (user && user.userId) {
  //     this.setState({
  //       currentUser: user,
  //       isAuthenticated: true
  //     });
  //   };
  // };

  //protected routes check to make sure user is logged in before allowing to continue to target, otherwise redirect to main page
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          {/* <ProtectedRoute exact={true} path="/signup/" component={SignUp} isAuthenticated={this.state.isAuthenticated} /> */}
          <Route path="/signup/" component={SignUp} />
        </Switch>
        <Footer />
      </Router>

    );
  }
};

export default App;
