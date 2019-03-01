import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {setInitUrl} from './actions/authActions';
import MainApp from './app/index';
import SignUp from './SignUp';
import Login from './LogIn';
import asyncComponent from './util/asyncComponent';


const RestrictedRoute = ({component: Component, rest, authUser}) =>
    <Route
        {...rest}
        render={props =>
            true
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />}
    />;

class App extends Component {

    render() {
        const {match, location, authUser, initURL} = this.props;
        if (location.pathname === '/') {
            console.log(authUser)
            if (authUser === null || authUser === undefined) {
                return (<Redirect to={'/login'}/>);
            } else if (initURL === '' || initURL === '/' || initURL === '/login') {
                return (<Redirect to={'/app/home'}/>);
            } else {
                return (<Redirect to={initURL}/>);
            }
        }

        return (
            <div className="app-main">
                <Switch>
                    <RestrictedRoute path={`${match.url}app`} authUser={authUser}
                                     component={MainApp}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/login' component={Login}/>
                    <Route
                        component={asyncComponent(() => import('./NotFound'))}/>
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = ({auth}) => {
    const {initURL} = auth;
    return { initURL}
};

export default connect(mapStateToProps, {setInitUrl})(App);
