import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";


// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import EditUserProfile from "./views/EditUserProfile";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import BlogPosts from "./views/BlogPosts";
import Login from "./views/Login";


import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app'
import 'firebase/auth'

import Register from "./views/Register";
import Loading from "./components/Loading";
import { InfoContext } from "./Contexts/InfoContext";
import {  Alert } from "shards-react";
import UserProfile from "./views/UserProfile";
 



export const PrivateRoute = ({user, component: Component, ...rest}) => {

  return(
    <Route {...rest} render={props => (
        user ? <Component {...props} /> : <Redirect to="/login" />
  )} />
  )
};



const App = () => {


  const [user, loading, error] = useAuthState(firebase.auth())
  const { state, dispatch } = useContext(InfoContext)

  const [showAlert, setShowAlert] = useState(true)

  const handleDismiss = () => setShowAlert(false)
  
  useEffect(() => {
    setShowAlert(true)
  }, [state.message])


  useEffect(() => {
    dispatch({ payload : {loading, error}})
  }, [loading, error])


  return !Boolean(state.error) ? (!state.loading ?  (
  <Router>

    {state.message && showAlert  && (<Alert style={{ zIndex : "1080"}} dismissible={handleDismiss} className="mb-0" theme={state.message.type}><i className="fa fa-info mx-2"></i>{state.message.message}</Alert>)}

    <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute
            user={user}
            path="/"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <Redirect to="/dashboard" />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/dashboard"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <BlogOverview {...props} />
                </DefaultLayout>
              );
            }}
          />
          <Route
            user={user}
            path="/profile"
            exact
            component={props => {
              return (
                <Redirect to={"/writer/" + user.uid } />
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/settings"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <EditUserProfile {...props} />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/writer/:id"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <UserProfile {...props} />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/article"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <AddNewPost {...props} />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/article/:id"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <AddNewPost {...props} />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/errors"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <Errors {...props} />
                </DefaultLayout>
              );
            }}
          />
          <PrivateRoute
            user={user}
            path="/articles"
            exact
            component={props => {
              return (
                <DefaultLayout {...props}>
                  <BlogPosts {...props} />
                </DefaultLayout>
              );
            }}
          />
          <Route path="*">
          <Errors error={{code : "404", "name" : "Page Not Found", message :"try later" }} />
        </Route>
        
    </Switch>
  </Router>) : <Loading />) : <Errors error={state.error} /> 
}




export default App