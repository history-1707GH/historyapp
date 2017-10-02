import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Signup from './Signup'

export default function Auth (){
    return(
        <div>
            <Signup />
        </div>
    )
}