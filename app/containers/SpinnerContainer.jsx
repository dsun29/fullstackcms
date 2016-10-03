import React from 'react'
import {  connect } from 'react-redux'
import SpinnerComponent from '../components/SpinnerComponent'

//({showDialog, dialogTitle, dialogBody, onClose}) 
const mapStateToProps = (state) =>{
	return {
		showSpinner: state.UserReducer.showSpinner
	}
}


const SpinnerContainer = connect(mapStateToProps)(SpinnerComponent);


export default SpinnerContainer