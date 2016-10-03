import React, { PropTypes } from 'react'
import {ButtonToolbar, Button, Table} from 'react-bootstrap'

import Layout from '../components/Layout'

const EditorPostListComponent = ({posts, onPostTitleClick}) => {
    
    
    
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
                    {posts.map(post =>
                        <tr key={post.id}>
                            <td>{post.url}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{post.lastmodified}</td>
                        </tr>    
                    )}
                </tbody>
            </Table>
          
      </Layout>  );
    
}

EditorPostListComponent.propTypes = {
  onGoogleLogin: PropTypes.func.isRequired
}


//TODO: define prop types

export default EditorPostListComponent