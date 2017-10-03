import React, {Component} from 'react'
import store from '../store'

export default function Google(){
  return (
    <div>
      <a href='/auth/google'>
        <img className="google-button" id="google-button" src="https://developers.google.com/accounts/images/sign-in-with-google.png"/>
      </a>
    </div>
  )
}