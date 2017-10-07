import React, {Component} from 'react'

export default function Google(){
  return (
    <div>
      <a href='/auth/google'>
        <img id="google-button" src="https://developers.google.com/accounts/images/sign-in-with-google.png"
        className="google-button"/>
      </a>
    </div>
  )
}