import React, { PropTypes } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'

import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import GoogleLogin from 'react-google-login';

	
const LoginComponent = ({userid, displayname, onGoogleLogin}) => {
    
    
    
    return (<Layout>        
          
            <GoogleLogin
                clientId="81506085883-4o7mvb2qktab6nt1thvdf1gqqs93ol5k.apps.googleusercontent.com"
                buttonText={userid ? displayname : 'Log In'}
                onSuccess={ (response) => onGoogleLogin(response) }
                onFailure={ (response) => onGoogleLogin(response) }
            />
          
      </Layout>  );
    
}

LoginComponent.propTypes = {
  onGoogleLogin: PropTypes.func.isRequired
}


//TODO: define prop types

export default LoginComponent