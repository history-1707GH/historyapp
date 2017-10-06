import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal900, amber800, white, black } from 'material-ui/styles/colors';
import React from 'react'

const Style = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1color: teal900,
    primary2color: amber800,
    textColor: white,
    canvasColor: teal900,
    borderColor: teal900,
    pickerHeaderColor: teal900,
  },
  appBar: {
    height: 50
  },
});   

const CustomMuiTheme = (props) => {
  const {children} = props
  return (
    <MuiThemeProvider muiTheme={Style}>
      {children}
    </MuiThemeProvider>
  )
}

export default CustomMuiTheme
