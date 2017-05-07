import React from 'react';
import { Col, FormGroup, Form, InputGroup, Button, FormControl, Glyphicon, Tabs, Tab, Panel, ControlLabel, PageHeader } from 'react-bootstrap'
import Layout from './Layout'
import { Link } from 'react-router';
import locale from '../../share/util/locale'
import global_config from '../../share/global_config'

export default class InstallationComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.props = props;

        this.updateDBUrl = this.updateDBUrl.bind(this);
    }
    
    componentDidMount() {

    }
    
    componentDidUpdate (prevProps) {

    }
  
    
    updateDBUrl(){
        
        const dbStr = this.dbInput.value;
        console.log(dbStr);
        if (dbStr === null || typeof dbStr === 'undefined' || dbStr.length < 3) {
            return;
        }
        
        this.props.updateConfigAction({ db: dbStr });
    }
  
    render() {
        return (
            <div className="container">
  
                <PageHeader>Let's Get Started</PageHeader>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail" className="required">
                        <Col componentClass={ControlLabel} sm={3}>
                            MongoDB Connection URI
                        </Col>
                        <Col sm={7}>
                            <input 
                                className="form-control"
                                type="text" 
                                ref={ (input) => { this.dbInput = input; } }
                                defaultValue={this.props.db}
                                placeholder="mongodb://[username:password@]host1[:port][/[database][?options]]" 
                            />
                        </Col>
                        <Col sm={2}>
                        <Button onClick={ () => this.updateDBUrl() }>
                                Test Connectivity
                            </Button>
                        </Col>
                    </FormGroup>
                    

                    <FormGroup controlId="formHorizontalEmail" className="required">
                        <Col componentClass={ControlLabel} sm={3}>
                            Site Name
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="Your site's name" 
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail" className="required">
                        <Col componentClass={ControlLabel} sm={3}>
                            Admin's Email
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="abc@xyz.com" 
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formHorizontalEmail" className="required">
                        <Col componentClass={ControlLabel} sm={3}>
                            Admin's Password
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="at least 8 characters" 
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formHorizontalEmail" className="required">
                        <Col componentClass={ControlLabel} sm={3}>
                            Confirm Password
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="" 
                            />
                        </Col>
                    </FormGroup>
       
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Google Client ID
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="88888888888-abcdefghijklmn.apps.googleusercontent.com" 
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Twitter Consumer Key
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="" 
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Twitter Consumer Secret
                        </Col>
                        <Col sm={9}>
                            <FormControl 
                                type="text" 
                                placeholder="" 
                            />
                        </Col>
                    </FormGroup>
                    

                    <FormGroup>
                        <Col smOffset={3} sm={10}>
                            <Button>
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                
                </Form>

            </div>
        );
    }
}