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
        this.handlePublished = this.handlePublished.bind(this);
        
    }
    
    componentWillMount() {
        
        console.log('check state change in componentWillMount - ', this.props.post, this.props.mode);
        
        if(this.props.postid != null && this.props.postid != '' && this.props.postid != 'new'){
            this.props.loadSinglePost(this.props.postid);
        }
        else if(this.props.postid == 'new'){
             this.props.resetPost();
        }

    }
    
    componentWillUnmount(){
        this.props.resetPost();
    }
    
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.postid != this.props.postid){
            if (nextProps.postid != null && nextProps.postid != '' && nextProps.postid != 'new') {
                this.props.loadSinglePost(nextProps.postid);
            }
            else if (nextProps.postid == 'new') {
                this.props.resetPost();
            }
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
    
    handlePublished(e) {
        this.props.post.published = e.target.checked;
    }    
    
    handlePostAbstractChange(e) {
        this.props.post.abstract = e.target.getContent();
        console.log('Content was updated:', e.target.getContent());
    } 
    
    handlePostContentChange(e) {
        this.props.post.content = e.target.getContent();
    } 
    
    renderDisplay(){
        return (<Layout>        
            <h2 className="title">
                {this.props.post.title}
            </h2>
           <div className="meta">
                <ul className="meta-list list-inline">
                    <li className="updated"><i className="fa fa-calendar"></i>{this.props.post.lastmodified}</li>
                    <li className="post-author updated"><i className="fa fa-user"></i> <a href={this.props.post.author.userid}>{this.props.post.author.name}</a></li>
                    <li className="post-comments-link updated">

                    <a href="#comment-area"><i className="fa fa-comments"></i> 0 Comments</a>
                    </li>
                </ul>
           </div>
           
           <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}>
        
           </div>
                      
              
          </Layout>  );
    }

    
    renderEdit(){
    
        if(this.props.userid == null){
            return (<Layout>{locale[global_config.locale].no_auth}</Layout>)
        }
        
        if(this.props.postid != '' && this.props.postid != null && this.props.postid != 'new' && this.props.post.author != null && this.props.post.author.userid != this.props.userid){
            
             return (<Layout>{locale[global_config.locale].no_auth}</Layout>)
        }
        
        if(this.props.postid != '' && this.props.postid != null && this.props.postid != 'new' && (this.props.post.title == null || this.props.post.title == '') ){
            return null;
        }
        
        return (<Layout key={this.props.postid}>        
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
                            <Checkbox defaultChecked={this.props.post.published} onClick={this.handlePublished}>Publish</Checkbox>
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
                                          toolbar2: 'print preview media | forecolor backcolor emoticons | code'
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
    
        
    render(){
        if((this.props.mode == null || this.props.mode == 'view') && this.props.post.postid != null){
            return this.renderDisplay();
        }
        else if(this.props.mode == 'edit'){
            return this.renderEdit();
        }
        else{
            return null;
        }
    }
}

SinglePostComponent.PropTypes = {
    post: React.PropTypes.object.isRequired
}

export default SinglePostComponent