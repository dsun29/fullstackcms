import React, { PropTypes } from 'react'
import {ButtonToolbar, Button, Table, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Form, Col} from 'react-bootstrap'
import TinyMCE from 'react-tinymce';
import Layout from '../components/Layout'

import locale from '../../share/util/locale'
import global_config from '../../share/global_config'

class PostDisplayComponent extends React.Component{
    
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
    
    componentWillMount() {
        
        
        if(this.props.postid != null && this.props.postid != ''){
            console.log('postid', this.props.postid);
            this.props.loadSinglePost(this.props.postid);
        }
    }
    
    componentWillUnmount(){
        this.props.resetPost();
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
        
        if(this.props.post.author == null){
            return null;
        }
        
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
}

PostDisplayComponent.PropTypes = {
    post: React.PropTypes.object.isRequired
}

export default PostDisplayComponent