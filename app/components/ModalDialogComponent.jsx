import React from 'react'
import {Modal, Button} from 'react-bootstrap'


const ModalDialogComponent = ({showDialog, dialogTitle, dialogBody, onDialogClose, onClose}) => 
   (	
        <Modal
            show={showDialog}
            onHide={onDialogClose ? onDialogClose : onClose}
            container={this}
            aria-labelledby="contained-modal-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dialogBody}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onDialogClose ? onDialogClose : onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )


export default ModalDialogComponent