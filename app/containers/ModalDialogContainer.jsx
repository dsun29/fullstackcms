import React from 'react'
import { Provider, connect } from 'react-redux'
import {Close_Dialog} from '../actions/UserActions'
import ModalDialogComponent from '../components/ModalDialogComponent'

//({showDialog, dialogTitle, dialogBody, onClose}) 
const mapStateToProps = (state) =>{
	return {
		showDialog: state.UserReducer.showDialog,
		dialogTitle: state.UserReducer.dialogTitle,
		dialogBody: state.UserReducer.dialogBody,
		onDialogClose: state.UserReducer.onDialogClose
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClose: () => {
			dispatch(Close_Dialog());
		}
	}
}


const ModalDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ModalDialogComponent);


export default ModalDialogContainer