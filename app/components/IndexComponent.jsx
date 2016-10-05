import React from 'react';
import {Col, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'
import Layout from './Layout'

export default class IndexComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.props = props;
    }
    
    componentDidMount() {
        console.log(this.props);
        this.props.loadPosts({front: 'y'});
    }
  
  
    render() {
        return (
            <Layout>
                <div className="container">
                    <Col md={9}>
                    
                        {this.props.posts.map(post =>
                            <div className="row">
                                <div className="meta col-md-2 col-sm-3 col-xs-12 text-right">
                                    <ul className="meta-list list-unstyled">
                                        <li className="post-time post_date date updated">
                                            <span className="date">18</span>
                                            <span className="month">Aug</span>
                                        </li>
                                        <li className="post-author"><a href="#">Noname</a></li>
                                        <li className="post-comments-link">
                                        Comments: <a href="/post/first-angular2-project#comment-area">0</a>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="content-wrapper col-md-9 col-sm-9 col-xs-12">
                                    <h3 className="post-title">
                                        <a href="/post/first-angular2-project">{post.title}</a>
                                    </h3>
                                
                                    <div className="content">
                                        <div className="desc">
                                            <p>{post.abstract}...</p>
                                            <a className="read-more" href="/post/first-angular2-project">Read more <i className="fa fa-long-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>    
                        )}
                    

                    </Col>
                    
                    <Col md={3}>
                    
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" />
                                <InputGroup.Addon>
                                    <Glyphicon glyph="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                
                
                </div>
            </Layout>
        );
    }
}
