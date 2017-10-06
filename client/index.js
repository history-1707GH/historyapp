import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal900, amber800, white, black } from 'material-ui/styles/colors';
import './index.scss';

const muiTheme = getMuiTheme({
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
    height: 50,
  },
});


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Main />
  </MuiThemeProvider>
);

render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('main')
)