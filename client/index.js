import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import Main from './components/Main'
import CustomMuiTheme from './customMuiTheme'
import './index.scss';



const App = () => (
  <CustomMuiTheme>
    <Main />
  </CustomMuiTheme>
)

render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('main')
)