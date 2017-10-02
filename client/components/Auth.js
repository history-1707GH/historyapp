import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Signup from './Signup'
import Login from './Login'

export default function Auth (){
    return(
        <div>
            <div>
            <h2>Login</h2>
            <Login />
            <p>or</p>
            <h2>Signup</h2>
            <Signup />
            </div>
            <a href='/auth/google'><img id="google-button" src="https://developers.google.com/accounts/images/sign-in-with-google.png"/></a>
        </div>
    )
}