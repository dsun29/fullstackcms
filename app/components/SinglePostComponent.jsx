import React, { PropTypes } from 'react'
import {ButtonToolbar, Button, Table, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Form, Col} from 'react-bootstrap'
import TinyMCE from 'react-tinymce';
import Layout from '../components/Layout'

import locale from '../../share/util/locale'
import global_config from '../../share/global_config'

class SinglePostComponent extends React.Component{
    
    constructor(props){
        super(props);
        this.props = props;
        
        
        this.handlePostTitleChange = this.handlePostTitleChange.bind(this);
        this.handlePostURLChange = this.handlePostURLChange.bind(this);
        this.handlePostThumbChange = this.handlePostThumbChange.bind(this);
        this.handlePostFrontpagePhotoChange = this.handlePostFrontpagePhotoChange.bind(this);
        this.handlePostTagsChange = this.handlePostTagsChange.bind(this);
        this.handlePostAbstractChange = this.handlePostAbstractChange.bind(this);
        this.handlePostContentChange = this.handlePostContentChange.bind(this);
        
        
    }
    
    componentDidMount() {
        
        console.log('post - ', this.props.post);
        if(this.props.postid != null && this.props.postid != ''){
            console.log('postid', this.props.postid);
            this.props.loadSinglePost(this.props.postid);
        }
    }
    
    
    handlePostTitleChange(e) {
        this.props.post.title = e.target.value;
    }
    
    
    handlePostURLChange(e) {
        this.props.post.url = e.target.value;
    }    
    
    handlePostThumbChange(e) {
        this.props.post.thumb = e.target.value;
    } 
  
    handlePostFrontpagePhotoChange(e) {
        this.props.post.frontpagephoto = e.target.value;
    } 
    
    handlePostTagsChange(e) {
        this.props.post.tags = e.target.value;
    } 
    
    handlePostAbstractChange(e) {
        this.props.post.abstract = e.target.getContent();
        console.log('Content was updated:', e.target.getContent());
    } 
    
    handlePostContentChange(e) {
        this.props.post.content = e.target.getContent();
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
                                defaultValue={this.props.post.url}
                                onChange={this.handlePostURLChange}/>
                          </Col>
                        </FormGroup>
                        
                        <FormGroup controlId="formHorizontalThumbPHoto">
                          <Col componentClass={ControlLabel} sm={2}>
                            Thumb Photo
                          </Col>
                          <Col sm={10}>
                            <FormControl 
                                type="text" 
                                placeholder="URL for your thumb photo" 
                                ref={(ref) => this.refPostUrl = ref}
                                defaultValue={this.props.post.thumb}
                                onChange={this.handlePostThumbChange}/>
                          </Col>
                        </FormGroup>
                        
                        <FormGroup controlId="formHorizontalFrontPHoto">
                          <Col componentClass={ControlLabel} sm={2}>
                            Front Photo
                          </Col>
                          <Col sm={10}>
                            <FormControl 
                                type="text" 
                                placeholder="URL for your front page photo" 
                                defaultValue={this.props.post.frontpagephoto}
                                onChange={this.handlePostFrontpagePhotoChange}/>
                          </Col>
                        </FormGroup>
    
                        <FormGroup controlId="formHorizontalTags">
                          <Col componentClass={ControlLabel} sm={2}>
                            Tags
                          </Col>
                          <Col sm={10}>
                            <FormControl 
                                type="text" 
                                placeholder="Tags; separated by comma" 
                                defaultValue={this.props.post.tags}
                                onChange={this.handlePostTagsChange}
                            
                            />
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
                                      content={this.props.post.abstract}
                                      config={{
                                        menubar: false,
                                        statusbar: false,
                                        plugins: 'link image code',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',

                                      }}
                                      onChange={this.handlePostAbstractChange}
                              />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Content
                            </Col>
                            <Col sm={10}>
                              <TinyMCE
                                      content={this.props.post.content}
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
                                      onChange={this.handlePostContentChange}
                              />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                          <Col smOffset={2} sm={10}>
                            <Button onClick={(e)=>this.props.onSaveClick(this.props.post)}>
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

SinglePostComponent.PropTypes = {
    post: React.PropTypes.object.isRequired
}

export default SinglePostComponent