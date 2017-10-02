import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.scss';

// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: teal500,
//   },
//   appBar: {
//     height: 50,
//   },
// });

const App = () => (
  <MuiThemeProvider >
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