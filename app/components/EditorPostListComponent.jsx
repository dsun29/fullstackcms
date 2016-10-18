import React, { PropTypes } from 'react'
import {Button, Table} from 'react-bootstrap'
import { Link } from 'react-router';
import Layout from '../components/Layout'

class EditorPostListComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.props = props;
    }
    
    componentDidMount() {
        console.log(this.props);
        this.props.loadPostsByAuthor(this.props.userid);
    }
    
    render(){
    
        return (<Layout>        
 
                <Table bordered condensed hover>
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Last Modified</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.props.posts.map(post =>
                            <tr key={post._id}>
                                <td><Link to={'/post/' + post._id + '?mode=edit'}>{post.url}</Link></td>
                                <td>{post.title}</td>
                                <td>{post.published ? 'Published' : 'Saved'}</td>
                                <td>{post.lastmodified}</td>
                                <td><Button onClick={()=>this.props.removePost(post._id)}>Remove</Button></td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
              
          </Layout>  );
    }
    
}


//TODO: define prop types

export default EditorPostListComponent