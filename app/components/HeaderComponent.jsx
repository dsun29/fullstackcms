import React from 'react'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap'
import { Link } from 'react-router';


const HeaderComponent = ({userid, displayname, logout}) => 
   (	
        <Navbar inverse>
          <Navbar.Header>
                <h1 className="logo">
                    <a href="/"><span className="highlight">Fullstack</span>Rebel</a>
                </h1>
            <Navbar.Toggle />
          </Navbar.Header>
          
          
            <Navbar.Collapse>
                <Nav pullRight>
                
                    <li role="presentation">
                        <Link role="menuitem" to="/?t=College%20Football">
                            College Football
                        </Link>
                    </li>
                    

                    <NavDropdown title="Programming" id="basic-nav-dropdown">
                        <li role="presentation">
                            <Link role="menuitem"  to="/?t=Python">
                                <i className="fa fa-flask" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;Python
                            </Link>
                        </li>
                        
                        <li role="presentation">
                            <Link role="menuitem"  to="/?t=Java">
                                <i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;JAVA
                            </Link>
                        </li>
                        
                        <li role="presentation">
                            <Link role="menuitem"  to="/?t=Web">
                                <i className="fa fa-internet-explorer" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;WEB PROGRAMMING
                            </Link>
                        </li>
                        
                        <li role="presentation">
                            <Link role="menuitem"  to="/?t=testing">
                                <i className="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;TEST AUTOMATION
                            </Link>
                        </li>
                      
                    </NavDropdown>
                    
                    <li role="presentation">
                        <Link role="menuitem" to="/?t=AWS">
                            AWS & CLOUD
                        </Link>
                    </li>
                    
                    
                    {userid ?   <NavDropdown title={displayname} id="basic-nav-dropdown">
                                    
                                    <li role="presentation">
                                        <Link role="menuitem"  to="/me">
                                            <i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;My Posts
                                        </Link>
                                    </li>
                                    <li role="presentation">
                                        <Link role="menuitem" to="/post/new">
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;New Post
                                        </Link>
                                    </li>
                                    
                                    <MenuItem divider />
                    
                                    <li role="presentation"> <a onClick={()=>logout()}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;Log Out</a></li>
                    
                                </NavDropdown>
                    
                              : 
                              
                              <li role="presentation"><Link to="/login">Log In</Link></li>}
                
                </Nav>
            </Navbar.Collapse>    
        </Navbar>
    )


export default HeaderComponent