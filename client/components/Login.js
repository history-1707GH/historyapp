import React, {Component} from 'react';
import store from '../store';;
import Center from 'react-center';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../store/index';

// import { connect } from 'react-redux';

class Login extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    document.body.className="home";
  }

  componentWillUnmount(props){
    document.body.className=null;
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
            <form onSubmit={this.props.logInUser}>
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
      </div>
    )
  }
}

const mapState = null

const mapDispatch = function (dispatch, ownProps) {
    return {
        logInUser: e => {
            e.preventDefault();
            dispatch(logIn({email:e.target.email.value,password:e.target.password.value},ownProps.history))
        }
    }
}
export default connect(mapState, mapDispatch)(Login)
