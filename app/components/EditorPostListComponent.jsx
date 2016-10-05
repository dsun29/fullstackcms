import React, { PropTypes } from 'react'
import {ButtonToolbar, Button, Table} from 'react-bootstrap'

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
                <Button>Add New</Button>
                <Table bordered condensed hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Last Modified</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.props.posts.map(post =>
                            <tr key={post._id}>
                                <td>{post.url}</td>
                                <td>{post.title}</td>
                                <td>{post.published}</td>
                                <td>{post.lastmodified}</td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
              
          </Layout>  );
    }
    
}


//TODO: define prop types

export default EditorPostListComponent