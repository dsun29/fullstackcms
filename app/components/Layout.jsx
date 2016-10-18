import React from 'react';
import HeaderContainer from '../containers/HeaderContainer'
import ModalDialogContainer from '../containers/ModalDialogContainer'
import SpinnerContainer from '../containers/SpinnerContainer'

export default class AppView extends React.Component {
    

  
    render() {
        return (
            <div>
                <HeaderContainer />
                <SpinnerContainer />
                <ModalDialogContainer />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
