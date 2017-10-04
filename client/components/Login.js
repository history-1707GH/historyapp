import React, {Component} from 'react'
import store from '../store'
import Center from 'react-center'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logIn } from '../store/index'
import FlatButton from 'material-ui/FlatButton'
import Google from './Google'

class Login extends Component {
  constructor(props){
    super(props)
    this.checkRedirect = this.checkRedirect.bind(this)
  }

  componentDidMount(){
    document.body.className="home";
  }

  componentWillUnmount(props){
    document.body.className=null;
  }

  checkRedirect(e) {
    e.preventDefault();
    let query = this.props.location.search
    this.props.logInUser({email:e.target.email.value,password:e.target.password.value}, query)
  }

  render(props){
    return(
      <div>
        <Center>
          <div>
            <img src="/meander-logo-white.png" className="meander-logo"/>
          </div>
        </Center>
        <div>
            <form onSubmit={this.checkRedirect}>
                <label>Email: </label>
                <input
                  name='email'
                  type='text'
                  required
                />
                <label>Password: </label>
                <input
                  name='password'
                  type='text'
                  required
                />
            <button type='submit'>Sign in</button>
            </form>
        </div>
        <Google />
        <Center>
          <div>
            <Link to={this.props.location.search.length ? '/signup?=redirect=map' : '/signup'}> 
              <FlatButton label="Create a new account" />            
            </Link>
          </div>
        </Center>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = function (dispatch, ownProps) {
    return {
        logInUser: (logInInfo,query) => {
            dispatch(logIn(logInInfo, ownProps.history, query))
        }
    }
}
export default connect(mapState, mapDispatch)(Login)
