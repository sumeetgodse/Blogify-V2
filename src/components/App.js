import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import SignUp from "./SignUp"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Navbar from "./Navbar"

function App() {
  return (
      <>
          <Router>
            <AuthProvider>
            <Navbar />
            
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <div className="w-100" style={{maxWidth:"350px",margin:"0px auto",marginTop:"30px"}}>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                </div>
              </Switch>
            </AuthProvider>
          </Router>
      </>
  );
}

export default App;
