import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import GoogleLogin from 'react-google-login';

const LoginComponent = ({userid, displayname, onGoogleLogin, onTwitterLoginStart}) => {
    
    
    
    return (<Layout>        
          
            <GoogleLogin
                clientId="81506085883-4o7mvb2qktab6nt1thvdf1gqqs93ol5k.apps.googleusercontent.com"
                buttonText={userid ? displayname : 'Login With Google'}
                onSuccess={ (response) => onGoogleLogin(response) }
                onFailure={ (response) => onGoogleLogin(response) }
            />
            
            <button className="btn-twitter" onClick={()=>onTwitterLoginStart()}>
                {userid ? displayname : 'Login with Twitter'} 
            </button>
          
      </Layout>  );
    
}


//TODO: define prop types

export default LoginComponent