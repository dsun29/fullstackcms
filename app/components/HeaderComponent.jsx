import React from 'react'
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap'
import { Link } from 'react-router';


const HeaderComponent = ({userid, displayname}) => 
   (	
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem  href="#">College Football</NavItem>
            <NavItem href="#">Cloud Computing</NavItem>
            <NavDropdown title="Programming" id="basic-nav-dropdown">
              <MenuItem>Web Programming</MenuItem>
              <MenuItem>Java</MenuItem>
              <MenuItem>NodeJS</MenuItem>
              <MenuItem divider />
              <MenuItem><Link to="post">Test Automation</Link></MenuItem>

              
            </NavDropdown>

            <NavItem> {userid ? <Link to="/me">{displayname}</Link> : <Link to="/login">Log In</Link>}</NavItem>

          </Nav>
        </Navbar>
    )


export default HeaderComponent