import React, { Component } from 'react'
import  { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { white } from 'material-ui/styles/colors'


export default function Menu(){
  return (
    <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={white}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Profile" containerElement={<Link to="/profile" linkButton={true}/>}/>
    <MenuItem primaryText="Progress" containerElement={<Link to="/progress" />}/>
    <MenuItem primaryText="Sign out" />
  </IconMenu>
  )
}