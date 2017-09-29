import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Signup from './Signup'

export default function Auth (){
    console.log('at auth')
    return(
        <div>
            <Signup />
        </div>
    )
}