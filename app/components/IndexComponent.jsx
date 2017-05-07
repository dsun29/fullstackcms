import React from 'react';
import {Col, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'
import Layout from './Layout'
import { Link } from 'react-router';
import locale from '../../share/util/locale'
import global_config from '../../share/global_config'

export default class IndexComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.props = props;

        this.onSearch = this.onSearch.bind(this);
        
        console.log('IndexComponent constructor');
    }
    
    componentWillMount() {
        
        console.log('IndexComponent componentWillMount');
        
        this.props.loadSavedStates(this.props.queryParams);
        
    }
    

    
    componentDidUpdate (prevProps) {
        
        console.log('IndexComponent componentDidUpdate');
        
        if (this.props.installing === true && prevProps.installing !== true) {
            this.props.startInstallation();
            
            return;
        }
        
        
        if ((this.props.queryParams.front !== prevProps.queryParams.front 
            || this.props.queryParams.t !== prevProps.queryParams.t 
            || this.props.queryParams.k !== prevProps.queryParams.k) && this.props.installing !== true) {
            
            console.log('params in didUpdate', this.props.queryParams);
            let queryParams = this.props.queryParams;
            let condition = {front: 'y'};
            if(queryParams.t != null && queryParams.t != ''){
                condition.keywords = queryParams.t;
            }
            if(queryParams.k != null && queryParams.k != ''){
                condition.keywords = queryParams.k;
            }
            
            this.props.loadPosts(condition);
        }
        

    }
  
    
    onSearch(){
        let keywords = this.refs.keywordsInput.value;
    	if(keywords === null || keywords === undefined){
			return false;
		}
		keywords = keywords.trim();
		if(keywords.length < 2){
		    return false;
		}
        this.props.search(keywords);
    }
  
    render() {
        return (
            <Layout>
                
                    <Col md={9}>
                    
                        {this.props.posts.map(post =>
                        
                            <div className="row post-row" key={post._id}>
                                <div className="meta col-md-2 col-sm-3 col-xs-12 text-right">
                                    <ul className="meta-list list-unstyled">
                                        <li className="post-time post_date date updated">
                                            <span className="date">{new Date(post.lastmodified).getDate()}</span>
                                            <span className="month">{locale[global_config.locale].month_names_short[new Date(post.lastmodified).getMonth()]}</span>
                                        </li>
                                        <li className="post-author"><a href="#">{post.author.name}</a></li>
                                        <li className="post-comments-link">
                                        Comments: <a href="/post/first-angular2-project#comment-area">0</a>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="content-wrapper col-md-9 col-sm-9 col-xs-12">
                                    <h3 className="post-title">
                                        <Link to={'/post2/' + post._id}>{post.title}</Link>
                                    </h3>
                                    
                                    {post.frontpagephoto ? <img className="frontpagephoto" src={'/' + post.frontpagephoto} /> : null}
                                
                                    <div className="content">
                                        <p dangerouslySetInnerHTML={{__html: post.abstract}}></p>
                                        <Link to={'/post2/' + post._id}>Read more <i className="fa fa-long-arrow-right"></i></Link>
                                    </div>
                                </div>
                                
                                
                            </div>    
                        )}
                    

                    </Col>
                    
                    <Col md={3}>
                    
                        <FormGroup>
                            <InputGroup>
                                <input className="form-control"
                                    type="text" 
                                    defaultValue={this.props.queryParams.k}
                                    ref="keywordsInput"
                                />
                                <InputGroup.Addon onClick={()=>this.onSearch()}>
                                    <Glyphicon glyph="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                
            </Layout>
        );
    }
}
