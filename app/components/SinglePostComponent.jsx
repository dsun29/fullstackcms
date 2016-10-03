import React, { PropTypes } from 'react'
import {ButtonToolbar, Button, Table, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Form, Col} from 'react-bootstrap'
import TinyMCE from 'react-tinymce';
import Layout from '../components/Layout'

import locale from '../../share/util/locale'
import global_config from '../../share/global_config'

class SinglePostComponent extends React.Component{
    constructor({userid, displayname, post,  onSaveClick, onPreviewClick}){
        super({userid, displayname, post,  onSaveClick, onPreviewClick});
        this.props = {userid, displayname, post,  onSaveClick, onPreviewClick};
        
        this.handlePostTitleChange = this.handlePostTitleChange.bind(this);
        this.handlePostURLChange = this.handlePostURLChange.bind(this);
        
        
    }
    
    
    handlePostTitleChange(e) {
        this.props.post.title = e.target.value;
    }
    
    
    handlePostURLChange(e) {
        this.props.post.url = e.target.value;
    }    
    

  
    render(){
    
        if(this.props.userid == null){
            return (<Layout>{locale[global_config.locale].no_auth}</Layout>)
        }
        
        return (<Layout>        
                   <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                          <Col componentClass={ControlLabel} sm={2}>
                            Title
                          </Col>
                          <Col sm={10}>
                            <FormControl 
                                type="text" 
                                placeholder="Post title" 
                                defaultValue={this.props.post.title}
                                onChange={this.handlePostTitleChange}
                            />
                          </Col>
                        </FormGroup>
                        
                        <FormGroup controlId="formHorizontalEmail">
                          <Col componentClass={ControlLabel} sm={2}>
                            URL
                          </Col>
                          <Col sm={10}>
                            <FormControl 
                                type="text" 
                                placeholder="Post url" 
                                value={this.props.post.url}
                                onChange={this.handlePostURLChange}/>
                          </Col>
                        </FormGroup>
    
                        <FormGroup controlId="formHorizontalPassword">
                          <Col componentClass={ControlLabel} sm={2}>
                            Tags
                          </Col>
                          <Col sm={10}>
                            <FormControl type="text" placeholder="Tags" />
                          </Col>
                        </FormGroup>
                    
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Checkbox>Publish</Checkbox>
                          </Col>
                        </FormGroup>
                    
    
      
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Abstract
                            </Col>
                            <Col sm={10}>
                              <TinyMCE
                                      content=""
                                      config={{
                                        menubar: false,
                                        statusbar: false,
                                        plugins: 'link image code',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                      }}
                              />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Content
                            </Col>
                            <Col sm={10}>
                              <TinyMCE
                                      content=""
                                      config={{
                                          height: 300,
                                          theme: 'modern',
                                          plugins: [
                                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                                            'insertdatetime media nonbreaking save table contextmenu directionality',
                                            'emoticons template paste textcolor colorpicker textpattern imagetools'
                                          ],
                                          toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                                          toolbar2: 'print preview media | forecolor backcolor emoticons'
                                      }}
                              />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Button onClick={(e)=>this.props.onSaveClick({title: this.props.post.title, url: this.props.post.url})}>
                              Save
                            </Button>
                            <Button>
                              Preview
                            </Button>
                          </Col>
                        </FormGroup>
                </Form>
              
          </Layout>  );
    }
}

//TODO: define prop types

export default SinglePostComponent